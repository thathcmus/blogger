# Đặc Tả Kỹ Thuật Hiện Trạng: FlexRay Protocol Explorer (Current Info)

* **Tên file nguồn**: [`FLEXRAY_overview.html`](../../FLEXRAY_overview.html)
* **Phiên bản hiện tại**: `v1.1.0` (Cập nhật chuẩn hóa FlexRay 3.0.1 & ISO 17458:2013)
* **Ngày cập nhật**: `2026-10-07`
* **Mục đích**: Widget tương tác trực quan hóa kiến thức giao thức truyền thông mạng trên ô tô FlexRay phục vụ nhúng vào bài viết Google Blogger (Blogspot) hoặc xem độc lập.

---

## 1. Cách Nhúng Vào Google Blogger (Embed Guide)

### Cách 1: Nhúng Iframe qua GitHub Pages (Tối ưu & Khuyên dùng)
Dán đoạn mã sau vào bài đăng Blogger ở chế độ **HTML View**:
```html
<iframe src="https://thathcmus.github.io/blogger/FLEXRAY_overview.html" 
        width="100%" 
        height="850px" 
        style="border: none; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden;"
        title="FlexRay Protocol Explorer">
</iframe>
```

### Cách 2: Nhúng mã trực tiếp (Direct Embed)
Copy toàn bộ nội dung từ file `FLEXRAY_overview.html` và dán thẳng vào chế độ Soạn thảo HTML của bài viết Blogger.

---

## 2. Thư Viện Phụ Thuộc (External Dependencies)

| Thư viện | Phiên bản | Nguồn CDN | Vai trò | Cơ chế An toàn (Fallback) |
| :--- | :--- | :--- | :--- | :--- |
| **Tailwind CSS** | v3.x | `https://cdn.tailwindcss.com` | Styling toàn bộ giao diện | Không gây crash nếu mất mạng, các thẻ vẫn giữ layout block |
| **Lucide Icons** | Latest | `https://unpkg.com/lucide@latest` | Icon minh họa SVG | Có `try...catch` bọc hàm khởi tạo `lucide.createIcons()`, không làm đứng UI |

---

## 3. Kiến Trúc Chi Tiết Các Tab Giao Diện

### Tab 1: Cấu Trúc Khung Truyền (FlexRay Frame Map)
Khung truyền FlexRay chuẩn bao gồm 3 phân đoạn với độ dài tổng quát từ **8 đến 262 Bytes**:

1. **Header Segment (5 Bytes = 40 bits)**:
   - **Indicator Bits (5 bits)**:
     - `Bit 0 - Reserved bit`: Luôn bằng 0.
     - `Bit 1 - Payload Preamble bit`: Ở Static = có Network Management Vector; ở Dynamic = 2 byte đầu là Message ID (16-bit).
     - `Bit 2 - Null Frame Indicator`: **Active-Low** (Giá trị `0` = Frame rỗng/không nạp dữ liệu mới; giá trị `1` = Frame chứa dữ liệu hợp lệ).
     - `Bit 3 - Sync Frame Indicator`: `1` = Frame dùng cho thuật toán đồng bộ thời gian.
     - `Bit 4 - Startup Frame Indicator`: `1` = Frame phát bởi Coldstart Node (bắt buộc kèm theo `Sync bit = 1`).
   - **Frame ID (11 bits)**: Từ 1 đến 2047.
     - Static Segment: Xác định Slot thời gian cố định ($1 \le ID \le gNumberOfStaticSlots$).
     - Dynamic Segment: Xác định độ ưu tiên phân xử Minislot (FTDMA, ID nhỏ hơn được quyền phát trước).
   - **Payload Length (7 bits)**: Đếm theo Word 16-bit (0 đến 127 Words = 0 đến 254 Bytes). Toàn bộ frame trong Static Segment của cùng cluster phải có cùng độ dài tĩnh (`gPayloadLengthStatic`).
   - **Header CRC (11 bits)**: Đa thức CRC-11 (0x385). Chỉ tính toán trên **đúng 20 bits cố định**: Sync bit (1) + Startup bit (1) + Frame ID (11) + Payload Length (7). Được nạp offline lúc cấu hình.
   - **Cycle Count (6 bits)**: Đếm chu kỳ hiện tại từ 0 đến 63 (`gCycleCountMax = 63`).

2. **Payload Segment (0 đến 254 Bytes)**:
   - **Data Bytes**: Dữ liệu ứng dụng giữa các ECU. Độ dài luôn là số chẵn.
   - **Message ID (Tùy chọn)**: 2 byte đầu tiên của Payload khi ở Dynamic Segment và cờ Payload Preamble = 1.
   - **NM Vector (Tùy chọn)**: 0 đến 12 bytes ở đầu Payload khi ở Static Segment và cờ Payload Preamble = 1.

3. **Trailer Segment (3 Bytes = 24 bits)**:
   - **Frame CRC (24 bits)**: Mã kiểm tra lỗi CRC-24 tính trên toàn bộ 40 bits Header và Payload.
   - Vector khởi tạo khác nhau theo kênh truyền:
     - **Channel A**: `0xFECABC`
     - **Channel B**: `0xABCDEF`
     *(Mục đích: Loại trừ hoàn toàn nguy cơ nhận nhầm khung chéo kênh khi có sự cố chập cáp vật lý).*

---

### Tab 2: Quản Lý Dữ Liệu Tại Node (Node Data Management)
Minh họa cách một ECU xử lý và trao đổi dữ liệu:
1. **Host CPU & CHI (Controller Host Interface)**:
   - Giao tiếp qua các thanh ghi điều khiển và bộ nhớ đệm.
   - Cơ chế **Shadow Buffers (Double Buffering)** và cơ chế khóa Input/Output Buffer Lock để ngăn ngừa xung đột dữ liệu (Race Condition) giữa CPU bất đồng bộ và Protocol Engine (PE).
2. **Message Buffers**:
   - Nằm trong RAM của Communication Controller (CC).
   - Hỗ trợ cả **Single Buffers** (gán cứng Frame ID / Slot) và **Receive FIFO Buffers** (hàng đợi nhận linh hoạt cho Dynamic Segment).
3. **Scheduling (Lập lịch Time-Triggered)**:
   - Mọi hoạt động định sẵn qua bảng Schedule Table.
   - Nếu đến lượt Slot trong Static Segment mà CPU chưa nạp dữ liệu mới, CC tự động phát **Null Frame** (cờ Null = 0).
4. **Data Flow Diagram**: Sơ đồ trực quan luồng đi của dữ liệu từ Host CPU $\rightarrow$ CHI $\rightarrow$ Message Buffers $\rightarrow$ Physical Bus.

---

### Tab 3: Giao Tiếp Trên Mạng & Chu Kỳ Giao Tiếp (Network Communication)
1. **Phân biệt rõ 4 loại Frame**:
   - **Startup Frame**: Gửi bởi Coldstart Node (sau khi phát ký hiệu CAS) để thiết lập nhịp chu kỳ ban đầu. *Lưu ý: Đánh thức phần cứng dùng tín hiệu vật lý WUP (Wakeup Pattern), không phải Startup Frame*.
   - **Sync Frame**: Dùng để đo độ lệch thời gian và chạy thuật toán đồng bộ Fault-Tolerant Midpoint (FTM).
   - **Normal Data Frame**: Frame mang dữ liệu ứng dụng thực tế.
   - **Null Frame**: Frame rỗng dự phòng phát ra trong Static Segment (`Null Frame Indicator = 0`).
2. **Kiến trúc Kênh đôi (Dual Channel A & B)**:
   - **Redundancy Mode (Dự phòng lỗi)**: Phát song song trên cả 2 kênh A & B để đạt tiêu chuẩn an toàn cao nhất (Fail-Operational ASIL D cho Steer-by-Wire, Brake-by-Wire).
   - **High Bandwidth Mode (Tăng tốc độ)**: Phát dữ liệu khác nhau trên mỗi kênh, nâng tổng thông lượng mạng lên 20 Mbps.
3. **Biểu đồ Chu kỳ Giao tiếp (Communication Cycle Diagram)**:
   - **Static Segment (Bắt buộc)**: Chia thành các slot bằng nhau (TDMA), đảm bảo tính thời gian thực cứng.
   - **Dynamic Segment (Tùy chọn)**: Chia theo Minislot (FTDMA), ưu tiên Frame ID nhỏ hơn.
   - **Symbol Window (Tùy chọn - Ký hiệu SW)**: Dùng để gửi Media Test Symbol (MTS).
   - **NIT - Network Idle Time (Bắt buộc)**: Khoảng lặng cuối chu kỳ để Controller tính toán bù trừ độ lệch xung nhịp (Offset Correction).

---

### Tab 4: Góc Phỏng Vấn Kiến Trúc (Interview Q&A Deep-Dive)
Chuyên đề chuyên sâu giải quyết câu hỏi phỏng vấn Senior/Architect:
1. **Bóc tách bẫy thuật ngữ "POC Frame"**:
   - Khẳng định không tồn tại "POC Frame" trong chuẩn FlexRay v3.0.1 / ISO 17458.
   - POC (Protocol Operation Control) là **State Machine** phần cứng quản lý chu trình node (`CONFIG` &rarr; `READY` &rarr; `NORMAL_ACTIVE` &rarr; `HALT`).
   - Đồng bộ chu kỳ sử dụng **Sync Frames** do các Sync Nodes phát ra.
2. **So sánh toàn diện Static Segment (TDMA) vs Dynamic Segment (FTDMA)**:
   - Bảng đối chiếu 5 đặc tính: Cơ chế truy cập bus, Tính tiền định & Jitter, Độ dài Payload, Cơ chế xử lý khi thiếu data (Null Frame vs Minislot trôi), và Use case thực tế (ASIL D vs UDS/Calibration).
3. **Hai chế độ vận hành: Synchronous Mode vs Free-Running Mode**:
   - *Synchronous Mode*: Nhận đủ Sync Frames, chạy giải thuật FTM trong khoảng NIT để bù trừ độ lệch xung nhịp (Clock Drift).
   - *Free-Running Mode*: Mất tín hiệu Sync, đồng hồ trôi tự do theo thạch anh nội bộ. POC State Machine tự động chuyển sang `NORMAL_PASSIVE` hoặc `HALT` để bảo vệ an toàn toàn bus.
4. **Khung câu trả lời phỏng vấn gợi ý (Interview Pitch)**: Mẫu câu trả lời 3 phần giúp ứng viên ghi điểm tuyệt đối.

---

## 4. Bản Đồ Mã Nguồn (Source Code Architecture)

* **Dòng 1 – 26**: Thẻ HTML Header, CDN scripts (Tailwind, Lucide), CSS tùy chỉnh (`animate-fadeIn`, `no-scrollbar`).
* **Dòng 27 – 55**: Wrapper Container, Header và thanh điều hướng 4 Tabs (`#btn-tab-frame`, `#btn-tab-node`, `#btn-tab-network`, `#btn-tab-interview`).
* **Dòng 56 – 98**: Cụm giao diện Tab 1 (Sơ đồ Segment tương tác và khung chi tiết thuộc tính).
* **Dòng 99 – 197**: Cụm giao diện Tab 2 (3 Box quản lý dữ liệu và Sơ đồ Data Flow kiến trúc ECU).
* **Dòng 198 – 330**: Cụm giao diện Tab 3 (4 card phân loại Frame, Card kiến trúc Dual Channel, và Biểu đồ Communication Cycle phân đoạn).
* **Dòng 331 – 495**: Cụm giao diện Tab 4 (Quote box phỏng vấn, Alert bẫy POC Frame, Bảng so sánh Static vs Dynamic, Card chế độ Sync vs Free-running, Khung trả lời mẫu).
* **Dòng 496 – 661**: JavaScript logic:
  - Khai báo hằng số dữ liệu cấu trúc `const frameData = { header, payload, trailer }`.
  - Hàm `switchTab(tabId)`: Chuyển đổi 4 tabs mượt mà.
  - Hàm `selectSegment(segId)`: Đổi màu viền và render động các sub-fields tương ứng.
  - Sự kiện `DOMContentLoaded`: Gắn event listener cho 4 nút tab và gọi an toàn `lucide.createIcons()`.

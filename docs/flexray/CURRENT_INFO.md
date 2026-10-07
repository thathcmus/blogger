# Đặc Tả Kỹ Thuật Hiện Trạng: FlexRay Protocol Explorer (Current Info)

* **Tên file nguồn**: [`widget_flexray.html`](../../widget_flexray.html)
* **Phiên bản hiện tại**: `v1.1.0` (Cập nhật chuẩn hóa FlexRay 3.0.1 & ISO 17458:2013)
* **Ngày cập nhật**: `2026-10-07`
* **Mục đích**: Widget tương tác trực quan hóa kiến thức giao thức truyền thông mạng trên ô tô FlexRay phục vụ nhúng vào bài viết Google Blogger (Blogspot) hoặc xem độc lập.

---

## 1. Cách Nhúng Vào Google Blogger (Embed Guide)

### Cách 1: Nhúng Iframe qua GitHub Pages (Tối ưu & Khuyên dùng)
Dán đoạn mã sau vào bài đăng Blogger ở chế độ **HTML View**:
```html
<iframe src="https://thathcmus.github.io/blogger/widget_flexray.html" 
        width="100%" 
        height="850px" 
        style="border: none; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden;"
        title="FlexRay Protocol Explorer">
</iframe>
```

### Cách 2: Nhúng mã trực tiếp (Direct Embed)
Copy toàn bộ nội dung từ file `widget_flexray.html` và dán thẳng vào chế độ Soạn thảo HTML của bài viết Blogger.

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

### Tab 4: Ngân Hàng Câu Hỏi Phỏng Vấn (Interview Q&A Vault - Dạng Accordion)
Được tổ chức dạng danh sách câu hỏi sổ xuống (Accordion), đánh số thứ tự từ **Q1** và thiết kế sẵn khung mở rộng cho Q2, Q3, Q4...:
1. **Câu hỏi Q1: Đồng Bộ Thời Gian (Time-Triggered) & Kiến Trúc Tích Hợp FlexRay**:
   - *Bóc tách bẫy thuật ngữ*: Khẳng định không có "POC Frame", POC là State Machine phần cứng; đồng bộ thực hiện qua các Sync Frames.
   - *Bảng so sánh 5 chiều*: Static Segment (TDMA, tiền định tuyệt đối, payload cố định cho ASIL D) vs Dynamic Segment (FTDMA minislotting, ưu tiên theo Frame ID cho UDS/Events).
   - *Hai chế độ vận hành*: Synchronous Mode (bù trừ độ lệch FTM trong khoảng NIT) vs Free-Running Mode (dao động tự do khi mất Sync, hạ trạng thái POC xuống Normal Passive/Halt).
   - *Mẫu câu trả lời gợi ý (Senior/Architect Pitch)*: Khung trả lời 3 phần súc tích.
2. **Câu hỏi Q2: Đồng Bộ Xung Clock Khi Bị Lệch, Thuật Toán FTM & Bản Chất Sync Node**:
   - *Bản chất & Vai trò Sync Node*: Cung cấp mốc thời gian toàn cục, tham gia Coldstart. Khẳng định Sync Node **hoàn toàn gửi dữ liệu ứng dụng bình thường** (Payload tối đa 254B) như mọi ECU khác, chỉ khác là bật cờ `Sync Frame Indicator = 1`.
   - *Bảng so sánh 4 chiều*: Sync Node vs Regular (Non-Sync) Node.
   - *Cơ chế bù lệch*: Đo độ lệch Action Point $\Delta t_i$, lọc bỏ lỗi cực trị Byzantine qua thuật toán **Fault-Tolerant Midpoint (FTM)**, bù lệch pha (Offset Correction) và bù lệch tần số (Rate Correction) trong khoảng **NIT**.
   - *Bộ mô phỏng tương tác thời gian thực (4-Node Simulator)*: Trực quan hóa Node A (Master Sync), Node B (Steering Sync - lệch nhanh), Node C (Brake Regular - lệch chậm), và Node D (Byzantine Faulty). Cho phép bấm mô phỏng Drift, chạy thuật toán FTM loại bỏ cực trị, và bù lệch tại NIT.
   - *Mẫu câu trả lời phỏng vấn Senior/Architect Pitch*.
3. **Khung mở rộng Q3, Q4...**:
   - Thiết kế dạng thẻ Accordion độc lập (`toggleQuestion(qId)`), sẵn sàng nhân bản để bổ sung các câu hỏi tiếp theo (ví dụ: Q3 Coldstart/Wakeup/CAS, Q4 Bus Guardian...).

---

## 4. Bản Đồ Mã Nguồn (Source Code Architecture)

* **Dòng 1 – 26**: Thẻ HTML Header, CDN scripts (Tailwind, Lucide), CSS tùy chỉnh (`animate-fadeIn`, `no-scrollbar`).
* **Dòng 27 – 55**: Wrapper Container, Header và thanh điều hướng 4 Tabs (`#btn-tab-frame`, `#btn-tab-node`, `#btn-tab-network`, `#btn-tab-interview`).
* **Dòng 56 – 98**: Cụm giao diện Tab 1 (Sơ đồ Segment tương tác và khung chi tiết thuộc tính).
* **Dòng 99 – 197**: Cụm giao diện Tab 2 (3 Box quản lý dữ liệu và Sơ đồ Data Flow kiến trúc ECU).
* **Dòng 198 – 330**: Cụm giao diện Tab 3 (4 card phân loại Frame, Card kiến trúc Dual Channel, và Biểu đồ Communication Cycle phân đoạn).
* **Dòng 331 – 670**: Cụm giao diện Tab 4 (Ngân hàng câu hỏi phỏng vấn dạng Accordion: Item Q1 phân tích Time-Triggered & POC, Item Q2 chi tiết về Sync Node & Bộ mô phỏng tương tác Clock Drift 4-Node, và placeholder slot Q3).
* **Dòng 671 – 890**: JavaScript logic:
  - Khai báo hằng số dữ liệu cấu trúc `const frameData = { header, payload, trailer }`.
  - Hàm `switchTab(tabId)`: Chuyển đổi 4 tabs mượt mà.
  - Hàm `toggleQuestion(qId)`: Đóng/mở câu hỏi dạng accordion với hiệu ứng xoay icon mũi tên.
  - Hàm `runSimClock(step)`: Điều khiển 4 bước mô phỏng tương tác xung clock và thuật toán FTM cho Q2.
  - Hàm `selectSegment(segId)`: Đổi màu viền và render động các sub-fields tương ứng.
  - Sự kiện `DOMContentLoaded`: Gắn event listener cho các nút tab và gọi an toàn `lucide.createIcons()`.

# Đặc Tả Kỹ Thuật Hiện Trạng: CAN FD Protocol Explorer (Current Info)

* **Tên file nguồn**: [`widget_can_fd.html`](../../widget_can_fd.html)
* **Phiên bản hiện tại**: `v1.0.0`
* **Ngày cập nhật**: `2026-10-07`
* **Mục đích**: Widget tương tác trực quan hóa kiến thức giao thức mạng ô tô CAN FD, phân tích cấu trúc Frame ở cấp độ Bit, cơ chế BRS (Bit Rate Switch) và so sánh với hệ Classic CAN, CAN XL. Phục vụ nhúng vào bài viết Google Blogger.

---

## 1. Cách Nhúng Vào Google Blogger

**Nhúng Iframe qua GitHub Pages (Khuyên dùng):**
```html
<!-- CAN FD Explorer Embed Widget -->
<div style="width: 100%; margin: 24px auto; text-align: center;">
    <iframe src="https://thathcmus.github.io/blogger/widget_can_fd.html" 
            width="100%" 
            height="850px" 
            style="border: none; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden;" 
            title="CAN FD Protocol Explorer"
            loading="lazy">
    </iframe>
</div>
```

---

## 2. Thư Viện Phụ Thuộc (External Dependencies)

| Thư viện | Phiên bản | Nguồn CDN | Vai trò | Cơ chế An toàn (Fallback) |
| :--- | :--- | :--- | :--- | :--- |
| **Tailwind CSS** | v3.x | `https://cdn.tailwindcss.com` | Styling toàn bộ giao diện | Không gây crash nếu mất mạng, các thẻ vẫn giữ layout block |
| **Lucide Icons** | Latest | `https://unpkg.com/lucide@latest` | Icon minh họa SVG | Có `try...catch` bọc hàm khởi tạo `lucide.createIcons()`, không làm đứng UI |

---

## 3. Kiến Trúc Chi Tiết Các Tab Giao Diện

### Tab 1: Cấu Trúc Khung Truyền CAN FD (Base Frame Format)
Cung cấp bản đồ tương tác bit-level của frame CAN FD:
- **Arbitration Phase (Nominal Bit Rate)**: SOF, 11-bit ID, RRS, IDE. Truyền ở tốc độ nền (chậm) để phân xử an toàn.
- **Control Field**: FDF (Flexible Data Rate), res, **BRS (Bit Rate Switch)**, ESI, DLC (4-bit, quy ước kích thước mã hóa tới 64 bytes).
- **Data Phase (High Bit Rate)**: Chứa Payload từ 0 đến 64 Bytes. Đoạn này tăng tốc độ nhờ cờ BRS.
- **CRC Field**: SBC (Stuff Bit Count mới của CAN FD), CRC (17-bit cho &le; 16 bytes / 21-bit cho &gt; 16 bytes), CRC Delimiter (Mốc giảm tốc độ về lại Nominal).
- **ACK & EOF**: Xác nhận và kết thúc khung, truyền ở tốc độ Nominal.

### Tab 2: So Sánh Thế Hệ (Classic CAN vs CAN FD vs CAN XL)
Bảng đối chiếu 4 chiều (Max Payload, Max Data Rate, Cơ chế Baudrate, Ứng dụng thực tế ô tô). Nhấn mạnh sự đột phá của CAN FD (64B, Dual Bit Rate 8Mbps).

### Tab 3: Q&A Phỏng Vấn (Ngân Hàng Câu Hỏi)
Cung cấp ngân hàng câu hỏi dạng thẻ (Accordion cards) với các bộ lọc phân loại theo Độ Khó (Basic/Intermediate/Advanced/Senior) và Chủ Đề (Tag).
Mỗi thẻ Q&A hỗ trợ 3 tab phụ chuyên sâu:
- **📖 Lý Thuyết:** Giải thích nguyên lý cốt lõi.
- **🔧 ECU/AUTOSAR Practice:** Cấu hình thực tế trên module hệ thống (MCAL, CanIf, CanSM, PduR...).
- **⚠️ Interview Trap:** Cạm bẫy câu hỏi thường gặp khi đi phỏng vấn.

---

## 4. Bản Đồ Mã Nguồn (Source Code Architecture)

* **Dòng 1 – 21**: Thẻ HTML Header, CDN scripts (Tailwind, Lucide), CSS animation tùy chỉnh.
* **Dòng 22 – 47**: Wrapper Container, Header và thanh điều hướng 3 Tabs (`#btn-tab-frame`, `#btn-tab-compare`, `#btn-tab-interview`). Thiết kế theme màu **Amber/Orange**.
* **Dòng 48 – 113**: Cụm giao diện Tab 1 (Sơ đồ Segment tương tác trực quan cấp độ bit).
* **Dòng 114 – 159**: Cụm giao diện Tab 2 (Bảng So Sánh Thế Hệ Giao Thức).
* **Dòng 160 – 218**: Cụm giao diện Tab 3 (Ngân hàng câu hỏi phỏng vấn) chứa hệ thống các nút lọc khó/dễ, lọc tags và `div#qa-container` để render danh sách câu hỏi động, cùng với `div#qa-empty-state`, `div#qa-wip-state` hiển thị khi không có dữ liệu phù hợp.
* **Dòng 219 – 545**: JavaScript logic điều khiển:
  - `qaData`: Mảng Object đóng vai trò là Data Layer chứa nội dung các câu hỏi Q&A.
  - `renderQACards()`, `toggleAnswer()`, `switchQATab()`, `applyFilters()`, `filterByDifficulty()`, `filterByTag()`, `resetFilters()`, `updateFilterUI()`: Đóng vai trò là UI Engine (Data-driven) xử lý lọc, tương tác mở đóng các tab Q&A.
  - Khai báo hằng số `segmentData` chứa thông tin giải thích chuyên sâu của Tab 1.
  - Hàm `switchTab(targetId)`: Chuyển đổi 3 tabs chính mượt mà.
  - Hàm `selectSegment(segmentId)`: Thay đổi nội dung giải thích động với hiệu ứng fade (Tab 1).
  - Sự kiện `DOMContentLoaded` đính kèm event listener khởi tạo hiển thị ban đầu.

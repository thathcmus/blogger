# Đặc Tả Kỹ Thuật Hiện Trạng: CAN FD Protocol Explorer (Current Info)

* **Tên file nguồn**: [`widget_can_fd.html`](../../widget_can_fd.html)
* **Phiên bản hiện tại**: `v1.1.0` (Cập nhật Q&A Cluster 1 & 2, Kiến trúc 4 tầng & Bẫy kép Double-Angle, Hỗ trợ Song ngữ VN/EN)
* **Ngày cập nhật**: `2026-10-08`
* **Mục đích**: Widget tương tác trực quan hóa kiến thức giao thức mạng ô tô CAN FD, phân tích cấu trúc Frame ở cấp độ Bit, cơ chế BRS (Bit Rate Switch), bảng so sánh Classic CAN / CAN FD / CAN XL, và hệ thống ngân hàng câu hỏi ôn luyện phỏng vấn ECU/AUTOSAR chuyên sâu. Phục vụ nhúng vào bài viết Google Blogger hoặc học tập độc lập.

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

### Header & Điều Khiển Song Ngữ (Bilingual Toggle)
- Nút bấm góc trên bên phải cho phép chuyển đổi ngôn ngữ linh hoạt giữa 🇻🇳 **Tiếng Việt** và 🇬🇧 **English**.
- Cơ chế State Preservation: Giữ nguyên trạng thái Tab đang mở, câu hỏi đang expand và vị trí sub-tab khi đổi ngôn ngữ.

### Tab 1: Cấu Trúc Khung Truyền CAN FD (Base Frame Format)
Cung cấp bản đồ tương tác bit-level của frame CAN FD:
- **Arbitration Phase (Nominal Bit Rate)**: SOF, 11-bit ID, RRS (thay thế RTR), IDE. Truyền ở tốc độ nền (chậm) để phân xử an toàn.
- **Control Field**: FDF (Flexible Data Rate), res, **BRS (Bit Rate Switch)**, ESI, DLC (4-bit phi tuyến tính đến 64 bytes).
- **Data Phase (High Bit Rate)**: Chứa Payload từ 0 đến 64 Bytes. Đoạn này tăng tốc độ nhờ cờ BRS.
- **CRC Field**: SBC (Stuff Bit Count mới của CAN FD), CRC (17-bit cho &le; 16 bytes / 21-bit cho &gt; 16 bytes), CRC Delimiter (Mốc giảm tốc độ về lại Nominal).
- **ACK & EOF**: Xác nhận và kết thúc khung, truyền ở tốc độ Nominal.

### Tab 2: So Sánh Thế Hệ (Classic CAN vs CAN FD vs CAN XL)
Bảng đối chiếu 4 chiều (Max Payload, Max Data Rate, Cơ chế Baudrate, Ứng dụng thực tế ô tô). Nhấn mạnh sự đột phá của CAN FD (64B, Dual Bit Rate 8Mbps).

### Tab 3: Q&A Phỏng Vấn (Ngân Hàng Câu Hỏi 4 Tầng & Bẫy Kép)
Ngân hàng câu hỏi dạng thẻ Accordion tương tác với bộ lọc theo **Độ Khó** (Basic, Intermediate, Advanced, Senior) và **Chủ Đề (Tags)**.
Mỗi thẻ câu hỏi được cấu trúc chặt chẽ theo **4 tầng nội dung chuẩn mực**:
1. **📖 Lý Thuyết (Theory)**: Bản chất vật lý, giao thức theo chuẩn ISO 11898-1:2015.
2. **🖥️ SystemC/C++ Modeling**: Thiết kế kiến trúc mô phỏng, registers, FSM, TLM, resolution functions và C++ idioms.
3. **🔧 ECU/AUTOSAR Practice**: Cấu hình stack BSW thực tế (CanIf, CanSM, PduR, MCAL) và xử lý ngắt MCU.
4. **⚠️ Interview Trap (Bẫy Kép Double-Angle)**:
   - 🚗 **Góc độ Automotive / Protocol:** Bẫy về starvation, bus load, timing, hardware constraints.
   - 💻 **Góc độ C++ / Modeling Follow-up:** Bẫy vặn lại khi ứng viên đề cập đến C++/SystemC (race condition, delta cycle, bitfield endianness, cache locality, lock contention).

---

## 4. Bản Đồ Mã Nguồn (Source Code Architecture)

* **Dòng 1 – 25**: HTML Head, CDN scripts (Tailwind, Lucide), cấu hình CSS animation (`fadeIn`, `no-scrollbar`).
* **Dòng 26 – 48**: Root container `#canfd-explorer-root`, Header và nút chuyển đổi ngôn ngữ song ngữ (`#lang-indicator`). Theme màu chủ đạo: **Amber/Orange**.
* **Dòng 49 – 65**: Thanh điều hướng 3 Tabs chính (`#btn-tab-frame`, `#btn-tab-compare`, `#btn-tab-interview`).
* **Dòng 66 – 130**: Cụm giao diện Tab 1 (Sơ đồ Segment tương tác trực quan cấp độ bit và box giải thích động `#segment-desc-card`).
* **Dòng 131 – 180**: Cụm giao diện Tab 2 (Bảng So Sánh Thế Hệ Giao Thức).
* **Dòng 181 – 240**: Cụm giao diện Tab 3 (Ngân hàng câu hỏi Q&A) chứa hệ thống các nút lọc khó/dễ, lọc tags và `div#qa-container` để render danh sách thẻ Q&A động.
* **Dòng 241 – 325**: Dictionary `i18n` hỗ trợ đa ngôn ngữ cho toàn bộ các nhãn hiển thị trong widget (tiếng Việt và tiếng Anh).
* **Dòng 326 – 445**: Data Layer `qaData`: Mảng Object song ngữ (vi/en) chứa dữ liệu đầy đủ 4 tầng của từng câu hỏi.
* **Dòng 446 – 640**: UI Engine xử lý Accordion Q&A (`renderQACards()`, `toggleAnswer()`, `switchQATab()`, `applyFilters()`, `applyI18n()`, `toggleLang()`).
* **Dòng 641 – 810**: Data & Handler cho Tab 1 & Tab 2 (`segmentData`, `switchTab()`, `selectSegment()`).
* **Dòng 811 – 885**: Sự kiện `DOMContentLoaded`, gắn listeners khởi tạo an toàn và fallback Lucide icons.

---

## 5. Tài Liệu Liên Quan & Kế Hoạch Bảo Trì

- **Kế hoạch bảo trì chi tiết & Ground Truth**: [`MAINTENANCE_PLAN.md`](MAINTENANCE_PLAN.md) — Tài liệu theo dõi tiến độ 60 ngày (20 Items) và lưu trữ toàn bộ nội dung Q&A gốc.
- **Backlog tính năng tổng thể**: [`BACKLOG.md`](BACKLOG.md) — Danh sách tính năng mở rộng dài hạn (Calculator, Waveform Simulator...).

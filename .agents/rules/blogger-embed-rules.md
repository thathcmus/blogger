# Quy Tắc Phát Triển Widget Nhúng Google Blogger (Blogger Embed Rules)

Tài liệu này định nghĩa các quy tắc kỹ thuật và tiêu chuẩn thiết kế bắt buộc khi xây dựng hoặc chỉnh sửa bất kỳ widget HTML/CSS/JS nào trong repository này để nhúng vào Google Blogger (Blogspot) hoặc các nền tảng CMS tương tự.

---

## 1. Triết Lý Thiết Kế Cốt Lõi (Core Principles)

1. **Zero-Build & Self-Contained**:
   - Widget phải chạy trực tiếp dưới dạng một file HTML độc lập mà không yêu cầu bước build (Webpack, Vite, npm compile).
   - Toàn bộ HTML, CSS nội bộ và JavaScript điều khiển phải nằm trong cùng một file (hoặc sẵn sàng copy-paste vào Blogger HTML Editor).
2. **Không Framework Cồng Kềnh (Vanilla JavaScript First)**:
   - Sử dụng HTML5 thuần và Vanilla JavaScript (ES6+).
   - Không nhúng React, Vue, Angular hay jQuery runtime nặng nề làm chậm tốc độ tải trang của blog.
3. **Thẩm Mỹ Đẳng Cấp (Rich & Premium Aesthetics)**:
   - Phối màu hiện đại (Tailwind palette: slate, indigo, emerald, amber, rose).
   - Bo góc mềm mại (`rounded-xl`, `rounded-2xl`), đổ bóng chiều sâu (`shadow-sm`, `shadow-lg`, `ring-offset`).
   - Có micro-interactions (hover effect, scale transition, active highlight).

---

## 2. Quy Tắc Cô Lập & Tương Thích Nền Tảng (Isolation & Compatibility)

1. **Không Tác Động Toàn Cục Lên Theme Blogger**:
   - **Tuyệt đối không** override các thẻ cấp cao như `html`, `body` bằng các thuộc tính phá vỡ layout của Blogspot (ví dụ: `position: fixed`, `margin: 0 !important`, `overflow: hidden`).
   - Mọi nội dung của widget phải được bao bọc trong một root container có ID duy nhất (ví dụ: `#flexray-widget-root`).
2. **Tránh Xung Đột Thẻ Mẫu (Template XML) của Blogger**:
   - Không sử dụng các thẻ hoặc chuỗi ký tự trùng với cú pháp Blogger XML: `<b:...>`, `<data:...>`, `<expr:...>`.
   - Nếu viết biểu thức trong script, tránh đặt các ký tự `<` hoặc `&` không bọc cẩn thận gây lỗi XML parser của Blogger.
3. **An Toàn Cho Di Động (Mobile-Friendly & Responsive)**:
   - Tất cả bảng biểu, thanh tiến trình, biểu đồ phân bổ thời gian (như Communication Cycle) bắt buộc phải có thuộc tính cuộn ngang an toàn: `overflow-x-auto` và class ẩn thanh cuộn thô: `no-scrollbar`.
   - Không đặt chiều rộng cứng (`width: 1200px`); luôn sử dụng `max-w-5xl`, `w-full` và `min-w-[...]` cho các khối con cuộn được.

---

## 3. Quy Tắc Script & An Toàn Thực Thi (Fault-Tolerant JavaScript)

1. **Bắt Buộc Xử Lý Lỗi CDN (Safe CDN Loading)**:
   - Khi nhúng thư viện bên ngoài (ví dụ: Lucide Icons, Chart.js), **phải luôn bọc trong khối `try ... catch`**:
     ```javascript
     try {
         if (typeof lucide !== 'undefined') {
             lucide.createIcons();
         }
     } catch (err) {
         console.warn("Lucide icons failed to render, but core UI still works:", err);
     }
     ```
   - **Lý do**: Tại một số quốc gia hoặc mạng cơ quan/trường học, các CDN như `unpkg.com` hoặc `cdn.jsdelivr.net` có thể bị chặn hoặc tải chậm. Lỗi tải icon không bao giờ được làm đứng logic bấm nút/chuyển tab của widget!
2. **Tách Biệt Tuyệt Đối Logic Core Khỏi CDN**:
   - Gắn sự kiện `addEventListener` cho các tab, nút bấm trước.
   - Chỉ gọi render icon/thư viện phụ trợ sau khi logic cốt lõi đã sẵn sàng.
3. **Không Ô Nhiễm Biến Toàn Cục (No Global Namespace Pollution)**:
   - Các biến dữ liệu (như `frameData`) hoặc hàm điều khiển nên được đóng gói gọn gàng hoặc bọc trong phạm vi xác định, tránh xung đột với các script khác đang chạy trên trang blog của người dùng.

---

## 4. Quy Tắc Độ Chính Xác Kỹ Thuật (Domain Knowledge Integrity)

1. **Tuân Thủ Chuẩn Quốc Tế (Industry Standards)**:
   - Đối với các widget về giao thức ô tô (FlexRay, CAN, LIN, Ethernet), các khái niệm phải đối chiếu chính xác với tài liệu chuẩn (ISO 17458 cho FlexRay, ISO 11898 cho CAN, AUTOSAR Classic/Adaptive).
   - Không được đơn giản hóa sai bản chất (ví dụ: nhầm lẫn giữa Wakeup WUP và Startup CAS/Startup Frame; bỏ qua tính chất Active-Low của bit cờ).
2. **Tính Trong Suốt Khi Nhúng**:
   - Mọi widget phải có file tài liệu hiện trạng tương ứng đặt tại `docs/<widget_name>/CURRENT_INFO.md` để người quản trị blog hoặc AI có thể đọc hiểu trong 30 giây.

3. **Tiêu Chuẩn 4 Tầng Nội Dung & Bẫy Kép (Double-Angle Interview Trap)**:
   - Mọi Q&A item trong các visualizer phỏng vấn kỹ thuật (CAN FD, FlexRay, C++...) bắt buộc phải có đủ 4 tầng nội dung:
     - 📖 **Theory**: Chuẩn quốc tế (ISO, AUTOSAR, Protocol Spec).
     - 🖥️ **SystemC/C++ Modeling**: Thiết kế kiến trúc mô phỏng, registers, FSM, TLM-2.0 / bit-accurate logic trong C++/SystemC.
     - 🔧 **ECU/AUTOSAR Practice**: Cấu hình stack BSW thực tế (CanIf, PduR, CanSM, MCAL) hoặc thanh ghi MCU.
     - ⚠️ **Interview Trap**: Bắt buộc triển khai **2 góc nhìn phản biện song song**:
       - 🚗 **Góc độ Automotive / Protocol Trap:** Câu hỏi bẫy về timing, starvation, bus load, hardware limits, AUTOSAR DET/Dem.
       - 💻 **Góc độ C++ / Modeling Follow-up:** Câu hỏi vặn lại khi ứng viên đề cập đến C++/SystemC (về race conditions, delta cycles, resolution functions, bitfield memory layout/endianness, cache locality, exception vs state transition...).
   - Toàn bộ nội dung hoàn chỉnh phải được đồng bộ lưu trong `MAINTENANCE_PLAN.md` làm **Single Source of Truth** trước và song hành với mã nguồn HTML.

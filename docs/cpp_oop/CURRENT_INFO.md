# Đặc Tả Kỹ Thuật Hiện Trạng: C++ OOP Simulator (Current Info)

* **Tên file nguồn**: [`widget_cpp_oop.html`](../../widget_cpp_oop.html)
* **Phiên bản hiện tại**: `v1.0.0` (Mô phỏng tương tác 4 trụ cột OOP qua góc nhìn Embedded Systems: Encapsulation, Inheritance, Polymorphism, Abstraction; tổng cộng 513 dòng code)
* **Ngày cập nhật**: `2026-10-17`
* **Mục đích**: Widget tương tác trực quan hóa 4 tính chất lập trình hướng đối tượng C++ (OOP) dành cho Embedded Engineer, phục vụ nhúng vào bài viết Google Blogger hoặc xem độc lập qua GitHub Pages.

---

## 1. Cách Nhúng Vào Google Blogger

**Nhúng Iframe qua GitHub Pages (Khuyên dùng):**
```html
<div style="width: 100%; margin: 24px auto; text-align: center;">
    <iframe src="https://thathcmus.github.io/blogger/widget_cpp_oop.html" 
            width="100%" 
            height="800px" 
            style="border: none; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden;" 
            title="C++ OOP Simulator cho Embedded Engineer"
            loading="lazy">
    </iframe>
</div>
```

---

## 2. Thư Viện Phụ Thuộc (External Dependencies)

| Thư viện | Phiên bản | Nguồn CDN | Vai trò | Cơ chế An toàn (Fallback) |
| :--- | :--- | :--- | :--- | :--- |
| **Tailwind CSS** | v3.x | `https://cdn.tailwindcss.com` | Styling toàn bộ giao diện dark theme | Không gây crash nếu mất mạng, các thẻ vẫn giữ layout block |
| **Lucide Icons** | Latest | `https://unpkg.com/lucide@latest` | Icon minh họa SVG | Có `try...catch` bọc hàm khởi tạo `lucide.createIcons()`, không làm đứng UI |

---

## 3. Kiến Trúc Chi Tiết Các Tab Giao Diện

### Tab 1: Đóng gói (Encapsulation)
Minh họa cơ chế bảo vệ dữ liệu nội bộ (thanh ghi ADC) khỏi việc bị sửa đổi tùy tiện từ bên ngoài:
- **Grid 2 cột**: Cột trái là `int main()` chứa 3 nút tương tác mô phỏng: truy cập trực tiếp `private` (lỗi biên dịch), gọi `public API readTemperature()` (thành công), và cập nhật môi trường. Cột phải hiển thị cấu trúc nội bộ `class TempSensor` với vùng `private` (biến `raw_ADC_register`) và vùng `public` (hàm `readTemperature()`).
- **Console Output**: Log kết quả tương tác (Error/Success) theo dạng terminal.
- **Insight Box**: Giải thích ẩn dụ "hộp đen & nút bấm" cho Embedded context.

### Tab 2: Kế thừa (Inheritance)
Minh họa cơ chế tái sử dụng mã nguồn giữa các lớp ngoại vi:
- **Class Hierarchy Tree**: Sơ đồ trực quan Base class `Peripheral` (chứa `isEnabled`, `baseAddress`, `powerOn()`) → 2 Derived classes `UART` (thêm `baudRate`, `setBaud()`) và `SPI` (thêm `isMaster`, `setClockPolarity()`).
- **Member Layout Panel**: Click vào class con để hiển thị các thành phần kế thừa từ Base + thành phần riêng của Derived.
- **Insight Box**: Nguyên tắc DRY (Don't Repeat Yourself) trong thiết kế driver ngoại vi.

### Tab 3: Đa hình (Polymorphism)
Minh họa cơ chế "Một giao diện, nhiều hành vi" thông qua Virtual Table:
- **Code Panel**: Hiển thị khai báo `Peripheral* ptr` và lệnh gọi `ptr->transmit(data)`.
- **3 nút chọn object**: `new I2C_Module()`, `new SPI_Module()`, `new FlexRay_Module()` — mỗi lần chọn sẽ thay đổi hành vi thực thi.
- **Nút Transmit**: Bấm `Thực thi ptr->transmit()` để xem Runtime dispatch.
- **Runtime Log**: Hiển thị hành vi khác nhau tùy object được gán (I2C: Start→Address→Data→Stop, SPI: CS Low→MOSI→MISO→CS High, FlexRay: Slot Assignment→Frame Pack→Bus Transmit).
- **Insight Box**: Giải thích VTABLE, loại bỏ switch-case khi thêm giao thức mới.

### Tab 4: Trừu tượng (Abstraction)
Minh họa cơ chế ẩn chi tiết cài đặt, chỉ bộc lộ giao diện sử dụng:
- **Interface Panel**: Hiển thị `CryptoEngine.encrypt(data)` và nút bấm `Gọi hàm Encrypt()`.
- **X-Ray Toggle**: Nút bật/tắt chế độ "X-Ray" để lộ chi tiết thuật toán AES-256 bên trong (7 bước: KeyExpansion → AddRoundKey → 13 vòng SubBytes/ShiftRows/MixColumns/AddRoundKey → Final Round).
- **Animation**: Khi bấm Encrypt, từng bước thuật toán sáng lên tuần tự, cipher text output thay đổi.
- **Insight Box**: Giải thích Abstract class định nghĩa "CÁI GÌ" (what), không quan tâm "THẾ NÀO" (how).

---

## 4. Bản Đồ Mã Nguồn (Source Code Architecture)

* **Dòng 1 – 24**: HTML Head, CDN scripts (Tailwind, Lucide), CSS keyframes (`fadeIn`, `no-scrollbar`, `custom-scrollbar`).
* **Dòng 25 – 53**: Root container `#cpp-oop-root`, Header gradient (blue→emerald), Navigation 4 Tabs (`#btn-tab-encap`, `#btn-tab-inherit`, `#btn-tab-poly`, `#btn-tab-abstract`).
* **Dòng 54 – 121**: Tab 1 Encapsulation: Grid 2 cột (User Code `int main()` với 3 nút tương tác + Console `#encap-logs` vs Object Internals `class TempSensor` hiển thị `private`/`public` sections, `#adc-value-display`).
* **Dòng 122 – 194**: Tab 2 Inheritance: Class hierarchy tree (`Peripheral` → `UART`/`SPI`), Member layout panel (`#inh-uart-detail`, `#inh-spi-detail`), mô tả DRY principle.
* **Dòng 195 – 240**: Tab 3 Polymorphism: `Peripheral* ptr` code panel, 3 nút chọn device (`#btn-poly-0/1/2`), nút `transmit()`, Runtime log `#poly-logs`.
* **Dòng 241 – 307**: Tab 4 Abstraction: Interface panel `CryptoEngine.encrypt()`, nút X-Ray toggle (`#abs-eye-icon`, `#abs-btn-text`), Complex internals AES-256 7-step animation (`#step-1` → `#step-7`), cipher output `#cipher-text`.
* **Dòng 308 – 512**: JavaScript logic:
  - Tab switching: `switchTab(tabId, btnElem)` với active/inactive class management.
  - Encapsulation handlers: `renderEncapLogs()`, `handlePrivateAccess()`, `handlePublicAccess()`, `handleModifyPublic()`.
  - Inheritance handler: `selectInheritClass(cls)` — toggle `#inh-uart-detail` / `#inh-spi-detail`.
  - Polymorphism dispatcher: `selectPolyDevice(idx)`, `transmitData()` — VTABLE-style dispatch.
  - Abstraction simulation: `toggleInternals()` (X-Ray mode), `handleEncrypt()` (AES step-by-step animation).
  - `DOMContentLoaded`: Gắn event listeners cho 4 tab buttons, gọi safe Lucide init.

(File tổng cộng 513 dòng, 100% comment Tiếng Anh, đạt chuẩn Verification Protocol `Syntax OK`).

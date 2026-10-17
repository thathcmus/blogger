# Kế Hoạch Cải Tiến & Yêu Cầu Thay Đổi: C++ OOP Simulator (Backlog)

Tài liệu này lưu trữ danh sách tính năng dự kiến, các yêu cầu kỹ thuật dài hạn cho widget [`widget_cpp_oop.html`](../../widget_cpp_oop.html).

---

## 1. Biểu Mẫu Chuẩn Đề Xuất Thay Đổi (Feature/Change Request Template)

Khi cần đề xuất tính năng mới hoặc cập nhật nội dung, vui lòng sử dụng biểu mẫu sau:

```markdown
### [CPP-XXX] <Tên Tính Năng Hoặc Yêu Cầu Thay Đổi>
- **Người đề xuất**: <Tên hoặc Agent>
- **Ngày tạo**: <YYYY-MM-DD>
- **Độ ưu tiên**: [Cao / Trung bình / Thấp]
- **Mục tiêu kỹ thuật**: <Mô tả lý do, đối chiếu chuẩn C++11/C++17/C++20>
- **Vị trí ảnh hưởng trong mã nguồn**:
  - [ ] Tab 1: Encapsulation (Đóng gói)
  - [ ] Tab 2: Inheritance (Kế thừa)
  - [ ] Tab 3: Polymorphism (Đa hình)
  - [ ] Tab 4: Abstraction (Trừu tượng)
  - [ ] JavaScript Logic / Data Model
  - [ ] CSS / Styling / Responsive
- **Tiêu chí nghiệm thu (Acceptance Criteria)**:
  - 1. <Tiêu chí 1>
  - 2. <Tiêu chí 2>
  - 3. Đã chạy kiểm tra cú pháp JS (Verification Protocol) thành công: `Syntax OK`.
```

---

## 2. Danh Sách Tính Năng Chờ Phát Triển (Backlog & Roadmap)

### [CPP-001] Hỗ Trợ Song Ngữ Việt - Anh (Bilingual Toggle Vi/En)
* **Độ ưu tiên**: Trung bình
* **Mục tiêu**: Bổ sung nút chuyển đổi ngôn ngữ, tách data layer song ngữ tương tự CAN FD widget. Phục vụ chia sẻ trên cộng đồng kỹ thuật quốc tế.
* **Vị trí ảnh hưởng**: JavaScript Data Model, tất cả các tab.

### [CPP-002] Chế Độ Sáng / Tối (Light Mode Toggle)
* **Độ ưu tiên**: Trung bình
* **Mục tiêu**: Widget hiện chỉ có dark mode (`bg-slate-900`). Cần thêm light mode toggle tương tự CAN FD widget (`darkMode: 'class'`), tự động nhận diện `prefers-color-scheme`.
* **Vị trí ảnh hưởng**: CSS Tailwind theme classes, JavaScript Theme Engine.

### [CPP-003] Memory Layout Visualization Nâng Cao
* **Độ ưu tiên**: Cao
* **Mục tiêu**: Hiển thị trực quan padding, alignment, `sizeof()` cho từng class theo chuẩn C++17. Minh họa sự khác biệt giữa `#pragma pack(1)` và alignment mặc định, ảnh hưởng đến hiệu năng cache line trên MCU ARM Cortex-M.
* **Vị trí ảnh hưởng**: Tab 2 Inheritance, có thể tạo sub-tab mới.

### [CPP-004] Tab 5: RAII & Smart Pointers cho Embedded
* **Độ ưu tiên**: Thấp
* **Mục tiêu**: Mở rộng thêm tính năng RAII pattern: `unique_ptr` quản lý peripheral handle, `shared_ptr` cho shared resource (DMA buffer), custom deleter cho hardware deallocation.
* **Vị trí ảnh hưởng**: Thêm tab mới, JavaScript logic.

### [CPP-005] VTABLE Deep-Dive Visualization
* **Độ ưu tiên**: Trung bình
* **Mục tiêu**: Hiển thị bảng Virtual Table đầy đủ với vtable pointer (`vptr`), function pointer array, dynamic dispatch path. Minh họa vấn đề performance overhead khi dùng `virtual` trên MCU resource-constrained.
* **Vị trí ảnh hưởng**: Tab 3 Polymorphism.

---

## 3. Lịch Sử Các Yêu Cầu Đã Hoàn Thành (Done)

* [x] **[CPP-000] Phát hành v1.0.0** *(Hoàn thành: 2026-10-17)*
  - Mô phỏng tương tác 4 trụ cột OOP: Encapsulation (TempSensor ADC), Inheritance (Peripheral→UART/SPI), Polymorphism (VTABLE dispatch I2C/SPI/FlexRay), Abstraction (AES-256 interface).
  - Giao diện dark theme premium, Tailwind CSS, Lucide icons.
  - Fault-tolerant CDN loading với `try...catch`.
  - Root container cô lập `#cpp-oop-root` sẵn sàng nhúng Blogger.

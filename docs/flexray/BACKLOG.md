# Kế Hoạch Cải Tiến & Yêu Cầu Thay Đổi: FlexRay Protocol Explorer (Backlog)

Tài liệu này lưu trữ danh sách các tính năng dự kiến nâng cấp, các vấn đề kỹ thuật cần cải tiến, và cung cấp biểu mẫu chuẩn để tạo một yêu cầu thay đổi mới cho widget [`FLEXRAY_overview.html`](../../FLEXRAY_overview.html).

---

## 1. Biểu Mẫu Chuẩn Đề Xuất Thay Đổi (Feature/Change Request Template)

Khi cần yêu cầu thêm tính năng mới hoặc sửa đổi nội dung, vui lòng sử dụng biểu mẫu sau:

```markdown
### [FR-XXX] <Tên Tính Năng Hoặc Yêu Cầu Thay Đổi>
- **Người đề xuất**: <Tên hoặc Agent>
- **Ngày tạo**: <YYYY-MM-DD>
- **Độ ưu tiên**: [Cao / Trung bình / Thấp]
- **Mục tiêu kỹ thuật**: <Mô tả lý do tại sao cần làm điều này, đối chiếu chuẩn kỹ thuật nào>
- **Vị trí ảnh hưởng trong mã nguồn**:
  - [ ] Tab 1: Cấu trúc Frame
  - [ ] Tab 2: Quản lý Data tại Node
  - [ ] Tab 3: Giao tiếp Mạng & Chu kỳ
  - [ ] JavaScript Data Model / Logic điều khiển
  - [ ] CSS / Styling / Responsive
- **Tiêu chí nghiệm thu (Acceptance Criteria)**:
  - 1. <Tiêu chí 1>
  - 2. <Tiêu chí 2>
  - 3. Đã chạy kiểm tra cú pháp JS thành công không có lỗi console.
```

---

## 2. Danh Sách Tính Năng Chờ Phát Triển (Backlog & Roadmap)

### [FR-001] Mô Phỏng Chạy Chu Kỳ Tương Tác (Interactive Communication Cycle Simulator)
* **Độ ưu tiên**: Cao
* **Mục tiêu**: Người dùng có thể bấm nút `[Play Cycle]`, một con trỏ quét thời gian sẽ chạy từ trái sang phải trên sơ đồ chu kỳ (quét qua Slot 1 Startup $\rightarrow$ Slot 2 Data $\rightarrow$ Slot 3 Null $\rightarrow$ Slot 4 Sync $\rightarrow$ Dynamic Minislots $\rightarrow$ Symbol Window $\rightarrow$ NIT) kèm theo mô tả hành vi của các ECU tại thời điểm đó.
* **Vị trí ảnh hưởng**: Tab 3 (`#tab-network`), bổ sung animation tiến trình và nút điều khiển `Play / Pause / Step`.

### [FR-002] Nút Chuyển Đổi Song Ngữ Việt - Anh (Bilingual Toggle Vi/En)
* **Độ ưu tiên**: Trung bình
* **Mục tiêu**: Bổ sung nút chuyển đổi ngôn ngữ ở góc trên bên phải để người đọc quốc tế có thể đọc bằng tiếng Anh, phục vụ việc chia sẻ trên LinkedIn, Medium hoặc các cộng đồng kỹ thuật toàn cầu.
* **Vị trí ảnh hưởng**: JavaScript Data Model (tách `frameData_vi` và `frameData_en`).

### [FR-003] Bộ Tính Thử CRC Mini (Interactive CRC Playground)
* **Độ ưu tiên**: Trung bình
* **Mục tiêu**: Cho phép người học nhập vào Frame ID, Payload Length, chọn trạng thái Sync/Startup bit để widget tính toán trực tiếp ra chuỗi 11-bit Header CRC theo đa thức $0\text{x}385$, giúp người đọc nắm vững thuật toán.
* **Vị trí ảnh hưởng**: Tab 1, thêm một modal hoặc card nhỏ bên dưới Header CRC subfield.

### [FR-004] Hỗ Trợ Chế Độ Sáng / Tối (Dark Mode Toggle)
* **Độ ưu tiên**: Thấp
* **Mục tiêu**: Tự động nhận diện `prefers-color-scheme: dark` hoặc cung cấp nút bật/tắt dark mode để phù hợp hoàn hảo với giao diện blog tối màu.
* **Vị trí ảnh hưởng**: CSS Tailwind theme classes.

---

## 3. Lịch Sử Các Yêu Cầu Đã Hoàn Thành (Done)

* [x] **[FR-000] Chuẩn hóa theo FlexRay Specification v3.0.1 & ISO 17458:2013** *(Hoàn thành: 2026-10-07)*
  - Đính chính phân biệt Wakeup (WUP) và Startup (CAS + Startup Frame).
  - Làm rõ đặc tính Active-Low của bit Null Frame Indicator (`0` = Null frame).
  - Làm rõ Header CRC 11-bit chỉ tính trên 20 bits cố định.
  - Thêm phần kiến trúc Kênh đôi Dual-Channel (Kênh A & B) cho Redundancy vs High Bandwidth.
  - Bổ sung cơ chế Shadow Buffers (Double Buffering) và Receive FIFO Buffers.
  - Gắn nhãn `SW` (Symbol Window) rõ ràng cho khối màu vàng trong sơ đồ chu kỳ.

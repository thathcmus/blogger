# Kế Hoạch Cải Tiến & Yêu Cầu Thay Đổi: CAN FD Widget (Backlog)

Tài liệu này lưu trữ danh sách tính năng dự kiến, các yêu cầu kỹ thuật dài hạn và đóng vai trò kết nối với kế hoạch bảo trì chạy nước rút 60 ngày tại [`MAINTENANCE_PLAN.md`](MAINTENANCE_PLAN.md).

---

## 1. Biểu Mẫu Chuẩn Đề Xuất Thay Đổi (Feature/Change Request Template)

Khi cần đề xuất tính năng mới hoặc cập nhật nội dung Q&A, vui lòng sử dụng biểu mẫu sau:

```markdown
### [CANFD-XXX] <Tên Tính Năng Hoặc Yêu Cầu Thay Đổi>
- **Người đề xuất**: <Tên hoặc Agent>
- **Ngày tạo**: <YYYY-MM-DD>
- **Độ ưu tiên**: [Cao / Trung bình / Thấp]
- **Mục tiêu kỹ thuật**: <Mô tả lý do tại sao cần làm điều này, đối chiếu chuẩn ISO 11898-1:2015 / AUTOSAR>
- **Vị trí ảnh hưởng trong mã nguồn**:
  - [ ] Tab 1: Cấu trúc Frame & Segment Explorer
  - [ ] Tab 2: So Sánh Thế Hệ (Classic CAN / CAN FD / CAN XL)
  - [ ] Tab 3: Ngân Hàng Câu Hỏi Q&A (Accordion Data Layer)
  - [ ] UI Engine / Bộ lọc Difficulty & Tags / i18n
- **Tiêu chí nghiệm thu (Acceptance Criteria)**:
  - 1. Đủ 4 tầng: Theory → SystemC/C++ Modeling → ECU/AUTOSAR Practice → Double-Angle Trap.
  - 2. Hỗ trợ song ngữ đầy đủ (vi / en).
  - 3. Đã chạy kiểm tra cú pháp JS (Verification Protocol) thành công: `Syntax OK`.
```

---

## 2. Kế Hoạch Triển Khai Hoạt Động (Active Roadmap)

> 🚀 **Kế hoạch thực thi chi tiết 60 ngày (20 Items)** được theo dõi trực tiếp tại:  
> 👉 [`docs/can_fd/MAINTENANCE_PLAN.md`](MAINTENANCE_PLAN.md) *(Single Source of Truth)*

### Tóm tắt các giai đoạn chính:
- [x] **Phase 1 (Ngày 1–3):** Xây Accordion Q&A UI Component & Hệ thống Song ngữ VN/EN *(Hoàn thành)*.
- [ ] **Phase 2 (Ngày 4–30):** 9 Cụm Q&A CAN FD Core & AUTOSAR Stack *(Đang thực hiện: Đã xong Item 2, 3; Đang làm Item 4)*.
- [ ] **Phase 3 (Ngày 31–48):** 6 Cụm Q&A Physical Layer, Chẩn đoán UDS, SecOC & Safety ISO 26262.
- [ ] **Phase 4 (Ngày 49–57):** Bộ công cụ tương tác nâng cao:
  - [ ] **Item 17:** Công cụ tính toán Frame Duration & Bus Load% (CAN FD Calculator).
  - [ ] **Item 18:** Trace View giải mã Hex dump thành Physical Signals.
  - [ ] **Item 19:** Interactive Animation mô phỏng luồng bit & cơ chế chuyển đổi Baudrate của cờ BRS.
- [ ] **Phase 5 (Ngày 58–60):** Kiểm thử Responsive đa nền tảng, hoàn thiện tài liệu và phát hành chính thức bản `v1.2.0`.

---

## 3. Các Đề Xuất Chờ Phê Duyệt (Backlog Pool)

- [ ] **[CANFD-001] Chế độ tối (Dark Mode Theme):** Tự động nhận diện theme hệ thống hoặc thêm toggle Dark Mode cho widget.
- [ ] **[CANFD-002] Tích hợp bộ giả lập Oscilloscope (Signal Waveform):** Vẽ dạng sóng điện áp vi sai CAN_H / CAN_L khi chuyển đổi giữa Arbitration Phase và Data Phase để trực quan hóa hiệu ứng dội tín hiệu (Ringing).

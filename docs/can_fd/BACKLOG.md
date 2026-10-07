# Backlog & Kế Hoạch Nâng Cấp: CAN FD Widget

### Phiên Bản Kế Tiếp (v1.1.x)
- [ ] **Bổ sung Ngân hàng câu hỏi phỏng vấn CAN FD (Tab 3)**. Các chủ đề bao gồm:
  - Bài toán tính toán Bus Load thực tế trên mạng CAN FD.
  - Giải thích sâu về cơ chế Stuffing (Stuff Bits và Stuff Count) trong CAN FD.
  - Phân tích cơ chế Error Handling (Error Active, Error Passive, Bus Off).
  - Khác biệt giữa CAN FD Base (11-bit) và CAN FD Extended (29-bit).
  - Bài toán nâng cấp: Làm sao để tích hợp node CAN FD vào hệ thống CAN 2.0 hiện hữu.

- [ ] **Bổ sung chức năng Calculator (Công Cụ Tính Toán)**:
  - Người dùng nhập số bytes Payload (Ví dụ: 64 Bytes).
  - Chọn tốc độ Nominal (Ví dụ: 500 kbps) và Data Bit Rate (Ví dụ: 2 Mbps).
  - -> Tool tự động tính ra tổng thời gian truyền (Frame duration) của frame đó ra micro-seconds (&mu;s).

### Các Yêu Cầu Chờ Phê Duyệt (Backlog Pool)
- [ ] Thêm animation luồng bit (các chấm bi chạy dọc theo frame) mô phỏng vận tốc: chạy nhanh vút qua ở vùng Data phase (màu xanh lá) và chạy chậm ở hai đầu Arbitration và ACK. Giúp trực quan hóa hoàn toàn sức mạnh của bit cờ BRS.

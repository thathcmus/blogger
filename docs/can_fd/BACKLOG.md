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
- [ ] **Phase 2 (Ngày 4–30):** 9 Cụm Q&A CAN FD Core & AUTOSAR Stack *(Đang thực hiện: Đã xong Item 2, 3; Đang làm Item 4; Tích hợp kèm Interactive Micro-Lab ở Item 5, 6, 7-8)*.
- [ ] **Phase 3 (Ngày 31–48):** 6 Cụm Q&A Physical Layer, Chẩn đoán UDS, SecOC & Safety ISO 26262.
- [ ] **Phase 4 (Ngày 49–57):** Bộ công cụ tương tác & Minigame nâng cao:
  - [ ] **Item 17:** Công cụ tính toán Frame Duration & Bus Load% (CAN FD Calculator).
  - [ ] **Item 18:** Live DBC Signal Decoder & Ma trận 64-Byte Payload (Intel vs Motorola).
  - [ ] **Item 19:** Minigame Thợ Săn Lỗi Xung Sóng (Oscilloscope Glitch Hunter).
- [ ] **Phase 5 (Ngày 58–60):** Kiểm thử Responsive đa nền tảng, hoàn thiện tài liệu và phát hành chính thức bản `v2.0.0`.

---

## 3. Các Đề Xuất Chờ Phê Duyệt (Backlog Pool)

- [x] **[CANFD-001] Chế độ tối (Dark Mode Theme):** Tự động nhận diện theme hệ thống (`prefers-color-scheme`) kết hợp toggle nút bấm Sun/Moon, lưu `localStorage` (`canfd_theme`), hỗ trợ chuẩn màu Dark Palette cho toàn bộ 3 tab, modal và thảo luận Firestore *(Hoàn thành ở v1.4.0)*.
- [x] **[CANFD-003] Cổng Khám Phá Mở Màn (Landing Portal Hub with 3D Tilt Cards):** Xây dựng trang mở màn Landing Portal Hub với 3 thẻ xếp dọc tương tác 3D Tilt theo con trỏ chuột, vệt sáng Glare, visual đồ họa trực quan (Oscilloscope waveform, Benchmark speedometer, Microchip ECU) và điều hướng mượt vào từng tab *(Hoàn thành ở v1.5.0)*.
- [ ] **[CANFD-002] Tích hợp bộ giả lập Oscilloscope (Signal Waveform):** Vẽ dạng sóng điện áp vi sai CAN_H / CAN_L khi chuyển đổi giữa Arbitration Phase và Data Phase để trực quan hóa hiệu ứng dội tín hiệu (Ringing).
- [ ] **[CANFD-004] Bộ Giả Lập Xử Lý Lỗi & Máy Trạng Thái Bus Off (Fault Confinement Simulator):**
  - Bảng điều khiển kích hoạt lỗi (Bit Error, Stuff Error, CRC Error, ACK Error).
  - 2 đồng hồ đo điện tử `TEC` và `REC` nhảy số thực tế (+8 / -1).
  - Máy trạng thái FSM 3 nút phát sáng (Error Active $\rightarrow$ Error Passive $\rightarrow$ Bus Off) kèm cơ chế đếm lùi 128x11 recessive bits tự phục hồi. *(Dự kiến tích hợp vào Item 6)*.
- [ ] **[CANFD-005] Bộ Thí Nghiệm Bit Timing & Sample Point / TDCO (Interactive Sample Point Playground):**
  - Sliders chỉnh tần số dao động thạch anh MCU, Prescaler, Prop_Seg, Phase_Seg1/2, SJW.
  - Vẽ động 1 bit chia nhỏ thành các Time Quanta (TQ) và vạch laser báo vị trí Sample Point % (cảnh báo khi lệch ngoài khoảng $75\% - 85\%$).
  - Hiển thị mốc Secondary Sample Point khi kích hoạt bù trễ TDC Offset. *(Dự kiến tích hợp vào Item 5)*.
- [ ] **[CANFD-006] Trình Giải Mã Tín Hiệu DBC Thực & Ma Trận 64B Payload (Live DBC Signal Decoder):**
  - Thanh trượt điều khiển: Tốc độ xe (0–250 km/h), Vòng tua máy (0–8000 RPM), Góc lái (-540° đến +540°), Vị trí số (P, R, N, D).
  - Đổi màu và chớp sáng trực tiếp các byte/bit trong ma trận 64-byte Payload của CAN FD.
  - Nút gạt chuyển đổi tức thì giữa định dạng Intel (Little-Endian) và Motorola (Big-Endian). *(Dự kiến tích hợp vào Item 18)*.
- [ ] **[CANFD-007] Minigame Thử Thách "Thợ Săn Lỗi Xung Sóng" (Oscilloscope Glitch Hunter):**
  - 5 kịch bản lỗi xung sóng thực tế (thiếu trở 120Ω, mất ACK, lệch sample point, trễ TDC...).
  - Độc giả click trực tiếp vào dạng sóng để bắt lỗi; chấm điểm, cấp huy hiệu kỹ sư ô tô. *(Dự kiến tích hợp vào Item 19)*.
- [ ] **[CANFD-008] Sơ Đồ Xuyên Thấu Luồng Dữ Liệu AUTOSAR (AUTOSAR Data Flow Journey):**
  - Trực quan hóa gói tin (Packet Orb) bay qua từng tầng `SW-C` $\rightarrow$ `RTE` $\rightarrow$ `COM` $\rightarrow$ `PduR` $\rightarrow$ `CanIf` $\rightarrow$ `Driver` $\rightarrow$ `Cáp CAN`, bóc tách header tại từng tầng. *(Dự kiến tích hợp vào Item 7 & 8)*.
- [ ] **[CANFD-009] m Thanh Kỹ Thuật Số Giả Lập Thiết Bị Lab (Web Audio FX):**
  - Sử dụng Web Audio API thuần (0KB tải ngoài) tạo hiệu ứng âm thanh vi mô (micro-tones): xung nhịp thấp ở Arbitration, vút cao ở Data Phase, âm báo chirp khi phát hiện lỗi bus, kèm nút Mute trên Header.

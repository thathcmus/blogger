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
- [ ] **[CANFD-002/007] Phòng Thí Nghiệm Chẩn Đoán Lỗi Xung Sóng Thực Tế (Interactive Fault Diagnosis Lab):**
  - Gộp từ đề xuất Oscilloscope (`CANFD-002`) và Glitch Hunter (`CANFD-007`). Cắt bỏ thành phần gamification (điểm số, huy hiệu) để tối ưu Signal-to-Bloat ratio (tiết kiệm ~600 dòng code).
  - Tích hợp 5 kịch bản lỗi xung sóng thực tế (thiếu trở đầu cuối 120Ω, mất ACK bit, lệch sample point, trễ TDC, dội tín hiệu quá mức). Bấm trực tiếp vào vùng sóng bất thường để hiển thị popup giải thích cơ chế vật lý.
- [ ] **[CANFD-004] Bộ Giả Lập Xử Lý Lỗi & Máy Trạng Thái Bus Off (Fault Confinement Simulator):**
  - Bảng điều khiển kích hoạt lỗi (Bit Error, Stuff Error, CRC Error, ACK Error).
  - 2 đồng hồ đo điện tử `TEC` và `REC` nhảy số thực tế (+8 / -1), cờ trạng thái `ESI` (0: Error Active, 1: Error Passive).
  - Máy trạng thái FSM 3 nút phát sáng (Error Active $\rightarrow$ Error Passive $\rightarrow$ Bus Off) kèm cơ chế đếm lùi 128x11 recessive bits tự phục hồi. *(Dự kiến tích hợp Inline Micro-Lab vào Item 6)*.
- [ ] **[CANFD-005] Bộ Thí Nghiệm Bit Timing & Sample Point / TDCO (Interactive Sample Point Playground):**
  - Sliders chỉnh tần số dao động thạch anh MCU, Prescaler, Prop_Seg, Phase_Seg1/2, SJW.
  - Vẽ động 1 bit chia nhỏ thành các Time Quanta (TQ) và vạch laser báo vị trí Sample Point % (cảnh báo khi lệch ngoài khoảng $75\% - 85\%$).
  - Hiển thị mốc Secondary Sample Point (SSP) khi kích hoạt bù trễ TDC Offset. *(Dự kiến tích hợp Inline Micro-Lab vào Item 5)*.
- [ ] **[CANFD-006] Trình Giải Mã Tín Hiệu DBC Thực & Ma Trận 64B Payload (Live DBC Signal Decoder):**
  - Thanh trượt điều khiển: Tốc độ xe (0–250 km/h), Vòng tua máy (0–8000 RPM), Góc lái (-540° đến +540°), Vị trí số (P, R, N, D).
  - Đổi màu và chớp sáng trực tiếp các byte/bit trong ma trận 64-byte Payload của CAN FD.
  - Nút gạt chuyển đổi tức thì giữa định dạng Intel (Little-Endian) và Motorola (Big-Endian).
  - *Tối ưu UX Mobile (theo Argon 4)*: Hiển thị cửa sổ trượt 8-byte (Windowed view) hoặc gom nhóm theo Word 32-bit thay vì render 512 ô DOM gây vỡ layout 375px. *(Dự kiến tích hợp vào Item 18)*.
- [ ] **[CANFD-008] Sơ Đồ Xuyên Thấu Luồng Dữ Liệu AUTOSAR (AUTOSAR Data Flow Journey):**
  - Trực quan hóa gói tin theo dạng **Step-by-step State Inspector**: bấm từng trạm (`SW-C` $\rightarrow$ `RTE` $\rightarrow$ `COM` $\rightarrow$ `PduR` $\rightarrow$ `CanIf` $\rightarrow$ `Driver` $\rightarrow$ `Cáp CAN`) để xem cấu trúc `PduInfoType` biến đổi và bóc tách header. *(Dự kiến tích hợp Inline Micro-Lab vào Item 7 & 8)*.
- [ ] **[CANFD-010] Bộ Mô Phỏng Transceiver SIC (Signal Improvement Capability) vs Non-SIC (ISO 11898-2:2024):**
  - Đề xuất bổ sung từ Argon 4: Trực quan hóa hiện tượng dội tín hiệu (Ringing) ở tốc độ 5–8 Mbps trên mạng có nhánh rẽ dài (Star/Stub topology).
  - Thanh trượt chỉnh `Stub Length` (0.3m – 3.0m) và nút toggle `[SIC Active Mode]`; mô phỏng cách vi mạch SIC ghìm trở kháng đầu ra để dập tắt sóng dội tức thì trong pha Recessive.
- [ ] **[CANFD-011] Bộ Mô Phỏng Phân Mảnh ISO-TP (ISO 15765-2:2016) & SecOC Payload Packer:**
  - Đề xuất bổ sung từ Argon 4: So sánh truyền khối dữ liệu UDS `0x36 TransferData` (4095 bytes) trên CAN 2.0 (8B) vs CAN FD (64B).
  - Trực quan hóa header `FF_DL` 32-bit (hỗ trợ tới 4GB), Escape Sequence `SF_DL` 2-byte, và định lượng thời gian tiết kiệm nhờ cắt giảm số chu kỳ bắt tay Flow Control (`FC - BS, STmin`).
- [x] ~~**[CANFD-009] Âm Thanh Kỹ Thuật Số Giả Lập Thiết Bị Lab (Web Audio FX):**~~ *(ĐÃ BỎ QUA - DROPPED theo đánh giá Argon 4: Nguy cơ bloatware, gây phiền hà cho độc giả trong môi trường văn phòng và bị chính sách autoplay/AudioContext của trình duyệt hiện đại chặn)*.

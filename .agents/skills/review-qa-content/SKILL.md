---
name: review-qa-content
description: >-
  Hướng dẫn Agent cách thêm mới, review, và validate nội dung Q&A theo chuẩn
  4-tầng kỹ thuật (Theory, SystemC/C++ Modeling, ECU/AUTOSAR Practice, Interview Trap)
  với khung diễn đạt 5W-1H cho Type A và Micro-STAR cho Type B.
---

# Kỹ Năng: Review & Thêm Nội Dung Q&A Chuẩn Hóa

## 1. Khi Nào Kích Hoạt Skill Này
- Khi người dùng yêu cầu "thêm câu hỏi mới", "viết Q&A", "review nội dung Q&A".
- Khi cần validate nội dung Ground Truth trong `MAINTENANCE_PLAN.md`.

---

## 2. Checklist Bắt Buộc Cho Mỗi Q&A Item

### 2.1 Phân loại câu hỏi:
- **Type A** (Khái niệm / Kiến trúc Giao thức) → Tầng Theory viết theo **5W-1H**:
  - 📌 **What**: Định nghĩa kỹ thuật cốt lõi trong 1–2 câu súc tích.
  - 💡 **Why**: Giải quyết khiếm khuyết gì của chuẩn cũ hoặc giải quyết bài toán vật lý/an toàn nào.
  - ⏱️ **When**: Kích hoạt ở phase nào trong frame hoặc điều kiện nào trong chu kỳ truyền thông.
  - 📍 **Where**: Nằm ở vị trí bit nào trong frame, thuộc tầng phần cứng (Silicon MAC/Transceiver) hay phần mềm (MCAL/CanIf).
  - ⚙️ **Who & How**: Thành phần điều khiển và cơ chế hoạt động chi tiết (bitwise logic, timer multiplexing, công thức tính).
- **Type B** (Tình huống / Bẫy phỏng vấn / Sự cố) → Tầng Trap viết theo **Micro-STAR**:
  - 🚨 **S (Situation)**: Bối cảnh xe hơi thực tế (nhiệt độ khoang máy 90°C, bus load 80%, xe đang phanh gấp ASIL D).
  - 🎯 **T (Task)**: Thách thức kỹ thuật & yêu cầu thời gian thực (không được drop frame, khôi phục bus trong 50ms).
  - 🛠️ **A (Action)**: Giải pháp kỹ thuật đa chiều (🚗 Automotive: đo oscilloscope, tinh chỉnh CanSM timer, chỉnh priority; 💻 C++: Two-phase update, LUT, tránh exception overhead).
  - 📊 **R (Result)**: Kết quả định lượng (giảm bus load xuống 45%, phục hồi bus trong 20ms, bài học rút ra).

### 2.2 Đảm bảo đủ 4 tầng kỹ thuật cốt lõi:
- [ ] 📖 **Theory**: Lý thuyết & chuẩn giao thức ISO (ISO 11898-1:2015 cho CAN FD, FlexRay Protocol Spec v3.0.1 / ISO 17458 cho FlexRay, ISO 26262 ASIL).
- [ ] 🖥️ **SystemC/C++ Modeling**: Thiết kế kiến trúc mô phỏng, registers, FSM, TLM-2.0.
- [ ] 🔧 **ECU/AUTOSAR Practice**: Cấu hình BSW stack thực tế (CanIf, PduR, CanSM, MCAL).
- [ ] ⚠️ **Interview Trap**: Bẫy kép phản biện song song (🚗 Automotive/Protocol vs 💻 C++/Modeling).

### 2.3 Song ngữ chuẩn mực:
- [ ] Tiếng Việt đầy đủ, thuật ngữ chuyên ngành chuẩn xác.
- [ ] Tiếng Anh đầy đủ, văn phong kỹ thuật quốc tế (Automotive Embedded Systems).

### 2.4 Định dạng dữ liệu (Data Format):
- [ ] Tuân theo cấu trúc object trong mảng `qaData` (xem [blogger-widget-creator SKILL.md](../blogger-widget-creator/SKILL.md) Bước 4b).
- [ ] Có đầy đủ trường: `id`, `difficulty`, `tags`, `vi`, `en`.

---

## 3. Quy Trình 5 Bước Thêm Q&A Mới

1. **Bước 1 (Ground Truth First)**: Soạn thảo nội dung hoàn chỉnh vào `docs/<widget>/MAINTENANCE_PLAN.md` làm Ground Truth chuẩn.
2. **Bước 2 (Chuyển đổi Data)**: Chuyển đổi nội dung thành JavaScript Object và chèn vào mảng `qaData` trong file `widget_<tên>.html`.
3. **Bước 3 (Kiểm tra Cú pháp)**: Chạy `node scripts/sync-docs.js` đảm bảo trả về `Syntax OK` và tự động cập nhật số lượng Q&A items.
4. **Bước 4 (Đồng bộ Spec)**: Kiểm tra `docs/<widget>/CURRENT_INFO.md` để đảm bảo số câu hỏi Q&A và số dòng code đã được đồng bộ chính xác.
5. **Bước 5 (Ghi nhận Changelog)**: Ghi log chi tiết câu hỏi mới vào `CHANGELOG.md` dưới mục `[Unreleased]`.

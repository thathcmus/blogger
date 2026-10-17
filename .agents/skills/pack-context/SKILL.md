---
name: pack-context
description: >-
  Automate AI context packaging using Repomix.
  Activate when user types /pack, /pack-full, /pack --full, or asks to pack project context for AI.
---

# Kỹ Năng: Đóng Gói Ngữ Cảnh Cho AI (Pack Context Skill)

Tài liệu này hướng dẫn Agent cách xử lý các lệnh tắt `/pack` và `/pack-full` (hoặc `/pack --full`) trong repository **Tech Blogger Widgets**.

---

## 1. Lệnh Tắt `/pack` (Chế Độ Nhẹ - Khuyên Dùng)

Khi người dùng gõ `/pack`:
- **Thực thi lệnh**:
  ```powershell
  node scripts/pack-context.js
  ```
- **Hành vi**:
  - Tự động đọc cấu hình `repomix.config.json`.
  - Bỏ qua các file HTML giao diện lớn (`**/*.html`).
  - Xuất ra tệp `repomix-output.xml` (dung lượng tối ưu: **~60k tokens**).
- **Mục đích**: Tải lên 4.1 Argon Web, Claude, hoặc ChatGPT để lập Master Plan mà không lo bị tràn hay cạn kiệt quota khung giờ.

---

## 2. Lệnh Tắt `/pack-full` hoặc `/pack --full` (Chế Độ Toàn Diện)

Khi người dùng gõ `/pack-full` hoặc `/pack --full`:
- **Thực thi lệnh**:
  ```powershell
  node scripts/pack-context.js --full
  ```
- **Hành vi**:
  - Đóng gói toàn bộ 100% mã nguồn dự án bao gồm cả 3 widget HTML.
  - Xuất ra tệp riêng biệt `repomix-output-full.xml` (dung lượng: **~146k tokens**).
- **Mục đích**: Dùng khi cần AI Web audit toàn diện giao diện, CSS layout, hoặc logic của từng widget cụ thể.

---

## 3. Quy Trình Báo Cáo
Sau khi chạy xong lệnh đóng gói, Agent cần:
1. Thông báo rõ tên file đã tạo (`repomix-output.xml` hoặc `repomix-output-full.xml`).
2. Tóm tắt số lượng token và số file được gói.
3. Hướng dẫn người dùng kéo thả file vào cửa sổ chat của Web AI.

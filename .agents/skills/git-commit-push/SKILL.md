---
name: git-commit-push
description: >-
  Automate git commit message generation, pre-commit validation, and git push workflows.
  Use this skill whenever the user types /commit, /push, /commit-push, or asks to commit changes,
  review git diff, generate commit messages, or push to the remote repository.
---

# Git Commit & Push Workflow Skill

Tài liệu này hướng dẫn Agent cách xử lý các yêu cầu hoặc lệnh tắt `/commit`, `/push`, và `/commit-push` trong kho mã nguồn **Tech Blogger Widgets**.

---

## 1. Lệnh Tắt `/commit` (Tạo Message & Thực Thi Commit)

Khi người dùng gõ `/commit` (hoặc yêu cầu "tạo commit message", "commit code"):

### Quy Trình 4 Bước:
1. **Bước 1: Chạy Kiểm Tra Cú Pháp & Tự Động Đồng Bộ Tài Liệu (Verification Protocol)**:
   ```powershell
   node scripts/sync-docs.js --git-add
   ```
   - Đảm bảo toàn bộ mã nguồn HTML/JS đạt chuẩn `Syntax OK`.
   - Cập nhật số dòng code thực tế và ngày hiện tại vào `CURRENT_INFO.md`.

2. **Bước 2: Kiểm Tra Trạng Thái Git**:
   ```powershell
   git status
   git diff --staged --stat
   ```

3. **Bước 3: Tự Động Soạn Thảo Commit Message Chuẩn Conventional Commits**:
   - Tuân thủ quy chuẩn:
     - `feat`: Tính năng mới cho widget (ví dụ: `feat(canfd): add 3d tilt landing portal hub`).
     - `fix`: Sửa lỗi giao diện, logic, hoặc bảo mật (ví dụ: `fix(canfd): resolve scroll trapping and sticky overlay`).
     - `docs`: Cập nhật tài liệu kỹ thuật, Q&A, maintenance plan (ví dụ: `docs(canfd): rewrite q&a with 5w-1h and micro-star`).
     - `chore`: Tự động hóa, git hooks, sync scripts (ví dụ: `chore(ci): add pre-commit syntax verification hook`).
     - `refactor`: Tái cấu trúc mã nguồn hoặc comment mà không thay đổi tính năng.
   - Thân commit (Body): Nêu rõ các điểm kỹ thuật cốt lõi (What & Why), phân tích thay đổi trên từng file.

4. **Bước 4: Thực Thi Commit**:
   ```powershell
   git add -A
   git commit -m "<Commit Message>"
   ```
   - In ra thông báo xác nhận thành công kèm mã băm (Commit SHA) và tóm tắt các tệp đã commit.

---

## 2. Lệnh Tắt `/push` (Đẩy Code Lên Remote Repository)

Khi người dùng gõ `/push` (hoặc yêu cầu "push code", "đẩy lên git"):

### Quy Trình:
1. **Kiểm tra trạng thái**:
   - Nếu còn file chưa commit: Tự động chạy quy trình `/commit` trước hoặc nhắc nhở người dùng.
   - Nếu đã commit sạch sẽ:
2. **Thực thi Push**:
   ```powershell
   git push origin main
   ```
3. **Báo cáo kết quả**:
   - Kiểm tra log push trả về nhánh `origin/main`.
   - Hiển thị liên kết kiểm tra trên GitHub Pages / Remote repo.

---

## 3. Lệnh Tắt `/commit-push` hoặc `/cp` (Combo 2 Trong 1)

Khi người dùng gõ `/commit-push` hoặc `/cp`:
- Thực hiện liên hoàn Bước 1 $\rightarrow$ Bước 4 của `/commit`, sau đó chạy ngay lệnh `git push origin main`.
- Toàn bộ quy trình diễn ra trơn tru, bảo đảm không bao giờ push code lỗi cú pháp nhờ lưới an toàn `scripts/sync-docs.js`.

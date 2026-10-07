# Hướng Dẫn Dành Cho AI Agent (Agent Instructions & Operating Protocol)

Chào mừng bạn (AI Agent: Antigravity, Cursor, Claude Code, GitHub Copilot) tham gia phát triển dự án **Tech Blogger Widgets**. Tài liệu này là **Single Source of Truth** quy định vai trò, nguyên tắc làm việc, quy trình tiêu chuẩn (SOP), và giao thức nghiệm thu trong kho mã nguồn này.

---

## 1. Sứ Mệnh Của Dự Án (Project Mission)

Repository này chứa các **Interactive Visualizers / Educational Simulators** độc lập được viết bằng HTML5/CSS/JavaScript thuần, dùng để:
1. Nhúng trực tiếp vào các bài viết kỹ thuật chuyên sâu trên Google Blogger (Blogspot), WordPress, Substack.
2. Cung cấp trang web tĩnh độc lập qua GitHub Pages để độc giả có thể thao tác, học tập trực quan.
3. Tập trung vào các chủ đề kỹ thuật cốt lõi: **Automotive Protocols (FlexRay, CAN, LIN, Ethernet), Embedded Systems, C/C++, Autosar, RTOS**.

---

## 2. Cấu Trúc Kho Lưu Trữ (Repository Architecture)

```text
./                                          # Thư mục gốc dự án (Repository Root)
│
├── .agents/                                # Cấu hình chuẩn hóa cho AI Agent
│   ├── rules/
│   │   └── blogger-embed-rules.md          # Bộ luật bắt buộc khi code widget nhúng Blogger
│   └── skills/
│       └── blogger-widget-creator/
│           └── SKILL.md                    # Hướng dẫn 5 bước và template tạo widget mới
│
├── docs/                                   # Tài liệu chi tiết từng widget
│   └── flexray/
│       ├── CURRENT_INFO.md                 # Đặc tả hiện trạng kỹ thuật của FlexRay widget
│       └── BACKLOG.md                      # Kế hoạch nâng cấp và mẫu yêu cầu thay đổi
│
├── AGENTS.md                               # [File này] Bản chỉ dẫn dành cho Agent
├── CHANGELOG.md                            # Nhật ký phiên bản chuẩn SemVer
├── README.md                               # Bộ mặt dự án cho cộng đồng & độc giả
├── LICENSE                                 # Giấy phép nguồn mở MIT
├── .gitignore                              # Chặn file rác
│
├── FLEXRAY_overview.html                   # Widget: Trực quan hóa giao thức FlexRay
└── OOP_Cpp_Simulator.html                  # Widget: Trực quan hóa lập trình hướng đối tượng C++
```

---

## 3. Quy Trình Vận Hành Tiêu Chuẩn Cho Agent (Standard Operating Procedures)

### SOP-1: Khi Sửa Đổi / Nâng Cấp Widget Hiện Có
1. **Bước 1 (Đọc Ngữ Cảnh)**: Bắt buộc đọc file `docs/<tên_widget>/CURRENT_INFO.md` để hiểu toàn bộ kiến trúc DOM, CSS, data model, và logic JS trước khi chỉnh sửa.
2. **Bước 2 (Kiểm Tra Invariants)**: Đọc `.agents/rules/blogger-embed-rules.md`. Không được vi phạm các quy tắc:
   - Giữ nguyên root container cô lập; không đụng chạm thẻ `html`, `body`.
   - Giữ nguyên `try ... catch` bảo vệ khi gọi thư viện ngoài (Lucide icons).
   - Đảm bảo các bảng/sơ đồ ngang luôn có `overflow-x-auto` và `no-scrollbar`.
3. **Bước 3 (Chỉnh Sửa Mã Nguồn)**: Sử dụng các công cụ chỉnh sửa tệp để sửa đổi chính xác.
4. **Bước 4 (Thực Thi Giao Thức Nghiệm Thu - Verification Protocol)**: Chạy kiểm tra cú pháp (xem Mục 4 bên dưới).
5. **Bước 5 (Cập Nhật Tài Liệu)**:
   - Cập nhật các thay đổi vào `docs/<tên_widget>/CURRENT_INFO.md`.
   - Cập nhật nhật ký vào `CHANGELOG.md` dưới mục `[Unreleased]` hoặc phiên bản mới.

### SOP-2: Khi Tạo Widget Mới
1. **Bước 1**: Đọc kỹ hướng dẫn và sử dụng boilerplate template tại [SKILL.md](.agents/skills/blogger-widget-creator/SKILL.md).
2. **Bước 2**: Tạo file HTML mới ở thư mục gốc (hoặc theo quy ước).
3. **Bước 3**: Tạo thư mục tài liệu `docs/<tên_chủ_đề>/CURRENT_INFO.md` và `docs/<tên_chủ_đề>/BACKLOG.md`.
4. **Bước 4**: Thêm widget mới vào bảng danh mục trong `README.md`.
5. **Bước 5**: Ghi nhận vào `CHANGELOG.md`.

---

## 4. Giao Thức Nghiệm Thu Của Agent (Verification Protocol)

Mỗi khi Agent chỉnh sửa hoặc tạo mới file HTML, **bắt buộc phải chạy lệnh kiểm tra cú pháp JavaScript** trong terminal để đảm bảo không phát sinh lỗi parse hoặc lỗi cú pháp gây hỏng trang:

```powershell
node -e "const fs = require('fs'); const html = fs.readFileSync('<Tên_File.html>', 'utf8'); const js = html.match(/<script>([\s\S]*?)<\/script>/)[1]; new Function(js); console.log('Syntax OK');"
```

Nếu lệnh trả về `Syntax OK` và không có ngoại lệ, công việc mới được coi là hoàn tất về mặt kỹ thuật.

---

## 5. Tiêu Chuẩn Tri Thức Miền (Domain Knowledge Integrity)

- Khi làm việc với giao thức **FlexRay**: Bắt buộc đối chiếu với tiêu chuẩn **FlexRay Protocol Specification v3.0.1** và **ISO 17458:2013**.
- Khi làm việc với giao thức **CAN / CAN FD**: Bắt buộc đối chiếu với **ISO 11898-1:2015**.
- Khi làm việc với **C++**: Bắt buộc đảm bảo tính chính xác theo chuẩn C++11/C++17/C++20 (Memory Layout, VTABLE, Polymorphism, RAII).
- Không tự ý phỏng đoán hoặc đơn giản hóa sai lệch các quy định an toàn hệ thống ô tô (ISO 26262 ASIL).

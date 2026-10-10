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
│   ├── can_fd/                             # Widget CAN FD
│   │   ├── CURRENT_INFO.md                 # Đặc tả hiện trạng kỹ thuật CAN FD
│   │   ├── BACKLOG.md                      # Backlog tính năng tổng thể
│   │   └── MAINTENANCE_PLAN.md             # Kế hoạch bảo trì 60 ngày & Ground Truth Q&A
│   └── flexray/                            # Widget FlexRay
│       ├── CURRENT_INFO.md                 # Đặc tả hiện trạng kỹ thuật FlexRay
│       └── BACKLOG.md                      # Kế hoạch nâng cấp và mẫu yêu cầu thay đổi
│
├── AGENTS.md                               # [File này] Bản chỉ dẫn dành cho Agent
├── CHANGELOG.md                            # Nhật ký phiên bản chuẩn SemVer
├── README.md                               # Bộ mặt dự án cho cộng đồng & độc giả (English)
├── README.vi.md                            # Bộ mặt dự án cho cộng đồng & độc giả (Tiếng Việt)
├── LICENSE                                 # Giấy phép nguồn mở MIT
├── .gitignore                              # Chặn file rác
│
├── firebase.json                           # Cấu hình triển khai Firebase (Firestore Rules)
├── firestore.rules                         # Bộ quy tắc bảo mật Cloud Firestore (Zero-Trust)
│
├── widget_can_fd.html                      # Widget: Trực quan hóa giao thức CAN FD
├── widget_flexray.html                     # Widget: Trực quan hóa giao thức FlexRay
└── widget_cpp_oop.html                     # Widget: Trực quan hóa lập trình hướng đối tượng C++
```

---

## 3. Quy Trình Vận Hành Tiêu Chuẩn Cho Agent (Standard Operating Procedures)

### SOP-1: Khi Sửa Đổi Bất Kỳ Điều Gì Trước Khi Push (Pre-Push Auto-Sync Protocol)
> **NGUYÊN TẮC CỐT LÕI**: Bất kể sửa đổi lớn hay nhỏ (sửa 1 dòng code, fix bug, tinh chỉnh CSS, cập nhật logic, chỉnh sửa cấu hình `firestore.rules`, thêm tính năng mới, v.v.), **Agent BẮT BUỘC PHẢI TỰ ĐỘNG ĐỒNG BỘ LẠI TOÀN BỘ CÁC FILE INFO/TÀI LIỆU LIÊN QUAN TRƯỚC KHI KẾT THÚC LƯỢT LÀM VIỆC ĐỂ SẴN SÀNG PUSH**, tuyệt đối không được để sót hoặc đợi người dùng nhắc nhở.

1. **Bước 1 (Đọc Ngữ Cảnh & Invariants)**: Đọc file `docs/<tên_widget>/CURRENT_INFO.md` và `.agents/rules/blogger-embed-rules.md`. Giữ nguyên container cô lập, cơ chế fault-tolerant (`try...catch`), `overflow-x-auto` và `no-scrollbar`.
2. **Bước 2 (Chỉnh Sửa Mã Nguồn/Cấu Hình)**: Sử dụng các công cụ chỉnh sửa tệp để sửa đổi chính xác.
3. **Bước 3 (Kiểm Tra Cú Pháp - Verification Protocol)**: Bắt buộc chạy kiểm tra cú pháp JS (xem Mục 4 bên dưới), phải trả về `Syntax OK`.
4. **Bước 4 (Tự Động Đồng Bộ Toàn Bộ File Info - Mandatory Info-Sync)**:
   - **`docs/<tên_widget>/CURRENT_INFO.md`**: Cập nhật số dòng code thực tế của file `.html`, ngày cập nhật, phiên bản, kiến trúc component, đặc tả tính năng/cấu hình mới.
   - **`CHANGELOG.md`**: Ghi nhận chi tiết vào mục `[Unreleased]` (Fixed, Added, Security, Changed...).
   - **`README.md` & `AGENTS.md`**: Đồng bộ lại cây thư mục (Repository Architecture) và bảng Showcase nếu có file mới hoặc thay đổi kiến trúc.
   - **`docs/<tên_widget>/MAINTENANCE_PLAN.md`**: Đồng bộ Ground Truth Q&A và cập nhật trạng thái nếu có thay đổi trong sprint plan.

### SOP-2: Khi Tạo Widget Mới
1. **Bước 1**: Đọc kỹ hướng dẫn và sử dụng boilerplate template tại [SKILL.md](.agents/skills/blogger-widget-creator/SKILL.md).
2. **Bước 2**: Tạo file HTML mới ở thư mục gốc (hoặc theo quy ước).
3. **Bước 3**: Tạo thư mục tài liệu `docs/<tên_chủ_đề>/CURRENT_INFO.md` và `docs/<tên_chủ_đề>/BACKLOG.md`.
4. **Bước 4**: Thêm widget mới vào bảng danh mục Showcase và sơ đồ cây thư mục trong cả `README.md` và `AGENTS.md`.
5. **Bước 5**: Ghi nhận vào `CHANGELOG.md` và chạy Verification Protocol đảm bảo file không có lỗi cú pháp.

### 🎯 Tiêu Chuẩn Hoàn Thành Bắt Buộc (Definition of Done - DoD)
Agent **tuyệt đối không được kết thúc lượt làm việc (turn)** nếu chưa kiểm tra đủ 4 điểm chốt (4-Point Checkpoint):
- [ ] **Point 1 (Code & Syntax):** File HTML/JS chạy mượt, Verification Protocol trả về `Syntax OK`.
- [ ] **Point 2 (Auto Info-Sync Spec & Metrics):** Tự động cập nhật `docs/<widget>/CURRENT_INFO.md` (phiên bản, ngày cập nhật, số dòng code thực tế, kiến trúc mới).
- [ ] **Point 3 (Ground Truth Plan):** Lưu nội dung hoàn chỉnh vào `docs/<widget>/MAINTENANCE_PLAN.md` (nếu có sprint plan).
- [ ] **Point 4 (Global Sync & Changelog):** Ánh xạ đồng bộ `README.md` & `AGENTS.md` (cây thư mục/bảng Showcase) và ghi log chi tiết vào `CHANGELOG.md` dưới mục `[Unreleased]`.

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

- **Tiêu chuẩn cấu trúc Q&A (4 Tầng & Bẫy Kép Double-Angle)**:
  - Bắt buộc mỗi Q&A item phải có đủ 4 tầng: `📖 Theory` → `🖥️ SystemC/C++ Modeling` → `🔧 ECU/AUTOSAR Practice` → `⚠️ Interview Trap`.
  - Riêng tầng `⚠️ Interview Trap` bắt buộc có đủ 2 góc nhìn phản biện:
    - 🚗 **Góc độ Automotive / Protocol:** Bẫy về timing, starvation, bus load, hardware constraints, AUTOSAR DET/Dem.
    - 💻 **Góc độ C++ / Modeling Follow-up:** Bẫy vặn lại khi ứng viên đề cập đến SystemC / C++ (race condition, delta cycle, resolution function, bitfield memory layout/endianness, cache locality, TLM vs bit-accurate).
  - Toàn bộ nội dung phải đồng bộ lưu trong `MAINTENANCE_PLAN.md` làm Ground Truth chuẩn trước khi đưa lên code HTML.

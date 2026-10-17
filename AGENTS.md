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
│       ├── blogger-widget-creator/
│       │   └── SKILL.md                    # Hướng dẫn 5 bước và template tạo widget mới
│       ├── git-commit-push/
│       │   └── SKILL.md                    # Xử lý lệnh tắt /commit, /push, /commit-push tự động
│       └── review-qa-content/
│           └── SKILL.md                    # Hướng dẫn review & thêm Q&A 4 tầng chuẩn hóa
│
├── docs/                                   # Tài liệu chi tiết từng widget
│   ├── can_fd/                             # Widget CAN FD
│   │   ├── CURRENT_INFO.md                 # Đặc tả hiện trạng kỹ thuật CAN FD
│   │   ├── BACKLOG.md                      # Backlog tính năng tổng thể
│   │   └── MAINTENANCE_PLAN.md             # Kế hoạch bảo trì 60 ngày & Ground Truth Q&A
│   ├── cpp_oop/                            # Widget C++ OOP
│   │   ├── CURRENT_INFO.md                 # Đặc tả hiện trạng kỹ thuật C++ OOP
│   │   └── BACKLOG.md                      # Kế hoạch nâng cấp và mẫu yêu cầu thay đổi
│   └── flexray/                            # Widget FlexRay
│       ├── CURRENT_INFO.md                 # Đặc tả hiện trạng kỹ thuật FlexRay
│       ├── BACKLOG.md                      # Kế hoạch nâng cấp và mẫu yêu cầu thay đổi
│       └── MAINTENANCE_PLAN.md             # Ground Truth Q&A FlexRay
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
├── scripts/                                # Công cụ tự động hóa & Kiểm soát chất lượng
│   └── sync-docs.js                        # Script tự động kiểm tra cú pháp & đồng bộ docs
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

### SOP-3: Giao Thức Lệnh Tắt `/commit`, `/push`, `/commit-push` (Automated Git Workflow)
Khi người dùng gõ lệnh tắt hoặc yêu cầu liên quan đến Git:
1. **Lệnh `/commit`**:
   - Tự động chạy `node scripts/sync-docs.js --git-add` để kiểm tra cú pháp và đồng bộ `CURRENT_INFO.md`.
   - Kiểm tra `git status` và `git diff --staged`.
   - Soạn thảo Commit Message chuẩn Conventional Commits (`feat`, `fix`, `docs`, `refactor`, `chore`) kèm phân tích chi tiết.
   - Chạy `git add -A` và `git commit -m "<message>"`.
2. **Lệnh `/push`**:
   - Kiểm tra xem còn file chưa commit không. Nếu có, thực hiện quy trình `/commit` trước.
   - Chạy `git push origin main` (hoặc nhánh hiện tại) và báo cáo commit hash/status.
3. **Lệnh `/commit-push` (hoặc `/cp`)**:
   - Thực thi liền mạch: Sync & Syntax Check $\rightarrow$ Commit $\rightarrow$ Push lên GitHub.

### SOP-4: Khi Debug Lỗi Production / Hotfix (Production Debugging Protocol)
Khi widget bị báo lỗi trên Blogger hoặc GitHub Pages:
1. **Bước 1 (Tái hiện lỗi)**: Mở widget bằng trình duyệt local (`file:///`) và kiểm tra Console (F12). Xác nhận lỗi có tái hiện không.
2. **Bước 2 (Phân loại lỗi)**:
   - **CDN Error**: Thư viện ngoài (Lucide, Tailwind, Firebase) bị chặn → kiểm tra `try...catch` fallback.
   - **Layout Break**: CSS bị Blogger theme override → kiểm tra root container isolation, `!important` conflicts.
   - **Mobile Break**: Thiếu `overflow-x-auto`, width cứng → kiểm tra responsive rules.
   - **JS Runtime Error**: Logic crash → kiểm tra Console stack trace, đối chiếu Source Code Architecture trong `CURRENT_INFO.md`.
3. **Bước 3 (Fix & Verify)**: Sửa lỗi → Chạy `node scripts/sync-docs.js` → Kiểm tra trên mobile viewport (375px).
4. **Bước 4 (Sync)**: Thực hiện SOP-1 Bước 4 (Auto Info-Sync) đầy đủ.

### 🎯 Tiêu Chuẩn Hoàn Thành Bắt Buộc (Definition of Done - DoD)
Agent **tuyệt đối không được kết thúc lượt làm việc (turn)** nếu chưa kiểm tra đủ 4 điểm chốt (4-Point Checkpoint):
- [ ] **Point 1 (Code & Syntax):** File HTML/JS chạy mượt, Verification Protocol trả về `Syntax OK`.
- [ ] **Point 2 (Auto Info-Sync Spec & Metrics):** Tự động cập nhật `docs/<widget>/CURRENT_INFO.md` (phiên bản, ngày cập nhật, số dòng code thực tế, kiến trúc mới).
- [ ] **Point 3 (Ground Truth Plan):** Lưu nội dung hoàn chỉnh vào `docs/<widget>/MAINTENANCE_PLAN.md` (nếu có sprint plan).
- [ ] **Point 4 (Global Sync & Changelog):** Ánh xạ đồng bộ `README.md` & `AGENTS.md` (cây thư mục/bảng Showcase) và ghi log chi tiết vào `CHANGELOG.md` dưới mục `[Unreleased]`.

---

## 4. Giao Thức Nghiệm Thu & Tự Động Hóa (Verification & Automation Protocol)

Mỗi khi Agent chỉnh sửa hoặc tạo mới file HTML, **bắt buộc phải chạy kiểm tra cú pháp JavaScript và kích hoạt bộ đồng bộ tài liệu tự động**:

```powershell
# Chạy script tự động hóa: kiểm tra cú pháp toàn bộ widget + đồng bộ docs/can_fd/CURRENT_INFO.md
node scripts/sync-docs.js
```

> 🛡️ **Lưới an toàn Git Pre-Commit Hook**: Kho mã nguồn đã được cấu hình `.git/hooks/pre-commit`. Mọi lệnh `git commit` sẽ tự động thực thi `node scripts/sync-docs.js --git-add`. Nếu có bất kỳ lỗi cú pháp nào, commit sẽ bị hủy ngay lập tức và tài liệu sẽ được tự động cập nhật khớp với số dòng code thực tế.

---

## 5. Tiêu Chuẩn Tri Thức Miền & Khung Diễn Đạt Q&A (Domain Knowledge & Frameworks)

- Khi làm việc với giao thức **FlexRay**: Bắt buộc đối chiếu với tiêu chuẩn **FlexRay Protocol Specification v3.0.1** và **ISO 17458:2013**.
- Khi làm việc với giao thức **CAN / CAN FD**: Bắt buộc đối chiếu với **ISO 11898-1:2015**.
- Khi làm việc với **C++**: Bắt buộc đảm bảo tính chính xác theo chuẩn C++11/C++17/C++20 (Memory Layout, VTABLE, Polymorphism, RAII).
- Không tự ý phỏng đoán hoặc đơn giản hóa sai lệch các quy định an toàn hệ thống ô tô (ISO 26262 ASIL).

### 🎯 Chuẩn Cấu Trúc Q&A Bắt Buộc (4 Tầng & Phân Loại 5W-1H / Micro-STAR)
Mỗi câu hỏi Q&A bắt buộc có đủ **4 tầng kỹ thuật cốt lõi**:
1. `📖 Theory`: Lý thuyết & chuẩn giao thức ISO.
2. `🖥️ SystemC/C++ Modeling`: Thiết kế kiến trúc mô phỏng, registers, FSM, TLM-2.0.
3. `🔧 ECU/AUTOSAR Practice`: Cấu hình BSW stack thực tế (CanIf, PduR, CanSM, MCAL).
4. `⚠️ Interview Trap`: Bẫy kép phản biện song song (🚗 Automotive/Protocol vs 💻 C++/Modeling).

#### 📐 Quy tắc diễn đạt theo Phân Loại Câu Hỏi (Question Classification):
- **TYPE A: Câu Hỏi Khái Niệm / Kiến Trúc Giao Thức (Protocol / Architecture / Specs)**:
  - Tầng `📖 Theory` **BẮT BUỘC** viết theo chuẩn **5W-1H** với các icon nhận diện trực quan:
    - 📌 **What**: Định nghĩa kỹ thuật cốt lõi trong 1–2 câu súc tích.
    - 💡 **Why**: Giải quyết khiếm khuyết gì của chuẩn cũ hoặc giải quyết bài toán vật lý/an toàn nào.
    - ⏱️ **When**: Kích hoạt ở phase nào trong frame hoặc điều kiện nào trong chu kỳ truyền thông.
    - 📍 **Where**: Nằm ở vị trí bit nào trong frame, thuộc tầng phần cứng (Silicon MAC/Transceiver) hay phần mềm (MCAL/CanIf).
    - ⚙️ **Who & How**: Thành phần điều khiển và cơ chế hoạt động chi tiết (bitwise logic, timer multiplexing, công thức tính).
- **TYPE B: Câu Hỏi Tình Huống / Xử Lý Sự Cố / Bẫy Phỏng Vấn (Troubleshooting / Trap / Scenario)**:
  - Tầng `⚠️ Interview Trap` (và các câu hỏi tình huống thực chiến) **BẮT BUỘC** viết theo chuẩn **Micro-STAR**:
    - 🚨 **S (Situation)**: Bối cảnh xe hơi thực tế (nhiệt độ khoang máy 90°C, bus load 80%, xe đang phanh gấp ASIL D).
    - 🎯 **T (Task)**: Thách thức kỹ thuật & yêu cầu thời gian thực (không được drop frame, khôi phục bus trong 50ms).
    - 🛠️ **A (Action)**: Giải pháp kỹ thuật đa chiều (🚗 Automotive: đo oscilloscope, tinh chỉnh CanSM timer, chỉnh priority; 💻 C++: Two-phase update, LUT, tránh exception overhead).
    - 📊 **R (Result)**: Kết quả định lượng (giảm bus load xuống 45%, phục hồi bus trong 20ms, bài học rút ra).
- Toàn bộ nội dung hoàn chỉnh phải lưu đồng bộ trong `MAINTENANCE_PLAN.md` làm Ground Truth trước và song hành với `widget_can_fd.html`.

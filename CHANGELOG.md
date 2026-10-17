# Nhật Ký Thay Đổi Dự Án (Changelog)

Tất cả các thay đổi đáng chú ý của dự án **Tech Blogger Widgets** sẽ được ghi lại trong tài liệu này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), và dự án này tuân thủ theo [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Fixed
- **Triệt Tiêu Lỗi Xung Đột Bố Cục Đè Chữ Header (`widget_can_fd.html`)**:
  - Khắc phục triệt để lỗi va chạm chữ (Layout Collision) khiến tiêu đề `CAN FD Protocol Explorer` bị cụm User Info và Action Toolbar đè chữ "Explorer" trên các màn hình có độ rộng trung bình (768px – 1150px) hoặc khi nhúng vào Blogger iframe.
  - Bỏ định vị `md:absolute` ghim góc phải, đưa toàn bộ Header vào Document Flow tự nhiên.

### Changed
- **Tái Cấu Trúc Header 2 Cột Chuẩn Dashboard & Tích Hợp Profile Popover Dropdown (`widget_can_fd.html`, `docs/can_fd/CURRENT_INFO.md`)**:
  - **Split 2-Column Responsive Layout**: Bố cục Flexbox 2 cột (`flex flex-col md:flex-row md:items-center md:justify-between`). Cột trái chứa biểu tượng tia chớp `⚡` và Tiêu đề / Phụ đề căn lề tự nhiên; Cột phải chứa toàn bộ Toolbar tiện ích.
  - **User Profile Popover Dropdown (Chuẩn Google/GitHub)**:
    - Trạng thái đóng: Rút gọn User Pill thành chip nhỏ gọn `[Avatar + Tên + 👑 Tác Giả + ▾]`, tiết kiệm hơn 50% diện tích toolbar.
    - Trạng thái mở: Click vào mở popover dropdown menu cao cấp hiển thị chi tiết tên, email, huy hiệu `⭐ Tác Giả Blog (Admin)` / `Kỹ sư / Độc giả`, nút `🔄 Đổi tài khoản Google`, nút `🚪 Đăng xuất` an toàn, tích hợp cơ chế đóng tự động khi click ra ngoài (`click-outside listener`).
  - Bổ sung bộ từ điển `i18n` song ngữ (`switch_account`, `user_role_author`, `user_role_reader`) cho menu profile.

### Added
- **Triển Khai Hoàn Thành Item 4 Trong Kế Hoạch 60 Ngày CAN FD (`widget_can_fd.html`, `docs/can_fd/MAINTENANCE_PLAN.md`)**:
  - Bổ sung 2 cụm câu hỏi Q&A chuẩn 4 tầng (Theory 5W-1H, SystemC/C++ Modeling, ECU/AUTOSAR Practice, Double-Angle Trap Micro-STAR):
    - `q_stuffing_4_1` (*Intermediate*): Tại sao CAN FD phải kết hợp cả Dynamic Bit Stuffing và Fixed Bit Stuffing? Đính chính chuẩn Fixed Stuff Bit là bit đảo dấu của bit đứng trước ($\text{FSB} = \overline{\text{bit}_{\text{prev}}}$) thay vì bit parity; phân tích giải pháp khắc phục Frame Jitter $35\mu s$ bằng cách chuyển padding byte từ `0x00` sang `0xAA`.
    - `q_sbc_crc_4_2` (*Senior*): Trường SBC (Stuff Bit Count mã Gray 3-bit + Even Parity modulo 8) và đa thức CRC-17 ($0\text{x}1685\text{B}$) / CRC-21 ($0\text{x}102899$). Phân tích sự khác biệt cốt lõi giữa ISO 11898-1:2015 và Non-ISO Bosch 2012 (`CCCR.NISO = 0`), đưa luồng bit đã nhồi vào bộ LFSR để đạt khoảng cách Hamming $HD = 6$.
  - Nâng tổng số lượng câu hỏi chuyên sâu trên widget từ 5 lên 7 câu hỏi song ngữ đầy đủ (VN/EN).

### Changed
- **Tối Ưu Hóa & Thanh Lọc Backlog Pool Theo Blueprint Argon 4 (`docs/can_fd/BACKLOG.md`)**:
  - Gộp đề xuất Oscilloscope (`CANFD-002`) và Glitch Hunter (`CANFD-007`) thành **Interactive Fault Diagnosis Lab**, cắt bỏ gamification điểm số/huy hiệu để tiết kiệm ~600 dòng code.
  - Tối ưu hóa hiển thị Mobile cho `CANFD-006` (Live DBC Signal Decoder) dạng Windowed 64-bit / Word-grouped để không làm vỡ màn hình 375px.
  - Bổ sung `[CANFD-010]` (Bộ mô phỏng Transceiver SIC dập sóng dội 5–8 Mbps) và `[CANFD-011]` (Bộ mô phỏng phân mảnh ISO-TP & SecOC Payload Packer).
  - Đánh dấu loại bỏ (Drop) `CANFD-009` (Web Audio FX) tránh bloatware và xung đột autoplay browser.

### Agent Workflow & Documentation Architecture
- **Đồng Bộ Tài Liệu Chiến Lược CAN FD Từ Gemini 4.1 Argon Web (`docs/can_fd/ARGON_REVIEW.md`)**:
  - Lưu trữ toàn văn bản đánh giá chuyên sâu của Principal Automotive Embedded Software Architect từ Gemini 4.1 Argon.
  - Phân tích Signal-to-Bloat tỷ lệ cho Backlog pool (`CANFD-002` → `CANFD-009`), đề xuất 2 tính năng tương tác mới (`CANFD-010` SIC Transceiver, `CANFD-011` ISO-TP / SecOC Packer).
  - Bổ sung 6 lỗ hổng kiến thức nghiêm trọng (ESI Bit, CanSM Bus Off L1/L2, Mixed CAN 2.0/FD Shielding, Inner-Priority Inversion, SecOC Freshness Value HSM, E2E Profiles 5/7/22).
  - Đóng gói Ground Truth Q&A Item 4 (Dynamic/Fixed Stuffing & SBC Gray-code CRC-17/21) chuẩn 5W-1H và Micro-STAR.
- **Chuẩn Hóa & Hoàn Thiện Hệ Thống Tài Liệu Kỹ Thuật Toàn Bộ Widget (`docs/cpp_oop/`, `docs/flexray/`)**:
  - **Khởi tạo tài liệu C++ OOP Simulator (`docs/cpp_oop/CURRENT_INFO.md`, `docs/cpp_oop/BACKLOG.md`)**: Đặc tả hiện trạng kỹ thuật 4 trụ cột OOP (Encapsulation, Inheritance, Polymorphism, Abstraction), phân tích cấu trúc bộ nhớ & VTABLE resolution, bản đồ mã nguồn 513 dòng chính xác, và lộ trình backlog tính năng (`[CPP-001]` đến `[CPP-004]`).
  - **Khởi tạo Ground Truth Q&A FlexRay (`docs/flexray/MAINTENANCE_PLAN.md`)**: Trích xuất nguyên văn toàn bộ nội dung Q1 (Time-Triggered Protocol) và Q2 (FTM Clock Drift Synchronization) từ mã nguồn làm Single Source of Truth cho quá trình bảo trì và mở rộng.
- **Nâng Cấp Bộ Công Cụ Tự Động Hóa & Lưới An Toàn Kiểm Soát Chất Lượng (`scripts/sync-docs.js`)**:
  - **Dynamic Auto-Discovery**: Loại bỏ hoàn toàn hardcode danh sách file; script tự động quét mọi `widget_*.html` xuất hiện ở thư mục gốc.
  - **Cưỡng chế Bất biến cấu trúc Atomic Unit**: Tự động xác thực tính toàn vẹn của từng widget (`widget_<name>.html` bắt buộc đi kèm `docs/<name>/CURRENT_INFO.md` và `docs/<name>/BACKLOG.md`). Lập tức báo lỗi đỏ (`Exit 1`) và chặn đứng commit nếu phát hiện widget mồ côi hoặc thiếu tài liệu.
  - **Xác thực Showcase Invariant**: Tự động kiểm tra và đảm bảo 100% widget mới đã được liệt kê trong bảng Showcase của cả `README.md` và `README.vi.md`.
  - **Tự động đồng bộ số dòng code & ngày cập nhật**: Tính toán chính xác số dòng code thực tế và ngày hiện tại cho toàn bộ các file `CURRENT_INFO.md`.
- **Thiết Lập Quy Tắc Bất Biến Cấu Trúc Atomic Unit (`.agents/rules/blogger-embed-rules.md`)**:
  - Bổ sung quy định nghiêm ngặt về tính toàn vẹn của một Widget (bộ ba bắt buộc: HTML + CURRENT_INFO + BACKLOG + Showcase). Chống tuyệt đối việc tạo file widget mồ côi thiếu tài liệu.
- **Bổ Sung SOP-4: Quy Trình Xử Lý Sự Cố & Hotfix Production (`AGENTS.md`)**:
  - Bổ sung quy trình 4 bước chẩn đoán lỗi chuyên sâu (CDN Error fallback, Blogger Theme layout break, mobile viewport 375px break, JS Runtime error).
- **Tạo Kỹ Năng Mới Cho AI Agent: Review & Soạn Thảo Q&A (`.agents/skills/review-qa-content/SKILL.md`)**:
  - Hướng dẫn chi tiết checklist 4 tầng (Theory, SystemC/C++ Modeling, ECU/AUTOSAR Practice, Interview Trap) kết hợp khung 5W-1H cho câu hỏi khái niệm (Type A) và Micro-STAR cho câu hỏi tình huống (Type B).
- **Tích Hợp Bộ Công Cụ Đóng Gói Ngữ Cảnh Cho AI (`scripts/pack-context.js`, `repomix.config.json`)**:
  - Hỗ trợ đóng gói repository thành một file context duy nhất (`repomix-output.xml`) để tải lên các mô hình AI Web (Argon, Claude, Gemini, ChatGPT) lập Master Plan.
  - Mặc định chạy ở chế độ Lightweight (~59k tokens, lọc bỏ các file HTML UI lớn để tiết kiệm 60–90% quota của Web AI).
  - Hỗ trợ cờ `--full` khi cần xuất toàn bộ mã nguồn bao gồm cả 3 widget HTML (~145k tokens).
- **Đồng Bộ Bộ Mặt Dự Án & Sơ Đồ Cấu Trúc Kho Lưu Trữ (`AGENTS.md`, `README.md`, `README.vi.md`)**:
  - Cập nhật liên kết tài liệu `docs/cpp_oop/` trong bảng Showcase của cả 2 bản `README.md` và `README.vi.md`.
  - Cập nhật sơ đồ cây thư mục (Repository Architecture) đầy đủ các thư mục và kỹ năng mới.

### Q&A Standardization & Automation
- **Chuẩn Hóa Ngân Hàng Câu Hỏi Phỏng Vấn Theo Khung 5W-1H & Micro-STAR (v1.6.0) (`widget_can_fd.html`, `docs/can_fd/MAINTENANCE_PLAN.md`)**:
  - **Rà soát & Viết lại toàn diện 5 câu hỏi phỏng vấn chuyên sâu CAN FD** với tính chính xác cao theo ISO 11898-1:2015, AUTOSAR Classic BSW Stack và SystemC/C++ Modeling:
    - *Q2.1: CSMA/CR & Collision Resolution* (Arbitration wired-AND, Starvation defense, Two-Phase Evaluate-Update).
    - *Q2.2: Remote Frame in CAN 2.0 vs CAN FD* (Deprecation rationale, RRS dominant bit, Observer pattern).
    - *Q2.3: Overload Frame vs Error Frame* (Data phase restriction, Intermission timing, Lock-free ring buffer).
    - *Q3.1: Vị trí của BRS (Bit Rate Switch)* (Sample point timing, CRC delimiter deceleration, ACK slot round-trip wire delay).
    - *Q3.2: Quy luật Non-linear DLC & Padding* (4-bit header constraint, `constexpr LUT`, SecOC crypto signature padding fix).
  - **Khung 5W-1H cho Tầng `📖 Lý Thuyết (Theory)`**: Bắt buộc cấu trúc 5 thành tố (📌 What, 💡 Why, ⏱️ When, 📍 Where, ⚙️ Who & How) kèm icon và semantic highlighting trực quan (`text-amber-600 dark:text-amber-400`).
  - **Khung Micro-STAR cho Tầng `⚠️ Bẫy Phỏng Vấn (Trap)`**: Thiết kế tình huống bối cảnh xe hơi thực tế với huy hiệu Micro-STAR, chi tiết hóa 4 bước (🚨 Situation, 🎯 Task, 🛠️ Action song song 🚗 Automotive vs 💻 C++, 📊 Result với số liệu định lượng).
  - **Song ngữ hoàn chỉnh (100% Vietnamese & English)**: Cả 5 câu hỏi được biên dịch chuẩn xác song song cho 2 chế độ hiển thị.
- **Quy Trình Kiểm Soát Chất Lượng Tự Động Pre-Commit & Đồng Bộ Tài Liệu (`scripts/sync-docs.js`, `.git/hooks/pre-commit`)**:
  - Xây dựng script `scripts/sync-docs.js` tự động kiểm tra cú pháp JavaScript bên trong thẻ `<script>` của toàn bộ các widget độc lập, trích xuất số dòng thực tế, số lượng Q&A và ngày cập nhật.
  - Tự động cập nhật `docs/can_fd/CURRENT_INFO.md` và `docs/flexray/CURRENT_INFO.md` khớp tuyệt đối với mã nguồn.
  - Cấu hình Git Hook `.git/hooks/pre-commit` tự động chạy kiểm tra và `git add` tài liệu đã đồng bộ trước khi cho phép commit.

### Security & Backend
- **Thiết lập Bộ Quy Tắc Bảo Mật Cloud Firestore Chuẩn Zero-Trust (`firestore.rules`, `firebase.json`)**:
  - Triển khai kiến trúc **Zero-Trust & Public Identifier Pattern** cho Firebase Web SDK: Khẳng định Web `apiKey` là Public Identifier hợp lệ, toàn bộ an ninh bảo vệ dữ liệu được thực thi ở tầng Server qua Firebase Security Rules.
  - **Quyền Đọc (`allow read: if true;`)**: Mở quyền đọc công khai cho mọi độc giả đọc bài viết trên blog để theo dõi các thảo luận kỹ thuật.
  - **Quyền Tạo (`canCreateComment()`)**: Bắt buộc đăng nhập Google Auth, kiểm tra khớp danh tính UID & Email chống mạo danh, ràng buộc độ dài nội dung (1–2000 ký tự) chống payload spam, khởi tạo like bằng 0, chỉ cho phép Tác giả (`thathcmus@gmail.com`) tạo kèm cờ ghim (`isPinned`).
  - **Quyền Cập Nhật (`canUpdateComment()`)**: Hạn chế nghiêm ngặt, chỉ cho phép 2 thao tác nguyên tử: Tác giả ghim/bỏ ghim (`isPinned`), hoặc Độc giả thả tim / bỏ tim (`likes`, `likedBy`), cấm tuyệt đối sửa trộm nội dung comment hoặc thông tin tác giả.
  - **Quyền Xóa (`canDeleteComment()`)**: Chỉ chính chủ bình luận hoặc Tác giả blog mới có quyền xóa.
  - **Default Deny (`match /{document=**} { allow read, write: if false; }`)**: Chặn mọi truy cập vào tất cả các collection/document ngoài danh mục được cho phép.
  - Hỗ trợ đa widget: Khai báo sẵn các collection `/canfd_comments/`, `/flexray_comments/`, `/cpp_comments/`.
- **Chuẩn Hóa Song Ngữ Cho Bộ Mặt Dự Án (`README.md` & `README.vi.md`)**:
  - Tách bộ mặt dự án thành 2 tệp: `README.md` (Bản tiếng Anh chuẩn quốc tế) và `README.vi.md` (Bản tiếng Việt).
  - Tích hợp Language Switcher `🌐 [English](README.md) | [Tiếng Việt](README.vi.md)` ở đầu mỗi tệp, đồng bộ toàn bộ bảng showcase và sơ đồ cây thư mục.
- **Chuẩn Hóa 100% Tiếng Anh Cho Code Comments & HTML Comments**:
  - Refactor toàn bộ các dòng ghi chú, chú thích thuật toán, controllers và comment cấu trúc DOM trong cả 3 widget (`widget_can_fd.html`, `widget_flexray.html`, `widget_cpp_oop.html`) sang 100% Tiếng Anh chuẩn công nghiệp.
  - Loại bỏ hoàn toàn tình trạng comment tiếng Việt trong mã nguồn, giảm tải dung lượng file HTML và tối ưu hóa context window cho AI Agent.
- **Quy Hoạch Lộ Trình Công Cụ Tương Tác Chuyên Sâu (Interactive Micro-Labs Roadmap)**:
  - Cập nhật [`docs/can_fd/MAINTENANCE_PLAN.md`](docs/can_fd/MAINTENANCE_PLAN.md) và [`docs/can_fd/BACKLOG.md`](docs/can_fd/BACKLOG.md) bổ sung 6 tính năng mô phỏng tương tác cao:
    - *Fault Confinement & Bus Off Simulator* (máy trạng thái FSM 3 nút, đồng hồ TEC/REC nhảy số, kích hoạt lỗi bit/stuff/crc).
    - *Interactive Sample Point & TDCO Playground* (thanh trượt TQ, điểm lấy mẫu laser và bù trễ TDC).
    - *Live DBC Signal Decoder* (giải mã tín hiệu vật lý 64-Byte Payload, Intel Little-Endian vs Motorola Big-Endian).
    - *Minigame Thợ Săn Lỗi Xung Sóng* (Oscilloscope Glitch Hunter).
    - *Sơ đồ dòng chảy dữ liệu AUTOSAR Packet Journey* (SW-C $\rightarrow$ COM $\rightarrow$ PduR $\rightarrow$ CanIf $\rightarrow$ Driver).
    - *Web Audio FX* (hiệu ứng âm thanh phần cứng mô phỏng thiết bị đo lab).

### Fixed
- **Tối ưu hóa toàn diện giao diện cuộn siêu mượt 60fps & triệt tiêu 100% hiện tượng đè component/khất giật (`widget_can_fd.html`)**:
  - **Triệt tiêu hiện tượng đè component khi cuộn**: Gỡ bỏ hoàn toàn thuộc tính `position: sticky` trên từng khối thẻ câu hỏi `.qa-card-sticky-block`. Trước đó việc biến cả tiêu đề + 4 tab + câu trả lời thành khối sticky đã chiếm hơn 350px viewport, nổi đè lên trên che khuất các bình luận và va chạm với các thẻ câu hỏi tiếp theo. Thẻ câu hỏi nay mở rộng và trượt tự nhiên theo chiều dọc, các phần tử hiển thị mạch lạc, không còn bất kỳ sự che khuất nào.
  - **Triệt tiêu hiện tượng khất/khựng cuộn (Scroll Trap)**: Gỡ bỏ giới hạn `max-h-[220px] overflow-y-auto` trên khối nội dung câu trả lời. Trước đó, thanh cuộn lồng bên trong câu trả lời khiến thao tác cuộn chuột bị "mắc kẹt" khi con trỏ di chuyển qua khối nội dung. Nay toàn bộ 4 tab (`📖 Lý Thuyết`, `🖥️ C++ Modeling`, `🔧 ECU / AUTOSAR`, `⚠️ Bẫy Phỏng Vấn`) hiển thị tự nhiên với độ cao thật, tạo trải nghiệm đọc thông suốt và thoáng đãng.
  - **Tái cấu trúc cụm điều hướng & bộ lọc (Natural In-Flow vs Compact Floating Sticky)**:
    - Di chuyển cụm Tiêu đề Ngân Hàng Câu Hỏi + Bộ lọc độ khó & chủ đề (`#qa-filter-header-group`) vào đúng đầu mục của Tab 3 (`#tab-interview`) theo luồng tự nhiên của tài liệu.
    - Giữ lại thanh điều hướng 3 tab chính (`#main-nav-tabs`) thành thanh nổi cố định siêu nhẹ (`sticky top-2 z-30`, chiều cao ~48px, hiệu ứng glassmorphism).
    - Loại bỏ hoàn toàn controller cuộn JavaScript (`handleSmartScroll`, `setSmartNavVisibility`, `updateStickyBlockOffsets`) và các event listener cuộn làm thrash layout reflow trên mỗi tick. Thanh điều hướng neo tĩnh 100% bằng CSS mượt mà, không bao giờ nhảy vị trí hay biến mất chớp nháy.
  - **Tinh chỉnh Focus Accordion Thông Minh**: Trong hàm `toggleAnswer()`, thay thế việc ép cuộn trang thô bạo bằng cơ chế kiểm tra tọa độ bounding rect tinh tế: chỉ cuộn nhẹ khi đỉnh câu hỏi bị khuất sau thanh nav nổi hoặc chìm ngoài màn hình; giữ nguyên góc nhìn nếu câu hỏi đã nằm trong vùng nhìn thấy thoải mái của người đọc.
- **Khắc phục lỗi cú pháp Firestore Security Rules**: Sửa lỗi parse path variable do ghép chuỗi ký tự wildcard không hợp lệ bằng cách khai báo tường minh từng collection; bổ sung từ khóa `if` còn thiếu trong default deny rule (`allow read, write: if false;`).

### Added
- **Cổng Khám Phá Mở Màn Landing Portal Hub Tương Tác 3D Tilt (v1.5.0) (`widget_can_fd.html`)**:
  - **Trải Nghiệm Mở Màn Đẳng Cấp (Interactive Cover Experience)**: Khi vừa tải widget, giao diện mở đầu bằng Cổng Khám Phá (Landing Portal Hub) với Banner công nghệ ô tô và 3 cửa sổ/thẻ chuyên đề xếp dọc tương tác trực quan, ẩn bớt lượng thông tin dày đặc ban đầu để tạo hứng thú và định hướng cho độc giả trước khi bước vào chi tiết.
  - **Hiệu Ứng 3D Perspective Tilt & Phản Quang Glare Theo Con Trỏ Chuột**:
    - Khi rê chuột qua từng thẻ, thẻ sẽ tự động nghiêng 3D chân thực (`perspective(1000px) rotateX(...) rotateY(...) translateY(-4px)`), đàn hồi vật lý mượt mà khi rời chuột.
    - Lớp phản quang đa hướng (Radial Glare Spotlight) bám theo chính xác tọa độ con trỏ `(x, y)` tạo hiệu ứng tráng gương kim loại cao cấp trên bề mặt kính.
  - **Đồ Họa & Nút Bấm Animation Chuyên Biệt Cho Từng Cửa Sổ**:
    - **Cửa Sổ 01 (Cấu Trúc Khung)**: Mini oscilloscope waveform với xung sóng điện áp số vi sai, vạch laser kích hoạt bước nhảy tốc độ BRS (`1 Mbps` &rarr; `8 Mbps`), chuỗi bit quét động và nút bấm *"Khám Phá Cấu Trúc Frame"* có hiệu ứng hào quang phát sáng xung nhịp (`animate-cta-pulse`).
    - **Cửa Sổ 02 (So Sánh Thế Hệ)**: Thước đo băng thông và thanh so sánh Payload trực quan đối chiếu Classic CAN (`1M / 8B`), CAN FD (`8M / 64B`), và CAN XL (`20M+ / 2048B`), kèm nút *"Xem Bảng So Sánh Thế Hệ"*.
    - **Cửa Sổ 03 (Q&A Phỏng Vấn)**: Sơ đồ vi mạch xử lý ECU với các xung tín hiệu phát sáng kết nối 4 tầng kiến thức (`📖 Lý Thuyết`, `🖥️ C++ Modeling`, `🔧 AUTOSAR`, `⚠️ Double-Angle Trap`), kèm nút *"Luyện Phỏng Vấn Ngay"*.
  - **Cơ Chế Chuyển Cảnh Mượt Mà & Nút "Tổng Quan" Tiện Lợi**:
    - Bấm nút tại bất kỳ cửa sổ nào sẽ thực hiện chuyển cảnh fade & slide mượt mà vào giao diện tương tác chi tiết của tab tương ứng.
    - Bổ sung nút bấm *"Tổng Quan"* trên thanh điều hướng nổi để độc giả có thể quay trở lại Cổng Khám Phá bất kỳ lúc nào với 1 click.
  - **Hỗ Trợ Song Ngữ Toàn Diện (vi/en) & Tương Thích Hoàn Hảo Dark Mode**.
- **Chế độ Tối Toàn Diện (Comprehensive Dark Mode Theme - v1.4.0) (`widget_can_fd.html`)**:
  - **Nút chuyển đổi chế độ Sáng / Tối trực quan (`#btn-theme`)**: Đặt trên thanh Header (cạnh nút đổi ngôn ngữ và nút đăng nhập Google Auth), sử dụng icon Lucide Sun / Moon động kèm tooltip song ngữ.
  - **Tự động nhận diện & Ghi nhớ tùy chọn người dùng**: Tự động nhận diện thiết lập giao diện hệ điều hành qua `window.matchMedia('(prefers-color-scheme: dark)')`, lưu vết trạng thái người dùng vào `localStorage` (`canfd_theme`), tự động cập nhật mượt mà khi người dùng đổi theme OS.
  - **Bảng Màu Dark Palette Đẳng Cấp Chuyên Ngành Ô Tô**:
    - Áp dụng cấu hình Tailwind `darkMode: 'class'` với cơ chế kích hoạt kép (`document.documentElement` và `#canfd-explorer-root`), đảm bảo tương thích 100% trong môi trường nhúng Blogspot/WordPress lẫn GitHub Pages độc lập.
    - Phối màu Dark Palette: Nền chính `slate-950` (`#030712`), container/thẻ `slate-900` (`#0f172a`), chi tiết & hộp soạn thảo `slate-850` (`#151f32`), viền `slate-800`, chữ `slate-100`/`slate-400`.
    - Giữ trọn độ tương phản cao và mã màu chuẩn hóa cho các phase truyền thông: `amber-400` cho Arbitration Phase, `emerald-400` cho Data Phase, `blue-400` cho CRC Field.
  - **Đồng bộ hóa 100% trên toàn bộ hệ thống giao diện**:
    - **Tab 1 (Frame Explorer)**: Thanh timeline bit frame, thẻ giải phẫu trường bit, hộp thông số kỹ thuật và callout so sánh.
    - **Tab 2 (Comparison Table)**: Bảng đối chiếu Classic CAN vs CAN FD, thẻ tóm tắt tính năng, huy hiệu tiêu chuẩn ISO.
    - **Tab 3 (Ngân hàng Q&A 4 Tầng)**: Thanh nav nổi glassmorphism (`bg-slate-900/90`), thanh lọc độ khó/chủ đề, Accordion câu hỏi, 4 sub-tab nội dung (`📖 Theory`, `🖥️ C++ Modeling`, `🔧 ECU/AUTOSAR`, `⚠️ Interview Trap`), khối code C++ syntax highlight tối ưu cho nền tối.
    - **Hệ thống Bình luận Firebase Firestore**: Khung soạn thảo comment, dropdown chọn scope, các filter pills, banner Pinned Note tác giả, thẻ phản hồi lồng nhau (threaded replies), và modal đăng nhập Google Auth.
  - **Hỗ trợ Song ngữ (i18n)**: Bổ sung key `theme_light` và `theme_dark` vào từ điển đa ngữ (Việt - Anh) cho tooltip nút theme.
- **Nâng cấp Trải Nghiệm Điều Hướng & Đọc Q&A (`widget_can_fd.html`)**:
  - **Cơ chế Single-Open Accordion**: Khi bấm mở bất kỳ câu hỏi nào, tất cả các câu hỏi khác đang mở sẽ tự động thu gọn lại, giúp giao diện gọn gàng và độc giả tập trung 100% vào nội dung câu hỏi hiện tại.
  - **Thanh Điều Hướng Nổi Glassmorphism Siêu Nhẹ (`sticky top-2 z-30`)**: Neo tĩnh thanh điều hướng 3 tab chính nhỏ gọn (~48px) trên đầu trang với hiệu ứng kính mờ, không reflow, không che khuất nội dung bên dưới.
  - **Smart Scroll Focus**: Căn chỉnh cuộn nhẹ nhàng đến câu hỏi đang mở khi phần đỉnh bị khuất ngoài tầm nhìn mà không làm giật khung hình.
- **Tích hợp Firebase Live Auth & Cloud Firestore Database (`widget_can_fd.html`)**:
  - Tích hợp bộ thư viện Firebase Compat SDKs (v10.14.1: App, Auth, Firestore) bảo toàn kiến trúc Single-File Zero-Build khi nhúng Blogger hoặc host trên GitHub Pages.
  - Kết nối Firebase Project `tech-blogger-widgets` theo cấu hình chính thức từ tác giả.
  - Cài đặt tính năng **Google Sign-In Popup** (`firebase.auth().signInWithPopup()`): Độc giả và tác giả đăng nhập trực tiếp bằng tài khoản Google thật để tham gia thảo luận, trả lời và like.
  - Tự động xác thực tài khoản tác giả `thathcmus@gmail.com` &rarr; cấp quyền **⭐ Tác Giả Blog**, cho phép soạn thảo note tác giả, bật cờ Ghim (`📌 Ghim Note`) và xóa bình luận.
  - Tích hợp **Cloud Firestore Realtime Sync** (`canfd_comments` collection): Lắng nghe thời gian thực qua `onSnapshot`, lưu trữ độc lập trên cloud, kết hợp cache offline `localStorage`.
  - **Chế độ Cơ sở dữ liệu Sạch (Clean State)**: Xóa sạch toàn bộ dữ liệu mẫu giả định (`SEED_COMMENTS = []`), chỉ hiển thị và đồng bộ các thảo luận thật do chính bạn và độc giả đăng nhập Google gửi lên.
  - Xóa sạch toàn bộ các tài khoản mock/demo và dữ liệu seed thử nghiệm cũ, vận hành 100% trên nền tảng Firebase Auth và Cloud Firestore.
  - Tối ưu hóa xác thực cho môi trường Web (GitHub Pages và Google Blogger): Bổ sung hướng dẫn chi tiết và thông báo trực quan khi domain chưa được cấp phép (auth/unauthorized-domain), tinh gọn mã nguồn chuẩn Web nhúng Blogger.
- **Tái cấu trúc Khung Thảo Luận & Ghi Chú Kỹ Thuật (`widget_can_fd.html`)**:
  - Loại bỏ sub-tab thứ 5 "Thảo luận" riêng biệt; thay vào đó, đặt **Khung Thảo Luận & Ghi Chú nằm cố định trực tiếp bên dưới câu trả lời của CẢ 4 tab** (`📖 Lý Thuyết`, `🖥️ SystemC/C++ Modeling`, `🔧 ECU/AUTOSAR`, `⚠️ Interview Trap`).
  - Đảm bảo người đọc và tác giả khi xem bất kỳ phần nào đều có thể xem ngay thảo luận hoặc để lại concern/note kỹ thuật tương ứng mà không bị che khuất câu trả lời.
  - Tích hợp **Context Scope Selector (Phần liên quan)**: Dropdown tự động cập nhật khớp với tab đang xem ở trên khi người dùng chuyển đổi qua lại giữa 4 tab.
  - Tích hợp **Thanh Filter Pills**: Cho phép lọc nhanh bình luận theo từng mục (`Tất cả`, `📖 Lý Thuyết`, `🖥️ C++ Modeling`, `🔧 ECU / AUTOSAR`, `⚠️ Bẫy Phỏng Vấn`).
  - Gắn nhãn **Scope Badge** chuyên biệt trên từng thẻ bình luận và trong banner **Ghim Note Tác Giả (Pinned Note)**.
- **CAN FD Discussion & Pure Firebase Live Google Auth (`widget_can_fd.html`)**:
  - Tích hợp chuẩn **Firebase Live Google Sign-In & Cloud Firestore** (`tech-blogger-widgets`) cho hệ thống thảo luận thời gian thực; loại bỏ hoàn toàn các tài khoản mock/demo thử nghiệm cũ.
  - Hỗ trợ **Threaded Replies (Trả lời lồng nhau)**: Cho phép độc giả và tác giả trả lời trực tiếp comment của người khác với giao diện thụt lề chuẩn và mention tag `@TênNgườiNhận`.
  - Hỗ trợ **Author Mode & Pinned Notes**: Tác giả có huy hiệu vương miện `⭐ Tác Giả Blog`, có thể viết ghi chú đính chính/kinh nghiệm và Ghim (`📌 Ghim Note`) lên đầu danh sách câu hỏi.
  - Tương tác like & xóa bình luận chính chủ, lưu trữ thời gian thực trên Cloud Firestore và đồng bộ cache offline.
- feat: Bổ sung "Giao Thức Đồng Bộ Tài Liệu Liên Hoàn" (Mandatory Doc-Sync Protocol & DoD Checklist) vào hệ thống quy chuẩn (.agents/rules/blogger-embed-rules.md, AGENTS.md, SKILL.md) nhằm triệt tiêu hoàn toàn Documentation Drift giữa các phiên chat.
- feat: Chuẩn hóa quy tắc "Bẫy Kép" (Double-Angle Interview Trap) gồm 🚗 Automotive/Protocol Trap & 💻 C++/Modeling Follow-up Trap vào toàn bộ hệ thống luật (.agents/rules/blogger-embed-rules.md, AGENTS.md, SKILL.md, MAINTENANCE_PLAN.md và widget_can_fd.html).
- feat: Bổ sung tầng nội dung "🖥️ SystemC/C++ Modeling" vào cấu trúc Q&A Accordion (gồm UI Tab và Data Layer cho Item 2 và Item 3, đồng bộ vào MAINTENANCE_PLAN.md).
- feat: Bổ sung Q&A Cluster 2 ôn tập Frame Structure (BRS & Non-linear DLC) (Item [3], widget_can_fd.html)
- feat: Bổ sung Q&A Cluster 1 ôn nền tảng CAN Classic (CSMA/CR, Remote Frame, Overload Frame) (Item [2], widget_can_fd.html)
- feat: Xây Accordion Q&A Component làm infrastructure Q&A tương tác với bộ lọc Tag và Difficulty (Item [1], widget_can_fd.html)

### Planned
- Mô phỏng tương tác chạy chu kỳ truyền thông FlexRay (Interactive Cycle Simulator).
- Bộ tính thử CRC-11 và CRC-24 trực quan.
- Chế độ hiển thị song ngữ Việt - Anh.

---

## [1.4.0] - 2026-10-07

### Added
- **CAN FD Protocol Explorer (`widget_can_fd.html`)**: Khởi tạo widget mô phỏng tương tác mạng CAN FD mới với theme Amber/Orange đặc trưng:
  - *Tab 1 (Cấu Trúc Khung)*: Trực quan hóa cấu trúc CAN FD ở cấp độ Bit, nhấn mạnh cơ chế Dual Bit Rate qua cờ BRS và payload 64 bytes.
  - *Tab 2 (So Sánh)*: Bảng đối chiếu tiến hóa công nghệ chi tiết giữa Classic CAN 2.0, CAN FD và CAN XL.
  - *Tab 3 (Phỏng Vấn)*: Khung Placeholder chờ cập nhật ngân hàng câu hỏi Q&A phỏng vấn CAN FD.
- **Documentation**: Tạo hệ thống tài liệu chuẩn hoá cho CAN FD gồm `docs/can_fd/CURRENT_INFO.md` và `docs/can_fd/BACKLOG.md`.
- Cập nhật `README.md` thêm CAN FD vào danh mục Widget.

---

## [1.3.0] - 2026-10-07

### Added
- **FlexRay - Interview Q&A Accordion (Tab 4 - Q2)**: Bổ sung câu hỏi phỏng vấn thực chiến chuyên sâu **Q2**:
  - *Bản chất & Vai trò Sync Node*: Cung cấp mốc chuẩn toàn cầu, tham gia Coldstart. Khẳng định 100% Sync Node vẫn truyền nhận Application Payload data thông thường (lên tới 254 bytes), chỉ khác là bật bit cờ Header `Sync Frame Indicator = 1`.
  - *Bảng so sánh 4 chiều*: Đối chiếu chi tiết Sync Node vs Regular (Non-Sync) Node.
  - *Cơ chế bù lệch Clock Drift*: Phân tích quy trình 3 giai đoạn: Đo đạc Action Point $\Delta t_i$, thuật toán Fault-Tolerant Midpoint (FTM) lọc bỏ lỗi cực trị Byzantine do node hỏng, và bù lệch pha (Offset Correction) cùng bù lệch tần số (Rate Correction) tại khoảng lặng NIT.
  - *Bộ mô phỏng tương tác 4-Node (Interactive Clock Drift & FTM Visualizer)*: Trực quan hóa timeline 4 Node (Master Sync A, Steering Sync B, Brake C, Byzantine Faulty D) với 4 nút điều khiển thời gian thực và log tính toán FTM.
  - *Mở rộng Q3, Q4...*: Tạo sẵn slot placeholder Q3 cho câu hỏi tiếp theo.
- **Documentation**: Cập nhật `docs/flexray/CURRENT_INFO.md` tương ứng với giao diện và mã nguồn mới.

---

## [1.2.0] - 2026-10-07

### Added
- **FlexRay - Interview Q&A Deep-Dive (Tab 4)**: Bổ sung Tab 4 chuyên đề phỏng vấn kỹ sư ô tô / Automotive Architect giải quyết trọn vẹn câu hỏi Q2.3:
  - *Bẫy thuật ngữ*: Bóc tách sự thật không có "POC Frame", giải thích rõ POC State Machine điều khiển quá trình đồng bộ thông qua các Sync Frames.
  - *So sánh Static vs Dynamic*: Bảng đối chiếu 5 chiều giữa Static Segment (TDMA, tiền định tuyệt đối, payload cố định cho ASIL D) và Dynamic Segment (FTDMA minislot, ưu tiên theo Frame ID cho UDS/Events).
  - *Chế độ chạy*: Phân tích cơ chế Synchronous Mode (bù trừ độ lệch FTM trong khoảng NIT) và Free-Running Mode (dao động tự do khi mất Sync, hạ trạng thái POC xuống Normal Passive/Halt).
  - *Mẫu trả lời phỏng vấn*: Cung cấp cấu trúc câu trả lời mẫu 3 bước gãy gọn, sắc sảo cho ứng viên.
- **Documentation**: Cập nhật `docs/flexray/CURRENT_INFO.md` tương ứng với giao diện và mã nguồn 4 tabs mới.

---

## [1.1.0] - 2026-10-07

### Added
- **FlexRay - Dual-Channel Architecture**: Bổ sung card phân tích kiến trúc Kênh đôi (Channel A & B, 10 Mbps mỗi kênh) hỗ trợ 2 chế độ: Redundancy Mode (chuẩn an toàn ASIL D cho Steer/Brake-by-Wire) và High Bandwidth Mode (nâng băng thông lên 20 Mbps).
- **FlexRay - Node Buffer Mechanisms**: Bổ sung mô tả cơ chế Shadow Buffers (Double Buffering) và cơ chế khóa Input/Output Buffer Lock nhằm chống xung đột (race condition) giữa CPU và Protocol Engine; bổ sung phân loại Single Buffers vs Receive FIFO Buffers.
- **FlexRay - Symbol Window**: Gắn nhãn hiển thị trực quan `SW` (Symbol Window) vào khối màu vàng trong sơ đồ Communication Cycle, kèm theo bảng phân định 4 phân đoạn Bắt buộc (Static, NIT) vs Tùy chọn (Dynamic, Symbol Window).
- **Documentation**: Tạo hệ thống tài liệu chuẩn hoá gồm `docs/flexray/CURRENT_INFO.md`, `docs/flexray/BACKLOG.md`.
- **Agent Framework**: Thiết lập các quy chuẩn cho AI Agent gồm `AGENTS.md`, `.agents/rules/blogger-embed-rules.md`, và `.agents/skills/blogger-widget-creator/SKILL.md`.

### Fixed
- **FlexRay - Startup vs Wakeup**: Đính chính sự nhầm lẫn giữa đánh thức phần cứng (sử dụng tín hiệu xung vật lý Wakeup Pattern - WUP) và khởi tạo lịch trình chu kỳ mạng (sử dụng Coldstart Node phát ký hiệu CAS và Startup Frame).
- **FlexRay - Null Frame Indicator**: Làm rõ đặc tính kỹ thuật **Active-Low** của bit cờ Null Frame trong Header (`0` = Null Frame, `1` = Data Frame có dữ liệu).
- **FlexRay - Header CRC Coverage**: Đính chính phạm vi tính toán của 11-bit Header CRC chỉ bảo vệ đúng 20 bits cố định (Sync bit, Startup bit, Frame ID, Payload Length), không tính các bit thay đổi lúc runtime như Null bit hay Cycle Count.
- **FlexRay - Frame CRC Initialization Vectors**: Bổ sung chi tiết vector khởi tạo đa thức CRC-24 riêng biệt giữa Channel A (`0xFECABC`) và Channel B (`0xABCDEF`) nhằm triệt tiêu nguy cơ nhận nhầm khung chéo kênh.

---

## [1.0.0] - 2026-04-11

### Added
- Khởi tạo widget **FlexRay Protocol Explorer** (`widget_flexray.html`):
  - Tab 1: Khám phá tương tác 3 phân đoạn Header (5B), Payload (0-254B), Trailer (3B).
  - Tab 2: Quản lý dữ liệu Node giữa Host CPU, CHI và Message Buffers.
  - Tab 3: Phân loại 4 loại Frame và sơ đồ chu kỳ Communication Cycle.
- Khởi tạo widget **C++ OOP Simulator** (`widget_cpp_oop.html`): Mô phỏng tương tác các tính chất hướng đối tượng trong C++.

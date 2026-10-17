# Đặc Tả Kỹ Thuật Hiện Trạng: CAN FD Protocol Explorer (Current Info)

* **Tên file nguồn**: [`widget_can_fd.html`](../../widget_can_fd.html)
* **Phiên bản hiện tại**: `v1.6.0` (Chuẩn hóa toàn diện Ngân Hàng Câu Hỏi theo khung 5W-1H & Micro-STAR song ngữ, tích hợp Cổng Khám Phá Landing Portal Hub tương tác 3D Tilt theo chuột, bộ quy tắc bảo mật Cloud Firestore Zero-Trust và bộ kiểm soát pre-commit tự động sync-docs.js; tổng cộng 3,109 dòng code).
* **Ngày cập nhật**: `2026-10-17`
* **Mục đích**: Widget tương tác trực quan hóa kiến thức giao thức mạng ô tô CAN FD, tích hợp Cổng mở màn Landing Portal Hub 3D theo chuột, phân tích cấu trúc Frame ở cấp độ Bit, cơ chế BRS (Bit Rate Switch), bảng so sánh Classic CAN / CAN FD / CAN XL, hệ thống ngân hàng câu hỏi ôn luyện phỏng vấn ECU/AUTOSAR chuyên sâu, và hệ sinh thái Thảo luận cộng đồng kết nối Cloud Firestore (hỗ trợ Google Auth thật, trả lời lồng nhau, ghi chú tác giả, đồng bộ đa thiết bị, hỗ trợ Dark Mode). Phục vụ nhúng vào bài viết Google Blogger hoặc học tập độc lập.

---

## 1. Cách Nhúng Vào Google Blogger

**Nhúng Iframe Full-Width Breakout qua GitHub Pages (Tự động bung rộng 1200px, không bị bóp size):**
```html
<!-- Khối Widget Full-Width Breakout (Bung rộng 1200px tự động ra 2 bên lề Blogger) -->
<div style="position: relative; left: 50%; transform: translateX(-50%); width: min(96vw, 1200px); margin: 32px 0; text-align: center;">
    <iframe src="https://thathcmus.github.io/blogger/widget_can_fd.html" 
            width="100%" 
            height="1100px" 
            style="border: none; border-radius: 16px; box-shadow: 0 16px 48px rgba(0,0,0,0.1); background-color: #f8fafc; overflow: hidden; display: block;" 
            title="CAN FD Protocol Explorer"
            allow="fullscreen"
            allowfullscreen="true"
            loading="lazy">
    </iframe>
</div>
```

---

## 2. Thư Viện Phụ Thuộc (External Dependencies)

| Thư viện | Phiên bản | Nguồn CDN | Vai trò | Cơ chế An toàn (Fallback) |
| :--- | :--- | :--- | :--- | :--- |
| **Tailwind CSS** | v3.x | `https://cdn.tailwindcss.com` | Styling toàn bộ giao diện & `darkMode: 'class'` | Không gây crash nếu mất mạng, các thẻ vẫn giữ layout block |
| **Lucide Icons** | Latest | `https://unpkg.com/lucide@latest` | Icon minh họa SVG | Có `try...catch` bọc hàm khởi tạo `lucide.createIcons()`, không làm đứng UI |
| **Firebase App (Compat)** | v10.14.1 | `https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js` | Khởi tạo kết nối Firebase Project | Chạy bọc `try...catch`, fallback sang lưu trữ cục bộ |
| **Firebase Auth (Compat)** | v10.14.1 | `https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js` | Google OAuth Popup Sign-In | Tự phát hiện môi trường `file:///` và hướng dẫn đăng nhập trên web |
| **Firebase Firestore (Compat)** | v10.14.1 | `https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js` | Cloud Database & Realtime Sync | Đồng bộ song song qua `localStorage` làm cache offline dự phòng |

---

## 3. Kiến Trúc Chi Tiết Các Tab Giao Diện

### Header & Hệ Thống Nhận Diện Người Dùng (Firebase Live Google Auth)
- **Theme Toggle (#btn-theme)**: Nút bấm Sun/Moon thông minh trên Header, cho phép chuyển đổi tức thì giữa chế độ **Sáng** (Light) và **Tối** (Dark). Tự động nhận diện theme hệ thống (`prefers-color-scheme`) nếu người dùng chưa cài đặt, lưu trữ trạng thái bền vững trong `localStorage('canfd_theme')`.
- **Language Toggle**: Nút bấm góc trên bên phải cho phép chuyển đổi ngôn ngữ linh hoạt giữa 🇻🇳 **Tiếng Việt** và 🇬🇧 **English**.
- **User Auth Bar**: Hiển thị trạng thái đăng nhập người dùng (Profile Chip với Avatar Google thật + Tên + Nút Đổi tài khoản + Nút Đăng xuất).
- **Google Sign-In & Firebase Auth Modal**:
  - 🚀 **Tiếp tục với Google (Live Cloud Sign-In)**: Mở popup Google Auth thật qua `firebase.auth().signInWithPopup()`. Người dùng hoặc tác giả (`thathcmus@gmail.com`) đăng nhập bằng tài khoản Google thật.
  - 🛡️ **Tự động nhận diện quyền Tác Giả**: Khi email đăng nhập là `thathcmus@gmail.com`, hệ thống tự cấp role `Author` và huy hiệu `⭐ Tác Giả Blog`, mở khóa tính năng Ghim Note (`📌 Ghim Note`) và xóa bình luận.
- **Cloud Firestore Realtime Sync**: Kết nối collection `canfd_comments` tại Firebase project `tech-blogger-widgets`. Lắng nghe thay đổi thời gian thực qua `onSnapshot`, kết hợp cache offline `localStorage`.

### Cổng Khám Phá: Landing Portal Hub (3D Tilt Mouse-Tracking & Interactive Entry)
Trang mở màn tương tác công nghệ cao đóng vai trò là "Visual Hook" đầu tiên khi độc giả truy cập widget:
- **Interactive 3D Tilt & Dynamic Glare**: 3 thẻ chuyên đề xếp dọc tự động xoay nghiêng theo góc chuột (`perspective(1000px) rotateX(...) rotateY(...) translateY(-4px)`) và vệt sáng phản chiếu (Radial Spotlight Glare) bám theo tọa độ con trỏ `(x, y)`.
- **Card 01 - Cấu Trúc Khung (Frame Architecture)**: Trực quan hóa dao động ký Oscilloscope với xung sóng vi sai CAN FD chuyển đổi nhịp nhàng giữa Arbitration Phase (1 Mbps) và Data Phase (8 Mbps) qua vạch laser BRS; nút bấm cam vàng với hiệu ứng xung nhịp hào quang (`animate-cta-pulse`).
- **Card 02 - So Sánh Các Thế Hệ (Generations Benchmark Matrix)**: Thước đo băng thông và thanh Payload đối chiếu trực quan Classic CAN, CAN FD (8 Mbps / 64B), và CAN XL (20+ Mbps / 2048B).
- **Card 03 - Q&A Phỏng Vấn (ECU & AUTOSAR Question Bank)**: Sơ đồ vi mạch ECU kết nối 4 mạch phát sáng đại diện cho 4 tầng kiến thức chuyên sâu.
- **Chuyển Cảnh & Điều Hướng Mượt**: Click vào nút bấm tại bất kỳ thẻ nào sẽ kích hoạt `enterExplorer(tabId)` chuyển cảnh fade/slide mượt mà vào giao diện tương tác chi tiết; nút `Tổng Quan` (`#btn-tab-portal`) trên thanh nav cho phép quay lại Portal Hub tức thì.

### Tab 1: Cấu Trúc Khung Truyền CAN FD (Base Frame Format)
Cung cấp bản đồ tương tác bit-level của frame CAN FD:
- **Arbitration Phase (Nominal Bit Rate)**: SOF, 11-bit ID, RRS (thay thế RTR), IDE. Truyền ở tốc độ nền (chậm) để phân xử an toàn.
- **Control Field**: FDF (Flexible Data Rate), res, **BRS (Bit Rate Switch)**, ESI, DLC (4-bit phi tuyến tính đến 64 bytes).
- **Data Phase (High Bit Rate)**: Chứa Payload từ 0 đến 64 Bytes. Đoạn này tăng tốc độ nhờ cờ BRS.
- **CRC Field**: SBC (Stuff Bit Count mới của CAN FD), CRC (17-bit cho &le; 16 bytes / 21-bit cho &gt; 16 bytes), CRC Delimiter (Mốc giảm tốc độ về lại Nominal).
- **ACK & EOF**: Xác nhận và kết thúc khung, truyền ở tốc độ Nominal.
- Toàn bộ các segment và khung chi tiết `#field-details` được trang bị Dark Mode với các dải màu tương phản chuẩn WCAG.

### Tab 2: So Sánh Thế Hệ (Classic CAN vs CAN FD vs CAN XL)
Bảng đối chiếu 4 chiều (Max Payload, Max Data Rate, Cơ chế Baudrate, Ứng dụng thực tế ô tô). Nhấn mạnh sự đột phá của CAN FD (64B, Dual Bit Rate 8Mbps). Hỗ trợ Dark Mode với viền `border-slate-800` và nền `bg-slate-900`.

### Tab 3: Q&A Phỏng Vấn & Hệ Sinh Thái Thảo Luận (Community Discussions & Notes)
Ngân hàng câu hỏi dạng thẻ Accordion tương tác với bộ lọc theo **Độ Khó** (Basic, Intermediate, Advanced, Senior) và **Chủ Đề (Tags)**.
Mỗi thẻ câu hỏi được cấu trúc chặt chẽ gồm **4 sub-tabs nội dung cốt lõi** và **Khung Thảo Luận & Ghi Chú Kỹ Thuật nằm cố định bên dưới câu trả lời**:
1. **📖 Lý Thuyết (Theory)**: Bản chất vật lý, giao thức theo chuẩn ISO 11898-1:2015.
2. **🖥️ SystemC/C++ Modeling**: Thiết kế kiến trúc mô phỏng, registers, FSM, TLM, resolution functions và C++ idioms.
3. **🔧 ECU/AUTOSAR Practice**: Cấu hình stack BSW thực tế (CanIf, CanSM, PduR, MCAL) và xử lý ngắt MCU.
4. **⚠️ Interview Trap (Bẫy Kép Double-Angle)**:
   - 🚗 **Góc độ Automotive / Protocol:** Bẫy về starvation, bus load, timing, hardware constraints.
   - 💻 **Góc độ C++ / Modeling Follow-up:** Bẫy vặn lại khi ứng viên đề cập đến C++/SystemC (race condition, delta cycle, bitfield endianness, cache locality, lock contention).

#### Khung Thảo Luận & Ghi Chú Kỹ Thuật (Nằm Cố Định Phía Dưới CẢ 4 Tab):
- **Luôn hiển thị trực tiếp bên dưới câu trả lời**: Độc giả hoặc tác giả đang xem bất kỳ tab nào đều có ngay khung thảo luận bên dưới để note hoặc nêu concern mà không làm mất ngữ cảnh.
- **Tự động đồng bộ Scope (Phần liên quan)**: Ô nhập bình luận tự động chọn phạm vi theo tab đang xem (ví dụ đang xem tab ECU thì dropdown tự động chọn `🔧 ECU/AUTOSAR`), giúp gắn tag chính xác cho từng note.
- **Bộ lọc thảo luận nhanh (Filter Pills)**: Hỗ trợ lọc danh sách bình luận theo từng tab: `Tất cả`, `📖 Lý Thuyết`, `🖥️ C++ Modeling`, `🔧 ECU / AUTOSAR`, `⚠️ Bẫy Phỏng Vấn`.
- **Huy hiệu phần liên quan trên từng Comment**: Mỗi bình luận hiển thị rõ ràng thuộc phần nào.
- **Ghi chú tác giả & Ghim Note (Pinned Notes)**: Banner màu hổ phách dành riêng cho note đính chính / kinh nghiệm từ Tác Giả (Thật Huỳnh).
- **Trả lời lồng nhau (Threaded Replies)**: Nút `Trả lời` inline, thụt lề có tag `@NgườiNhận`.
- **Tương tác like & xóa**: Hỗ trợ đếm like thời gian thực và xóa bình luận chính chủ được lưu lên Cloud Firestore.

---

## 4. Bản Đồ Mã Nguồn (Source Code Architecture)

* **Dòng 1 – 115**: HTML Head, cấu hình Tailwind CDN (`darkMode: 'class'`, custom colors `slate-850`, `slate-750`), CDN scripts (Tailwind, Lucide, Firebase App/Auth/Firestore Compat v10.14.1), CSS keyframes (`fadeIn`, `no-scrollbar`, `portal-tilt-card`, `portal-cyber-grid`, `waveScan`, `ctaPulseRing`, `signalDash`).
* **Dòng 116 – 150**: Root container `#canfd-explorer-root`, Header Split 2 cột chống đè chữ (`flex flex-col md:flex-row md:items-center md:justify-between`), User Auth Dropdown Popover (`#auth-header-container`, `#user-profile-dropdown`), nút chuyển đổi Theme Sun/Moon (`#btn-theme`), nút chuyển ngữ (`#lang-indicator`), nút toàn màn hình (`#btn-fullscreen`).
* **Dòng 151 – 195**: Modal Google Sign-In & Firebase Auth (`#google-auth-modal`), nút đăng nhập thật qua Firebase popup Google và hướng dẫn xử lý tên miền ủy quyền.
* **Dòng 196 – 442**: **Cổng Khám Phá Mở Màn Landing Portal Hub** (`#portal-hub-view`): Banner chào mừng, 3 thẻ xếp dọc tương tác 3D tilt theo chuột (Oscilloscope waveform, Benchmark speedometer, Microchip ECU) và các nút điều hướng chuyển cảnh.
* **Dòng 443 – 672**: **Khung Nội Dung Chính** (`#main-content-view`):
  - **Floating Sticky Navigation Bar** (`#smart-nav-container`, `#main-nav-tabs`): Nút `Tổng Quan` (`#btn-tab-portal`) và 3 nút chuyển Tab (`#btn-tab-frame`, `#btn-tab-compare`, `#btn-tab-interview`).
  - **Tab 1** (`#tab-frame`): Bản đồ bit CAN FD tương tác và khung chi tiết `#field-details`.
  - **Tab 2** (`#tab-compare`): Bảng So Sánh Thế Hệ Giao Thức (Classic CAN vs CAN FD vs CAN XL).
  - **Tab 3** (`#tab-interview`): Tiêu đề và Bộ lọc độ khó & chủ đề (`#qa-filter-header-group`), danh sách thẻ Q&A Accordion (`div#qa-container`), empty state và WIP banner.
* **Dòng 673 – 854**: Dictionary `i18n` hỗ trợ đa ngôn ngữ (vi/en) cho toàn bộ hệ thống nhãn, Google Sign-In, User Profile Dropdown, Landing Portal Hub và tooltip Theme Toggle.
* **Dòng 855 – 1333**: Data Layer `qaData`: Mảng Object song ngữ 7 câu hỏi chuẩn hóa 100% theo khung 5W-1H (📌 What, 💡 Why, ⏱️ When, 📍 Where, ⚙️ Who & How) và Micro-STAR (🚨 Situation, 🎯 Task, 🛠️ Action song song 🚗 vs 💻, 📊 Result), bao gồm Item 2 (CAN Classic Foundation), Item 3 (Frame Structure & BRS/DLC), và Item 4 (Dynamic/Fixed Bit Stuffing & SBC Gray-code CRC-17/21).
* **Dòng 1334 – 1370**: State variables (`qaState`, `currentDifficulty`, `currentTag`) và cấu hình Firebase (`firebaseConfig`).
* **Dòng 1371 – 1675**: Controller Firebase Live Auth & Cloud Firestore Engine (`initFirebaseAuthListener()`, `signInWithGoogle()`, `logoutUser()`, `initFirestoreSync()`, `getAllComments()`, `saveAllCommentsLocally()`).
* **Dòng 1676 – 1765**: Controller render UI Header & User Profile Popover Dropdown (`renderAuthHeader()`, `toggleUserProfileMenu()`, `closeUserProfileMenu()`, click-outside listener), phân loại comment gốc/replies, lọc theo Filter Pills, render author badges & pinned notes với dark palette chuẩn.
* **Dòng 2051 – 2330**: Handlers tương tác thảo luận kết nối Cloud Firestore (`toggleReplyBox()`, `postComment()`, `postReply()`, `togglePinComment()`, `toggleLike()`, `deleteComment()`, `updateBadgeCount()`).
* **Dòng 2331 – 2475**: Controller Q&A Cards (`renderQACards()`): Hiển thị chiều cao tự nhiên không scrollbar lồng, Dark Mode toàn diện.
* **Dòng 2476 – 2580**: Controller Accordion (`toggleAnswer()`): Single-Open Accordion với Scroll Focus mượt mà.
* **Dòng 2581 – 2615**: Sub-tab switcher (`switchQATab()`): Chuyển đổi 4 tầng kiến thức và đồng bộ scope selector.
* **Dòng 2616 – 2675**: Handlers lọc câu hỏi (`applyFilters()`, `filterByDifficulty()`, `filterByTag()`, `resetFilters()`, `updateFilterUI()`).
* **Dòng 2676 – 2795**: Data cho Segment Frame (`segmentData`).
* **Dòng 2796 – 2875**: Controllers 3D Tilt Cards & Portal Hub (`initTiltCards()`, `enterExplorer()`, `backToPortal()`).
* **Dòng 2876 – 2935**: Navigation & View Switcher (`switchTab()`, `selectSegment()`).
* **Dòng 2936 – 2985**: Theme Engine (`getPreferredTheme()`, `applyTheme()`, `toggleTheme()`, `initTheme()`).
* **Dòng 2986 – 3035**: Sự kiện `DOMContentLoaded`: Khởi tạo Theme, khởi tạo 3D Tilt, gán listeners tab/portal, áp dụng i18n, kết nối Firebase Auth/Firestore, render Q&A Cards và Lucide icons. (File tổng cộng 3,109 dòng, 100% comment Tiếng Anh, đạt chuẩn Verification Protocol `Syntax OK`).

---

## 5. Kiến Trúc Bảo Mật Cloud (Firebase Security Rules & Zero-Trust)

* **Tệp cấu hình**: [`firestore.rules`](../../firestore.rules) & [`firebase.json`](../../firebase.json)
* **Triết lý bảo vệ**: **Zero-Trust & Public Identifier Pattern**
  * Firebase Web `apiKey` đóng vai trò là Application Identifier (công khai hợp lệ trên web).
  * Toàn bộ tính toàn vẹn dữ liệu được bảo vệ nghiêm ngặt ở tầng Server thông qua Firebase Security Rules:
    * **Quyền Đọc (`allow read`)**: Công khai (`if true`) cho tất cả độc giả để có thể xem thảo luận kỹ thuật.
    * **Quyền Tạo (`canCreateComment`)**: Bắt buộc đăng nhập Firebase Auth (`request.auth != null`), xác thực danh tính chống mạo danh (`userId == auth.uid`, `userEmail == auth.token.email`), kiểm soát độ dài nội dung (1–2000 ký tự), khởi tạo like bằng 0 và chỉ cho phép Tác giả (`thathcmus@gmail.com`) tạo kèm cờ ghim (`isPinned: true`).
    * **Quyền Sửa (`canUpdateComment`)**: Chỉ cho phép 2 thao tác nguyên tử:
      * Tác giả ghim/bỏ ghim bài (`diff().affectedKeys().hasOnly(['isPinned'])`).
      * Độc giả thả tim / bỏ tim (`diff().affectedKeys().hasOnly(['likes', 'likedBy'])`), nghiêm cấm sửa trộm nội dung hoặc thông tin tác giả.
    * **Quyền Xóa (`canDeleteComment`)**: Chỉ chính chủ bình luận (`resource.data.userId == auth.uid`) hoặc Tác giả blog (`thathcmus@gmail.com`) mới có quyền xóa.
    * **Default Deny**: Chặn toàn bộ mọi collection/document khác (`match /{document=**} { allow read, write: if false; }`).

---

## 6. Tài Liệu Liên Quan & Kế Hoạch Bảo Trì
 
- **Báo cáo đánh giá chiến lược từ Argon 4**: [`ARGON_REVIEW.md`](ARGON_REVIEW.md) — Toàn văn phân tích Signal-to-Bloat, 6 lỗ hổng kiến thức, Top 3 câu hỏi phỏng vấn sát thủ và kiến trúc Inline Micro-Labs.
- **Bộ quy tắc bảo mật Cloud**: [`firestore.rules`](../../firestore.rules) — Cấu hình rules chính thức triển khai trên Firebase Console / CLI.
- **Kế hoạch bảo trì chi tiết & Ground Truth**: [`MAINTENANCE_PLAN.md`](MAINTENANCE_PLAN.md) — Tài liệu theo dõi tiến độ 60 ngày (20 Items), lưu trữ toàn bộ nội dung Q&A gốc, và lộ trình tích hợp các Micro-Lab tương tác.
- **Backlog tính năng tổng thể**: [`BACKLOG.md`](BACKLOG.md) — Danh sách tính năng mở rộng dài hạn ([CANFD-001] đến [CANFD-011]).

# Đặc Tả Kỹ Thuật Hiện Trạng: CAN FD Protocol Explorer (Current Info)

* **Tên file nguồn**: [`widget_can_fd.html`](../../widget_can_fd.html)
* **Phiên bản hiện tại**: `v1.4.0` (Bổ sung Dark Mode toàn diện: Nút chuyển Sáng / Tối thông minh `#btn-theme`, tự động nhận diện `prefers-color-scheme`, lưu `localStorage`, đồng bộ màu Dark Palette cao cấp cho cả 3 Tab, khung so sánh, Q&A 4 tầng và hệ thống thảo luận Firebase; tổng cộng 2,233 dòng code).
* **Ngày cập nhật**: `2026-10-17`
* **Mục đích**: Widget tương tác trực quan hóa kiến thức giao thức mạng ô tô CAN FD, phân tích cấu trúc Frame ở cấp độ Bit, cơ chế BRS (Bit Rate Switch), bảng so sánh Classic CAN / CAN FD / CAN XL, hệ thống ngân hàng câu hỏi ôn luyện phỏng vấn ECU/AUTOSAR chuyên sâu, và hệ sinh thái Thảo luận cộng đồng kết nối Cloud Firestore (hỗ trợ Google Auth thật, trả lời lồng nhau, ghi chú tác giả, đồng bộ đa thiết bị, hỗ trợ Dark Mode). Phục vụ nhúng vào bài viết Google Blogger hoặc học tập độc lập.

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

#### Khung Thảo Luận & Ghi Chú Kỹ Thuật (Nằm Cố Định Phía Dưới Cả 4 Tab):
- **Luôn hiển thị trực tiếp bên dưới câu trả lời**: Độc giả hoặc tác giả đang xem bất kỳ tab nào đều có ngay khung thảo luận bên dưới để note hoặc nêu concern mà không làm mất ngữ cảnh.
- **Tự động đồng bộ Scope (Phần liên quan)**: Ô nhập bình luận tự động chọn phạm vi theo tab đang xem (ví dụ đang xem tab ECU thì dropdown tự động chọn `🔧 ECU/AUTOSAR`), giúp gắn tag chính xác cho từng note.
- **Bộ lọc thảo luận nhanh (Filter Pills)**: Hỗ trợ lọc danh sách bình luận theo từng tab: `Tất cả`, `📖 Lý Thuyết`, `🖥️ C++ Modeling`, `🔧 ECU / AUTOSAR`, `⚠️ Bẫy Phỏng Vấn`.
- **Huy hiệu phần liên quan trên từng Comment**: Mỗi bình luận hiển thị rõ ràng thuộc phần nào.
- **Ghi chú tác giả & Ghim Note (Pinned Notes)**: Banner màu hổ phách dành riêng cho note đính chính / kinh nghiệm từ Tác Giả (Thật Huỳnh).
- **Trả lời lồng nhau (Threaded Replies)**: Nút `Trả lời` inline, thụt lề có tag `@NgườiNhận`.
- **Tương tác like & xóa**: Hỗ trợ đếm like thời gian thực và xóa bình luận chính chủ được lưu lên Cloud Firestore.

---

## 4. Bản Đồ Mã Nguồn (Source Code Architecture)

* **Dòng 1 – 40**: HTML Head, cấu hình Tailwind CDN (`darkMode: 'class'`, custom colors `slate-850`, `slate-750`), CDN scripts (Tailwind, Lucide, Firebase App/Auth/Firestore Compat v10.14.1), CSS keyframes (`fadeIn`, `no-scrollbar`, inline code theme styles).
* **Dòng 41 – 65**: Root container `#canfd-explorer-root`, Header, User Auth bar (`#auth-header-container`), nút chuyển đổi Theme Sun/Moon (`#btn-theme`), nút chuyển ngữ (`#lang-indicator`), nút toàn màn hình (`#btn-fullscreen`).
* **Dòng 66 – 110**: Modal Google Sign-In & Firebase Auth (`#google-auth-modal`), nút đăng nhập thật qua Firebase popup Google và hướng dẫn xử lý tên miền ủy quyền.
* **Dòng 111 – 130**: **Floating Sticky Navigation Bar** (`#smart-nav-container`, `#main-nav-tabs` - `sticky top-2 z-30`): Thanh điều hướng 3 tab chính nhỏ gọn nổi nhẹ nhàng trên đầu trang với hiệu ứng kính mờ (glassmorphism), hỗ trợ đầy đủ Dark Theme.
* **Dòng 131 – 250**: Cụm giao diện Tab 1 (Bản đồ bit CAN FD tương tác và khung chi tiết `#field-details`).
* **Dòng 251 – 275**: Cụm giao diện Tab 2 (Bảng So Sánh Thế Hệ Giao Thức).
* **Dòng 276 – 370**: Cụm giao diện Tab 3 (Ngân hàng câu hỏi Q&A): Cụm Tiêu đề và Bộ lọc độ khó & chủ đề (`#qa-filter-header-group`) được đặt ngay đầu Tab 3 theo luồng tự nhiên của tài liệu; danh sách câu hỏi `div#qa-container`, empty state và WIP banner.
* **Dòng 371 – 510**: Dictionary `i18n` hỗ trợ đa ngôn ngữ (vi/en) cho toàn bộ hệ thống nhãn, Google Sign-In và tooltip Theme Toggle.
* **Dòng 511 – 650**: Data Layer `qaData`: Mảng Object song ngữ chứa 4 tầng kiến thức chuẩn ISO 11898-1 và bẫy kép.
* **Dòng 651 – 675**: Cấu hình Firebase (`firebaseConfig`), khởi tạo SDK.
* **Dòng 676 – 955**: Controller Firebase Live Auth & Cloud Firestore Engine (`initFirebaseAuthListener()`, `signInWithGoogle()`, `logoutUser()`, `initFirestoreSync()`, `getAllComments()`, `saveAllCommentsLocally()`).
* **Dòng 956 – 1358**: Controller render UI Header & Thảo luận (`renderAuthHeader()`, `renderCommentsUI()`), phân loại comment gốc/replies, lọc theo Filter Pills, render author badges & pinned notes với dark palette chuẩn.
* **Dòng 1359 – 1640**: Handlers tương tác thảo luận kết nối Cloud Firestore (`toggleReplyBox()`, `postComment()`, `postReply()`, `togglePinComment()`, `toggleLike()`, `deleteComment()`, `updateBadgeCount()`).
* **Dòng 1641 – 1775**: Controller Q&A Cards (`renderQACards()`):
  - Hiển thị đầy đủ chiều cao nội dung câu trả lời tự nhiên, không còn scrollbar lồng gây kẹt cuộn.
  - Hỗ trợ Dark Mode trên toàn bộ sub-tabs, tags, diff-colors và khung discussion.
* **Dòng 1776 – 1875**: Controller Accordion (`toggleAnswer()`): Single-Open Accordion với Scroll Focus mượt mà và tương thích Dark Mode.
* **Dòng 1876 – 1905**: Sub-tab switcher (`switchQATab()`): Chuyển đổi 4 tầng kiến thức và đồng bộ scope selector.
* **Dòng 1906 – 1964**: Handlers lọc câu hỏi (`applyFilters()`, `filterByDifficulty()`, `filterByTag()`, `resetFilters()`, `updateFilterUI()`).
* **Dòng 1965 – 2081**: Data cho Segment Frame (`segmentData`).
* **Dòng 2082 – 2145**: `switchTab()`, `selectSegment()`.
* **Dòng 2213 – 2233**: Sự kiện `DOMContentLoaded`: Khởi tạo Theme, gán listeners tab, áp dụng i18n, kết nối Firebase Auth/Firestore, render Q&A Cards và Lucide icons. (File tổng cộng 2,233 dòng, 100% comment Tiếng Anh, đạt chuẩn Verification Protocol `Syntax OK`).

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

- **Bộ quy tắc bảo mật Cloud**: [`firestore.rules`](../../firestore.rules) — Cấu hình rules chính thức triển khai trên Firebase Console / CLI.
- **Kế hoạch bảo trì chi tiết & Ground Truth**: [`MAINTENANCE_PLAN.md`](MAINTENANCE_PLAN.md) — Tài liệu theo dõi tiến độ 60 ngày (20 Items) và lưu trữ toàn bộ nội dung Q&A gốc.
- **Backlog tính năng tổng thể**: [`BACKLOG.md`](BACKLOG.md) — Danh sách tính năng mở rộng dài hạn (Calculator, Waveform Simulator...).

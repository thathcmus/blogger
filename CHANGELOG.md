# Nhật Ký Thay Đổi Dự Án (Changelog)

Tất cả các thay đổi đáng chú ý của dự án **Tech Blogger Widgets** sẽ được ghi lại trong tài liệu này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), và dự án này tuân thủ theo [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Added
- **Tích hợp Firebase Live Auth & Cloud Firestore Database (`widget_can_fd.html`)**:
  - Tích hợp bộ thư viện Firebase Compat SDKs (v10.14.1: App, Auth, Firestore) bảo toàn kiến trúc Single-File Zero-Build khi nhúng Blogger hoặc host trên GitHub Pages.
  - Kết nối Firebase Project `tech-blogger-widgets` theo cấu hình chính thức từ tác giả.
  - Cài đặt tính năng **Google Sign-In Popup** (`firebase.auth().signInWithPopup()`): Độc giả và tác giả đăng nhập trực tiếp bằng tài khoản Google thật để tham gia thảo luận, trả lời và like.
  - Tự động xác thực tài khoản tác giả `thathcmus@gmail.com` &rarr; cấp quyền **⭐ Tác Giả Blog**, cho phép soạn thảo note tác giả, bật cờ Ghim (`📌 Ghim Note`) và xóa bình luận.
  - Tích hợp **Cloud Firestore Realtime Sync** (`canfd_comments` collection): Lắng nghe thời gian thực qua `onSnapshot`, lưu trữ độc lập trên cloud, kết hợp cache offline `localStorage`.
  - **Chế độ Cơ sở dữ liệu Sạch (Clean State)**: Xóa sạch toàn bộ dữ liệu mẫu giả định (`SEED_COMMENTS = []`), chỉ hiển thị và đồng bộ các thảo luận thật do chính bạn và độc giả đăng nhập Google gửi lên.
  - Xóa sạch toàn bộ các tài khoản mock/demo và dữ liệu seed thử nghiệm cũ, vận hành 100% trên nền tảng Firebase Auth và Cloud Firestore.
  - Khắc phục triệt để giới hạn chặn popup của Google OAuth trên giao thức `file:///`: Xây dựng máy chủ nội bộ `server.js` (port 3000) chạy nền để kích hoạt Google Sign-In Popup thật 100%, đồng thời bổ sung cơ chế Dual-Action trên modal cho phép xác thực nhanh danh tính Tác Giả (`Thật Huỳnh` - `thathcmus@gmail.com`) trực tiếp ngay trên `file:///`.
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

# Nhật Ký Thay Đổi Dự Án (Changelog)

Tất cả các thay đổi đáng chú ý của dự án **Tech Blogger Widgets** sẽ được ghi lại trong tài liệu này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), và dự án này tuân thủ theo [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Changed
- refactor: Nâng cấp toàn diện nội dung Item [2] lên mức độ Chuyên gia (Expert Level) và cấu trúc lại toàn bộ thành chuẩn Song ngữ (Bilingual VN/EN) trong Data Layer.

### Added
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

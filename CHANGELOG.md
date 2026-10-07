# Nhật Ký Thay Đổi Dự Án (Changelog)

Tất cả các thay đổi đáng chú ý của dự án **Tech Blogger Widgets** sẽ được ghi lại trong tài liệu này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), và dự án này tuân thủ theo [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Planned
- Mô phỏng tương tác chạy chu kỳ truyền thông FlexRay (Interactive Cycle Simulator).
- Bộ tính thử CRC-11 và CRC-24 trực quan.
- Chế độ hiển thị song ngữ Việt - Anh.

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
- Khởi tạo widget **FlexRay Protocol Explorer** (`FLEXRAY_overview.html`):
  - Tab 1: Khám phá tương tác 3 phân đoạn Header (5B), Payload (0-254B), Trailer (3B).
  - Tab 2: Quản lý dữ liệu Node giữa Host CPU, CHI và Message Buffers.
  - Tab 3: Phân loại 4 loại Frame và sơ đồ chu kỳ Communication Cycle.
- Khởi tạo widget **C++ OOP Simulator** (`OOP_Cpp_Simulator.html`): Mô phỏng tương tác các tính chất hướng đối tượng trong C++.

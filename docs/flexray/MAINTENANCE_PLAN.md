# Kế Hoạch Bảo Trì & Ground Truth Q&A: FlexRay Protocol Explorer

* **Widget liên quan**: [`widget_flexray.html`](../../widget_flexray.html)
* **Ngày khởi tạo**: `2026-10-17`
* **Trạng thái**: Đang vận hành (Q1 & Q2 đã hoàn chỉnh, Q3+ sẵn sàng mở rộng)

---

## 1. Tiến Độ Tổng Quan Ngân Hàng Câu Hỏi

| # | Chủ đề | Trạng thái | Sprint |
|---|--------|-----------|--------|
| Q1 | Đồng Bộ Thời Gian (Time-Triggered) & Kiến Trúc Tích Hợp FlexRay | ✅ Done | Sprint 1 |
| Q2 | Đồng Bộ Xung Clock, Thuật Toán FTM & Bản Chất Sync Node | ✅ Done | Sprint 1 |
| Q3 | Coldstart / Wakeup Pattern (WUP) / Phân Xử Va Chạm CAS | 📋 Planned | Sprint 2 |
| Q4 | Bus Guardian & Safety Mechanisms (ASIL D) | 📋 Planned | Sprint 2 |

---

## 2. Ground Truth Q&A Hoàn Chỉnh

### Q1: Đồng Bộ Thời Gian (Time-Triggered) & Kiến Trúc Tích Hợp FlexRay

**Đề bài câu hỏi gốc:**
> "Mạng FlexRay có đặc tính đồng bộ thời gian (Time-Triggered) rất đặc thù. Ở mức độ tìm hiểu và tích hợp kiến trúc (broad exposure), bạn hiểu thế nào về Static Segment vs Dynamic Segment, cơ chế đồng bộ chu kỳ qua POC frame và các chế độ chạy (Synchronous vs Free-running mode)?"

#### Phần 1: Bóc Tách Bẫy Thuật Ngữ — "POC Frame" Có Thực Sự Tồn Tại?

**Không có khái niệm "POC Frame" trong đặc tả chuẩn FlexRay (ISO 17458 / FlexRay Spec v3.0.1)!** Đây là một câu hỏi bẫy kinh điển để đánh giá ứng viên hiểu sâu bản chất kiến trúc hay chỉ nhớ mặt chữ:

- **POC (Protocol Operation Control)**: Là **Bộ máy trạng thái hữu hạn (State Machine)** tích hợp trong phần cứng Controller. POC điều khiển các pha vận hành của node: `DEFAULT_CONFIG` → `CONFIG` → `READY` → `STARTUP` → `NORMAL_ACTIVE` / `NORMAL_PASSIVE` → `HALT`. *POC không phải là một loại frame truyền trên bus.*
- **Cơ Chế Đồng Bộ Qua Sync Frame**: Chu kỳ được đồng bộ bằng các **Sync Frames** (các khung có bit `Sync Frame Indicator = 1`) được phát bởi các Sync Nodes theo lịch trình cố định. POC State Machine của node nhận sẽ lắng nghe, giám sát và điều khiển quá trình khóa đồng bộ này.

#### Phần 2: So Sánh Static Segment vs Dynamic Segment (5 chiều)

| Đặc tính kiến trúc | Static Segment (TDMA) | Dynamic Segment (FTDMA) |
| :--- | :--- | :--- |
| Cơ chế truy cập bus | **TDMA** (Time Division Multiple Access) — Chia thời gian thành các slot cố định bằng nhau | **FTDMA** (Flexible TDMA) — Phân chia theo các Mini-slots rất ngắn |
| Tính tiền định (Determinism) | **Tiền định cứng 100%**. Jitter cực thấp, độ trễ và thời điểm phát được tính toán chính xác tuyệt đối | **Ưu tiên linh hoạt**. Trọng tài theo Frame ID: Node có Frame ID nhỏ hơn sẽ chiếm quyền phát trước |
| Độ dài Payload | Bắt buộc **cố định và bằng nhau** cho mọi frame trong cùng cluster (`gPayloadLengthStatic`) | **Co giãn linh hoạt** theo từng frame (0 đến 254 bytes) |
| Xử lý khi không có dữ liệu | Tự phát **Null Frame** (Active-Low: bit = 0) để duy trì cấu trúc nhịp thời gian slot | Minislot tự động trôi qua (chỉ tốn vài µs), giải phóng băng thông |
| Ứng dụng tiêu biểu | Tín hiệu an toàn cao (**ASIL D**): Phanh điện tử (Brake-by-Wire), Lái điện tử (Steer-by-Wire), Powertrain | Dữ liệu sự kiện (Event-triggered), Chẩn đoán **UDS (ISO 14229)**, Calibration XCP |

#### Phần 3: Chế Độ Vận Hành — Synchronous Mode vs Free-Running Mode

**Synchronous Mode (Bình Thường)**:
- Trạng thái chuẩn của node khi tham gia giao tiếp (POC ở `NORMAL_ACTIVE`).
- **Đo đạc**: Node liên tục lắng nghe Sync Frames từ các Sync Nodes để đo độ lệch thời gian xuất hiện thực tế so với lịch trình.
- **Thuật toán FTM**: Trong khoảng NIT, node chạy *Fault-Tolerant Midpoint* để lọc bỏ nhiễu và tính giá trị bù trừ.
- **Hiệu chỉnh nhịp**: Co/giãn các Microtick để Macrotick toàn mạng đồng bộ chính xác tới µs.

**Free-Running Mode (Mất Đồng Bộ / Suy Giảm)**:
- Trạng thái khi node bị cô lập hoặc mất kết nối với Sync Nodes.
- **Mất nguồn tham chiếu**: Không nhận đủ Sync Frames hợp lệ để tính FTM.
- **Chạy theo thạch anh nội bộ**: Đồng hồ trôi tự do (drift) theo Local Oscillator.
- **Xử lý lỗi POC**: Nếu lỗi đồng bộ kéo dài qua nhiều chu kỳ (`pClockCorrectionFailed`), POC chuyển sang `NORMAL_PASSIVE` (chỉ nghe, ngừng phát) hoặc `HALT` để không phá vỡ slot TDMA.

#### Mẫu Câu Trả Lời Phỏng Vấn (Senior/Architect Pitch):
> "Trước hết, theo đặc tả FlexRay v3.0.1 / ISO 17458, không có khái niệm **'POC frame'**, mà đồng bộ chu kỳ được thực hiện qua các **Sync Frames** do các Sync Nodes phát, được kiểm soát bởi **POC State Machine** của controller.
>
> Về phân bổ chu kỳ, **Static Segment** sử dụng TDMA với slot và payload cố định, đem lại tính tiền định tuyệt đối cho các luồng dữ liệu an toàn ASIL D. Ngược lại, **Dynamic Segment** sử dụng FTDMA minislotting, phân xử theo Frame ID để linh hoạt truyền bản tin chẩn đoán UDS hoặc sự kiện.
>
> Ở **Synchronous mode**, node liên tục dùng thuật toán Fault-Tolerant Midpoint (FTM) trong khoảng NIT để bù trừ xung nhịp toàn mạng. Nếu node bị mất tín hiệu Sync, nó sẽ rơi vào **Free-running mode** (chạy bằng thạch anh nội bộ), và POC State Machine sẽ tự động hạ trạng thái xuống *NORMAL_PASSIVE* hoặc *HALT* để bảo vệ an toàn cho bus."

---

### Q2: Đồng Bộ Xung Clock Khi Bị Lệch, Thuật Toán FTM & Bản Chất Sync Node

**Đề bài câu hỏi phỏng vấn:**
> "Trong mạng FlexRay, khi các node sử dụng thạch anh độc lập và bị lệch xung nhịp (clock drift), cơ chế đồng bộ frame trên nhiều node hoạt động như thế nào qua các chu kỳ? Sync Node đóng vai trò gì, cách hoạt động ra sao và nó có thực hiện truyền nhận dữ liệu ứng dụng như các node thông thường không?"

#### Phần 1: Bản Chất & Vai Trò Của Sync Node

**Sync Node là gì & Vai trò gì?**
- Trong mỗi cluster FlexRay, kỹ sư hệ thống cấu hình từ **2 đến 15 node quan trọng** (Master Gateway, Phanh ESP, Trợ lực lái EPS) làm **Sync Nodes**.
- **Phát mốc chuẩn**: Định kỳ phát *Sync Frame* (Header có bit `Sync Frame Indicator = 1`) trong Static Segment tại slot cố định.
- **Global Time Base**: Đóng vai trò làm mốc thời gian để toàn mạng đo đạc và căn chỉnh xung nhịp.
- **Bắt buộc cho Coldstart**: Chỉ Sync Node mới được chỉ định làm *Coldstart Node* để đánh thức và khởi động mạng từ trạng thái nghỉ.

**Sync Node có gửi dữ liệu ứng dụng không?**
- **CÓ 100%!** Sync Node vẫn là một ECU chức năng bình thường, truyền nhận Application Data trọn vẹn trong Payload Segment.
- Rất nhiều người lầm tưởng Sync Node chỉ phát "xung vô nghĩa" để đồng bộ. Thực tế, Sync Frame mang trọn vẹn **0 đến 254 bytes Payload** chứa tín hiệu cảm biến (tốc độ xe, góc lái, mô-men xoắn...). Điểm khác biệt duy nhất là bit cờ `Sync Indicator = 1` và nó không được phép gửi Null Frame trừ khi hỏng hóc.

#### Bảng So Sánh: Sync Node vs Regular Node (4 chiều)

| Đặc điểm kỹ thuật | Sync Node | Regular Node |
| :--- | :--- | :--- |
| Bit Sync Frame Indicator | Luôn = 1 trong frame Static được gán | Luôn = 0 |
| Truyền Application Data | CÓ (Payload Segment đầy đủ tới 254B) | CÓ (Payload Segment đầy đủ tới 254B) |
| Vai trò trong thuật toán FTM | Là **nguồn phát mốc chuẩn** + đồng thời tự lắng nghe Sync Node khác để tự sửa clock | **Chỉ là bên nhận**: Lắng nghe các Sync Node để tự sửa clock, không phát mốc |
| Số lượng tối thiểu trong Cluster | Tối thiểu ≥ 2 (mạng 2 kênh) hoặc ≥ 3 (mạng 1 kênh) | Không bắt buộc (có thể hàng chục node) |

#### Phần 2: Cơ Chế Xử Lý Khi Xung Clock Lệch (3 bước)

**Bước 1 — Đo Đạc Lệch Pha (Measurement)**:
- Mỗi ECU dùng dao động thạch anh nội bộ sinh ra **Microtick (µT)**. Do nhiệt độ (-40°C ~ 125°C) và sai số chế tạo, nhịp µT của các ECU bị lệch nhau.
- Khi Sync Frame tới, Controller ghi nhận thời điểm cạnh xuống (Action Point) so với Macrotick dự kiến để tính độ lệch thời gian Δtᵢ.

**Bước 2 — Thuật Toán FTM (Lọc Byzantine)**:
- **Fault-Tolerant Midpoint (FTM)** giải quyết bài toán chống node hỏng (Byzantine Fault):
  - Sắp xếp tất cả giá trị lệch đo được tăng dần.
  - Loại bỏ k giá trị cực tiểu và k giá trị cực đại (k tùy số node).
  - Lấy *trung bình cộng của cận giữa* làm giá trị bù trừ chuẩn Δ_corr.

**Bước 3 — Bù Trừ Tại NIT (Correction)**:
- Tại khoảng lặng **NIT (Network Idle Time)** cuối chu kỳ:
  - **Offset Correction**: Co/giãn số Microtick trong các Macrotick cuối để chu kỳ mới bắt đầu đúng µs.
  - **Rate Correction**: Đo trên 2 chu kỳ chẵn/lẻ để bù đều tần số thạch anh cho toàn chu kỳ tiếp theo.

#### Bộ Mô Phỏng Tương Tác (4-Node Simulator)

Widget bao gồm bộ mô phỏng thời gian thực trực quan hóa 4 node trên bus FlexRay:
- **Node A (Master Sync)**: Frame ID 1 [SYNC] — Mốc tham chiếu chính.
- **Node B (Steering Sync)**: Frame ID 2 [SYNC] — Lệch nhanh do nhiệt độ cao.
- **Node C (Braking Regular)**: Frame ID 3 [DATA] — Lệch chậm.
- **Node D (Byzantine Faulty)**: Frame ID 4 [DATA] — Lỗi thạch anh, lệch cực trị.

**4 nút tương tác**: Reset → Giả lập lệch Clock → Chạy thuật toán FTM → Bù lệch tại NIT.

#### Mẫu Câu Trả Lời Phỏng Vấn (Senior/Architect Pitch):
> "Trong mạng FlexRay, mỗi node chạy bộ dao động thạch anh riêng nên sự trôi dạt tần số (drift) theo nhiệt độ là không thể tránh khỏi. Để duy trì tính tiền định TDMA, FlexRay cấu hình tối thiểu 2 đến 3 **Sync Nodes**. Sync Node là các ECU chức năng hoàn toàn bình thường, vừa truyền application payload (tốc độ, góc lái...) vừa bật cờ `Sync Frame Indicator = 1` trong Header để phát mốc thời gian.
>
> Khi lệch xung, các node đo đạc sai số thời điểm Action Point của Sync Frame. Trong khoảng **NIT (Network Idle Time)**, bộ điều khiển chạy thuật toán **Fault-Tolerant Midpoint (FTM)**: sắp xếp mảng sai số, gạch bỏ các giá trị cực trị lớn nhất và nhỏ nhất để triệt tiêu lỗi Byzantine do node hỏng gây ra, sau đó lấy trung bình khoảng giữa.
>
> Cuối cùng, phần cứng tự động bù trừ **Offset Correction** (co/giãn Microticks trong NIT) và **Rate Correction** (phân bổ đều Microtick trên chu kỳ sau), đảm bảo toàn mạng đồng bộ chính xác tới cấp độ µs mà không hề bị va chạm slot."

---

## 3. Kế Hoạch Sprint 2 (Dự kiến)

| # | Chủ đề | Nội dung chính | Trạng thái |
|---|--------|---------------|-----------|
| Q3 | Coldstart / Wakeup / CAS | Phân biệt WUP (vật lý) vs CAS (logic), quy trình Coldstart 3 giai đoạn, Leading Coldstarter vs Following | 📋 Planned |
| Q4 | Bus Guardian & Safety | Hardware Bus Guardian giám sát slot TDMA, phát hiện node lỗi babbling idiot, cơ chế cô lập ASIL D | 📋 Planned |

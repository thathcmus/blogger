# Kế Hoạch Maintenance 2 Tháng: CAN FD Widget (v1.1.x → v1.2.x)

> **Mục tiêu chiến lược:** Biến widget thành công cụ ôn phỏng vấn Embedded/ECU Software automotive toàn diện — bao phủ ~80-85% kiến thức cốt lõi CAN/CAN FD từ Protocol Core đến Physical Layer, Diagnostics, Security và AUTOSAR stack đầy đủ.
>
> **Nguyên tắc nội dung:** 
> 1. Mỗi Q&A có 4 tầng bắt buộc: **📖 Theory → 🖥️ SystemC/C++ Modeling → 🔧 ECU/AUTOSAR Practice → ⚠️ Interview Trap**
> 2. Bắt buộc hỗ trợ song ngữ (Bilingual): Mảng `qaData` phải luôn có 2 object `vi` và `en` chứa nội dung tương ứng để hệ thống `i18n` hoạt động.
>
> **Nhịp độ:** 3 ngày / 1 Item × 20 Items = 60 ngày

---

## 📌 Tổng Quan Tiến Độ

| Phase | Ngày | Items | Mục tiêu | Coverage Layer |
|---|---|---|---|---|
| **Phase 1** | 1 – 3 | Item 1 | Accordion Q&A UI Component (skeleton) | Infrastructure |
| **Phase 2** | 4 – 30 | Items 2–10 | 9 Q&A Clusters chuyên sâu | Layer 1–4 (Core + AUTOSAR) |
| **Phase 3** | 31 – 48 | Items 11–16 | 6 Q&A Clusters mở rộng | Layer 2,5,6,7 (Physical, Diag, SecOC) |
| **Phase 4** | 49 – 57 | Items 17–19 | Interactive Tools (Calculator, Trace, Animation) | Feature |
| **Phase 5** | 58 – 60 | Item 20 | Testing, Responsive, Docs & Release v1.2.0 | Finalize |

---

## 🚦 Progress Tracker — Cập Nhật Khi Hoàn Thành

> **Hướng dẫn:** Đổi `⬜` → `✅` khi item hoàn thành. Đổi `⬜` → `🔄` khi đang làm dở.
>
> **Legend:** ⬜ Chưa bắt đầu &nbsp;|&nbsp; 🔄 Đang thực hiện &nbsp;|&nbsp; ✅ Hoàn thành

| # | Status | Topic | Phase | Ngày |
|---|:---:|---|---|---|
| 1 | ✅ | Accordion Q&A UI Component | 1 | 1–3 |
| 2 | ✅ | Q&A: CAN Classic Foundation (Prerequisite) | 2 | 4–6 |
| 3 | ✅ | Q&A: Frame Structure + BRS + DLC | 2 | 7–9 |
| 4 | ⬜ | Q&A: Bit Stuffing (Dynamic/Fixed) + SBC + CRC | 2 | 10–12 |
| 5 | ⬜ | Q&A: Bit Timing + TDCO (Senior-level) | 2 | 13–15 |
| 6 | ⬜ | Q&A: Error Handling + Bus Off Debug | 2 | 16–18 |
| 7 | ⬜ | Q&A: AUTOSAR Tx Path (COM→PduR→CanIf→Driver) | 2 | 19–21 |
| 8 | ⬜ | Q&A: AUTOSAR Rx Path + CanSM State Machine | 2 | 22–24 |
| 9 | ⬜ | Q&A: CanNm Sleep/Wake + Partial Networking | 2 | 25–27 |
| 10 | ⬜ | Q&A: Bus Load Calculation + Cable Length | 2 | 28–30 |
| 11 | ⬜ | Q&A: Physical Layer + Transceiver Selection | 3 | 31–33 |
| 12 | ⬜ | Q&A: ISO-TP (ISO 15765-2) over CAN FD | 3 | 34–36 |
| 13 | ⬜ | Q&A: UDS Diagnostics (ISO 14229) Thực Tế | 3 | 37–39 |
| 14 | ⬜ | Q&A: SecOC — MAC + Freshness Value + HSM | 3 | 40–42 |
| 15 | ⬜ | Q&A: ISO 26262 + E2E Protection + ASIL | 3 | 43–45 |
| 16 | ⬜ | Q&A: CAN FD vs CAN XL vs Automotive Ethernet | 3 | 46–48 |
| 17 | ⬜ | Calculator: Frame Duration + Bus Load% | 4 | 49–51 |
| 18 | ⬜ | Trace View: Hex Dump to Physical Value | 4 | 52–54 |
| 19 | ⬜ | Interactive Animation: BRS & Clock Switch | 4 | 55–57 |
| 20 | ⬜ | Responsive QA & Release v1.2.0 | 5 | 58–60 |

---
## ═══════════════════════════════════════
## PHASE 1: INFRASTRUCTURE (Item 1)
## ═══════════════════════════════════════

### ✅ Item 1 (Ngày 1–3): Xây Accordion Q&A Component
- Đã hoàn thành hệ thống thẻ Q&A đóng mở, tích hợp bộ lọc Tag và Độ khó.
- Đã triển khai kiến trúc đa ngôn ngữ (Bilingual) VN/EN không làm mất trạng thái mở (State Preservation).

---
## ═══════════════════════════════════════
## PHASE 2: CAN FD CORE + AUTOSAR (Items 2–10)
## ═══════════════════════════════════════
### ✅ Item 2 (Ngày 4–6): Q&A Cluster 1 — CAN Classic Foundation (Prerequisite)

**Nhiệm vụ:** Ôn luyện nền tảng CAN 2.0 (Physical & Protocol) ở mức độ chuyên gia (Expert). Nhiều ứng viên senior vẫn rớt phỏng vấn vì hổng kiến thức tầng vật lý của chuẩn cũ.

#### Q&A 2.1: CSMA/CR & Collision
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory:** Dựa trên đặc tính vật lý "Wired-AND" của bus CAN, CSMA/CR (Carrier Sense Multiple Access with Collision Resolution) hoạt động theo nguyên tắc Bit-wise Arbitration (Phân xử từng bit). Khi nhiều node cùng phát ở trạng thái Idle, bit Dominant (Mức điện áp chênh lệch cao, logic 0) sẽ luôn ghi đè bit Recessive (Không chênh lệch, logic 1). Một node đang phát bit Recessive nhưng đọc lại từ bus thấy Dominant sẽ tự động lùi bước (back-off) thành Receiver, không làm hỏng dữ liệu của node thắng.
  - 🔧 **ECU/AUTOSAR:** Quá trình này hoàn toàn trong suốt (transparent) với Software. Silicon của CAN Controller tự động xử lý arbitration. Tầng phần mềm (CanIf / PduR / COM) đẩy data xuống HW Tx Buffer và giải phóng CPU. Chỉ khi frame chiến thắng phân xử và nhận được ACK, ngắt phần cứng mới kích hoạt hàm callback `Can_TxConfirmation` dội ngược lên các layer trên.
  - ⚠️ **Interview Trap:** "Node thua phân xử liên tục thì có bị rớt frame không?" → Node thua không bao giờ tự ý vứt bỏ dữ liệu trong Tx Buffer, nó sẽ liên tục retry ở IFS tiếp theo. Tuy nhiên, nếu Bus Load quá cao (>70%), các frame ID thấp có thể bị "chết đói" (Starvation) dẫn đến lỡ deadline (timing violation). Do đó, kỹ sư phải gán ID theo mức độ ưu tiên thời gian thực chứ không gán tùy tiện.
- 🇬🇧 **English:**
  - 📖 **Theory:** Based on the "Wired-AND" physical characteristic of the CAN bus, CSMA/CR operates via Bit-wise Arbitration. When multiple nodes transmit simultaneously, a Dominant bit (high differential voltage, logic 0) always overwrites a Recessive bit (zero differential voltage, logic 1). A node transmitting a Recessive bit but sensing a Dominant bit immediately backs off, becoming a Receiver without corrupting the winning node's payload.
  - 🔧 **ECU/AUTOSAR:** This process is completely transparent to the Software. The CAN Controller's silicon handles arbitration autonomously. The software stack pushes data to the HW Tx Buffer and yields CPU time. Only when the frame wins arbitration and receives an ACK, a hardware interrupt triggers the `Can_TxConfirmation` callback up the stack.
  - ⚠️ **Interview Trap:** "If a node continuously loses arbitration, does it drop the frame?" → The losing node never drops the data; it automatically retries at the next IFS. However, if the bus load is too high (>70%), lower-priority frames (higher IDs) may suffer from "Starvation," leading to deadline misses (timing violations). IDs must be assigned strictly based on real-time urgency.

#### Q&A 2.2: Remote Frame in CAN 2.0 vs CAN FD
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory:** Remote Frame là thiết kế cũ của CAN 2.0, cho phép một node gửi yêu cầu (với cờ RTR = 1) đòi node khác gửi lại Data Frame có cùng ID. CAN FD đã khai tử hoàn toàn Remote Frame. Bit RTR được thay thế bằng bit RRS (Remote Request Substitution) và bị ép cứng ở giá trị Dominant (0).
  - 🔧 **ECU/AUTOSAR:** Trong kiến trúc AUTOSAR hiện đại, mô hình "Hỏi-Đáp" (Polling/Request) ở tầng Data Link không còn hiệu quả. Kỹ sư dùng các giao thức tầng cao như UDS, SOME/IP hoặc mô hình Publish-Subscribe. Nếu vô tình config `CanIfTxPduType = REMOTE` cho node CAN FD, trình sinh mã (Code Generator) sẽ báo lỗi DET nghiêm trọng ngay lúc build.
  - ⚠️ **Interview Trap:** "Vì sao CiA quyết định loại bỏ Remote Frame trên CAN FD?" → Sự tồn tại của Remote Frame phá vỡ triết lý Dual-rate của CAN FD. Remote Frame không có Data Phase (chỉ có Header), nên cờ BRS không có ý nghĩa. Việc một node bất thình lình "bị gọi" để phát Data Frame ở tốc độ cao khiến timing mạng trở nên khó lường (non-deterministic), rủi ro cho Safety-critical systems.
- 🇬🇧 **English:**
  - 📖 **Theory:** A Remote Frame is a legacy CAN 2.0 mechanism allowing a node to send a request (RTR = 1) asking another node to transmit a Data Frame with the same ID. CAN FD has completely deprecated Remote Frames. The RTR bit is replaced by the RRS (Remote Request Substitution) bit, permanently hardcoded to a Dominant (0) value.
  - 🔧 **ECU/AUTOSAR:** In modern AUTOSAR architectures, Data Link layer "Polling/Request" models are highly inefficient. Engineers use higher-layer protocols like UDS, SOME/IP, or Publish-Subscribe patterns. If you mistakenly configure `CanIfTxPduType = REMOTE` for a CAN FD node, the Code Generator will throw a critical DET error at build time.
  - ⚠️ **Interview Trap:** "Why did CiA decide to eliminate Remote Frames in CAN FD?" → Remote Frames fundamentally break CAN FD's Dual-rate philosophy. A Remote Frame has no Data Phase, making the BRS flag meaningless. Suddenly triggering a node to reply with a high-speed Data Frame introduces unpredictable network timing (non-deterministic behavior), unacceptable for safety-critical systems.

#### Q&A 2.3: Overload Frame vs Error Frame
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory:** Cả hai đều cố tình vi phạm quy tắc Bit-stuffing (phát ra 6 bit Dominant liên tiếp), nhưng ngữ cảnh thời gian (timing context) hoàn toàn khác nhau. Error Frame phát ra ngay lập tức khi phát hiện lỗi ở bất cứ đâu trong frame. Overload Frame chỉ được phép phát ra trong khoảng nghỉ Intermission (IFS) để xin thêm thời gian xử lý trước khi frame tiếp theo ập tới.
  - 🔧 **ECU/AUTOSAR:** Ở ECU hiện đại, Overload Frame gần như tuyệt chủng. MCU đời mới sử dụng Direct Memory Access (DMA) và Hardware FIFO rất lớn để tự động hứng dữ liệu mà không phiền đến CPU. Nếu bắt gặp Overload Frame trên thiết bị đo (Vector CANoe), đó là báo động đỏ về lỗi phần cứng hoặc cấu hình clock sai lệch trầm trọng.
  - ⚠️ **Interview Trap:** "CAN FD tốc độ rất cao (8 Mbps), vậy nó có cần dùng Overload Frame nhiều hơn không?" → Không! Dù tốc độ rất nhanh, giao thức cấm tuyệt đối sinh ra Overload Frame trong giai đoạn Data Phase. Nó chỉ được phép phát ra ở tốc độ nền (Nominal Bit Rate) trong khoảng Intermission để duy trì tương thích ngược phần cứng với CAN 2.0.
- 🇬🇧 **English:**
  - 📖 **Theory:** Both deliberately violate the Bit-stuffing rule by transmitting 6 consecutive Dominant bits, but their timing contexts are entirely different. Error Frames are transmitted immediately upon detecting an error anywhere. Overload Frames are only permitted during the Intermission phase (IFS) to request extra processing time.
  - 🔧 **ECU/AUTOSAR:** In modern ECUs, Overload Frames are practically extinct. MCUs utilize Direct Memory Access (DMA) and massive Hardware FIFOs to buffer incoming data without bothering the CPU. Observing an Overload Frame on a trace tool is a massive red flag indicating a failing Hardware Controller or severe clock configuration mismatch.
  - ⚠️ **Interview Trap:** "Since CAN FD runs at very high speeds, does it need Overload Frames more often?" → Paradoxically, No! Despite high speeds, the specification strictly prohibits Overload Frames during the Data Phase. They are only allowed during the Intermission phase at the Nominal Bit Rate, strictly maintaining backward hardware compatibility.

### ✅ Item 3 (Ngày 7–9): Q&A Cluster 2 — Frame Structure & BRS Thực Chiến

**Nhiệm vụ:** Phân tích cấu trúc frame CAN FD, đặc biệt là triết lý Dual-rate (BRS) và mã hóa độ dài phi tuyến tính (DLC).

#### Q&A 3.1: Vị trí của BRS (Bit Rate Switch)
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory:** BRS không thể đặt ở đầu frame (vùng Arbitration). Quá trình phân xử bắt buộc phải chạy ở tốc độ thấp (Nominal Rate, VD: 500kbps) để tín hiệu điện có đủ thời gian lan truyền (propagation delay) đến node xa nhất và dội ngược lại trong giới hạn 1 bit-time. Chỉ khi phân xử xong, xác định được duy nhất 1 node làm chủ bus, BRS mới được bật (Recessive) để kích hoạt tốc độ cao (Data Rate, VD: 5Mbps).
  - 🔧 **ECU/AUTOSAR:** Cấp độ Hardware, CAN Controller chứa 2 thanh ghi Timer độc lập: Nominal Bit Timing và Data Bit Timing. Khi cờ BRS được set, mạch Multiplexer bên trong Silicon tự động switch clock sang thanh ghi Data Bit Timing ở sườn xung tiếp theo.
  - ⚠️ **Interview Trap:** "Trong CAN FD, vùng ACK bit được truyền ở tốc độ nào?" → Bắt buộc phải hạ về Nominal Rate tại bit CRC Delimiter. Vì lúc này, TẤT CẢ các node trên mạng (kể cả node rất xa) đều phải báo ACK cùng lúc. Nếu chạy tốc độ cao, tín hiệu ACK sẽ chồng chéo và bị lệch pha hoàn toàn do delay đường dây.
- 🇬🇧 **English:**
  - 📖 **Theory:** BRS cannot be placed at the start of the frame. Arbitration must run at a low speed (Nominal Rate) so the electrical signal has enough time to propagate to the furthest node and back within 1 bit-time. Only after arbitration concludes and a single transmitting node is established can BRS be set (Recessive) to trigger the high speed (Data Rate).
  - 🔧 **ECU/AUTOSAR:** At the hardware level, the CAN Controller contains two independent Timer registers: Nominal and Data Bit Timing. When the BRS flag is read, an internal multiplexer in the silicon seamlessly switches the clock source at the next pulse edge.
  - ⚠️ **Interview Trap:** "In CAN FD, at what speed is the ACK slot transmitted?" → It strictly slows down to the Nominal Rate at the CRC Delimiter bit. All nodes (even distant ones) must assert ACK simultaneously. At high speed, propagation delays would cause massive phase shifts and collisions during the ACK slot.

#### Q&A 3.2: Quy luật Non-linear DLC (Data Length Code)
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory:** Do CAN 2.0 giới hạn DLC ở 4 bit (từ 0000 đến 1111, tức max giá trị là 15), nó không thể đếm tuyến tính đến 64 byte. Để tương thích ngược cấu trúc Header, CAN FD giữ nguyên 4 bit này nhưng ánh xạ phi tuyến tính: DLC từ 0-8 giữ nguyên ý nghĩa (0-8 byte). Nhưng từ 9-15 lần lượt đại diện cho 12, 16, 20, 24, 32, 48, 64 bytes.
  - 🔧 **ECU/AUTOSAR:** Tại layer `CanIf` (CAN Interface), nếu tầng COM đẩy xuống một PDU có độ dài thực tế là 10 bytes, `CanIf` sẽ phải kích hoạt cơ chế Padding (chèn thêm byte rác, thường là 0x00 hoặc 0xCC) để nâng payload lên mức hợp lệ gần nhất là 12 bytes (tương ứng DLC=9).
  - ⚠️ **Interview Trap:** "Nếu SWC gửi gói tin dài chính xác 13 bytes xuống bus CAN FD, điều gì sẽ xảy ra?" → Mạng CAN FD không thể truyền chính xác 13 bytes. Gói tin sẽ bị ép lên mức DLC=10 (tương ứng 16 bytes payload), trong đó chứa 13 bytes data thực và 3 bytes padding do AUTOSAR BSW tự chèn vào.
- 🇬🇧 **English:**
  - 📖 **Theory:** Since CAN 2.0 limits DLC to 4 bits (0 to 15), it cannot count linearly to 64 bytes. To maintain Header compatibility, CAN FD maps values non-linearly: DLC 0-8 means 0-8 bytes. However, DLC 9-15 map to 12, 16, 20, 24, 32, 48, and 64 bytes respectively.
  - 🔧 **ECU/AUTOSAR:** In the `CanIf` layer, if the COM layer pushes a PDU of 10 bytes, `CanIf` must trigger Padding (inserting dummy bytes like 0x00 or 0xCC) to reach the nearest valid payload size of 12 bytes (DLC=9).
  - ⚠️ **Interview Trap:** "If an SWC requests to send exactly 13 bytes, what happens on the bus?" → CAN FD cannot physically transmit a 13-byte frame. It will be padded to DLC=10 (16 bytes payload), containing 13 bytes of actual data and 3 bytes of padding inserted by the AUTOSAR BSW.

### ⬜ Item 4 (Ngày 10–12): Q&A Cluster 3 — Bit Stuffing & Dàn chắn CRC

**Nhiệm vụ:** Tìm hiểu cơ chế chống nhiễu chuyên sâu của CAN FD khi payload phình to lên 64 byte. Giải mã Fixed Stuffing và SBC.

#### Q&A 4.1: Dynamic vs Fixed Bit Stuffing
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory:** CAN 2.0 dùng Dynamic Stuffing (cứ 5 bit giống nhau thì nhồi 1 bit ngược dấu) để tạo sườn xung cho các node đồng bộ clock. Nhưng nó tạo ra rủi ro "Undetected Error" do nhầm lẫn Stuff bit thành Data bit. CAN FD vá lỗi này bằng cách dùng Dynamic Stuffing cho Header/Data, nhưng áp dụng **Fixed Stuffing** cho vùng CRC (Cứ bắt buộc sau 1 số bit cố định, không quan tâm giống hay khác nhau, sẽ chèn 1 bit Parity).
  - 🔧 **ECU/AUTOSAR:** Kỹ sư Software hoàn toàn không phải viết logic Bit Stuffing. Quá trình "Stuff" khi phát và "De-stuff" khi nhận được thực thi tự động ở tốc độ chớp mắt bởi phần cứng Transceiver và Silicon MAC.
  - ⚠️ **Interview Trap:** "Bit Stuffing ảnh hưởng thế nào đến tài nguyên hệ thống (Bus Load)?" → Vì số lượng bit chèn thêm phụ thuộc vào nội dung Data (Dynamic), chiều dài khung truyền thực tế sẽ co giãn liên tục tạo ra Jitter. Khi lập lịch (Schedule Table), kỹ sư phải tính Bus Load ở trường hợp tồi tệ nhất (Worst-case) với lượng Stuff bit tối đa.
- 🇬🇧 **English:**
  - 📖 **Theory:** CAN 2.0 uses Dynamic Stuffing (inserting an opposite bit after 5 consecutive identical bits) to provide edges for clock synchronization. This creates an "Undetected Error" risk where a stuff bit is mistaken for data. CAN FD patches this by using Dynamic Stuffing for Header/Data, but applying **Fixed Stuffing** for the CRC field (inserting a Parity bit at fixed intervals, regardless of bit continuity).
  - 🔧 **ECU/AUTOSAR:** Software Engineers never write Bit Stuffing logic. The "Stuff" (Tx) and "De-stuff" (Rx) processes are executed automatically at hardware speeds by the Silicon MAC.
  - ⚠️ **Interview Trap:** "How does Bit Stuffing impact System Bus Load?" → Since the number of stuffed bits depends on the payload content (Dynamic), the actual frame length fluctuates, introducing Jitter. When designing Schedule Tables, engineers must calculate Bus Load using the Worst-Case Execution Time (WCET) assuming maximum stuff bits.

#### Q&A 4.2: SBC (Stuff Bit Count) & Thuật toán CRC CAN FD
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory:** Payload 64 bytes khiến thuật toán CRC-15 cũ trở nên vô dụng (Hamming Distance giảm nghiêm trọng, không bắt được nhiều bit lỗi). CAN FD áp dụng CRC-17 (cho payload ≤ 16 bytes) và CRC-21 (cho payload > 16 bytes). Đặc biệt, trường SBC (4 bits) được thêm vào ngay trước CRC để "báo cáo" tổng số bit stuffing đã được chèn vào trước đó, giúp triệt tiêu hoàn toàn rủi ro nhầm bit.
  - 🔧 **ECU/AUTOSAR:** Nếu module CanSM trong AUTOSAR liên tục ném ra lỗi `CAN_E_DATALOST` hoặc Error Passive, nguyên nhân sâu xa thường là CRC fail liên tục do nhiễu điện từ (EMI) trên cáp vật lý hoặc cấu hình clock MCU bị sai lệch.
  - ⚠️ **Interview Trap:** "Trong CAN FD, chuỗi bit CRC được tính toán dựa trên dữ liệu gốc hay dữ liệu ĐÃ bị nhồi bit (Stuffed data)?" → Nó tính toán bao gồm CẢ các Stuff bits. Đây là điểm khác biệt cốt lõi so với CAN 2.0 (chỉ tính trên dữ liệu gốc), giúp CAN FD khắc phục lỗi rò rỉ dữ liệu (data integrity flaw).
- 🇬🇧 **English:**
  - 📖 **Theory:** A 64-byte payload renders the old CRC-15 algorithm useless (reduced Hamming Distance). CAN FD employs CRC-17 (for payloads ≤ 16 bytes) and CRC-21 (for > 16 bytes). Crucially, an SBC field (Stuff Bit Count - 4 bits) is prepended to the CRC to "report" the exact number of dynamic stuff bits inserted earlier, completely eliminating bit-shift risks.
  - 🔧 **ECU/AUTOSAR:** If the AUTOSAR CanSM module frequently throws `CAN_E_DATALOST` or enters Error Passive, the root cause is usually continuous CRC failures due to physical Electromagnetic Interference (EMI) or severe MCU clock misconfiguration.
  - ⚠️ **Interview Trap:** "In CAN FD, is the CRC polynomial calculated on the raw data or the STUFFED data?" → It includes the Stuff bits! This is a core difference from CAN 2.0 (which calculates on raw data), definitively fixing a fatal data integrity flaw in the legacy protocol.

---

### ⬜ Item 5 (Ngày 13–15): Q&A Cluster 4 — Bit Timing & TDCO (Senior-level)

**Nhiệm vụ:** Kiến thức "ăn điểm" cấp độ Senior/Expert về tinh chỉnh Clock và Delay mạng.

#### Q&A 5.1: TDC (Transmitter Delay Compensation) là gì?
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory:** Ở tốc độ > 2Mbps, thời lượng 1 bit quá ngắn. Một bit truyền từ Tx pin của MCU, qua IC Transceiver, chạy ra cáp CAN, rồi dội ngược về Rx pin của chính MCU đó sẽ tốn một khoảng Delay. Nếu Delay này lớn hơn độ dài 1 bit, MCU sẽ đọc nhầm tín hiệu của bit cũ thành bit mới và tự phát Error Frame bắn hạ chính mình. TDC sinh ra để phần cứng tự đo Delay này và dời điểm lấy mẫu (Secondary Sample Point) đi một khoảng TDCO (Offset) để đọc cho đúng.
  - 🔧 **ECU/AUTOSAR:** Trong MCAL (CanController), việc tuning tham số `CanControllerTdcOffset` là việc cực kỳ căng thẳng. Kỹ sư phải soi datasheet của con chip Transceiver (TJA1145, TLE9252) để tính Propagation Delay tối đa và cấu hình chính xác.
  - ⚠️ **Interview Trap:** "TDC có hoạt động trong vùng Arbitration (đầu frame) không?" → KHÔNG. Ở tốc độ thấp (Nominal Rate 500kbps), 1 bit dài tới 2000ns, dư sức cho tín hiệu dội về mà không bị lệch. TDC chỉ được kích hoạt phần cứng ngay sau khi cờ BRS = 1 (Vùng Data Phase).
- 🇬🇧 **English:**
  - 📖 **Theory:** At speeds > 2Mbps, the bit time is incredibly short. The time for a bit to travel from the MCU's Tx pin, through the Transceiver IC, onto the CAN bus, and loop back to the MCU's Rx pin incurs a physical Delay. If this Delay exceeds one bit-time, the MCU samples the wrong bit and shoots itself down with an Error Frame. TDC allows the hardware to measure this delay and shift the Secondary Sample Point by a TDCO (Offset) to sample correctly.
  - 🔧 **ECU/AUTOSAR:** In MCAL, tuning the `CanControllerTdcOffset` parameter is a highly critical task. Engineers must consult the Transceiver's datasheet (e.g., TJA1145, TLE9252) to extract the max loop delay and configure the offset precisely.
  - ⚠️ **Interview Trap:** "Does TDC operate during the Arbitration phase?" → NO. At the Nominal Rate (500kbps), a bit is 2000ns long, which easily absorbs the physical loop delay. TDC is strictly enabled by hardware immediately after the BRS flag is set (Data Phase).

#### Q&A 5.2: Sample Point 80% nghĩa là gì?
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory:** Sample Point (Điểm lấy mẫu) là mốc thời gian % bên trong 1 bit-time mà MCU quyết định chốt mỏm điện áp đó là logic 0 hay 1. Thường đặt ở mốc muộn (75% - 85%) để chờ cho các nhiễu dội (Ringing) và vọt lố (Overshoot) trên đường truyền điện áp bị dập tắt hoàn toàn, tín hiệu trở nên ổn định (Steady-state).
  - 🔧 **ECU/AUTOSAR:** Cấu hình thanh ghi Time Quanta (Tq), Phase Seg 1 (Tseg1), Phase Seg 2 (Tseg2) trong MCAL để ra được mốc 80%. Sai lệch Sample Point quá 5% giữa các ECU trên cùng một mạng sẽ gây ra thảm họa truyền thông (chập chờn khi xe bị nóng lên hoặc cáp dài ra).
  - ⚠️ **Interview Trap:** "Nếu cáp mạng CAN rất dài (như trên xe tải), ta nên đẩy Sample Point lên sớm (70%) hay lùi về muộn (85%)?" → Lùi về muộn (85-87%). Cáp dài làm điện trở và điện dung ký sinh tăng, tín hiệu cần nhiều thời gian hơn để sạc/xả đạt đến điện áp ngưỡng (Propagation delay lớn). Lấy mẫu muộn giúp tín hiệu đủ thời gian định hình.
- 🇬🇧 **English:**
  - 📖 **Theory:** The Sample Point is the percentage mark within a 1 bit-time where the MCU latches the bus voltage as logic 0 or 1. It is typically set late (75% - 85%) to allow signal ringing and overshoot transients on the physical wire to dampen completely into a steady-state.
  - 🔧 **ECU/AUTOSAR:** Engineers configure Time Quanta (Tq), Phase Seg 1 (Tseg1), and Phase Seg 2 (Tseg2) registers in MCAL to achieve exactly 80%. A Sample Point mismatch of >5% across ECUs on the same network will cause catastrophic communication failures (especially during temperature variations).
  - ⚠️ **Interview Trap:** "If the CAN network is physically very long (like in commercial trucks), should we move the Sample Point earlier (70%) or later (85%)?" → Move it later (85-87%). Long cables increase parasitic capacitance and propagation delay, meaning the signal takes longer to reach the threshold voltage. A late sample point ensures the signal has stabilized.

---

### ⬜ Items 6–10: System Diagnostic, AUTOSAR Tx/Rx Path & Network Management
*(Tiếp tục áp dụng công thức Deep Theory + AUTOSAR Config + Tricky Interview)*
- **Item 6:** Debug Bus Off bằng Oscilloscope, quy trình Slow/Fast Recovery của CanSM.
- **Item 7 & 8:** Trace hành trình dữ liệu RTE -> COM -> PduR -> CanIf -> MCAL. Cơ chế Rx Interrupt Storm và giải pháp NAPI (Polling fallback).
- **Item 9:** Partial Networking (PN), Wake-up Pattern (WUP) tiết kiệm Quiescent Current cho xe điện.
- **Item 10:** Công thức tính Bus Load phi tuyến tính của CAN FD và ảnh hưởng của Topology rẽ nhánh (Stub) sinh nhiễu dội.

---

## ═══════════════════════════════════════
## PHASE 3: EXTENSIONS & ADVANCED LAYER (Items 11–16)
## ═══════════════════════════════════════

### ⬜ Item 11: Physical Layer & Transceiver Selection
- Đặc điểm vi mạch: SIC (Signal Improvement Capability) Transceiver là gì? Tại sao CAN FD 5Mbps bắt buộc phải dùng SIC để triệt nhiễu Ringing?

### ⬜ Item 12: ISO-TP (ISO 15765-2) over CAN FD
- Phân mảnh dữ liệu (Segmentation): Flash firmware 10 MB thì chia gói 64 byte ra sao (Single Frame, First Frame, Consecutive Frame).

### ⬜ Item 13: UDS Diagnostics (ISO 14229)
- Giao tiếp chẩn đoán: Đọc mã lỗi (0x19), Xóa lỗi (0x14), Routine Control (0x31) hoạt động trên nền CAN FD nhanh hơn CAN 2.0 bao nhiêu lần.

### ⬜ Item 14: SecOC (Cybersecurity)
- Tấn công Spoofing / Replay attack trên mạng xe. Cấu trúc MAC (Message Authentication Code) nhét vào 64 byte payload của CAN FD như thế nào.

### ⬜ Item 15: ISO 26262 & E2E Protection
- Làm sao biết dữ liệu bị kẹt (Stuck) hoặc lỗi sinh mã (Data corruption) tại tầng Application? Tầm quan trọng của E2E Profile (Counter + CRC).

### ⬜ Item 16: CAN FD vs CAN XL vs Automotive Ethernet
- CAN XL (Payload 2048 bytes, 10Mbps) và Automotive Ethernet (100BASE-T1) khác CAN FD chỗ nào về Topology (Bus vs Switch).

---

## ═══════════════════════════════════════
## PHASE 4 & 5: TOOLS & DEPLOYMENT (Items 17–20)
## ═══════════════════════════════════════
- Calculator: Frame Duration + Bus Load%
- Trace View & Animation BRS
- Final Testing & Release

---

## 🤖 Auto-Pilot Command (Dành cho AI Agent)

> **Khi USER ra lệnh:** `Hãy làm trọn gói Item [X]`

Agent bắt buộc tự động thực thi chuỗi 3 bước (3-in-1 Workflow) sau mà không dừng lại hỏi:

1. **Implement:** Đọc nội dung chuyên sâu của Item `[X]` trong file này. Chèn vào `qaData` trong `widget_can_fd.html` (Tuân thủ chuẩn Song ngữ VN/EN, đảm bảo thẻ HTML an toàn).
2. **Review & Debug:** Chạy lệnh Node.js check syntax `node -e "const fs = require('fs'); const html = fs.readFileSync('widget_can_fd.html', 'utf8'); const js = html.match(/<script>([\s\S]*?)<\/script>/)[1]; new Function(js); console.log('Syntax OK');"`. Tự động fix nếu báo lỗi.
3. **Cập nhật Hệ thống:** Đổi status từ `⬜` sang `✅` trong Progress Tracker của file này. Viết log cập nhật vào `CHANGELOG.md` (phần `[Unreleased]`). Báo cáo tóm tắt cho USER.

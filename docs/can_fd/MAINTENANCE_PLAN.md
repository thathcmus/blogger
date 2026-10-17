# Kế Hoạch Maintenance 2 Tháng: CAN FD Widget (v1.1.x → v2.0.0)

> **Mục tiêu chiến lược:** Biến widget thành công cụ ôn phỏng vấn Embedded/ECU Software automotive toàn diện — bao phủ ~80-85% kiến thức cốt lõi CAN/CAN FD từ Protocol Core đến Physical Layer, Diagnostics, Security và AUTOSAR stack đầy đủ.
>
> **Nguyên tắc nội dung:** 
> 1. Mỗi Q&A có 4 tầng bắt buộc: **📖 Theory → 🖥️ SystemC/C++ Modeling → 🔧 ECU/AUTOSAR Practice → ⚠️ Interview Trap (bắt buộc đủ 2 góc nhìn: 🚗 Automotive / Protocol & 💻 C++ / Modeling Follow-up)**
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
| **Phase 5** | 58 – 60 | Item 20 | Testing, Responsive, Docs & Release v2.0.0 | Finalize |

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
| 4 | ✅ | Q&A: Bit Stuffing (Dynamic/Fixed) + SBC + CRC | 2 | 10–12 |
| 5 | ⬜ | Q&A: Bit Timing + TDCO (Senior-level) ⚡ *[+ Tool: Sample Point Playground]* | 2 | 13–15 |
| 6 | ⬜ | Q&A: Error Handling + Bus Off Debug ⚡ *[+ Tool: Bus Off FSM Simulator]* | 2 | 16–18 |
| 7 | ⬜ | Q&A: AUTOSAR Tx Path (COM→PduR→CanIf→Driver) ⚡ *[+ Tool: Packet Journey]* | 2 | 19–21 |
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
| 18 | ⬜ | Trace View: Live DBC Signal Decoder (Intel vs Motorola 64B) | 4 | 52–54 |
| 19 | ⬜ | Interactive Minigame: Thợ Săn Lỗi Xung Sóng (Glitch Hunter) | 4 | 55–57 |
| 20 | ⬜ | Responsive QA & Release v2.0.0 | 5 | 58–60 |

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

**Nhiệm vụ:** Ôn luyện nền tảng CAN 2.0 (Physical & Protocol) ở mức độ chuyên gia (Expert). Chuẩn hóa toàn diện theo khung **5W-1H** (Lý thuyết) và **Micro-STAR** (Bẫy thực chiến).

#### Q&A 2.1: CSMA/CR & Collision Resolution
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** CSMA/CR (Carrier Sense Multiple Access with Collision Resolution) là cơ chế đa truy cập cảm nhận sóng mang với giải quyết va chạm thông qua phân xử bit không phá hủy (Non-destructive Bit-wise Arbitration).
    - 💡 **Why:** Khác với Ethernet CSMA/CD (khi va chạm cả 2 node đều hủy frame và lùi lại ngẫu nhiên gây mất tính tiền định - Non-deterministic), mạng CAN trên ô tô bắt buộc các thông điệp khẩn cấp (Phanh, Túi khí) phải truyền thành công ngay lập tức mà không bị trễ hay phá hủy dữ liệu.
    - ⏱️ **When:** Kích hoạt ngay tại sườn xuống của bit SOF (Start of Frame) và diễn ra xuyên suốt trường Phân xử (Arbitration Field: Identifier + RRS/IDE).
    - 📍 **Where:** Nằm ở tầng vật lý (Physical Layer) và tầng liên kết dữ liệu (Data Link Layer MAC) dựa trên đặc tính điện áp vi sai đường dây "Wired-AND".
    - ⚙️ **Who & How:** Do vi mạch phần cứng Silicon MAC của CAN Controller tự động kiểm soát. Bit Dominant (logic 0, $V_{diff} \approx 2.0V$) luôn ghi đè bit Recessive (logic 1, $V_{diff} \approx 0.0V$). Khi nhiều ECU phát cùng lúc, node nào phát bit Recessive nhưng đọc ngược lại từ bus thấy Dominant sẽ nhận biết mình thua phân xử và lập tức lùi bước chuyển sang chế độ Receiver; node phát bit Dominant tiếp tục truyền mà không hề bị gián đoạn hay hỏng dữ liệu.
  - 🖥️ **SystemC/C++ Modeling:** Trong mô phỏng SystemC, bus CAN được biểu diễn bằng một tín hiệu `sc_signal_resolved` (cơ chế phân giải đa người viết). Quá trình bit-wise arbitration được mô phỏng trong một thread `sc_cthread`. Ở sườn xung clock, mỗi node ghi bit của nó (0=Dominant, 1=Recessive). Sau đó, nó đọc lại giá trị bus: `if(tx_bit == 1 && bus_val == 0) { state = RCV_MODE; return; }`. Nhờ ngữ nghĩa Two-Phase Evaluate-Update và Delta Cycles của SystemC kernel, Resolution Function gom toàn bộ giá trị ghi và tính toán phép logic Wired-AND nguyên tử, hoàn toàn không xảy ra Data Race.
  - 🔧 **ECU/AUTOSAR Practice:** Quá trình phân xử hoàn toàn trong suốt (transparent) với Software. Silicon MAC của CAN Controller tự động xử lý arbitration. Tầng phần mềm (CanIf / PduR / COM) đẩy data xuống Hardware Tx Mailbox Buffer và giải phóng CPU. Chỉ khi frame chiến thắng phân xử và nhận được bit ACK ở cuối frame, ngắt phần cứng mới kích hoạt hàm callback `Can_TxConfirmation` dội ngược lên các layer trên.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** Trên mạng CAN động cơ, bus load đang ở mức cao (78%). ECU Gateway liên tục phát các frame chẩn đoán UDS (ID cao: 0x7E0), trong khi ECU Động cơ và Phanh ABS liên tục phát thông điệp điều khiển mô-men xoắn (ID thấp: 0x0C0, 0x100).
    - 🎯 **T (Task):** Đảm bảo các thông điệp chẩn đoán không bị "chết đói" (Starvation) dẫn đến Timeout, đồng thời không được làm trễ deadline chu kỳ 10ms của thông điệp phanh ASIL D.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Không được gán ID bừa bãi. Phải phân bổ dải ID theo thứ tự ưu tiên thời gian thực: ID thấp cho Hard Real-time Safety, ID cao cho Event/Diagnostic. Áp dụng cơ chế CanNm / Schedule Table để giới hạn tần suất gửi của frame ưu tiên thấp hoặc dùng Mailbox Abort Mechanism trong MCAL để hủy frame cũ khi có frame khẩn cấp mới.
      - 💻 *C++ / Modeling:* Trong bộ mô phỏng bus tốc độ cao, thay vì dùng `std::vector` tìm kiếm priority tuyến tính $O(N)$, mô hình hóa Tx Mailbox bằng `std::priority_queue` với comparator đảo dấu ID nhỏ hơn để lấy frame ưu tiên cao nhất trong $O(1)$.
    - 📊 **R (Result):** Bus load giảm xuống mức an toàn 52%, độ trễ jitter của frame phanh triệt tiêu về 0, frame chẩn đoán được giải phóng truyền trong vòng 40ms mà không bị timeout.
- 🇬🇧 **English:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** CSMA/CR (Carrier Sense Multiple Access with Collision Resolution) is a multi-access contention mechanism using non-destructive bit-wise arbitration.
    - 💡 **Why:** Unlike Ethernet CSMA/CD (where collisions force both nodes to abort and retry with non-deterministic backoff delays), automotive networks mandate that safety-critical messages (Brakes, Airbags) transmit immediately without packet loss or jitter.
    - ⏱️ **When:** Triggered at the falling edge of the SOF (Start of Frame) bit and active throughout the entire Arbitration Field (Identifier + RRS/IDE).
    - 📍 **Where:** Implemented across the Physical Layer and Data Link Layer (MAC) via the differential "Wired-AND" line characteristic.
    - ⚙️ **Who & How:** Handled autonomously by the CAN Controller's silicon MAC. A Dominant bit (logic 0, $V_{diff} \approx 2.0V$) systematically overwrites a Recessive bit (logic 1, $V_{diff} \approx 0.0V$). When multiple ECUs transmit simultaneously, any node transmitting Recessive but sensing Dominant realizes it lost arbitration, ceases transmission, and backs off into Receiver mode without corrupting the winning node's stream.
  - 🖥️ **SystemC/C++ Modeling:** In SystemC, the CAN bus is modeled using an `sc_signal_resolved` to support multiple writers. The bit-wise arbitration is executed inside an `sc_cthread`. At each clock edge, a node drives its bit (0=Dominant, 1=Recessive) and samples the bus: `if(tx_bit == 1 && bus_val == 0) { state = RCV_MODE; return; }`. Due to SystemC's Two-Phase Evaluate-Update semantics and Delta Cycles, the resolution function computes the Wired-AND state atomically, guaranteeing zero race conditions.
  - 🔧 **ECU/AUTOSAR Practice:** Arbitration is 100% transparent to Software. The CAN Controller hardware handles priority arbitration autonomously. The upper BSW stack (CanIf / PduR / COM) simply enqueues PDUs into Hardware Tx Mailboxes and releases the CPU. Only after winning arbitration and receiving an ACK bit, a hardware interrupt fires `Can_TxConfirmation` up the AUTOSAR stack.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** In a vehicle powertrain CAN bus running at 78% bus load, the Gateway ECU periodically injects diagnostic UDS frames (high ID: 0x7E0), while Engine and ABS ECUs continuously fire torque request frames (low IDs: 0x0C0, 0x100).
    - 🎯 **T (Task):** Prevent diagnostic frame starvation and timeouts while strictly meeting the hard 10ms real-time deadline for ASIL D brake messages.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Design ID ranges strictly by criticality: low IDs for deterministic safety frames, high IDs for diagnostic events. Employ CanNm cyclic scheduling and configure MCAL Hardware Mailbox Abort mechanisms to flush pending stale frames when urgent safety PDUs arrive.
      - 💻 *C++ / Modeling:* In high-throughput C++ simulators, replace linear searches ($O(N)$) with `std::priority_queue` parameterized with a greater-than comparator to pop highest-priority frames in $O(1)$ time.
    - 📊 **R (Result):** Average bus load decreased to a stable 52%, brake frame jitter eliminated to 0, and diagnostic frames guaranteed transmission within 40ms without timeout.

#### Q&A 2.2: Remote Frame in CAN 2.0 vs CAN FD
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** Remote Frame là khung truyền không chứa dữ liệu (DLC mang giá trị yêu cầu nhưng Payload = 0), phát Header kèm cờ RTR = 1 để yêu cầu node khác trên mạng phát lại Data Frame có cùng ID.
    - 💡 **Why:** CAN FD đã loại bỏ hoàn toàn Remote Frame vì: (1) Phá vỡ triết lý Dual-rate (Remote Frame không có Data Phase nên cờ BRS vô nghĩa); (2) Phá vỡ tính tiền định (Non-deterministic timing) khi một node bất ngờ bị thăm dò phát tốc độ cao; (3) Mạng ô tô hiện đại dùng mô hình Publish-Subscribe định kỳ hoặc Request-Response tầng cao (UDS/SOME-IP).
    - ⏱️ **When:** CAN 2.0 phát theo yêu cầu thăm dò; CAN FD thay thế bit RTR bằng bit **RRS (Remote Request Substitution)** và ép cứng vĩnh viễn ở mức Dominant (0).
    - 📍 **Where:** Nằm ngay sau bit ID10:0 trong Standard Frame hoặc sau ID4:0 trong Extended Frame (thuộc Arbitration Field).
    - ⚙️ **Who & How:** Do phần cứng CAN Controller điều khiển. Trong CAN FD, nếu bộ thu nhận được frame có `FDF = 1` (CAN FD) nhưng bit ở vị trí RRS là Recessive (1), phần cứng coi đây là Form Error và kích hoạt bắn Error Frame tiêu hủy gói tin.
  - 🖥️ **SystemC/C++ Modeling:** Khi thiết kế struct `CanFrame` trong C++, struct CAN 2.0 cần trường `bool is_remote;`. Ở CAN FD, trường này bị loại bỏ, thay bằng `bool rrs = false;`. Trong parser giải mã gói tin: `if (frame.fdf && frame.rtr) { trigger_protocol_exception(); return; }`. Tuyệt đối không dùng struct bitfield C++ (`uint32_t id:11, rrs:1;`) để ép kiểu `reinterpret_cast` từ buffer thô vì chuẩn C++ quy định layout bitfield phụ thuộc compiler/endianness; bắt buộc dùng bitwise masking (`(raw_word >> 20) & 0x01`).
  - 🔧 **ECU/AUTOSAR Practice:** Trong cấu hình BSW AUTOSAR, nếu kỹ sư cố tình chọn `CanIfTxPduType = REMOTE` cho một PDU thuộc cụm mạng CAN FD trong file cấu hình ARXML, trình sinh mã (Code Generator) và module DET (Default Error Tracer) sẽ báo lỗi nghiêm trọng ngay lúc build `CANIF_E_PARAM_POINTER / CONFIG_INVALID`.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** Đội ngũ phát triển đang nâng cấp hệ thống ECU Gateway cũ từ CAN 2.0 lên CAN FD. Một kỹ sư đề xuất giữ lại cơ chế Polling bằng Remote Frame để tiết kiệm băng thông khi đọc áp suất lốp TPMS.
    - 🎯 **T (Task):** Phản biện kỹ thuật và chứng minh giải pháp giữ Remote Frame trên CAN FD là bất khả thi theo tiêu chuẩn ISO 11898-1:2015, đồng thời đưa ra kiến trúc thay thế tối ưu.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Chỉ ra rằng phần cứng CAN FD Silicon MAC (TC397 / S32K3) sẽ gắn cờ Form Error ngay lập tức nếu nhận bit Recessive ở RRS. Đề xuất chuyển đổi sang mô hình **Event-driven Transmission** kết hợp **Minimum Inter-frame Delay** hoặc truyền định kỳ theo chu kỳ 100ms.
      - 💻 *C++ / Modeling:* Trong mô hình giả lập ECU C++, refactor toàn bộ cơ chế Polling sang kiến trúc `Observer Pattern` / `Publish-Subscribe` sử dụng con trỏ hàm callback nhẹ hoặc `std::function` không cấp phát heap (`fixed-size allocator`).
    - 📊 **R (Result):** Tiêu chuẩn hóa 100% tuân thủ ISO 11898-1:2015, giảm độ trễ phản hồi của cảm biến áp suất lốp từ 25ms xuống dưới 5ms, triệt tiêu hoàn toàn rủi ro Form Error trên bus.
- 🇬🇧 **English:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** A Remote Frame is a legacy CAN 2.0 frame containing no payload (DLC indicates requested length, but Data bytes = 0), carrying RTR = 1 to prompt another node to transmit a Data Frame with matching ID.
    - 💡 **Why:** CAN FD completely deprecated Remote Frames because: (1) It breaks the Dual-rate model (no Data Phase exists for BRS); (2) It introduces non-deterministic timing when nodes are abruptly prompted to reply at high speeds; (3) Modern automotive stacks adopt cyclic Publish-Subscribe or high-layer Request-Response (UDS/SOME-IP).
    - ⏱️ **When:** Transmitted on-demand in CAN 2.0; replaced in CAN FD by the **RRS (Remote Request Substitution)** bit, hardcoded permanently to Dominant (0).
    - 📍 **Where:** Located immediately after ID10:0 in Standard Frames or after ID4:0 in Extended Frames (Arbitration Field).
    - ⚙️ **Who & How:** Handled by the silicon CAN Controller. If a CAN FD receiver detects `FDF = 1` while the bit at the RRS position is Recessive (1), it raises a Form Error and broadcasts an Error Frame to discard the packet.
  - 🖥️ **SystemC/C++ Modeling:** In C++ `CanFrame` structs, the legacy `bool is_remote;` is eliminated, replaced with `bool rrs = false;`. In frame parsing: `if (frame.fdf && frame.rtr) { trigger_protocol_exception(); return; }`. Never cast raw byte buffers onto C++ bitfield structs (`uint32_t id:11, rrs:1;`) due to implementation-defined compiler packing and endianness mismatches; parse via explicit bitwise shifts and masks (`(raw_word >> 20) & 0x01`).
  - 🔧 **ECU/AUTOSAR Practice:** In AUTOSAR BSW configuration, configuring `CanIfTxPduType = REMOTE` on a CAN FD network cluster will cause the ARXML Code Generator and DET module to fail build time verification with `CANIF_E_PARAM_POINTER / CONFIG_INVALID`.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** An engineering team migrating an legacy Gateway ECU to CAN FD proposes retaining Remote Frame polling for TPMS tire pressure sensors to conserve bandwidth.
    - 🎯 **T (Task):** Reject the proposal based on ISO 11898-1:2015 compliance and design an optimal high-performance alternative.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Prove that modern CAN FD Silicon MACs (Infineon AURIX TC397, NXP S32K3) immediately throw a Form Error when encountering a Recessive RRS bit. Transition the sensor architecture to cyclic 100ms transmission with event-driven bursts.
      - 💻 *C++ / Modeling:* In C++ ECU simulation models, refactor legacy polling to an `Observer / Pub-Sub Pattern` with zero-allocation lightweight delegates.
    - 📊 **R (Result):** Achieved 100% ISO 11898-1:2015 conformance, reduced TPMS sensor response latency from 25ms to <5ms, and prevented fatal bus Form Errors.

#### Q&A 2.3: Overload Frame vs Error Frame
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** Cả hai đều là các khung điều khiển đặc biệt cố tình vi phạm quy tắc Bit-stuffing bằng cách phát ra **6 bit Dominant liên tiếp**, nhưng mang ý nghĩa hoàn toàn khác nhau:
      - **Error Frame:** Báo động phát hiện lỗi truyền thông, yêu cầu hủy bỏ frame đang truyền trên toàn mạng.
      - **Overload Frame:** Báo quá tải tạm thời của bộ đệm node nhận, xin thêm thời gian xử lý (trì hoãn frame tiếp theo).
    - 💡 **Why:** CAN FD cấm Overload Frame trong Data Phase vì Data Phase chạy ở tốc độ cao (2–8 Mbps) dành riêng cho truyền tải payload của node thắng phân xử; nếu cho phép node nhận chen Overload Frame vào giữa chừng sẽ phá hủy toàn bộ đồng bộ clock và gây va chạm bus thảm khốc.
    - ⏱️ **When:** Error Frame phát ra **ngay lập tức** tại bất kỳ vị trí nào phát hiện lỗi (Active Error Flag); Overload Frame chỉ được phép phát trong **khoảng nghỉ Intermission (IFS)** (trước khi bit thứ 3 kết thúc).
    - 📍 **Where:** Thuộc lớp Data Link Layer (MAC) do phần cứng điều khiển.
    - ⚙️ **Who & How:** Do bộ đệm nhận (Rx FIFO) của CAN Controller kích hoạt. Khi phát hiện lỗi hoặc tràn FIFO, phần cứng kéo bus xuống mức Dominant liên tục 6 bit, ép tất cả các node khác nhận biết sự vi phạm bit-stuffing và đồng loạt phản ứng.
  - 🖥️ **SystemC/C++ Modeling:** Trong SystemC, Error Frame ngắt ngang luồng truyền thông thường thông qua `sc_event error_ev; error_ev.notify();`. Không được dùng C++ exception (`throw FrameError;`) vì stack unwinding làm sập thông lượng mô phỏng từ hàng triệu frames/giây xuống còn vài nghìn frames/giây. Thay vào đó dùng máy trạng thái tường minh: `state = STATE_ERROR_FLAG; send_dominant_bits(6);`. Đối với Overload Frame, kiểm tra ở state nghỉ: `if (state == INTERMISSION && rx_fifo.is_full()) { state = OVERLOAD_FLAG; }`.
  - 🔧 **ECU/AUTOSAR Practice:** Trên ECU hiện đại, Overload Frame gần như đã tuyệt chủng nhờ vi điều khiển trang bị Direct Memory Access (DMA) đa kênh và Hardware FIFO chuyên dụng. Nếu phát hiện Overload Frame xuất hiện trên Vector CANoe, đó là cảnh báo đỏ về cấu hình sai bộ nhớ đệm MCAL (`CanMainFunctionRWPeriods`) hoặc CPU bị ngắt nặng (Interrupt Lock).
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** Kỹ sư calibrator cắm máy phân tích Vector CANoe vào cụm mạng powertrain của xe chạy đường thử và phát hiện xuất hiện liên tục các khung Overload Frame làm bus load tăng vọt từ 40% lên 92%.
    - 🎯 **T (Task):** Định vị chính xác node phát sinh Overload Frame và triệt tiêu hiện tượng này trong vòng 2 ngày làm việc.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Đo điện áp vi sai trên từng chân CAN_H/CAN_L bằng oscilloscope kết hợp ID filter trên CANoe để bắt chính xác ECU gửi Overload Flag trong pha Intermission. Kiểm tra cấu hình task `Can_MainFunction_Read` trong OS AUTOSAR: phát hiện task nhận đang bị cấu hình chu kỳ quá chậm (50ms) trong khi frame gửi tới chu kỳ 5ms gây tràn Hardware Mailbox Rx. Rút ngắn chu kỳ polling xuống 5ms hoặc chuyển sang cấu hình CanRxProcessing dạng Interrupt.
      - 💻 *C++ / Modeling:* Trong phần mềm ECU, thay thế hàng đợi có khóa đơn giản bằng cấu trúc dữ liệu `Lock-Free Ring Buffer` (Circular FIFO) với bộ nhớ tĩnh được cấp phát trước, cho phép ngắt ISR ghi data cực nhanh mà không gây tranh chấp tài nguyên.
    - 📊 **R (Result):** 100% hiện tượng Overload Frame biến mất, bus load hạ về mức ổn định 38%, thời gian phản hồi tin nhắn nhận đạt mức dưới 200 microsecond.
- 🇬🇧 **English:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** Both are specialized control frames that deliberately violate bit-stuffing rules by pumping **6 consecutive Dominant bits**, but with completely different semantics:
      - **Error Frame:** Signals a protocol violation, aborting the corrupted transmission globally.
      - **Overload Frame:** Signals an internal receiver buffer bottleneck, requesting a brief delay before the next frame starts.
    - 💡 **Why:** CAN FD strictly forbids Overload Frames during the Data Phase because high-speed communication (2–8 Mbps) belongs exclusively to the winning transmitter; allowing receivers to inject overload flags mid-payload would destroy clock synchronization and trigger bus-wide collisions.
    - ⏱️ **When:** Error Frames trigger **immediately** upon fault detection; Overload Frames are only permissible during the **Intermission (IFS)** window (before the 3rd intermission bit finishes).
    - 📍 **Where:** Implemented in the Data Link Layer (MAC) silicon.
    - ⚙️ **Who & How:** Triggered by the CAN Controller's Rx FIFO. The hardware clamps the bus to Dominant for 6 bit-times, forcing all bus nodes to recognize the deliberate bit-stuffing violation and coordinate their state machines.
  - 🖥️ **SystemC/C++ Modeling:** In SystemC, Error Frames preempt regular communication via `sc_event error_ev; error_ev.notify();`. Avoid throwing C++ exceptions (`throw FrameError;`) because stack unwinding overhead degrades simulation throughput from millions of frames/sec to a crawl. Use explicit state transitions instead: `state = STATE_ERROR_FLAG; send_dominant_bits(6);`. For Overload Frames, poll during the idle state: `if (state == INTERMISSION && rx_fifo.is_full()) { state = OVERLOAD_FLAG; }`.
  - 🔧 **ECU/AUTOSAR Practice:** In modern ECUs, Overload Frames are practically extinct thanks to multi-channel DMA engines and dedicated hardware FIFOs. Observing Overload Frames on a CANoe bus trace is a critical red flag signaling incorrect MCAL buffer periods (`CanMainFunctionRWPeriods`) or prolonged CPU interrupt lockouts.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** A calibration engineer monitoring a vehicle test track run spots continuous Overload Frames on Vector CANoe, causing powertrain bus load to spike from 40% to 92%.
    - 🎯 **T (Task):** Isolate the transmitting ECU responsible for the overload flags and eradicate the bottleneck within 48 hours.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Probe CAN_H/CAN_L differential voltages with an oscilloscope synchronized with CANoe ID triggers to identify the faulty ECU asserting Dominant bits during Intermission. Inspect AUTOSAR OS task scheduling: discovered `Can_MainFunction_Read` configured at 50ms periods while high-speed sensor bursts arrive every 5ms, overflowing Rx Mailboxes. Reconfigure Rx handling to Interrupt mode or accelerate polling to 5ms.
      - 💻 *C++ / Modeling:* Replace locking FIFO queues in the ECU software with a static `Lock-Free Ring Buffer` (Circular FIFO) enabling ISRs to enqueue frames with zero mutex contention.
    - 📊 **R (Result):** Overload Frames dropped to 0%, bus load stabilized at 38%, and message receive latency plunged below 200 microseconds.

---

### ✅ Item 3 (Ngày 7–9): Q&A Cluster 2 — Frame Structure + BRS + DLC

**Nhiệm vụ:** Giải phẫu chi tiết trường dữ liệu, tốc độ kép (Dual-rate), và cơ chế Padding của chuẩn CAN FD. Chuẩn hóa theo khung **5W-1H** và **Micro-STAR**.

#### Q&A 3.1: Vị trí của BRS (Bit Rate Switch)
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** BRS (Bit Rate Switch) là cờ 1-bit điều khiển chuyển đổi giữa hai mức tốc độ baudrate trong cùng một khung CAN FD (Baudrate phân xử Nominal Rate và Baudrate dữ liệu Data Rate).
    - 💡 **Why:** Không thể tăng tốc toàn bộ frame ngay từ đầu vì quá trình phân xử (Arbitration Field) và xác nhận (ACK Field) bắt buộc phải chạy ở tốc độ thấp (Nominal Rate $\le 1$ Mbps). Ở tốc độ thấp, thời gian 1 bit đủ dài (ví dụ 500kbps là 2000ns) để tín hiệu điện truyền qua toàn bộ chiều dài cáp tới node xa nhất và dội ngược lại để giải quyết tranh chấp bus (CSMA/CR). Tăng tốc ngay từ đầu sẽ gây xung đột chồng chéo và hỏng phân xử.
    - ⏱️ **When:**
      - **Tăng tốc (Nominal &rarr; Data Rate):** Bắt đầu ngay tại **Sample Point của bit BRS** (khi bit BRS mang giá trị Recessive = 1).
      - **Hạ tốc (Data Rate &rarr; Nominal):** Bắt buộc hạ tốc độ về lại mức Nominal tại **Sample Point của bit CRC Delimiter** để tất cả các node cùng đồng pha xác nhận ACK.
    - 📍 **Where:** Nằm ở bit thứ 3 của Control Field (ngay sau bit FDF và bit res, nằm trước bit ESI).
    - ⚙️ **Who & How:** Do bộ Multiplexer Timer Clock phần cứng bên trong Silicon CAN Controller tự động chuyển mạch. Khi bit BRS được đọc là Recessive (1), mạch silicon chuyển nguồn phát clock từ thanh ghi `Nominal Bit Timing Register` sang `Data Bit Timing Register`.
  - 🖥️ **SystemC/C++ Modeling:** Mô phỏng BRS trong C++ bằng cách chuyển đổi chu kỳ trễ của bộ định thời: `void switch_clock(BaudrateMode mode)`. Khi parser duyệt đến bit BRS = 1, callback gọi `switch_clock(DATA_RATE)`, cập nhật biến `t_bit = data_tq * data_tbit_quanta`. Để triệt tiêu Clock Drift tích lũy qua hàng ngàn bit khi gọi `wait()`, tuyệt đối không cộng dồn thời gian tương đối `wait(t_bit)`. Phải tính mốc tuyệt đối `next_sample_timestamp += t_bit` và gọi `wait(next_sample_timestamp - sc_time_stamp())`.
  - 🔧 **ECU/AUTOSAR Practice:** Trong cấu hình MCAL `CanControllerBaudrateConfig`, kỹ sư thiết lập 2 bộ tham số song song: `CanControllerNominalBitRate` (ví dụ 500 kbps, 80% sample point) và `CanControllerDataBitRate` (ví dụ 2 Mbps hoặc 5 Mbps, 75% sample point). Nếu cờ BRS bị tắt (`CanTxPduBrs = FALSE`), toàn bộ frame CAN FD sẽ truyền ở tốc độ Nominal dù payload vẫn là 64 bytes.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** Đội phát triển cấu hình mạng CAN FD 5 Mbps cho cụm cảm biến Radar ADAS. Khi kích hoạt BRS = 1, bộ phân tích bus liên tục báo lỗi Bit Error ngay tại vùng ACK Slot của frame.
    - 🎯 **T (Task):** Xác định nguyên nhân tại sao lỗi chỉ xảy ra khi bật BRS và khắc phục triệt để không còn lỗi bit.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Đo dạng sóng bằng oscilloscope: phát hiện node phát không hạ tốc độ tại bit CRC Delimiter mà vẫn chạy ở tốc độ 5 Mbps qua vùng ACK. Ở 5 Mbps, 1 bit chỉ dài 200ns, trong khi trễ lan truyền khứ hồi (Round-trip propagation delay) trên đường cáp 15 mét của xe kèm trễ transceiver mất tới 280ns. Node nhận kéo ACK không kịp tới trước sample point của node phát. Sửa lại cấu hình thanh ghi MCAL để đảm bảo phần cứng hạ về Nominal 500 kbps chính xác tại sườn của CRC Delimiter.
      - 💻 *C++ / Modeling:* Trong mô hình simulator C++, bổ sung assertion kiểm tra trạng thái chuyển mạch: `assert(current_rate == NOMINAL_RATE && "ACK slot must run at nominal baudrate!");`.
    - 📊 **R (Result):** 100% lỗi Bit Error tại ACK Slot bị triệt tiêu, radar ADAS truyền thông suốt với băng thông thực tế tăng gấp 4.8 lần so với Classic CAN.
- 🇬🇧 **English:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** BRS (Bit Rate Switch) is a 1-bit flag that dynamically switches between two clock baudrates within a single CAN FD frame (Nominal Arbitration Rate vs Data Rate).
    - 💡 **Why:** The entire frame cannot run at high speed because Arbitration and ACK slots require propagation delay margins across the full physical bus harness ($\le 1$ Mbps). At Nominal Rate (e.g., 500kbps = 2000ns bit time), differential signals can travel to the furthest node and back to resolve collisions cleanly. Speeding up early destroys CSMA/CR arbitration.
    - ⏱️ **When:**
      - **Acceleration (Nominal &rarr; Data Rate):** Triggers at the **Sample Point of the BRS bit** (when set to Recessive = 1).
      - **Deceleration (Data Rate &rarr; Nominal):** Strictly returns to Nominal Rate at the **Sample Point of the CRC Delimiter bit** so all nodes sample the ACK bit in identical phase.
    - 📍 **Where:** The 3rd bit of the Control Field (after FDF and res, before ESI).
    - ⚙️ **Who & How:** Controlled by the Silicon MAC clock multiplexer. Sensing BRS=1 shifts clock prescalers from the `Nominal Bit Timing Register` to the `Data Bit Timing Register`.
  - 🖥️ **SystemC/C++ Modeling:** Model BRS by toggling simulation timers: `void switch_clock(BaudrateMode mode)`. When parsing BRS=1, trigger `switch_clock(DATA_RATE)` and update `t_bit = data_tq * data_tbit_quanta`. Prevent accumulated Clock Drift across thousands of bits by computing absolute milestones: `next_sample_timestamp += t_bit; wait(next_sample_timestamp - sc_time_stamp());`.
  - 🔧 **ECU/AUTOSAR Practice:** In AUTOSAR MCAL `CanControllerBaudrateConfig`, engineers configure two dual timing sets: `CanControllerNominalBitRate` (e.g., 500kbps, 80% sample point) and `CanControllerDataBitRate` (e.g., 2Mbps or 5Mbps, 75% sample point). If `CanTxPduBrs = FALSE`, CAN FD frames transmit at Nominal Rate across all 64 bytes.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** An ADAS Radar sensor cluster operating on a 5 Mbps CAN FD bus throws frequent Bit Errors specifically at the ACK slot whenever BRS is enabled.
    - 🎯 **T (Task):** Identify the root cause behind ACK-phase failures and eliminate all transmission errors.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Probe waveforms with an oscilloscope: discovered the transmitter firmware failed to switch back to Nominal Rate at the CRC Delimiter, transmitting the ACK slot at 5 Mbps (200ns bit time). Round-trip wire delay across the 15m harness plus transceiver loops totaled 280ns, causing the receiver's dominant ACK pulse to miss the transmitter's sample point. Reconfigure MCAL bit-timing registers to enforce clock reduction at CRC Delimiter.
      - 💻 *C++ / Modeling:* In C++ simulators, embed rate validation assertions: `assert(current_rate == NOMINAL_RATE && "ACK slot must run at nominal baudrate!");`.
    - 📊 **R (Result):** Eliminated 100% of ACK Bit Errors; ADAS sensor streams achieved 4.8x real throughput gains over Classic CAN.

#### Q&A 3.2: Quy luật Non-linear DLC (Data Length Code)
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** DLC (Data Length Code) phi tuyến tính là bảng quy ước ánh xạ 4-bit của trường DLC sang độ dài dữ liệu thực tế:
      - DLC từ `0` đến `8`: Đại diện tuyến tính cho `0` đến `8` bytes dữ liệu.
      - DLC từ `9` đến `15`: Ánh xạ phi tuyến tính lần lượt cho `12`, `16`, `20`, `24`, `32`, `48`, và `64` bytes.
    - 💡 **Why:** Để giữ nguyên tính tương thích với cấu trúc Header 4-bit của chuẩn cũ CAN 2.0 (chỉ có thể biểu diễn tối đa $2^4 = 16$ giá trị). Nếu dùng đếm tuyến tính thì 4 bit không thể đếm tới 64 bytes.
    - ⏱️ **When:** Kích hoạt ngay trong pha Control Field khi bộ điều khiển tạo và đóng gói frame.
    - 📍 **Where:** Nằm ở 4 bit cuối cùng của trường điều khiển (Control Field), ngay sau bit ESI.
    - ⚙️ **Who & How:** Do tầng `CanIf` (phần mềm) và Silicon MAC (phần cứng) phối hợp. Nếu Application đẩy xuống một gói tin có kích thước lẻ không nằm trong các mốc hợp lệ (ví dụ: 13 bytes), tầng phần mềm bắt buộc phải thực hiện **Padding** (chèn thêm 3 bytes đệm dummy, thường là `0xCC` hoặc `0x00`) để làm tròn lên mốc DLC hợp lệ gần nhất là 16 bytes (DLC = 10).
  - 🖥️ **SystemC/C++ Modeling:** Trong C++, bảng ánh xạ DLC phi tuyến tính được tối ưu hóa bằng mảng hằng số tra cứu Look-up Table: `constexpr uint8_t DLC_TO_BYTES[16] = {0,1,2,3,4,5,6,7,8, 12, 16, 20, 24, 32, 48, 64};`. Khi sao chép payload: `uint8_t dlc = get_dlc_from_size(size); size_t wire_bytes = DLC_TO_BYTES[dlc]; memcpy(tx_buf, app_data, size); memset(tx_buf + size, 0xCC, wire_bytes - size);`. Sử dụng `constexpr LUT` cho phép truy xuất bộ nhớ $O(1)$ trực tiếp vào L1 Cache, nhanh hơn 60% so với câu lệnh `switch(dlc)` có 16 nhánh trên vi xử lý nhúng.
  - 🔧 **ECU/AUTOSAR Practice:** Tại module `CanIf` của stack AUTOSAR, tham số `CanIfDataLengthCodeCheck` và `CanIfPduPaddingEnable` quyết định hành vi. Nếu bật Padding, `CanIf` tự chèn byte giá trị quy định (thường là `CanIfPduPaddingValue = 0xAA` hoặc `0x55` để tránh vô tình tạo ra chuỗi bit stuffing liên tục).
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** Một ECU truyền thông điệp mã hóa bảo mật SecOC có payload thực tế là 21 bytes. Kỹ sư thấy gói tin gửi lên bus có chiều dài 24 bytes (DLC=12), nhưng ở bên nhận, bộ giải mã thuật toán HMAC/CMAC liên tục báo lỗi sai chữ ký (Signature Verification Failed).
    - 🎯 **T (Task):** Tìm ra nguyên nhân gốc rễ (Root Cause) gây lỗi xác thực chữ ký số SecOC và khắc phục triệt để.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Kiểm tra cơ chế tính toán chữ ký MAC tại tầng SecOC/PduR: Bên gửi tính toán MAC trên 21 bytes gốc, sau đó `CanIf` tự chèn 3 bytes padding `0x00` để thành 24 bytes truyền ra bus. Bên nhận khi nhận frame 24 bytes từ bus lại đưa toàn bộ 24 bytes (gồm cả 3 bytes padding) vào hàm kiểm tra chữ ký của HSM, dẫn đến sai lệch hash đầu vào. Sửa cấu hình PduR bên nhận để đọc đúng độ dài `PduLength = 21` từ metadata thay vì lấy kích thước buffer 24 bytes của CAN FD.
      - 💻 *C++ / Modeling:* Trong unit test C++, viết hàm unpack an toàn: `void unpack_pdu(const uint8_t* wire_data, size_t valid_len, size_t wire_len);` để tách bạch rõ ràng giữa kích thước vật lý trên dây và kích thước logic của ứng dụng.
    - 📊 **R (Result):** 100% gói tin SecOC xác thực thành công ngay lập tức, độ trễ bảo mật được bảo toàn và không còn tình trạng drop gói tin trên mạng.
- 🇬🇧 **English:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** Non-linear DLC (Data Length Code) is a 4-bit mapping convention encoding discrete payload boundaries:
      - DLC `0` to `8`: Linearly maps to `0` to `8` bytes.
      - DLC `9` to `15`: Non-linearly maps to `12`, `16`, `20`, `24`, `32`, `48`, and `64` bytes.
    - 💡 **Why:** Preserves 4-bit Header compatibility with CAN 2.0 ($2^4 = 16$ states). Linear incrementing cannot count up to 64 bytes using just 4 bits.
    - ⏱️ **When:** Evaluated during the Control Field parsing and frame packaging phase.
    - 📍 **Where:** The final 4 bits of the Control Field, positioned immediately after ESI.
    - ⚙️ **Who & How:** Coordinated between the software `CanIf` module and hardware Silicon MAC. If an application submits an unmapped payload size (e.g., 13 bytes), the software stack pads 3 dummy bytes (`0xCC` or `0x00`) to elevate the frame to the next valid boundary (16 bytes, DLC = 10).
  - 🖥️ **SystemC/C++ Modeling:** In C++, map DLC via a `constexpr uint8_t DLC_TO_BYTES[16] = {0,1,2,3,4,5,6,7,8, 12, 16, 20, 24, 32, 48, 64};` Look-up Table. Enforce padding: `uint8_t dlc = get_dlc_from_size(size); size_t wire_bytes = DLC_TO_BYTES[dlc]; memcpy(tx_buf, app_data, size); memset(tx_buf + size, 0xCC, wire_bytes - size);`. A `constexpr LUT` resolves to $O(1)$ L1 Cache access, outperforming 16-branch `switch(dlc)` constructs by ~60% on embedded RISC processors.
  - 🔧 **ECU/AUTOSAR Practice:** Handled by AUTOSAR `CanIf` parameters `CanIfDataLengthCodeCheck` and `CanIfPduPaddingEnable`. When enabled, `CanIf` inserts dummy bytes (`CanIfPduPaddingValue = 0xAA` or `0x55` to prevent unintended bit-stuffing streaks).
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** An ECU transmitting a 21-byte SecOC authenticated message is padded to 24 bytes (DLC=12) by CanIf. On the receiver, the cryptographic HSM consistently rejects the message with Signature Verification Failures.
    - 🎯 **T (Task):** Identify the discrepancy between transmitted data and SecOC cryptographic signature computation and restore verification.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Trace the SecOC/PduR crypto pipeline: The sender calculated the MAC over the original 21 bytes before CanIf appended 3 padding bytes (`0x00`). The receiver passed the full 24-byte wire buffer into the HSM verification routine, corrupting the hash input. Reconfigure receiver PduR routing to decouple physical wire length from logical payload length (`PduLength = 21`).
      - 💻 *C++ / Modeling:* Implement explicit C++ buffer unpacking interfaces: `void unpack_pdu(const uint8_t* wire_data, size_t valid_len, size_t wire_len);` to clearly isolate wire buffers from application payloads.
    - 📊 **R (Result):** Achieved 100% SecOC verification success, maintained cryptographic latency budgets, and eradicated message drops.

### ✅ Item 4 (Ngày 10–12): Q&A Cluster 3 — Bit Stuffing (Dynamic/Fixed) + SBC + CRC

**Nhiệm vụ:** Giải phẫu cơ chế nhồi bit động/tĩnh, trường đếm Stuff Bit Count (SBC mã Gray) và đa thức bảo vệ toàn vẹn dữ liệu CRC-17/CRC-21 theo chuẩn ISO 11898-1:2015. Chuẩn hóa theo khung **5W-1H** và **Micro-STAR**.

#### Q&A 4.1: Dynamic Stuffing vs Fixed Stuffing trong CAN FD
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** Bit Stuffing là kỹ thuật chèn thêm bit phụ vào luồng truyền thông để triệt tiêu các chuỗi bit giống nhau kéo dài. CAN FD kết hợp hai cơ chế: **Dynamic Stuffing** (chèn 1 bit đảo dấu sau 5 bit giống nhau liên tiếp) và **Fixed Stuffing** (bắt buộc chèn 1 bit đảo dấu của bit liền trước tại các mốc vị trí cố định sau mỗi 4 bit).
    - 💡 **Why:** Giao thức CAN dùng mã hóa đường truyền NRZ (Non-Return-to-Zero) không có đường xung clock riêng nên bắt buộc phải có sườn chuyển mức điện áp để mạch PLL/DPLL của các node nhận tái đồng bộ xung nhịp (Resynchronization). Tuy nhiên, trong CAN 2.0, nếu có một cặp lỗi bit đảo chiều (double bit error) biến bit dữ liệu thành chuỗi 5 bit giống nhau và biến 1 bit phía sau thành stuff bit giả, chiều dài frame bị co giãn làm trượt toàn bộ vị trí CRC (Hamming Distance tụt xuống $HD = 2$), gây rò rỉ dữ liệu sai mà không phát hiện được. CAN FD dùng **Fixed Stuffing** trong vùng CRC để khóa cứng vị trí các bit kiểm tra lỗi.
    - ⏱️ **When:**
      - **Dynamic Stuffing:** Áp dụng từ bit SOF qua Arbitration Field, Control Field cho đến hết Data Field.
      - **Fixed Stuffing:** Kích hoạt ngay tại bit đầu tiên của trường SBC (Stuff Bit Count) và lặp lại đều đặn sau mỗi 4 bit xuyên suốt trường SBC và trường CRC-17/21.
    - 📍 **Where:** Nằm ở lớp Data Link Layer (MAC sublayer), thực thi trực tiếp trên luồng bit nối tiếp trước khi đẩy ra bộ thu phát vật lý.
    - ⚙️ **Who & How:** Do mạch phần cứng Bit-Stuffer / De-Stuffer trong Silicon CAN Controller đảm nhiệm. Ở vùng Fixed Stuffing, phần cứng hoàn toàn phớt lờ bộ đếm 5 bit liên tiếp, mà dùng bộ đếm modulo-4 cố định để chèn $\text{FSB} = \overline{\text{bit}_{\text{prev}}}$. Nếu node nhận thấy $\text{FSB} = \text{bit}_{\text{prev}}$, nó lập tức báo **Stuff Error (Form Error trong vùng CRC)** và bắn Error Frame.
  - 🖥️ **SystemC/C++ Modeling:** Trong bộ mô phỏng bit-accurate SystemC/C++, thiết kế class `CanFdBitStuffer` với hai chế độ trạng thái (`Mode::DYNAMIC` và `Mode::FIXED_CRC`). Ở chế độ `DYNAMIC`, duy trì biến `uint8_t consecutive_cnt` và `bool last_bit`; khi `consecutive_cnt == 5`, phát ra `!last_bit`, tăng biến đếm `dynamic_stuff_count++` (dùng để nạp vào trường SBC) và đặt lại `consecutive_cnt = 1`. Khi sang vùng CRC (`Mode::FIXED_CRC`), dùng phép toán bitwise modulo `(crc_bit_idx % 4 == 0)` để chèn `!last_bit` mà không cần rẽ nhánh phức tạp, giúp giữ nguyên hiệu năng pipeline.
  - 🔧 **ECU/AUTOSAR Practice:** Toàn bộ quá trình Stuff/De-stuff diễn ra tự động trong phần cứng Silicon MAC (như Bosch M_CAN / NXP FlexCAN), hoàn toàn trong suốt với tầng `CanDrv` và `CanIf`. Tuy nhiên, kỹ sư tích hợp hệ thống phải tính toán số lượng Dynamic Stuff Bits tối đa (Worst-Case Stuff Bits: $\lfloor \frac{N_{\text{bits}} - 1}{4} \rfloor$) khi thiết kế bảng lập lịch `Com` và tính toán **WCET (Worst-Case Execution Time)** cũng như **Bus Load%** trên Vector CANoe / PREEvision.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** Trên mạng CAN FD điều khiển khung gầm (Chassis 2 Mbps), kỹ sư thiết kế thông điệp trạng thái cảm biến góc lái truyền định kỳ 2ms với nhiều trường chưa dùng được khởi tạo toàn giá trị `0x00` (48 bytes toàn bit 0). Khi xe vận hành, đường truyền xuất hiện độ trễ biến thiên (Frame Jitter) lên tới $35\mu s$ làm bộ lọc Kalman trên ECU điều khiển ổn định thân xe (ESC) bị nhiễu.
    - 🎯 **T (Task):** Xác định nguyên nhân gây ra sự co giãn thời lượng khung truyền (Frame Duration Jitter) dù DLC cố định ở mức 48 bytes và triệt tiêu hiện tượng này.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Phân tích luồng bit: 48 bytes toàn `0x00` (384 bits `0` liên tiếp) kích hoạt cơ chế Dynamic Stuffing tối đa (cứ 4 bit dữ liệu cùng dấu với stuff bit trước đó lại sinh ra 1 stuff bit mới $\rightarrow$ đẻ thêm $\approx 96$ stuff bits!). Khi dữ liệu cảm biến thay đổi ngẫu nhiên, số stuff bits dao động từ 0 đến 96 bits, làm thời lượng truyền khung co giãn mạnh. Giải pháp: Đổi giá trị khởi tạo (Unused Bit Pattern / Padding Byte) trong cấu hình `Com` và `CanIfPduPaddingValue` từ `0x00` sang **`0xAA` (`10101010b`) hoặc `0x55` (`01010101b`)** để phá vỡ chuỗi 5 bit giống nhau.
      - 💻 *C++ / Modeling:* Viết công cụ kiểm tra tĩnh (Static Analyzer) bằng C++ quét qua toàn bộ cấu hình DBC/ARXML, mô phỏng bộ đếm Stuffing trên các giá trị Default/Init của PDU và tự động cảnh báo nếu tỷ lệ Stuffing vượt ngưỡng 5%.
    - 📊 **R (Result):** Số lượng Dynamic Stuff Bits trong trạng thái nghỉ giảm từ 96 bits xuống 0 bit, triệt tiêu 92% độ trễ Jitter của khung truyền và tiết kiệm được 6.5% băng thông tổng thể của bus.
- 🇬🇧 **English:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** Bit Stuffing inserts complementary bits into the serial stream to break long runs of identical bits. CAN FD combines two schemes: **Dynamic Stuffing** (inserting an opposite bit after 5 consecutive identical bits) and **Fixed Stuffing** (unconditionally inserting the inverse of the preceding bit at fixed 4-bit intervals).
    - 💡 **Why:** CAN uses NRZ encoding without a dedicated clock line, requiring frequent voltage edges for receiver DPLL resynchronization. In Classic CAN 2.0, a double-bit error could corrupt a stuff bit condition, shrinking or stretching the frame and shifting the CRC delimiter (reducing Hamming Distance to $HD = 2$). CAN FD enforces **Fixed Stuffing** in the CRC field to strictly lock bit positions.
    - ⏱️ **When:** **Dynamic Stuffing** applies from SOF through Arbitration, Control, and Data fields. **Fixed Stuffing** starts at the very first bit of the SBC field and repeats every 4 bits across the entire SBC and CRC-17/21 fields.
    - 📍 **Where:** Executed at the Data Link Layer (Silicon MAC sublayer) directly on the serial bit stream prior to the physical transceiver.
    - ⚙️ **Who & How:** Controlled by the hardware CAN Controller. During Fixed Stuffing, hardware bypasses the 5-bit counter and uses a modulo-4 counter to insert $\text{FSB} = \overline{\text{bit}_{\text{prev}}}$. If a receiver samples $\text{FSB} = \text{bit}_{\text{prev}}$, it immediately triggers a **Form/Stuff Error** and broadcasts an Error Frame.
  - 🖥️ **SystemC/C++ Modeling:** In bit-accurate SystemC/C++ simulators, implement a `CanFdBitStuffer` state machine with `Mode::DYNAMIC` and `Mode::FIXED_CRC`. In `DYNAMIC` mode, track `consecutive_cnt`; when reaching 5, emit `!last_bit` and increment `dynamic_stuff_cnt++` (for the SBC field). Upon entering the CRC field (`Mode::FIXED_CRC`), evaluate `(crc_bit_idx % 4 == 0)` to deterministically inject `!last_bit` regardless of prior bit patterns.
  - 🔧 **ECU/AUTOSAR Practice:** Stuffing and de-stuffing are handled autonomously by the Silicon MAC, remaining transparent to `CanDrv / CanIf`. However, system engineers must account for Worst-Case Dynamic Stuff Bits ($\lfloor \frac{N_{\text{bits}} - 1}{4} \rfloor$) when designing schedule tables and calculating **Bus Load%**. Always configure `CanIfPduPaddingValue = 0xAA` or `0x55` to prevent worst-case stuffing streaks.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** On a 2 Mbps chassis CAN FD network, a 2ms cyclic steering sensor message initializes 48 reserved bytes to `0x00`. During track testing, frame transmission duration exhibits severe $35\mu s$ jitter, destabilizing the ESC Kalman filter.
    - 🎯 **T (Task):** Identify the root cause of frame duration jitter despite a fixed 48-byte DLC and eliminate the timing variance.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* 48 bytes of `0x00` (384 consecutive zeros) trigger worst-case Dynamic Stuffing, injecting $\approx 96$ extra stuff bits! As live sensor data changes, stuff bits fluctuate between 0 and 96. Solution: Change Unused Bit Patterns and `CanIfPduPaddingValue` from `0x00` to alternating bit patterns **`0xAA` (`10101010b`)**.
      - 💻 *C++ / Modeling:* Build a C++ static configuration analyzer that parses ARXML/DBC default PDU values, simulates bit-stuffing overhead, and flags payloads exceeding 5% stuff bit inflation.
    - 📊 **R (Result):** Default dynamic stuff bits dropped from 96 to 0, eliminating 92% of frame duration jitter and reclaiming 6.5% of total bus bandwidth.

#### Q&A 4.2: Trường SBC (Stuff Bit Count) & Thuật Toán CRC-17 / CRC-21 (ISO vs Non-ISO)
- 🇻🇳 **Tiếng Việt:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** CAN FD nâng cấp toàn diện trường kiểm tra lỗi bằng cách bổ sung trường **SBC (Stuff Bit Count - 4 bits)** đứng ngay trước trường **CRC-17** (cho payload $0 \dots 16$ bytes) hoặc **CRC-21** (cho payload $20 \dots 64$ bytes).
    - 💡 **Why:** Đa thức CRC-15 của CAN 2.0 chỉ đủ an toàn cho khung ngắn tối đa 8 bytes; khi kéo dài lên 64 bytes (512 bits), khoảng cách Hamming tụt dốc khiến lỗi đa bit dễ dàng lọt lưới. Hơn nữa, trong CAN 2.0, CRC được tính trên chuỗi bit *trước khi nhồi bit (de-stuffed)*, nên nếu lỗi đường truyền vô tình ăn mất 1 stuff bit và sinh ra 1 stuff bit khác ở cuối frame, tổng số bit không đổi nhưng dữ liệu bị dịch trái/phải mà CRC-15 vẫn báo đúng!
    - ⏱️ **When:** Được tính toán theo thời gian thực ngay khi từng bit (bao gồm cả các bit Dynamic Stuffing) được đẩy ra bus từ bit SOF cho đến hết Data Field, và được phát ra ngay sau byte cuối cùng của Payload.
    - 📍 **Where:** Nằm ở đầu vùng CRC Field: `[FSB] + [3-bit Gray-coded Stuff Count] + [1-bit Even Parity] + [FSB] + [CRC-17/21 với FSB mỗi 4 bit]`.
    - ⚙️ **Who & How:** Do mạch thanh ghi dịch phản hồi tuyến tính **LFSR (Linear Feedback Shift Register)** trong Silicon MAC thực thi. Khác biệt cốt lõi của chuẩn **ISO 11898-1:2015**: (1) Đa thức CRC-17 ($0\text{x}1685\text{B}$) và CRC-21 ($0\text{x}102899$) tính toán trực tiếp trên **luồng bit ĐÃ NHỒI (Stuffed Bit Stream)**; (2) Trường SBC ghi lại tổng số Dynamic Stuff Bits theo $\pmod 8$ dưới dạng **Mã Gray 3-bit** kèm **1 bit chẵn lẻ (Even Parity)**, khóa chặt số lượng stuff bits và nâng Hamming Distance lên $HD = 6$ xuyên suốt mọi kích thước payload.
  - 🖥️ **SystemC/C++ Modeling:** Khi mô hình hóa bộ tính CRC CAN FD trong C++, tuyệt đối không gọi hàm `calculate_crc(raw_payload)` trên mảng byte thô như CAN 2.0! Phải đặt bộ `CrcLfsrEngine<17, 0x1685B>` hoặc `CrcLfsrEngine<21, 0x102899>` nằm **phía sau** đầu ra của `DynamicBitStuffer`. Đối với trường SBC, ánh xạ số đếm `stuff_cnt % 8` qua bảng hằng số `constexpr uint8_t GRAY_PARITY_LUT[8] = {0b0000, 0b0011, 0b0110, 0b0101, 0b1100, 0b1111, 0b1010, 0b1001};` (3 bit đầu là Gray code, LSB là Even Parity) để xuất ra 4 bit SBC trong $O(1)$.
  - 🔧 **ECU/AUTOSAR Practice:** Trong lịch sử chuyển giao (2012–2015), bản nháp Bosch CAN FD đầu tiên (Non-ISO CAN FD) không có trường SBC và không đưa Stuff bits vào LFSR. Các vi điều khiển hiện đại (Infineon AURIX TC3xx, NXP S32K3, Renesas RH850) đều có bit cấu hình phần cứng `CCCR.NISO` (Non-ISO Operation). Trong cấu hình AUTOSAR MCAL `CanControllerFdIsoMode`, bắt buộc phải đặt `TRUE` (ISO 11898-1:2015 mode) cho toàn bộ các ECU và thiết bị đo Vector CANoe trên xe.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** Khi tích hợp một ECU Điều khiển Pin (BMS) mới dùng chip Infineon AURIX với thiết bị giả lập HIL (Hardware-in-the-Loop) trên bàn test, mọi khung Classic CAN 2.0 đều nhận bình thường, nhưng cứ hễ gửi khung CAN FD (`FDF = 1`) là BMS lập tức bắn Error Frame báo **CRC Error** tại cuối khung truyền, dù Baudrate và Sample Point đã cấu hình khớp 100%.
    - 🎯 **T (Task):** Chẩn đoán nguyên nhân tại sao chỉ riêng khung CAN FD bị lỗi CRC và khắc phục ngay trong buổi bring-up phần cứng.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Kiểm tra chi tiết cấu trúc bit vùng CRC trên máy phân tích logic / CANoe: Phát hiện hệ thống HIL đang để cấu hình mặc định cũ là **Non-ISO CAN FD (Bosch 2012)** (thiếu 4 bit SBC ở đầu vùng CRC), trong khi MCU AURIX đang chạy chuẩn **ISO CAN FD (ISO 11898-1:2015)**. Chuyển cấu hình kênh CAN trên HIL sang chế độ `ISO CAN FD` và kiểm tra thanh ghi `M_CAN->CCCR.NISO = 0` trong MCAL của ECU.
      - 💻 *C++ / Modeling:* Trong thư viện giải mã khung truyền C++ của công cụ test, bổ sung cờ `enum class FdStandard { ISO_11898_2015, BOSCH_NON_ISO };` và viết Unit Test kiểm증 vector chuẩn ISO để ngăn ngừa lỗi cấu hình lệch chuẩn.
    - 📊 **R (Result):** Giao tiếp CAN FD 2 Mbps / 64 bytes thông suốt ngay lập tức với 0% lỗi CRC, rút ngắn 2 ngày debug vật lý vô ích cho đội phần cứng.
- 🇬🇧 **English:**
  - 📖 **Theory (5W-1H):**
    - 📌 **What:** ISO 11898-1:2015 upgrades frame integrity by introducing a 4-bit **SBC (Stuff Bit Count)** field immediately preceding a **CRC-17** (for payloads $0\dots 16$ bytes) or **CRC-21** (for payloads $20\dots 64$ bytes).
    - 💡 **Why:** Classic CRC-15 is mathematically insufficient for 64-byte payloads. Worse yet, CAN 2.0 computes CRC over *de-stuffed raw bits*; if bus noise turns a data bit into a stuff bit and deletes a later stuff bit, the frame length remains unchanged while data shifts undetected!
    - ⏱️ **When:** The CRC engine processes every transmitted bit (including Dynamic Stuff Bits) in real-time from SOF to the end of the Data Field; SBC and CRC are transmitted right after the payload.
    - 📍 **Where:** Positioned at the start of the CRC Field: `[FSB] + [3-bit Gray-coded Count] + [1-bit Even Parity] + [FSB] + [CRC-17/21 with FSB every 4 bits]`.
    - ⚙️ **Who & How:** Hardware LFSR logic computes CRC-17 ($0\text{x}1685\text{B}$) or CRC-21 ($0\text{x}102899$) directly over the **STUFFED bit stream**. Meanwhile, SBC encodes the modulo-8 count of dynamic stuff bits using a **3-bit Gray code + 1 Even Parity bit**, guaranteeing a strict Hamming Distance of $HD = 6$.
  - 🖥️ **SystemC/C++ Modeling:** In C++ simulators, never compute CAN FD CRC over raw byte arrays! Chain the `CrcLfsrEngine<17, 0x1685B>` or `CrcLfsrEngine<21, 0x102899>` directly to the output of the `DynamicBitStuffer`. For the SBC field, encode `stuff_cnt % 8` via a compile-time lookup table: `constexpr uint8_t SBC_GRAY_PARITY_LUT[8] = {0x0, 0x3, 0x6, 0x5, 0xC, 0xF, 0xA, 0x9};` (upper 3 bits represent Gray code, LSB represents Even Parity) for $O(1)$ bit generation.
  - 🔧 **ECU/AUTOSAR Practice:** Early Bosch CAN FD implementations (2012 **Non-ISO CAN FD**) omitted the SBC field and excluded stuff bits from CRC calculation. Modern MCUs (Infineon AURIX TC3xx, NXP S32K3) provide a `CCCR.NISO` register bit. In AUTOSAR MCAL, engineers must enforce `CanControllerFdIsoMode = TRUE` across all ECUs and Vector CANoe interfaces.
  - ⚠️ **Interview Trap (Micro-STAR):**
    - 🚨 **S (Situation):** During bench bring-up of an AURIX TC397 BMS ECU against a HIL simulator, Classic CAN 2.0 frames work flawlessly, but 100% of CAN FD frames (`FDF = 1`) trigger immediate **CRC Errors** despite identical Baudrate and Sample Point settings.
    - 🎯 **T (Task):** Diagnose why CRC failures occur exclusively on CAN FD frames and resolve the incompatibility immediately.
    - 🛠️ **A (Action):**
      - 🚗 *Automotive / Protocol:* Inspect the CRC bit field on CANoe: Discovered the HIL interface defaulted to legacy **Non-ISO CAN FD (Bosch 2012)** (omitting the 4-bit SBC field), whereas the AURIX MCU operated in **ISO 11898-1:2015** mode. Switched the HIL channel to `ISO CAN FD` and verified `CCCR.NISO = 0` in MCAL.
      - 💻 *C++ / Modeling:* Parameterize C++ protocol parsers with `enum class CanFdSpec { ISO_11898_2015, NON_ISO_BOSCH };` and add ISO conformance test vectors to CI pipelines.
    - 📊 **R (Result):** Restored 100% error-free 64-byte CAN FD communication immediately, saving 2 days of unnecessary hardware debugging.

---

### ⬜ Item 5 (Ngày 13–15): Q&A Cluster 4 — Bit Timing & TDCO (Senior-level) ⚡ *[+ Tool: Sample Point Playground]*

**Nhiệm vụ:** Kiến thức "ăn điểm" cấp độ Senior/Expert về tinh chỉnh Clock và Delay mạng, tích hợp bộ công cụ tương tác chỉnh tham số trực quan.
* ⚡ **Visual Micro-Lab: Interactive Sample Point & TDCO Playground**:
  - Sliders điều chỉnh: Tần số thạch anh MCU (`f_osc`), `Baudrate Prescaler`, `Prop_Seg`, `Phase_Seg1`, `Phase_Seg2`, `SJW`.
  - Đồ họa SVG động minh họa 1 chu kỳ bit chia thành các ô Time Quanta (TQ) tương ứng.
  - Vạch laser hiển thị vị trí **Điểm lấy mẫu (Sample Point %)** thời gian thực — Cảnh báo rung lắc và đổi màu cảnh báo nếu cấu hình nằm ngoài dải an toàn $75\% - 85\%$.
  - Hiển thị mốc lấy mẫu thứ cấp **Secondary Sample Point** khi kích hoạt bù trễ TDC Offset.

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
*(Tiếp tục áp dụng công thức Deep Theory + AUTOSAR Config + Tricky Interview + Interactive Micro-Lab)*
- **Item 6:** Debug Bus Off bằng Oscilloscope, quy trình Slow/Fast Recovery của CanSM.
  - ⚡ **Visual Micro-Lab: Fault Confinement & Bus Off Simulator**: Bảng điều khiển kích hoạt lỗi (Bit Error, Stuff Error, CRC Error, ACK Error); Bộ đếm `TEC`/`REC` nhảy số thời gian thực (+8/-1); Máy trạng thái FSM 3 nút phát sáng (Error Active $\rightarrow$ Error Passive $\rightarrow$ Bus Off) kèm thanh đếm ngược phục hồi 128 lần 11 recessive bits.
- **Item 7 & 8:** Trace hành trình dữ liệu RTE -> COM -> PduR -> CanIf -> MCAL. Cơ chế Rx Interrupt Storm và giải pháp NAPI (Polling fallback).
  - ⚡ **Visual Flow: AUTOSAR Packet Journey**: Mô phỏng hạt tín hiệu (Packet Orb) bay xuyên suốt các tầng kiến trúc BSW và đóng gói/giải mã header tại từng trạm.
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
## PHASE 4: INTERACTIVE TOOLS & SIMULATORS (Items 17–19)
## ═══════════════════════════════════════
- **Item 17 (Ngày 49–51): CAN FD Calculator**
  - Công cụ tính toán Frame Duration ($\mu s$) và Bus Load (%) trực tiếp dựa trên Payload Size (0–64B), Baudrate phân xử (500k/1M) và Baudrate dữ liệu (2M/5M/8M), có tính bù Stuff bits theo chuẩn ISO 11898-1.
- **Item 18 (Ngày 52–54): Live DBC Signal Decoder & 64-Byte Payload Matrix**
  - Thanh trượt điều khiển tín hiệu vật lý: Tốc độ xe (0–250 km/h), Vòng tua máy (0–8000 RPM), Góc lái (-540° đến +540°), Vị trí cần số.
  - Ma trận 64-Byte Payload đổi màu và chớp sáng bit tương ứng thời gian thực; Chuyển đổi một chạm giữa chuẩn Intel (Little-Endian) và Motorola (Big-Endian).
- **Item 19 (Ngày 55–57): Minigame "Thợ Săn Lỗi Xung Sóng" (Oscilloscope Glitch Hunter)**
  - Chế độ thử thách tìm lỗi: Độc giả click trực tiếp lên dạng sóng dao động ký để định vị điểm dị thường (quên trở 120Ω, mất ACK, lệch Sample Point, trễ TDC).
  - Hệ thống tính điểm, hiệu ứng streak, cấp huy hiệu kỹ sư ô tô.
- **Cross-cutting: Web Audio FX Kỹ Thuật Số**
  - Tạo âm thanh mô phỏng thiết bị đo phần cứng ô tô (xung nhịp thấp ở Arbitration, vút cao ở Data Phase, chirp khi lỗi bus) qua Web Audio API thuần (0KB tải ngoài), kèm nút Mute/Unmute.

---

## ═══════════════════════════════════════
## PHASE 5: RESPONSIVE QA & DEPLOYMENT (Item 20)
## ═══════════════════════════════════════
- Testing đa thiết bị (Desktop, iPad, Mobile responsive, nhúng iframe 1200px trên Google Blogger).
- Rà soát tính toàn vẹn 4 tầng Q&A, kiểm tra cú pháp JS và đóng gói chính thức phiên bản `v2.0.0`.

---

## 🤖 Auto-Pilot Command (Dành cho AI Agent)

> **Khi USER ra lệnh:** `Hãy làm trọn gói Item [X]`

Agent bắt buộc tự động thực thi chuỗi 3 bước (3-in-1 Workflow) sau mà không dừng lại hỏi:

1. **Implement:** Đọc nội dung chuyên sâu của Item `[X]` trong file này. Chèn vào `qaData` trong `widget_can_fd.html` (Tuân thủ chuẩn Song ngữ VN/EN, đảm bảo thẻ HTML an toàn).
2. **Review & Debug:** Chạy lệnh Node.js check syntax `node -e "const fs = require('fs'); const html = fs.readFileSync('widget_can_fd.html', 'utf8'); const js = html.match(/<script>([\s\S]*?)<\/script>/)[1]; new Function(js); console.log('Syntax OK');"`. Tự động fix nếu báo lỗi.
3. **Cập nhật Hệ thống:** Đổi status từ `⬜` sang `✅` trong Progress Tracker của file này. Viết log cập nhật vào `CHANGELOG.md` (phần `[Unreleased]`). Báo cáo tóm tắt cho USER.

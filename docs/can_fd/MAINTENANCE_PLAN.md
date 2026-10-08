# Kế Hoạch Maintenance 2 Tháng: CAN FD Widget (v1.1.x → v1.2.x)

> **Mục tiêu chiến lược:** Biến widget thành công cụ ôn phỏng vấn Embedded/ECU Software automotive toàn diện — bao phủ ~80-85% kiến thức cốt lõi CAN/CAN FD từ Protocol Core đến Physical Layer, Diagnostics, Security và AUTOSAR stack đầy đủ.
>
> **Nguyên tắc nội dung:** Mỗi Q&A có 3 tầng bắt buộc: **📖 Theory → 🔧 ECU/AUTOSAR Practice → ⚠️ Interview Trap**
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
| 3 | ⬜ | Q&A: Frame Structure + BRS + DLC | 2 | 7–9 |
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
| 18 | ⬜ | Synthetic Trace Viewer (CANoe-style Table) | 4 | 52–54 |
| 19 | ⬜ | BRS Animation — Dual Bit Rate Visual | 4 | 55–57 |
| 20 | ⬜ | Testing + Responsive + Docs + Release v1.2.0 | 5 | 58–60 |

**Tiến độ hiện tại:** `2 / 20 items` ✅ _(tự cập nhật sau mỗi sprint)_

---

## 🗓 Chi Tiết Kế Hoạch (3 Ngày / 1 Item)

---

### ✅ Item 1 (Ngày 1–3): Xây Accordion Q&A Component

**Nhiệm vụ:** Tạo infrastructure Q&A tương tác — skeleton cho toàn bộ 15 Q&A cluster sau.

**Chi tiết thực thi:**
- Component: Câu hỏi hiển thị mặc định, đáp án ẩn sau nút "Reveal Answer".
- Mỗi card Q&A có 3 tab con: 📖 Lý Thuyết | 🔧 ECU/AUTOSAR | ⚠️ Interview Trap.
- Bộ lọc Difficulty: Basic / Intermediate / Advanced / Senior.
- Tag filter: #Frame #Stuffing #BitTiming #Error #AUTOSAR #Physical #Diagnostics #SecOC #Strategic.
- JS functions: toggleAnswer(id), filterByTag(tag), filterByDifficulty(level), resetFilters().

**Lý do làm item này trước:** Tất cả 15 cluster Q&A sau chỉ inject data — tách biệt hoàn toàn content và UI engine.

---

## ═══════════════════════════════════════
## PHASE 2: CAN FD CORE + AUTOSAR (Items 2–10)
## ═══════════════════════════════════════

### ✅ Item 2 (Ngày 4–6): Q&A Cluster 1 — CAN Classic Foundation (Prerequisite)

**Nhiệm vụ:** Ôn nền tảng CAN 2.0 trước khi học FD — nhiều ứng viên bỏ qua layer này và bị hỏi bất ngờ.

**Các Q&A cần xây:**

1. **"CSMA/CR hoạt động thế nào? Tại sao CAN không bị collision như Ethernet?"**
   - 📖 Carrier Sense Multiple Access / Collision Resolution: các node đồng thời gửi bit, bit Dominant (0) đè Recessive (1). Node nào phát Recessive nhưng đọc lại thấy Dominant → biết mình thua → ngừng phát ngay.
   - 🔧 ECU: Arbitration hoàn toàn do CAN Controller hardware xử lý. Software không can thiệp được. Chỉ nhận callback TxConfirmation sau khi thắng arbitration thành công.
   - ⚠️ Trap: "Node thua arbitration có mất dữ liệu không?" → Không. Nó tự động retry ở IFS (Interframe Space) tiếp theo. Dữ liệu vẫn trong HW Tx buffer.

2. **"Remote Frame trong CAN 2.0 là gì? CAN FD xử lý thế nào?"**
   - 📖 Remote Frame: node yêu cầu node khác phát Data Frame có cùng ID. CAN FD bỏ Remote Frame (RRS bit thay RTR, luôn = Dominant). Tính năng này bị loại vì không phù hợp với dual-rate.
   - 🔧 AUTOSAR: CanIfTxPduType = REMOTE không được support trong CAN FD configuration. Config sẽ bị DET error.
   - ⚠️ Trap: "Tại sao CAN FD không có Remote Frame?" → Vì Remote Frame được gửi ở Nominal rate, nhưng Data Frame reply có thể ở Data rate → timing phức tạp, không đảm bảo deterministic.

3. **"Overload Frame khác Error Frame thế nào?"**
   - 📖 Overload Frame: node phát để xin thêm thời gian xử lý (trước hoặc giữa frames). Error Frame: phát khi phát hiện lỗi. Cả hai đều dùng 6 bit Dominant liên tiếp nhưng timing context khác nhau.
   - 🔧 Modern ECU: Overload Frame cực hiếm gặp trong hệ thống AUTOSAR vì hardware buffer đủ lớn. Nếu thấy Overload Frame trên trace → dấu hiệu ECU quá tải.
   - ⚠️ Trap: "CAN FD còn dùng Overload Frame không?" → Có, nhưng chỉ ở Nominal rate.

---

### ✅ Item 3 (Ngày 7–9): Q&A Cluster 2 — Frame Structure & BRS Thực Chiến

**Nhiệm vụ:** Cấu trúc frame, DLC encoding và cơ chế BRS với góc nhìn ECU Software.

**Các Q&A cần xây:**

1. **"Tại sao BRS phải nằm ở Control Field chứ không phải ở đầu frame?"**
   - 📖 BRS quyết định tốc độ cho phần sau nó → phải nằm trước Data Phase. Thời điểm chính xác: ngay sau sample point của BRS bit, clock prescaler switch sang Data timing.
   - 🔧 MCAL: CanFdBrsEnable = TRUE trong CanControllerConfig. ESI bit reflect trạng thái CanSM của node phát.
   - ⚠️ Trap: "Nếu BRS=0 thì frame CAN FD có gì khác Classic CAN không?" → Vẫn khác: FDF bit = 1, payload vẫn lên đến 64B, CRC vẫn dùng CRC-17/21.

2. **"DLC=13 trong CAN FD nghĩa là bao nhiêu bytes?"**
   - 📖 DLC 9-15 là non-linear: {9→12, 10→16, 11→20, 12→24, 13→32, 14→48, 15→64}. Padding bytes được chèn tự động.
   - 🔧 AUTOSAR: CanIfTxPduDlc dùng giá trị byte thực (vd: 32), driver tự encode sang DLC=13. CanFdPaddingValue config byte padding (mặc định 0xCC).
   - ⚠️ Trap: "Có thể truyền 33 bytes trên CAN FD không?" → Không. Phải padding lên 48B, 15 bytes bị lãng phí.

3. **"Classic CAN node thấy CAN FD frame sẽ làm gì?"**
   - 📖 Node đọc FDF=1 (Recessive) như bit r0 mà nó expect là Dominant → phát Error Frame ngay. Bus bị disrupted.
   - 🔧 Mixed network: cần Gateway ECU riêng. Gateway nhận CAN FD → translate → phát Classic CAN (và ngược lại). Không có cách nào share bus vật lý trực tiếp.
   - ⚠️ Trap: "CAN FD backward compatible về hardware không?" → Cáp/transceiver tương thích, nhưng protocol không tương thích ngược ở level frame.

---

### ✅ Item 4 (Ngày 10–12): Q&A Cluster 3 — Bit Stuffing & CRC Nâng Cao

**Nhiệm vụ:** Phân biệt Dynamic Stuffing vs Fixed Stuffing — điểm kỹ thuật độc đáo nhất của CAN FD.

**Các Q&A cần xây:**

1. **"CAN FD có mấy loại Stuffing? Khác nhau thế nào?"**
   - 📖 Dynamic Stuffing (SOF→CRC Sequence): sau 5 bit đồng nhất chèn 1 bit ngược — giống Classic CAN. Fixed Stuffing (CRC Field): chèn bit ngược cố định sau mỗi 4 bit, bất kể giá trị — chỉ có CAN FD.
   - 🔧 Hardware xử lý hoàn toàn tự động. Khi tính Bus Load: worst-case Dynamic Stuffing overhead ~20% Data Phase; Fixed Stuffing = hoàn toàn xác định được.
   - ⚠️ Trap: "Tại sao CAN FD cần Fixed Stuffing ở CRC Field?" → Tốc độ cao cần clock recovery tốt hơn. Fixed Stuffing đảm bảo có đủ edge transitions để node nhận đồng bộ clock, bất kể pattern dữ liệu.

2. **"SBC field là gì? Tại sao Classic CAN không có?"**
   - 📖 SBC (Stuff Bit Count - 4 bit): đếm tổng số Dynamic Stuff Bit đã chèn (mod 8) + 1 Parity bit. Node nhận kiểm chéo SBC — nếu sai → phát hiện lỗi mà CRC thông thường có thể bỏ sót.
   - 🔧 Transparent với software. Trên CANoe trace: column "SC" chính là SBC decoded value.
   - ⚠️ Trap: "CRC-17 dùng khi nào, CRC-21 khi nào?" → Payload ≤ 16 bytes → CRC-17. Payload > 16 bytes → CRC-21. Ngưỡng là 16B, không phải 32B hay 64B.

---

### ✅ Item 5 (Ngày 13–15): Q&A Cluster 4 — Bit Timing Thực Chiến (Senior-level)

**Nhiệm vụ:** Dual bit timing và TDCO — chủ đề phân biệt Junior/Senior rõ nhất.

**Các Q&A cần xây:**

1. **"Tại sao CAN FD cần 2 bộ Bit Timing riêng biệt?"**
   - 📖 Nominal Timing và Data Timing độc lập: {Prescaler, TSEG1, TSEG2, SJW} × 2. Tốc độ Data Phase cao → TQ ngắn → sample point % phải tính lại hoàn toàn.
   - 🔧 AUTOSAR: CanControllerBaudrateConfig có 2 sub-config. MCAL Tresos/EB Synergy: CanNominalBaudrate và CanDataBaudrate.
   - ⚠️ Trap: "Sample point nên đặt ở bao nhiêu %?" → Nominal: 75-80%. Data Phase ≥2Mbps: 70-75% — buffer cho signal edge ringing.

2. **"TDCO là gì? Tại sao CAN FD cần mà Classic CAN không?"**
   - 📖 TDCO (Transceiver Delay Compensation Offset): ở tốc độ cao (≥2Mbps), độ trễ lan truyền qua transceiver (~100-200ns) chiếm tỉ lệ lớn trong 1 TQ. Không bù → sample point lệch → Bit Error.
   - 🔧 MCAL: CanTdcConfig { CanTdcOffset, CanTdcFilterWindow }. Giá trị lấy từ datasheet transceiver (TJA1044: typ 150ns, TJA1057: typ 120ns).
   - ⚠️ Trap: "Network ổn ở 1Mbps CAN FD nhưng lên 5Mbps liên tục Bit Error — check gì đầu tiên?" → TDCO chưa cấu hình hoặc sai giá trị.

3. **"Công thức tính Bit Time và Sample Point?"**
   - 📖 Bit Time = (1 + TSEG1 + TSEG2) × TQ | TQ = Prescaler / f_clk | Sample Point% = (1 + TSEG1) / (1 + TSEG1 + TSEG2) × 100%.
   - 🔧 Ví dụ: f_clk=80MHz, Prescaler=2 → TQ=25ns. Muốn 500kbps → Bit Time=2000ns → 80 TQ. TSEG1=63, TSEG2=16 → SP=81.25%.
   - ⚠️ Trap câu tính: "f_clk=40MHz, Nominal 500kbps, Data 2Mbps — đề xuất bộ tham số đầy đủ." — Dạng này xuất hiện thường xuyên trong technical interview.

---

### ✅ Item 6 (Ngày 16–18): Q&A Cluster 5 — Error Handling & Debug Kịch Bản Thực Tế

**Nhiệm vụ:** Vòng đời Error State + kịch bản debug Bus Off trong production.

**Các Q&A cần xây:**

1. **"Mô tả vòng đời Error State của một CAN node?"**
   - 📖 Error Active (TEC/REC < 128) → Error Passive (128 ≤ TEC/REC < 256) → Bus Off (TEC ≥ 256). Recovery Bus Off: 128 × 11 Recessive bit liên tiếp (không cần software trigger nếu Auto-Recovery bật).
   - 🔧 AUTOSAR CanSM: CANSM_BSM_S_RESTART_CAN. Callback chain: CanIf_ControllerBusOff() → CanSM_ControllerBusOff(). CanSMBorTimeL1/L2 cấu hình thời gian chờ.
   - ⚠️ Trap: "ESI bit trong CAN FD khác Error Flag Classic CAN thế nào?" → ESI là 1 bit info trong frame bình thường, không disrupt bus. Error Flag Classic là 6 bit Dominant phá vỡ stuffing của TẤT CẢ node đang nghe.

2. **"ECU liên tục Bus Off khi khởi động — debug trình tự nào?"**
   - 📖 Open-ended, test process thinking — không có đáp án duy nhất.
   - 🔧 Trình tự chuẩn: ① 120Ω termination đúng chưa? CAN_H/CAN_L ngắn mạch? → ② Bit Timing config khớp các node? → ③ CanIfHrhRangeConfig có overlap? → ④ Đọc TEC/REC counter qua debug register → ⑤ Classic CAN node lẫn trong bus CAN FD?
   - ⚠️ Trap: "Chỉ có 1 node duy nhất trên bus mà vẫn Bus Off?" → ACK Error: không có node xác nhận → mỗi frame phát ra TEC+8 → sau 32 frame → Bus Off.

---

### ✅ Item 7 (Ngày 19–21): Q&A Cluster 6 — AUTOSAR COM Stack (Tx Path Deep Dive)

**Nhiệm vụ:** Luồng truyền dữ liệu từ Application Signal xuống CAN bus — chi tiết từng module.

**Các Q&A cần xây:**

1. **"Mô tả luồng Tx từ Application đến CAN FD bus trong AUTOSAR?"**
   - 📖 App calls Com_SendSignal() → COM packs signal vào I-PDU (endianness, bit position) → gọi PduR_ComTransmit() → PduR route đến CanIf → CanIf map PDU to HTH → gọi Can_Write(HTH, PduInfo) → CAN Driver nạp HW Tx buffer → CAN Controller arbitrate & phát.
   - 🔧 Key configs: ComSignalEndianness (BIG_ENDIAN/LITTLE_ENDIAN), CanIfTxPduCanId, CanIfTxPduType=CANFD, CanIfTxPduDlc (byte thực tế, không phải DLC code).
   - ⚠️ Trap: "Khi nào COM gọi PduR? Theo cycle hay theo event?" → Tùy ComTxModeMode: DIRECT (event-triggered), PERIODIC (cyclic), MIXED (cả hai). Cấu hình qua ComTxModeTimePeriod.

2. **"CanIf_Transmit vs Can_Write khác nhau thế nào?"**
   - 📖 CanIf_Transmit: API cấp AUTOSAR, nhận L-PDU từ upper layer, thực hiện ID mapping và routing. Can_Write: MCAL API, làm việc trực tiếp với HW Tx buffer (HTH). CanIf là bridge giữa hai thế giới.
   - 🔧 CanIf check: HTH có available không? Nếu Tx buffer full → E_NOT_OK trả về → upper layer tự retry (tuỳ module).
   - ⚠️ Trap: "Nếu Can_Write trả về CAN_BUSY thì sao?" → CanIf không queue thêm. Tx PDU bị drop. Upper layer (COM) phải có retry logic (CanIfPublicTxConfirmPollingSupport).

---

### ✅ Item 8 (Ngày 22–24): Q&A Cluster 7 — AUTOSAR COM Stack (Rx Path + CanSM)

**Nhiệm vụ:** Luồng nhận dữ liệu + CanSM Bus-Off recovery state machine đầy đủ.

**Các Q&A cần xây:**

1. **"Mô tả luồng Rx từ CAN bus đến Application trong AUTOSAR?"**
   - 📖 CAN Controller nhận frame → ISR trigger → CAN Driver gọi CanIf_RxIndication(HRH, CanId, DLC, SduPtr) → CanIf tìm HRH config matching → gọi PduR_CanIfRxIndication() → PduR route → COM unpack signal → App đọc qua Com_ReceiveSignal().
   - 🔧 CAN FD: CanIfRxPduCanIdType=STANDARD_FD, CanIfRxPduDataLength=64 max. Quan trọng: Rx buffer trong CanIf phải đủ lớn cho 64B.
   - ⚠️ Trap: "CanIfRxPduCanIdType=STANDARD vs STANDARD_FD khác gì?" → STANDARD_FD accept cả Classic CAN lẫn CAN FD frame trên cùng ID. STANDARD chỉ nhận Classic. Cấu hình sai → miss CAN FD frames.

2. **"Bus-Off Recovery trong AUTOSAR CanSM — mô tả đầy đủ state machine?"**
   - 📖 CanSM BSM states: S_PRE_NOCOM → S_NOCOM → S_PRE_FULLCOM → S_FULLCOM. Khi Bus Off detected: S_FULLCOM → S_RESTART_CAN → wait CanSMBorTimeL1 → Can_SetControllerMode(STARTED) → nếu Bus Off lại → wait CanSMBorTimeL2 → sau CanSMBorCounterL1ToL2Max thất bại → báo Dem event.
   - 🔧 Config điển hình: CanSMBorTimeL1=10ms, CanSMBorTimeL2=100ms, CanSMBorCounterL1ToL2Max=3. Tổng tối đa: 3×10 + 100 = 130ms trước khi báo DTC.
   - ⚠️ Trap: "Ai log DTC khi Bus Off liên tục?" → Dem_ReportErrorStatus(). CanSM báo sự kiện lên Dem, Dem quyết định có lưu DTC không dựa vào DTC threshold config.

---

### ✅ Item 9 (Ngày 25–27): Q&A Cluster 8 — CanNm: Network Management & Sleep/Wake

**Nhiệm vụ:** Network Management — chủ đề thường bị bỏ qua nhưng hay hỏi trong interview hệ thống ECU.

**Các Q&A cần xây:**

1. **"CanNm làm gì? Tại sao cần Network Management?"**
   - 📖 CanNm (CAN Network Management): điều phối trạng thái network (Active/Prepare Bus-Sleep/Bus-Sleep). Đảm bảo tất cả node đồng thuận trước khi tắt bus → tiết kiệm điện ô tô. Chuẩn AUTOSAR NM (OSEK NM legacy).
   - 🔧 CanNm gửi NM PDU định kỳ chứa Node ID + CBV (Control Bit Vector). Khi không cần network: gọi CanNm_NetworkRelease() → Prepare Bus-Sleep → nếu không có node nào giữ network → Bus-Sleep.
   - ⚠️ Trap: "ECU có thể tự wake up bus từ Bus-Sleep không?" → Có, qua CanNm_NetworkRequest(). Nếu có Partial Networking: chỉ wake node cụ thể qua PN filter.

2. **"Partial Networking (PN) trong CanNm là gì?"**
   - 📖 PN cho phép chỉ wake một nhóm node cụ thể, không cần wake toàn bộ bus. PN filter trong NM PDU chứa bitmask các node được wake. Tiết kiệm điện đáng kể cho xe hybrid/EV.
   - 🔧 Config: CanNmPnEnabled=TRUE, CanNmPnFilterMaskByteN. Transceiver phải support PN (TJA1145 — SBC/System Basis Chip).
   - ⚠️ Trap: "Tại sao cần hardware đặc biệt (SBC) cho PN?" → ECU microcontroller cần ở sleep mode sâu để tiết kiệm điện. SBC chip thức để lọc CAN frame và wake MCU chỉ khi cần.

---

### ✅ Item 10 (Ngày 28–30): Q&A Cluster 9 — Bus Load & Network Design

**Nhiệm vụ:** Tính toán Bus Load thực tế với stuffing overhead + thiết kế network.

**Các Q&A cần xây:**

1. **"Công thức tính Bus Load cho một CAN FD message?"**
   - 📖 Frame bits (nominal): 22 bits overhead (Arbitration+Control). Frame bits (data rate): payload×8 + CRC(17/21) + SBC(4) + DEL(1). Nominal tail: ACK(2)+EOF(7)+IFS(3)=12. Worst-case stuffing: +20% on data-rate portion. Bus Load% = (frame_duration_µs / cycle_period_µs) × 100%.
   - 🔧 Ví dụ: 64B payload, Nominal=500kbps, Data=2Mbps, cycle=10ms → Frame duration ≈ 160µs → Bus Load = 160/10000 = 1.6% cho 1 message. Tổng bus load = sum của tất cả messages.
   - ⚠️ Trap: "Bus Load 80% có ổn không?" → Nguy hiểm. Rule of thumb: < 30-40% để có headroom cho error recovery và burst traffic. > 70% là red flag trong automotive.

2. **"Cable length tối đa của CAN FD là bao nhiêu?"**
   - 📖 Tỉ lệ nghịch với baudrate. Classic CAN 1Mbps: ~40m. CAN FD Nominal 1Mbps: ~40m nhưng Data Rate 5Mbps: chỉ ~4m. Lý do: propagation delay phải < 0.1 × bit time để arbitration ổn định.
   - 🔧 Practical: trong xe hơi (wheelbase ~3m) thì 5Mbps Data Rate vẫn ổn. Nhưng trong xe tải lớn (>10m) cần giảm Data Rate xuống 2Mbps.
   - ⚠️ Trap: "Stub length trong CAN FD có quan trọng hơn Classic CAN không?" → Rất quan trọng hơn. Ở 5Mbps, stub length > 30cm gây signal reflection đủ mạnh để gây Bit Error. Classic CAN ít nhạy cảm hơn nhiều.

---

## ═══════════════════════════════════════
## PHASE 3: MỞ RỘNG — PHYSICAL, DIAGNOSTICS, SECURITY (Items 11–16)
## ═══════════════════════════════════════

### ✅ Item 11 (Ngày 31–33): Q&A Cluster 10 — Physical Layer & Transceiver

**Nhiệm vụ:** Physical layer — layer bị bỏ qua nhất trong interview prep nhưng hay hỏi khi làm việc thực tế.

**Các Q&A cần xây:**

1. **"CAN FD cần transceiver đặc biệt không? Khác Classic CAN transceiver thế nào?"**
   - 📖 CAN FD cần transceiver tốc độ cao hơn: slew rate nhanh hơn (≥25V/µs vs ≤15V/µs của Classic), propagation delay nhỏ hơn, loop delay (TxD→RxD) phải < 1 bit time ở Data Rate. Classic CAN transceiver KHÔNG dùng được cho CAN FD Data Rate > 1Mbps.
   - 🔧 CAN FD transceiver phổ biến: TJA1044 (NXP, max 5Mbps), TJA1057 (NXP, max 8Mbps), TLE9255W (Infineon). Phân biệt: xem datasheet "loop delay" spec — phải < 200ns cho 5Mbps.
   - ⚠️ Trap: "Tôi thay TJA1050 (Classic CAN) bằng TJA1044 (CAN FD) thì code cần thay đổi gì?" → Software/AUTOSAR không đổi. Chỉ cần cấu hình TDCO đúng theo datasheet TJA1044.

2. **"Differential signaling CAN_H/CAN_L hoạt động thế nào? Tại sao chịu nhiễu tốt?"**
   - 📖 Dominant: CAN_H≈3.5V, CAN_L≈1.5V, differential=2V. Recessive: cả hai ≈2.5V, differential≈0V. Noise ảnh hưởng bằng nhau cả 2 dây → differential signal triệt tiêu noise (Common Mode Rejection).
   - 🔧 Nếu CAN_H bị đứt: bus kẹt Recessive → mọi node nhận ACK Error → TEC tăng. Nếu CAN_L bị đứt: tương tự. Nếu ngắn mạch CAN_H-CAN_L: bus kẹt Dominant → mọi node nhận Form Error.
   - ⚠️ Trap: "Dùng oscilloscope đo CAN FD, nên đo CAN_H-GND hay CAN_H-CAN_L?" → Phải đo differential (CAN_H - CAN_L) để thấy đúng bit value. Đo single-ended sẽ thấy noise không phản ánh thực tế.

---

### ✅ Item 12 (Ngày 34–36): Q&A Cluster 11 — ISO-TP (ISO 15765-2) over CAN FD

**Nhiệm vụ:** Segmented messaging protocol — nền tảng của UDS Diagnostics trên CAN.

**Các Q&A cần xây:**

1. **"ISO-TP là gì? Tại sao cần ISO-TP trên CAN FD?"**
   - 📖 ISO-TP (Transport Protocol): layer trên CAN cho phép truyền payload lớn hơn 1 frame (vd: firmware image hàng MB). Chia thành các frame: Single Frame (SF), First Frame (FF), Consecutive Frame (CF), Flow Control (FC).
   - 🔧 CAN FD nâng max payload lên 64B, nhưng ISO-TP vẫn cần cho payload > 64B (firmware, calibration data, UDS response dài). AUTOSAR: module Dcm dùng PduR để giao tiếp với TP layer.
   - ⚠️ Trap: "CAN FD có 64B rồi, còn cần ISO-TP không?" → Vẫn cần. 64B đủ cho UDS Request ngắn, nhưng UDS Response (vd: ReadMemoryByAddress) hay OTA firmware thường >> 64B.

2. **"Mô tả flow khi gửi 1000 bytes qua ISO-TP CAN FD?"**
   - 📖 Sender: First Frame (FF) chứa total length + data đầu → chờ Flow Control từ receiver. FC = ContinueToSend → Sender phát Consecutive Frames (CF) liên tiếp (CF#1, CF#2...) cho đến hết data. Mỗi CF có sequence number (0-F, wrap).
   - 🔧 Block Size (BS) và Separation Time (STmin) trong FC quyết định tốc độ. Dcm config: DcmDslProtocolRxBufferSize phải đủ lớn chứa toàn bộ assembled message.
   - ⚠️ Trap: "STmin = 0 nghĩa là gì?" → Sender có thể gửi CF nhanh nhất có thể (không delay). Không phải là "không có timeout" — nếu không nhận CF trong N_Cr timeout → abort.

---

### ✅ Item 13 (Ngày 37–39): Q&A Cluster 12 — UDS Diagnostics (ISO 14229) Thực Tế

**Nhiệm vụ:** UDS services thực tế — rất hay hỏi trong interview Tier-1 về ECU Software.

**Các Q&A cần xây:**

1. **"Liệt kê các UDS Service quan trọng nhất và use case thực tế?"**
   - 📖 0x10 DiagnosticSessionControl (switch Default/Extended/Programming session). 0x11 ECUReset. 0x22 ReadDataByIdentifier (đọc sensor value, version). 0x2E WriteDataByIdentifier (write config param). 0x27 SecurityAccess (unlock bảo mật, seed-key). 0x31 RoutineControl (chạy test routine). 0x34/36/37 RequestDownload/TransferData/RequestTransferExit (OTA firmware flash).
   - 🔧 AUTOSAR Dcm: mỗi service có DcmDsdServiceTable entry. 0x22: DcmDspDataInfo config từng DID. 0x27: DcmDspSecurityRow với seed/key algorithm.
   - ⚠️ Trap: "0x27 SecurityAccess hoạt động thế nào?" → Tester gửi RequestSeed → ECU trả Seed → Tester tính Key (dùng thuật toán bí mật, thường là XOR/AES) → Tester gửi SendKey → ECU verify. Nếu sai 3 lần → lock delay (tránh brute force).

2. **"Tại sao cần Programming Session trước khi flash firmware?"**
   - 📖 Default Session: giới hạn services để ECU hoạt động bình thường. Programming Session: tắt các task không cần, unlock memory, cho phép erase/write flash. ECU tự reset về Default sau flash.
   - 🔧 Trên AUTOSAR: Dcm chuyển session → báo CanSM/ComM → ComM tắt normal communication → chỉ giữ diagnostic channel hoạt động.
   - ⚠️ Trap: "Có thể flash firmware trong Default Session không?" → Không. Bắt buộc Programming Session (0x10 02). Bỏ qua → Dcm trả NRC 0x7E (serviceNotSupportedInActiveSession).

---

### ✅ Item 14 (Ngày 40–42): Q&A Cluster 13 — SecOC: Bảo Mật Trên CAN FD

**Nhiệm vụ:** SecOC — xu hướng bắt buộc trong xe mới từ 2022+, ngày càng hay hỏi.

**Các Q&A cần xây:**

1. **"SecOC là gì? Tại sao cần CAN FD 64B để implement?"**
   - 📖 SecOC (Secure Onboard Communication): thêm MAC (Message Authentication Code) vào mỗi CAN frame để chống giả mạo/replay attack. MAC thường 8-16B. Classic CAN max 8B payload → không còn chỗ cho MAC + real data. CAN FD 64B → có đủ space cho data + MAC + Freshness Value Counter.
   - 🔧 AUTOSAR SecOC module: nằm giữa COM và PduR. Khi Tx: SecOC lấy PDU → append MAC → forward CanIf. Khi Rx: SecOC verify MAC trước khi forward lên COM.
   - ⚠️ Trap: "Freshness Value để làm gì?" → Chống replay attack. Mỗi frame có counter tăng dần. Receiver reject frame nếu Freshness Value cũ hơn expected → attacker không thể replay captured frame.

2. **"MAC algorithm nào được dùng trong SecOC automotive?"**
   - 📖 CMAC (AES-128 based) là phổ biến nhất — chuẩn hóa trong ISO 21434 và AUTOSAR. Truncated CMAC (8-16B) được dùng để tiết kiệm bandwidth. HMAC-SHA256 dùng cho cases cần security cao hơn.
   - 🔧 AUTOSAR Csm (Crypto Service Manager): SecOC gọi Csm_MacGenerate() để tạo MAC. Key quản lý bởi KeyM (Key Manager). HSM (Hardware Security Module) trong MCU (vd: Aurix HSM) xử lý crypto để tránh timing attack qua software.
   - ⚠️ Trap: "Nếu không có HSM thì có dùng SecOC được không?" → Được, dùng software crypto, nhưng chậm hơn và dễ bị side-channel attack hơn. Automotive grade thường yêu cầu HSM cho production.

---

### ✅ Item 15 (Ngày 43–45): Q&A Cluster 14 — ISO 26262 & E2E Protection

**Nhiệm vụ:** Functional Safety trên CAN FD — quan trọng cho ASIL-B/C/D systems.

**Các Q&A cần xây:**

1. **"E2E Protection khác SecOC thế nào? Khi nào dùng cái nào?"**
   - 📖 E2E (End-to-End Protection, AUTOSAR E2E library): bảo vệ tính toàn vẹn dữ liệu trong quá trình truyền — phát hiện lỗi ngẫu nhiên (random hardware fault). SecOC: bảo vệ tính xác thực — ngăn chặn tấn công có chủ đích (intentional tampering). E2E là ISO 26262 requirement; SecOC là cybersecurity requirement.
   - 🔧 E2E Profile 2/5/7 phổ biến trong automotive. Profile 5 (32-bit CRC + counter) cho ASIL-D. AUTOSAR: E2EXf module transform PDU trước khi truyền.
   - ⚠️ Trap: "Xe ASIL-D cần dùng cả E2E lẫn SecOC không?" → Cần cả hai nếu message vừa safety-critical vừa security-sensitive (vd: steering command). Hai layer bảo vệ độc lập, tránh Common Cause Failure.

2. **"ASIL Decomposition trong CAN FD communication là gì?"**
   - 📖 Một function ASIL-D có thể split thành 2 channel ASIL-B (D=B+B) nếu độc lập. Trong CAN: redundant message trên 2 bus vật lý khác nhau → mỗi bus xử lý ASIL-B. Receiver tổng hợp 2 kết quả → ASIL-D.
   - 🔧 Automotive Ethernet + CAN FD redundancy ngày càng phổ biến (vd: steering ECU dùng cả hai kênh). AUTOSAR supports redundant routing qua PduR.
   - ⚠️ Trap: "Tại sao không chỉ dùng 1 CAN FD bus ASIL-D thay vì 2 bus ASIL-B?" → Single point of failure. Nếu 1 bus lỗi toàn bộ → mất function. 2 bus: 1 lỗi vẫn còn 1 backup → fault tolerant.

---

### ✅ Item 16 (Ngày 46–48): Q&A Cluster 15 — Strategic: CAN FD vs CAN XL vs Automotive Ethernet

**Nhiệm vụ:** Câu hỏi system-level — phân biệt Senior Engineer với Principal/Architect.

**Các Q&A cần xây:**

1. **"Khi nào chọn CAN FD, khi nào chọn Automotive Ethernet?"**
   - 📖 CAN FD: latency thấp, deterministic, bus arbitration tự nhiên, không cần switch, cost thấp, phù hợp control signals (<10Mbps). Automotive Ethernet: bandwidth cao (100Mbps/1Gbps), phù hợp video, OTA, SOME/IP services, cần switch infrastructure, cost cao hơn.
   - 🔧 Thực tế xe modern: Powertrain/chassis = CAN FD. Camera/Radar/OTA = Ethernet. Body/comfort = Classic CAN hoặc LIN. Gateway ECU kết nối tất cả domains.
   - ⚠️ Trap: "CAN XL có thay thế Ethernet không?" → Không trong tương lai gần. CAN XL max ~10Mbps, Ethernet 100Mbps-10Gbps. CAN XL fill gap giữa CAN FD và Ethernet cho medium-bandwidth use cases như LiDAR point cloud.

2. **"CAN XL khác CAN FD thế nào? Có cần upgrade transceiver không?"**
   - 📖 CAN XL: payload lên 2048B, max ~10Mbps, thêm XLF bit trong header, dùng PWM (Pulse Width Modulation) encoding ở data phase (thay NRZ) để giảm EMC emissions. Frame format tương thích ngược với CAN FD ở Arbitration phase.
   - 🔧 Cần transceiver CAN XL mới (vd: TJA1153). CAN FD transceiver KHÔNG dùng được cho CAN XL Data Phase vì khác physical encoding. Software/AUTOSAR stack cần update module CAN Driver.
   - ⚠️ Trap: "Node CAN FD có đọc được CAN XL frame không?" → Không. XLF bit ở Recessive → CAN FD node xử lý như bit r1 reserved → phát Error Frame. Tương tự vấn đề backward compat như Classic CAN vs CAN FD.

---

## ═══════════════════════════════════════
## PHASE 4: INTERACTIVE TOOLS (Items 17–19)
## ═══════════════════════════════════════

### ✅ Item 17 (Ngày 49–51): Calculator — Frame Duration & Bus Load

**Nhiệm vụ:** Build Interactive Calculator tính thời gian truyền frame và Bus Load%.

**Chi tiết thực thi:**
- Input: Nominal Bit Rate, Data Bit Rate, Payload Size (dropdown chuẩn CAN FD), Cycle Period (ms).
- Công thức đầy đủ (kể stuffing overhead):
  - Arbitration Phase (Nominal): SOF+ID+RRS+IDE+FDF+res+BRS+ESI+DLC = 22 bits
  - Data Phase (Data Rate): payload×8 + CRC(17/21) + DEL(1) + SBC(4) + worst-case stuffing +20%
  - Nominal tail: ACK(2) + EOF(7) + IFS(3) = 12 bits
- Output: Breakdown bar chart từng phase + tổng Frame Duration µs + Bus Load%.
- Thêm nút "Compare": so sánh cùng message trên Classic CAN vs CAN FD.

---

### ✅ Item 18 (Ngày 52–54): Synthetic Trace Viewer (Simulated CANoe Table)

**Nhiệm vụ:** Bảng trace giả lập — không cần hardware thật, link trực tiếp với Frame Map Tab 1.

**Chi tiết thực thi:**
- Cột bảng: Timestamp | CAN ID | Type | DLC | BRS | ESI | Data (Hex) | Annotation.
- Curate 8 kịch bản thú vị:
  1. Frame CAN FD bình thường (BRS=1, DLC=15→64B).
  2. Frame CAN FD BRS tắt (BRS=0, DLC=8) — vẫn là CAN FD frame.
  3. Error Frame do Classic CAN node nhận CAN FD — minh họa backward compat vấn đề.
  4. Frame DLC=12→32B — minh họa non-linear DLC encoding.
  5. Frame ESI=1 (Error Passive node đang phát) — rare nhưng hay hỏi.
  6. ISO-TP First Frame (FF) + Consecutive Frame (CF) — sequence segmented message.
  7. CanNm NM Frame với Node ID + CBV fields.
  8. Overload Frame từ Classic CAN node trong mixed network.
- Click vào row → highlight segment tương ứng trên Frame Map Tab 1.

---

### ✅ Item 19 (Ngày 55–57): BRS Animation — Trực Quan Hóa Dual Bit Rate

**Nhiệm vụ:** Animation chấm bi chạy theo vận tốc thực tế — WOW factor cho bài viết blog.

**Chi tiết thực thi:**
- DOM: Overlay "đường ray" lên Frame Segment Map hiện tại của Tab 1.
- CSS Variables --speed-nominal, --speed-data để điều chỉnh tỉ lệ.
- JS: requestAnimationFrame — chậm ở Arbitration → vọt nhanh tại BRS → phanh lại tại CRC Delimiter.
- Fallback: Nếu lag trên mobile → CSS @keyframes đơn giản.
- Nút toggle On/Off animation để không phân tâm khi đọc Q&A.

---

## ═══════════════════════════════════════
## PHASE 5: TESTING & RELEASE (Item 20)
## ═══════════════════════════════════════

### ✅ Item 20 (Ngày 58–60): Testing, Responsive, Docs & Release v1.2.0

**Nhiệm vụ:** Nghiệm thu toàn bộ theo SOP của dự án.

**Chi tiết thực thi:**
- Chạy kiểm tra bắt buộc: node -e "const fs = require('fs'); ..." theo SOP Agent → Syntax OK.
- Kiểm tra responsive: Mobile 375px, Tablet 768px, Desktop 1280px.
- Đảm bảo không vi phạm Blogger embed rules: root container cô lập, overflow-x-auto trên bảng ngang.
- Cập nhật docs/can_fd/CURRENT_INFO.md với toàn bộ DOM structures mới.
- Đánh dấu [x] các items hoàn thành trong BACKLOG.md.
- Ghi nhận Release v1.2.0 vào CHANGELOG.md (bump minor vì thêm nhiều tính năng lớn).

---

## 📐 Nguyên Tắc Nội Dung (Bàn Giao Cho Gemini Pro Thực Thi)

> Mỗi Q&A card bắt buộc có đủ 3 tầng. Không được chỉ viết lý thuyết thuần túy.
>
> | Tầng | Ký hiệu | Mô tả |
> |---|---|---|
> | Theory | 📖 | Chuẩn ISO 11898-1:2015, chính xác kỹ thuật |
> | ECU/AUTOSAR Practice | 🔧 | Config name thực tế, MCAL params, callback names |
> | Interview Trap | ⚠️ | Câu hỏi bẫy + câu trả lời mẫu đúng |

## 📊 Knowledge Coverage Sau 60 Ngày

| Layer | Chủ đề | Coverage |
|---|---|---|
| CAN Classic Foundation | 3 Q&A (Item 2) | ✅ Đủ cho context |
| CAN FD Core | 9 Q&A (Items 3-6) | ✅ Đầy đủ |
| AUTOSAR Stack | 6 Q&A (Items 7-9) | ✅ Senior level |
| Network Design | 2 Q&A (Item 10) | ✅ Đủ cho interview |
| Physical Layer | 2 Q&A (Item 11) | ✅ Đủ |
| ISO-TP | 2 Q&A (Item 12) | ✅ Đủ |
| UDS Diagnostics | 2 Q&A (Item 13) | ✅ Thực chiến |
| SecOC Security | 2 Q&A (Item 14) | ✅ Modern requirement |
| ISO 26262 / E2E | 2 Q&A (Item 15) | ✅ Safety-critical |
| Strategic / CAN XL | 2 Q&A (Item 16) | ✅ Architect level |

**Ước tính coverage sau 60 ngày: ~80-85% kiến thức cốt lõi CAN FD cho ECU Software Engineer Tier-1/OEM.**

---
*Target audience: Embedded/ECU Software Engineers ôn phỏng vấn Tier-1/OEM automotive (Bosch, Continental, Aptiv, Visteon, ZF...). AUTOSAR depth: Senior/Lead level. Security depth: awareness + implementation basics.*


---

## ⚡ Quick Commands — Copy & Paste Để Thực Thi

> Lưu sẵn tại đây để không phải gõ lại. Copy prompt tương ứng → paste vào chat với Gemini Pro.

---

### 🚀 Tự động hóa toàn bộ (Auto-pilot 3-in-1)

```
Hãy làm trọn gói Item [N] trong docs/can_fd/MAINTENANCE_PLAN.md.
Yêu cầu Agent tự động thực hiện 3 bước:
1. Thực thi Item [N] (code, update tracker ⬜→✅, chạy syntax check).
2. Review nội bộ đảm bảo tuân thủ rules.
3. Cập nhật CHANGELOG.md phần [Unreleased].
Báo cáo tóm tắt khi hoàn tất cả 3 bước.
```

---

### 🔵 Thực thi 1 Item cụ thể

```
Hãy thực thi Item [N] trong docs/can_fd/MAINTENANCE_PLAN.md.

Đọc các file sau trước khi bắt đầu:
1. docs/can_fd/MAINTENANCE_PLAN.md — xem chi tiết Item [N]
2. docs/can_fd/CURRENT_INFO.md — hiểu kiến trúc DOM hiện tại
3. .agents/rules/blogger-embed-rules.md — các quy tắc bắt buộc
4. .agents/skills/blogger-widget-creator/SKILL.md — đặc biệt Bước 4b

Sau khi hoàn thành:
- Chạy syntax check: node -e "const fs=require('fs');const h=fs.readFileSync('widget_can_fd.html','utf8');const js=h.match(/<script>([\s\S]*?)<\/script>/)[1];new Function(js);console.log('Syntax OK');"
- Cập nhật Progress Tracker: Item [N] từ ⬜ → ✅
- Cập nhật docs/can_fd/CURRENT_INFO.md nếu có thay đổi DOM/JS
```

---

### 🟢 Thực thi nhiều Item liên tiếp

```
Hãy thực thi Item [N] và Item [N+1] liên tiếp trong docs/can_fd/MAINTENANCE_PLAN.md.

Đọc trước: MAINTENANCE_PLAN.md, CURRENT_INFO.md, blogger-embed-rules.md, SKILL.md.
Sau mỗi item: chạy syntax check, update tracker ⬜→✅.
Sau khi hoàn tất cả: cập nhật CURRENT_INFO.md một lần duy nhất.
```

---

### 🟡 Xem trạng thái hiện tại (không code)

```
Hãy đọc docs/can_fd/MAINTENANCE_PLAN.md và báo cáo:
1. Item nào đã ✅ hoàn thành?
2. Item nào đang 🔄 dang dở?
3. Item tiếp theo cần làm là gì?
Không cần code, chỉ cần tóm tắt ngắn gọn.
```

---

### 🔴 Review / Debug sau khi implement

```
Hãy review widget_can_fd.html sau khi implement Item [N]:
1. Đọc docs/can_fd/CURRENT_INFO.md để biết kỳ vọng
2. Chạy syntax check theo SOP
3. Kiểm tra blogger-embed-rules.md — có vi phạm rule nào không?
4. Báo cáo vấn đề nếu có, fix ngay nếu nhỏ.
```

---

### ⚪ Cập nhật CHANGELOG sau sprint

```
Hãy cập nhật CHANGELOG.md với các thay đổi của Item [N] vào phần [Unreleased].
Format: "- feat: [mô tả ngắn] (Item [N], widget_can_fd.html)"
Đọc MAINTENANCE_PLAN.md Item [N] để lấy nội dung mô tả.
```

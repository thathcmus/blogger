# Interactive Tech Widgets for Google Blogger & Technical Articles

🌐 **[English](README.md) | [Tiếng Việt](README.vi.md)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero-Build](https://img.shields.io/badge/Architecture-Zero--Build-emerald.svg)](#triết-lý-thiết-kế)
[![Tech](https://img.shields.io/badge/Stack-HTML5%20%7C%20TailwindCSS%20%7C%20VanillaJS-orange.svg)](#công-nghệ)
[![AI-Ready](https://img.shields.io/badge/Agent-AI--Native-purple.svg)](AGENTS.md)

Kho lưu trữ các công cụ trực quan hóa và mô phỏng tương tác (**Interactive Visualizers & Educational Simulators**) chuyên sâu về **Giao thức Mạng Ô tô (Automotive Protocols), Hệ thống nhúng (Embedded Systems), và Lập trình C++**.

Được thiết kế theo tiêu chuẩn **Zero-Build & Self-Contained**, sẵn sàng nhúng trực tiếp vào các bài viết kỹ thuật trên **Google Blogger (Blogspot)**, WordPress, Substack, hoặc xem độc lập qua **GitHub Pages**.

---

## 🚀 Danh Mục Các Widget (Interactive Widget Showcase)

| Widget | Mô Tả Trực Quan | Xem Trực Tiếp (Live Demo) | Tài Liệu Kỹ Thuật |
| :--- | :--- | :---: | :---: |
| **FlexRay Protocol Explorer**<br>`widget_flexray.html` | Khám phá cấu trúc Frame (Header/Payload/Trailer), quản lý dữ liệu Node qua CHI & Message Buffers, và sơ đồ chu kỳ truyền thông (Static, Dynamic, Symbol Window, NIT) chuẩn **FlexRay 3.0.1 / ISO 17458**. | [🔗 Mở Demo](https://thathcmus.github.io/blogger/widget_flexray.html) | [`docs/flexray/`](docs/flexray/CURRENT_INFO.md) |
| **CAN FD Protocol Explorer**<br>`widget_can_fd.html` | Trực quan hóa cấu trúc CAN FD bit-level, cơ chế BRS, bảng so sánh thế hệ CAN, ngân hàng câu hỏi phỏng vấn Q&A 4 tầng song ngữ VN/EN, và hệ sinh thái Thảo luận cộng đồng kết nối Cloud Database (Firebase Live Auth, Firestore Realtime Sync, Threaded Replies, Author Pinned Notes). | [🔗 Mở Demo](https://thathcmus.github.io/blogger/widget_can_fd.html) | [`docs/can_fd/`](docs/can_fd/CURRENT_INFO.md) |
| **C++ OOP Simulator**<br>`widget_cpp_oop.html` | Mô phỏng tương tác 4 tính chất của Lập trình hướng đối tượng (Kế thừa, Đóng gói, Đa hình, Trừu tượng hóa) kèm bảng phân tích bộ nhớ và cơ chế Virtual Table (VTABLE). | [🔗 Mở Demo](https://thathcmus.github.io/blogger/widget_cpp_oop.html) | Đang cập nhật |

---

## 📌 Hướng Dẫn Nhúng Vào Google Blogger (Blogspot)

### Cách 1: Nhúng Iframe qua GitHub Pages (Tối Ưu Nhất - Không Lo Xung Đột)
Đây là cách tốt nhất để đảm bảo giao diện widget hiển thị đẹp 100%, không bị ảnh hưởng bởi CSS hay font chữ của Theme Blogger.

1. Bật tính năng **GitHub Pages** trong mục *Settings $\rightarrow$ Pages* của repository này.
2. Mở bài đăng Blogger của bạn, chuyển sang chế độ **HTML View** (Soạn thảo HTML) và dán đoạn mã sau:

```html
<!-- FlexRay Explorer Embed Widget -->
<div style="width: 100%; margin: 24px auto; text-align: center;">
    <iframe src="https://thathcmus.github.io/blogger/widget_flexray.html" 
            width="100%" 
            height="850px" 
            style="border: none; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden;" 
            title="FlexRay Protocol Explorer"
            loading="lazy">
    </iframe>
</div>
```

### Cách 2: Nhúng Mã Nguồn Trực Tiếp (Direct HTML Embed)
Nếu không dùng GitHub Pages, bạn có thể mở file `.html`, copy toàn bộ nội dung và dán trực tiếp vào chế độ **HTML View** của bài viết trên Blogger.
> *Lưu ý*: Widget đã được bọc trong container riêng biệt để chống xung đột layout của blog theo [Blogger Embed Rules](.agents/rules/blogger-embed-rules.md).

---

## 💡 Triết Lý Thiết Kế (Design Principles)

1. **Zero-Build (Không Cần Biên Dịch)**: Không phụ thuộc vào Webpack, Vite, hay npm bundle. Chạy trực tiếp trên trình duyệt.
2. **Vanilla JavaScript First**: Không sử dụng framework nặng nề (React/Vue), đảm bảo tốc độ tải trang nhanh tối đa cho blog.
3. **Thẩm Mỹ Hiện Đại**: Giao diện được thiết kế theo phong cách hiện đại với Tailwind CSS, màu sắc hài hòa, animation mượt mà, thân thiện với di động (`overflow-x-auto`).
4. **Khả Năng Chống Lỗi (Fault-Tolerant)**: Các thư viện icon ngoài được bọc cơ chế phòng ngừa lỗi mạng, đảm bảo các nút bấm luôn hoạt động bình thường kể cả khi CDN bị chặn.

---

## 🤖 Tiêu Chuẩn Phát Triển Với AI Agent (AI Agent-Native)

Repository này được chuẩn hóa toàn diện theo kiến trúc **AI-Agent Ready**:
- [`AGENTS.md`](AGENTS.md): Bản chỉ dẫn cốt lõi và giao thức nghiệm thu (Verification Protocol) cho AI Agent.
- [`.agents/rules/blogger-embed-rules.md`](.agents/rules/blogger-embed-rules.md): Bộ quy tắc kỹ thuật nghiêm ngặt khi code widget nhúng Blogger.
- [`.agents/skills/blogger-widget-creator/SKILL.md`](.agents/skills/blogger-widget-creator/SKILL.md): Kỹ năng và template mẫu 5 bước để tạo thêm widget mới.

---

## 📁 Cấu Trúc Thư Mục

```text
├── .agents/                                # Quy chuẩn và kỹ năng cho AI Agent
│   ├── rules/blogger-embed-rules.md        # Luật nhúng Blogger & Tiêu chuẩn 4 tầng Q&A
│   └── skills/blogger-widget-creator/      # Kỹ năng và template tạo widget mới
├── docs/                                   # Tài liệu hiện trạng, backlog & maintenance plan
│   ├── can_fd/                             # Tài liệu CAN FD Protocol
│   │   ├── CURRENT_INFO.md                 # Đặc tả hiện trạng kỹ thuật
│   │   ├── BACKLOG.md                      # Backlog tính năng tổng thể
│   │   └── MAINTENANCE_PLAN.md             # Kế hoạch bảo trì 60 ngày & Ground Truth Q&A
│   └── flexray/                            # Tài liệu FlexRay Protocol
│       ├── CURRENT_INFO.md                 # Đặc tả hiện trạng kỹ thuật
│       └── BACKLOG.md                      # Kế hoạch cải tiến của FlexRay
├── AGENTS.md                               # Hướng dẫn & quy chuẩn vận hành cho AI Agent
├── CHANGELOG.md                            # Lịch sử thay đổi phiên bản (SemVer)
├── README.md                               # Tài liệu giới thiệu dự án (English)
├── README.vi.md                            # Tài liệu giới thiệu dự án (Tiếng Việt)
├── LICENSE                                 # Giấy phép mã nguồn mở MIT
├── firebase.json                           # Cấu hình triển khai Firebase
├── firestore.rules                         # Quy tắc bảo mật Cloud Firestore (Zero-Trust Rules)
├── widget_can_fd.html                      # Widget CAN FD Protocol Explorer
├── widget_flexray.html                     # Widget FlexRay Protocol Explorer
└── widget_cpp_oop.html                     # Widget C++ OOP Simulator
```

---

## 📄 Giấy Phép Sử Dụng (License)

Dự án được phân phối dưới giấy phép [MIT License](LICENSE). Bạn hoàn toàn tự do sử dụng, chỉnh sửa và nhúng vào blog cá nhân hoặc tài liệu giảng dạy phi thương mại / thương mại.

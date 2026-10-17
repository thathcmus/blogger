# Interactive Tech Widgets for Google Blogger & Technical Articles

🌐 **[English](README.md) | [Tiếng Việt](README.vi.md)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero-Build](https://img.shields.io/badge/Architecture-Zero--Build-emerald.svg)](#design-principles)
[![Tech](https://img.shields.io/badge/Stack-HTML5%20%7C%20TailwindCSS%20%7C%20VanillaJS-orange.svg)](#technology-stack)
[![AI-Ready](https://img.shields.io/badge/Agent-AI--Native-purple.svg)](AGENTS.md)

A curated repository of standalone **Interactive Visualizers & Educational Simulators** focused on **Automotive Protocols (CAN FD, FlexRay, LIN, Ethernet), Embedded Systems, and C++ Programming**.

Engineered following a **Zero-Build & Self-Contained** philosophy, ready to embed directly into technical articles on **Google Blogger (Blogspot)**, WordPress, Substack, or viewed independently via **GitHub Pages**.

---

## 🚀 Interactive Widget Showcase

| Widget | Visual Description | Live Demo | Technical Docs |
| :--- | :--- | :---: | :---: |
| **FlexRay Protocol Explorer**<br>`widget_flexray.html` | Explore Frame structures (Header/Payload/Trailer), node data handling via CHI & Message Buffers, and communication cycle timings (Static, Dynamic, Symbol Window, NIT) adhering to **FlexRay 3.0.1 / ISO 17458**. | [🔗 Live Demo](https://thathcmus.github.io/blogger/widget_flexray.html) | [`docs/flexray/`](docs/flexray/CURRENT_INFO.md) |
| **CAN FD Protocol Explorer**<br>`widget_can_fd.html` | Bit-level CAN FD frame inspection, Bit Rate Switching (BRS), generation comparison matrix, 4-tier bilingual interview Q&A bank, and live community discussions powered by Firebase Cloud Firestore & Google Auth. | [🔗 Live Demo](https://thathcmus.github.io/blogger/widget_can_fd.html) | [`docs/can_fd/`](docs/can_fd/CURRENT_INFO.md) |
| **C++ OOP Simulator**<br>`widget_cpp_oop.html` | Interactive simulation of Object-Oriented Programming pillars (Inheritance, Encapsulation, Polymorphism, Abstraction) with dynamic memory layout inspection and Virtual Table (VTABLE) resolution. | [🔗 Live Demo](https://thathcmus.github.io/blogger/widget_cpp_oop.html) | [`docs/cpp_oop/`](docs/cpp_oop/CURRENT_INFO.md) |

---

## 📌 Embedding into Google Blogger (Blogspot)

### Method 1: Iframe via GitHub Pages (Recommended - Conflict-Free)
The optimal way to guarantee 100% pixel-perfect rendering without theme CSS or font clashes:

1. Enable **GitHub Pages** under *Settings $\rightarrow$ Pages* in this repository.
2. In your Blogger post editor, switch to **HTML View** and paste the snippet below:

```html
<!-- 1. FlexRay Explorer Embed Widget -->
<div style="width: 100%; margin: 24px auto; text-align: center;">
    <iframe src="https://thathcmus.github.io/blogger/widget_flexray.html" 
            width="100%" 
            height="850px" 
            style="border: none; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden;" 
            title="FlexRay Protocol Explorer"
            loading="lazy">
    </iframe>
</div>

<!-- 2. CAN FD Explorer Embed Widget (Full-Width Breakout: Expands up to 1200px across Blogger post margins) -->
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

### Method 2: Direct HTML Embed
If not using GitHub Pages, open any `.html` widget file, copy the entire content, and paste directly into Blogger's **HTML View**.
> *Note*: Each widget is isolated inside a unique root container to prevent layout leakage per [Blogger Embed Rules](.agents/rules/blogger-embed-rules.md).

---

## 💡 Design Principles

1. **Zero-Build Architecture**: No build step or bundlers required (Webpack, Vite, npm compile). Runs natively in modern browsers.
2. **Vanilla JavaScript First**: Free of bulky client-side frameworks (React/Vue), ensuring lightning-fast load times for blogs.
3. **Modern Aesthetic**: Polished UI with Tailwind CSS, harmonious color grading, smooth micro-interactions, and mobile responsiveness (`overflow-x-auto`).
4. **Fault-Tolerant Runtime**: External dependencies (Lucide icons, Firebase) are guarded by `try...catch` blocks to prevent network blocks from breaking user interactions.

---

## 🤖 AI Agent-Native Specification

This repository is optimized for autonomous AI agents (Claude, Antigravity, Copilot):
- [`AGENTS.md`](AGENTS.md): Core operating guidelines, Definition of Done, and Verification Protocol.
- [`.agents/rules/blogger-embed-rules.md`](.agents/rules/blogger-embed-rules.md): Technical invariants for Blogger embedding.
- [`.agents/skills/blogger-widget-creator/SKILL.md`](.agents/skills/blogger-widget-creator/SKILL.md): 5-step workflow and starter boilerplate for new widgets.
- [`.agents/skills/git-commit-push/SKILL.md`](.agents/skills/git-commit-push/SKILL.md): Automated `/commit`, `/push`, `/commit-push` workflow skill.
- [`.agents/skills/pack-context/SKILL.md`](.agents/skills/pack-context/SKILL.md): Automated `/pack` and `/pack-full` AI context packaging skill.
- [`.agents/skills/review-qa-content/SKILL.md`](.agents/skills/review-qa-content/SKILL.md): Standardized 4-tier Q&A review & creation skill (5W-1H & Micro-STAR).

---

## 📁 Repository Architecture

```text
├── .agents/                                # AI Agent rules and skills
│   ├── rules/blogger-embed-rules.md        # Blogger embedding invariants & 4-tier Q&A rules
│   └── skills/
│       ├── blogger-widget-creator/         # 5-step workflow & boilerplate generator
│       ├── git-commit-push/                # Automated /commit and /push shortcut workflow
│       ├── pack-context/                   # Automated /pack and /pack-full context packaging
│       └── review-qa-content/              # Standardized 4-tier Q&A review & creation skill
├── docs/                                   # Specifications, backlogs & maintenance plans
│   ├── can_fd/                             # CAN FD Protocol documentation
│   │   ├── CURRENT_INFO.md                 # Current technical specification
│   │   ├── BACKLOG.md                      # Feature backlog
│   │   └── MAINTENANCE_PLAN.md             # 60-day sprint plan & Ground Truth Q&A
│   ├── cpp_oop/                            # C++ OOP Simulator documentation
│   │   ├── CURRENT_INFO.md                 # Current technical specification
│   │   └── BACKLOG.md                      # Feature backlog & enhancement roadmap
│   └── flexray/                            # FlexRay Protocol documentation
│       ├── CURRENT_INFO.md                 # Current technical specification
│       ├── BACKLOG.md                      # FlexRay enhancement backlog
│       └── MAINTENANCE_PLAN.md             # Ground Truth Q&A FlexRay
├── AGENTS.md                               # AI Agent operating manual & SOPs
├── CHANGELOG.md                            # Version history (SemVer)
├── README.md                               # Project documentation (English)
├── README.vi.md                            # Project documentation (Vietnamese)
├── LICENSE                                 # MIT Open Source License
├── firebase.json                           # Firebase deployment configuration
├── firestore.rules                         # Cloud Firestore Zero-Trust Security Rules
├── repomix.config.json                     # AI Context Packer configuration (Repomix)
├── scripts/                                # Automation & Quality Control
│   ├── pack-context.js                     # LLM Context Packer script
│   └── sync-docs.js                        # Auto-verification & documentation sync script
├── widget_can_fd.html                      # CAN FD Protocol Explorer widget
├── widget_flexray.html                     # FlexRay Protocol Explorer widget
└── widget_cpp_oop.html                     # C++ OOP Simulator widget
```

---

## 📄 License

Distributed under the [MIT License](LICENSE). Free for personal, educational, and commercial usage.

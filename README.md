<p align="center">
  <img src="https://seeklogo.com/images/G/google-keep-logo-0BC92EBBBD-seeklogo.com.png" alt="Keep Clone Logo" width="80" />
</p>

<h1 align="center">📝 Google Keep Clone</h1>

<p align="center">
  A stunning, full-stack note-taking application inspired by Google Keep — built with <strong>React</strong>, <strong>Material UI</strong>, <strong>DaisyUI</strong> theming, <strong>GSAP</strong> animations, and <strong>MongoDB</strong> persistence.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-17.0.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Material_UI-5.x-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/DaisyUI-4.x-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📝 **Create Notes** | Quick-add form with title and body — expands on click with smooth GSAP animation |
| 📦 **Archive** | Move notes to archive; unarchive them back to active |
| 🗑️ **Trash & Restore** | Soft-delete to trash, restore or permanently delete |
| 🔀 **Drag & Drop** | Reorder notes with `react-beautiful-dnd` — tilts and scales while dragging |
| 🎨 **4 DaisyUI Themes** | Emerald (light), Night (dark), Cyberpunk, Garden — persisted in `localStorage` |
| 🎬 **GSAP Animations** | ScrollTrigger card reveals, staggered entrances, floating empty-state, elastic effects |
| 💾 **MongoDB Persistence** | All notes synced to MongoDB Atlas via Express REST API |
| 🔄 **Offline Fallback** | Works in local-only mode when the database is unavailable |
| 📱 **Responsive** | Fully responsive layout from mobile to desktop |
| 🪟 **Glassmorphism UI** | Frosted glass header and drawer with `backdrop-filter` |

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Frontend ["🖥️ Frontend — React 17 + CRA"]
        A[App.js<br/>Theme Provider] --> B[Home.jsx<br/>Router]
        B --> C[SwipeDrawer.jsx<br/>Layout Shell]
        C --> D[HeaderBar.jsx<br/>Glassmorphism + Theme Switcher]
        C --> E[NavList.jsx<br/>Sidebar Navigation]
        C --> F[Notes.jsx<br/>Main View]
        C --> G[Archives.jsx<br/>Archive View]
        C --> H[DeleteNotes.jsx<br/>Trash View]
        F --> I[Form.jsx<br/>Note Input]
        F --> J[Note.jsx<br/>Note Card]
        F --> K[EmptyNotes.jsx<br/>Empty State]
        G --> L[Archive.jsx<br/>Archive Card]
        H --> M[DeleteNote.jsx<br/>Trash Card]
    end

    subgraph State ["🧠 State Management"]
        N[DataProvider.jsx<br/>Context + API Layer]
    end

    subgraph Backend ["⚙️ Backend — Express 5"]
        O[server.js<br/>Entry Point] --> P[routes/notes.js<br/>REST API]
        P --> Q[models/Note.js<br/>Mongoose Schema]
    end

    subgraph Database ["🗄️ Database"]
        R[(MongoDB Atlas)]
    end

    A --> N
    N -->|"fetch / POST / PUT / DELETE"| O
    Q --> R

    style Frontend fill:#eff6ff,stroke:#3b82f6,stroke-width:2px
    style Backend fill:#f0fdf4,stroke:#22c55e,stroke-width:2px
    style Database fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style State fill:#faf5ff,stroke:#a855f7,stroke-width:2px
```

---

## 📁 Folder Structure

```
Google_Keep_Clone/
├── public/
│   └── index.html              # SEO-optimized HTML shell
├── server/                     # ⚙️ Express Backend
│   ├── server.js               # Entry point, MongoDB connection
│   ├── models/
│   │   └── Note.js             # Mongoose schema (heading, text, status)
│   └── routes/
│       └── notes.js            # REST API: GET, POST, PUT, DELETE
├── src/                        # 🖥️ React Frontend
│   ├── index.js                # ReactDOM entry
│   ├── index.css               # Global styles, glassmorphism, animations
│   ├── App.js                  # Theme provider + DaisyUI data-theme sync
│   ├── components/
│   │   ├── Home.jsx            # Router wrapper
│   │   ├── HeaderBar.jsx       # App bar with theme dropdown
│   │   ├── NavList.jsx         # Sidebar nav (Notes, Archives, Trash)
│   │   ├── SwipeDrawer.jsx     # MUI Drawer layout shell
│   │   ├── notes/
│   │   │   ├── Notes.jsx       # Notes grid + DnD container
│   │   │   ├── Note.jsx        # Individual note card
│   │   │   ├── Form.jsx        # Create-note form
│   │   │   └── EmptyNotes.jsx  # Empty state with floating animation
│   │   ├── archives/
│   │   │   ├── Archives.jsx    # Archives grid
│   │   │   └── Archive.jsx     # Archive card
│   │   └── delete/
│   │       ├── DeleteNotes.jsx # Trash grid
│   │       └── DeleteNote.jsx  # Trash card
│   ├── context/
│   │   └── DataProvider.jsx    # Global state + MongoDB API layer
│   └── utils/
│       └── common-utils.js     # Drag-and-drop reorder helper
├── .env                        # MongoDB URI (gitignored)
├── tailwind.config.js          # TailwindCSS + DaisyUI theme config
├── postcss.config.js           # PostCSS plugins
└── package.json                # Dependencies + scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 16
- **npm** ≥ 8
- **MongoDB Atlas** account (or local MongoDB instance)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Google_Keep_Clone.git
cd Google_Keep_Clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/google-keep-clone?retryWrites=true&w=majority
PORT=5000
```

### 4. Run the Application

**Full-stack (frontend + backend):**
```bash
npm run dev
```

**Frontend only (no database, local mode):**
```bash
npm start
```

**Backend only:**
```bash
npm run server
```

The app opens at `http://localhost:3000` and the API runs at `http://localhost:5000`.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notes?status=active` | Fetch active notes |
| `GET` | `/api/notes?status=archived` | Fetch archived notes |
| `GET` | `/api/notes?status=deleted` | Fetch trashed notes |
| `POST` | `/api/notes` | Create a new note `{ heading, text }` |
| `PUT` | `/api/notes/:id` | Update note fields `{ heading?, text?, status? }` |
| `DELETE` | `/api/notes/:id` | Permanently delete a note |
| `GET` | `/api/health` | Server + DB health check |

---

## 🎨 Theme System

The app ships with **4 DaisyUI themes** switchable via the header dropdown:

| Theme | Style | Colors |
|-------|-------|--------|
| 🌿 Emerald | Clean & bright | Indigo primary, Cyan secondary |
| 🌙 Night | Dark mode | Soft purple primary, Cyan secondary |
| ⚡ Cyberpunk | Neon vibes | Magenta + Electric blue |
| 🌸 Garden | Soft & warm | Sage green + Gold |

Theme choice is persisted in `localStorage` and synced between DaisyUI (`data-theme`) and Material UI palette.

---

## 🎬 GSAP Animations

| Animation | Component | Trigger |
|-----------|-----------|---------|
| Header slide-down | `HeaderBar` | On mount |
| Nav staggered fade | `NavList` | On mount, 100ms stagger |
| Form scale-in | `Form` | On mount |
| Form expand | `Form` | On click |
| Card reveal | `Note`, `Archive`, `DeleteNote` | ScrollTrigger — enters viewport |
| Staggered grid | `Notes`, `Archives`, `DeleteNotes` | On data change |
| Floating bulb | `EmptyNotes` | Infinite yoyo loop |
| Elastic pop | `EmptyNotes` icon | On mount |
| Drag tilt | `Notes` grid | While dragging |

All animations use `gsap.registerPlugin(ScrollTrigger)` and are cleaned up on unmount.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Framework** | React 17 + CRA | Component architecture & build tooling |
| **Component Library** | Material UI 5 | Drawer, AppBar, Cards, Icons, TextField |
| **Styling** | TailwindCSS 3.4 + DaisyUI 4 | Utility classes, theme system, components |
| **Animations** | GSAP 3.12 + ScrollTrigger | Premium motion graphics |
| **Drag & Drop** | react-beautiful-dnd | Note reordering |
| **State** | React Context API | Global note state management |
| **Backend** | Express 5 | REST API server |
| **Database** | MongoDB + Mongoose | Persistent note storage |
| **Routing** | React Router DOM 6 | Client-side page navigation |
| **IDs** | uuid v4 | Unique note identification |

---

## 📦 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev (full-stack) | `npm run dev` | Start Express server + React dev server |
| Frontend | `npm start` | Start React dev server only |
| Backend | `npm run server` | Start Express API server only |
| Build | `npm run build` | Production build |
| Test | `npm test` | Run test suite |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** your changes: `git commit -m "Add my feature"`
4. **Push** to the branch: `git push origin feature/my-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ using React, Material UI, DaisyUI, GSAP & MongoDB
</p>

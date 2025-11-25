# 🎬 Short-flix — Mini Short Video Platform

Short-flix is a lightweight, Netflix-style short-video platform built with a modern full-stack architecture. The backend is powered by **NestJS**, providing a clean API for fetching and managing short videos, while the frontend is built with **Next.js**, **Tailwind CSS**, **shadcn/ui**, and **Axios**—delivering a polished, responsive, theme-aware user experience.

Users can browse short videos in a dynamic grid, search by title or tags, filter favorites, toggle dark/light theme, and play videos in a cinematic modal dialog. The app is fully responsive and optimized for both desktop and mobile screens.

---

## 🚀 Tech Stack

### **Frontend (shortflix-frontend/)**

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui component library**
* **Axios**
* **next-themes** for Dark/Light mode
* Fully responsive Netflix-style UI

### **Backend (shortflix-backend/)**

* **NestJS + TypeScript**
* In-memory data storage (5–10 videos)
* API endpoints:

  * `GET /api/shorts`
  * `POST /api/shorts` 
* CORS enabled + DTO validation

---

## 📁 Project Structure

```
short-flix/
├── shortflix-backend/            
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── shorts/
│   │       ├── shorts.module.ts
│   │       ├── shorts.service.ts
│   │       ├── shorts.controller.ts
│   │       ├── dto/
│   │       │   └── create-short.dto.ts
│   │       └── entities/
│   │           └── short.entity.ts
│   ├── package.json
│   └── tsconfig.json
│
├── shortflix-frontend/          
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── ModeToggle.tsx
│   │   │   └── ui/              
│   │   ├── lib/
│   │   │   └── api.ts
│   │   └── types/
│   │       └── short.ts
│   ├── public/
│   ├── package.json
│   └── tailwind.config.ts
│
└── README.md                     
```

---

## 🧪 Features

### **Frontend**

* ✔ Netflix-style video grid
* ✔ Video player popup (modal)
* ✔ Search (title & tags)
* ✔ Favorite/Like system (client-side)
* ✔ Light/Dark/System theme toggle
* ✔ Smooth animations & hover interactions
* ✔ Fully responsive layout

### **Backend**

* ✔ In-memory short videos (no DB needed)
* ✔ Optional POST to add new shorts
* ✔ Tag filtering and text search
* ✔ Lightweight, fast, production-ready NestJS API

---

## 📦 Installation & Setup

### 1. **Clone the repository**

```bash
git clone <your-repo-url>
cd short-flix
```

---

### 2. **Backend Setup**

```bash
cd shortflix-backend
npm install
npm run start:dev
```

Backend runs on:

🔗 `http://localhost:3001/api`

---

### 3. **Frontend Setup**

```bash
cd ../shortflix-frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on:

🔗 `http://localhost:3000`

---

## 🛠 Future Improvements

If given more time, here’s what I would add:

* User authentication + profiles
* Persistent storage using PostgreSQL / MongoDB
* Video uploads + thumbnail generation
* Infinite scroll feed
* Categories, channels, & recommendations
* Admin dashboard for managing content
* Mobile app version (React Native)

---

## 🤖 Use of AI Tools

During development, I used **ChatGPT** for architectural guidance, debugging assistance. **GitHub Copilot** helped speed up repetitive UI coding, component scaffolding, and TypeScript model creation. All generated code was manually reviewed, refined, and styled to maintain professional-grade quality.


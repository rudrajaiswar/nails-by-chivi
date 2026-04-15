# 🌸 Nails By Chivi — Website

A full-stack luxury beauty salon website with online appointment booking, built with **Node.js + Express + MongoDB**.

---

## 🚀 Quick Setup

### 1. Prerequisites
- Node.js v16+ installed
- MongoDB installed locally **OR** a free MongoDB Atlas account

### 2. Install Dependencies
```bash
cd nailsbychivi
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env and add your MongoDB connection string
```

### 4. Run the Server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

### 5. Open in Browser
```
Website:      http://localhost:3000
Admin Panel:  http://localhost:3000/admin.html
API Health:   http://localhost:3000/api/health
```

---

## 🗄️ MongoDB Setup Options

### Option A: Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/nailsbychivi
```

### Option B: MongoDB Atlas (Free Cloud — Recommended for Production)
1. Go to https://cloud.mongodb.com
2. Create free account → Create cluster → Get connection string
3. Replace in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nailsbychivi
```

---

## 📁 Project Structure
```
nailsbychivi/
├── server.js              # Main Express server
├── package.json
├── .env.example           # Environment variables template
├── models/
│   └── Appointment.js     # MongoDB schema
├── routes/
│   └── appointments.js    # Booking API routes
└── public/
    ├── index.html         # Main website (frontend)
    └── admin.html         # Admin panel for Tanvi
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/services` | Get all services with pricing |
| `POST` | `/api/appointments` | Book a new appointment |
| `GET` | `/api/appointments` | Get all appointments (admin) |
| `GET` | `/api/appointments/slots/:date` | Get available slots for a date |
| `PATCH` | `/api/appointments/:id` | Update appointment status |
| `GET` | `/api/health` | Server health check |

---

## 👰 Features
- **Beautiful luxury UI** — Rose gold & dark theme, Playfair Display typography
- **10 services** with pricing & booking buttons
- **Online appointment booking** with MongoDB storage
- **Admin panel** to manage all appointments + update status
- **Slot conflict detection** — prevents double booking
- **WhatsApp integration** — direct link to chat
- **Instagram link** connected
- **Responsive** — works on mobile, tablet & desktop
- **Custom cursor** + scroll reveal animations

---

## 🚀 Deploy to Production

### Free Deployment Options:
1. **Railway.app** — Deploy Node.js + MongoDB free tier
2. **Render.com** — Free Node.js hosting + MongoDB Atlas free tier
3. **Vercel** — Frontend only (use Vercel serverless for API)

### To deploy on Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## 📞 Contact
- Instagram: [@makeupby.tanvi](https://instagram.com/makeupby.tanvi)
- Phone: +91 99200 46042

---

*Made with 🌸 in Mumbai*

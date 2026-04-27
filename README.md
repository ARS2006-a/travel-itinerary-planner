# TravelPlan — Smart Travel Itinerary Planner

A full-stack travel planning web application with a **dark black theme**, gold accents, and a real-world professional UI. Generate personalised day-by-day itineraries, discover local events, explore transport options, and save your trips.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ Itinerary Generator | Day-by-day plan with activities, meals, time & cost |
| 🎭 Local Events | Cultural events, Yakshagana, festivals per destination |
| 🚌 Transport Info | Bus, Train, Taxi, Rental with simulated booking |
| 💰 Budget Display | Per-day cost estimates + total trip budget |
| 📄 Download Itinerary | Export as `.txt` file |
| 💾 Save Trips | Store itineraries to MongoDB (requires login) |
| 🔐 Authentication | JWT-based login / signup |
| 🌤️ Weather Info | Mock weather forecast per destination |
| 📱 Responsive | Works on desktop, tablet, and mobile |

---

## 🎨 UI Design

- **Theme**: Dark black (`#0a0a0a`) with gold (`#C9A84C`) accents
- **Layout**: Real-world two-column planner (form left, results right)
- **Typography**: Inter font — clean and modern
- **Animations**: Fade-in, slide-up, float blobs, shimmer sweep on buttons
- **Components**: Glass-dark cards, gold-bordered tabs, booking confirmation modal

---

## 🗂️ Project Structure

```
travel-itinerary-planner/
├── client/                          # React frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx           # Fixed dark navbar with gold logo
│       │   ├── ItineraryForm.jsx    # Trip details form with interest chips
│       │   ├── ItineraryDisplay.jsx # Tabbed display: Itinerary / Events / Transport
│       │   ├── DayCard.jsx          # Collapsible day card
│       │   ├── EventsSection.jsx    # Event cards with category badges
│       │   ├── TransportSection.jsx # Transport cards with booking modal
│       │   ├── WeatherWidget.jsx    # Weather forecast strip
│       │   └── LoadingSpinner.jsx   # Animated spinner
│       ├── pages/
│       │   ├── HomePage.jsx         # Landing page with hero, destinations, testimonials
│       │   ├── PlannerPage.jsx      # Two-column planner layout
│       │   ├── EventsPage.jsx       # Standalone events search page
│       │   ├── SavedTripsPage.jsx   # Saved itineraries grid
│       │   └── AuthPage.jsx         # Split-screen login / signup
│       ├── context/
│       │   └── AuthContext.jsx      # JWT auth state
│       └── App.jsx                  # Routes
│
└── server/                          # Node.js + Express backend
    ├── models/
    │   ├── TravelPlan.js            # Itinerary schema
    │   ├── User.js                  # User schema (bcrypt password)
    │   ├── Event.js                 # Event schema
    │   └── Transport.js             # Transport schema
    ├── routes/
    │   ├── planRoutes.js            # POST /api/plan, GET/POST/DELETE /api/plans
    │   ├── authRoutes.js            # POST /api/auth/register, /login, GET /me
    │   └── eventsTransportRoutes.js # GET /api/events, GET /api/transport
    ├── middleware/
    │   └── auth.js                  # JWT auth + optional auth middleware
    ├── server.js                    # Express app entry point
    └── .env                         # Environment variables
```

---

## ⚙️ API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/plan` | Generate itinerary | Optional |
| POST | `/api/plans/save` | Save itinerary | Required |
| GET | `/api/plans` | Get saved plans | Required |
| DELETE | `/api/plans/:id` | Delete a plan | Required |
| GET | `/api/events?destination=` | Get local events | None |
| GET | `/api/transport?destination=` | Get transport options | None |
| POST | `/api/auth/register` | Register user | None |
| POST | `/api/auth/login` | Login user | None |
| GET | `/api/auth/me` | Get current user | Required |

---

## 🚀 Installation & Running

### Prerequisites
- Node.js v14+
- npm
- MongoDB (optional — app works without it)

### 1. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Configure environment

`server/.env` is already set up with defaults:
```env
MONGODB_URI=mongodb://localhost:27017/travel-itinerary
PORT=5000
JWT_SECRET=travel-planner-secret-key-2024
```

### 3. Run the app

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# → http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# → http://localhost:5173
```

Open **http://localhost:5173** in your browser.

> MongoDB is optional. Without it, itineraries are generated but not persisted. Auth features require MongoDB.

---

## 🧭 How to Use

1. **Home Page** → Click a destination card or "Start Planning"
2. **Planner Page** → Fill in destination, days, budget, interests → Click "Generate Itinerary"
3. **Results** → Browse tabs: Itinerary / Events / Transport
4. **Download** → Click "Download" to save as `.txt`
5. **Save** → Login and click "Save Trip" to store in your library
6. **Saved Trips** → View and manage all saved itineraries
7. **Events Page** → Search any destination for local events

---

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS (dark theme with gold accents)
- React Router v7
- Lucide React icons
- Inter font (Google Fonts)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- CORS + dotenv

---

## 🌍 Supported Destinations (Rich Data)

Events and transport data available for:
`Paris` · `Tokyo` · `Bali` · `New York` · `London` · `Dubai` · `Goa` · `Kerala` · `Bangalore` · `Mangalore` · `Udupi` · `Mysore`

Includes **Yakshagana** performances, **Dasara**, **Onam**, and other South Indian cultural events.

---

## 📌 Notes

- All event and transport data is mock/static — no external APIs required
- Weather data is mock per destination
- Booking confirmation is simulated (no real payment)
- JWT tokens expire after 7 days

---

## 📄 License

MIT License — open source and free to use.

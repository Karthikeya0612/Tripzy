<div align="center">

<h1>🌍 Tripzy</h1>

<p><strong>Your all-in-one travel planner & group expense tracker</strong></p>

<p>
  <img src="https://img.shields.io/badge/React_Native-0.76.6-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo-52-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
</p>

<p>
  <a href="https://github.com/Karthikeya0612/Tripzy">View Repository</a> ·
  <a href="https://github.com/Karthikeya0612/Tripzy/issues">Report Bug</a> ·
  <a href="https://github.com/Karthikeya0612/Tripzy/issues">Request Feature</a>
</p>

</div>

---

## ✨ About Tripzy

**Tripzy** is a cross-platform mobile application built with React Native & Expo that takes the hassle out of group travel. Whether you're planning a weekend getaway or a month-long adventure, Tripzy helps you organize every detail — from day-wise itineraries to shared expenses — all in one place.

> Plan together. Spend smarter. Travel better.

---

## 🚀 Features

### 🗺️ Trip Planning
- **Create & manage trips** — Set a destination, travel dates, trip type, and cover image
- **Day-wise itinerary** — Break down your trip into daily plans with activities and notes for each day
- **Edit trips** — Update trip details at any time
- **Trip overview** — See all upcoming and past trips in a beautiful card-based layout

### 👫 Group & Friends Management
- **Add friends to trips** — Invite travel companions by their registered email
- **Manage participants** — View and remove friends from a trip

### 💸 Expense Tracking
- **Log expenses** — Record every spend with a title, amount, date, category, and currency
- **Expense categories** — Categorize spends (food, transport, accommodation, activities, etc.)
- **Multi-currency support** — Supports a wide range of international currencies
- **Per-trip expense view** — Filter and browse all expenses for a specific trip
- **Expense summaries** — View total spend and itemized breakdowns

### 📸 Photos & Media
- **Trip images** — Attach a cover photo to your trip
- **Image picker** — Upload photos directly from your device gallery
- **Firebase Storage** — All images are securely stored in the cloud

### 🔐 Authentication
- **Email & Password Sign-Up / Sign-In** via Firebase Authentication
- **Email verification** — Only verified accounts can access the app
- **Persistent sessions** — Stay logged in across app restarts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.76 + Expo 52 |
| Language | TypeScript |
| Navigation | React Navigation (Stack + Bottom Tabs) |
| Backend / DB | Firebase Firestore |
| Auth | Firebase Authentication |
| File Storage | Firebase Storage |
| Image Picker | expo-image-picker |
| Date Handling | date-fns + react-native-modal-datetime-picker |
| State | React Hooks |
| Icons | react-native-vector-icons |

---

## 📁 Project Structure

```
Tripzy/
├── App.tsx                   # Root component & auth gate
├── firebaseConfig.ts         # Firebase initialization
├── index.ts                  # App entry point
├── src/
│   ├── screens/
│   │   ├── SignIn.tsx         # Login screen
│   │   ├── SignUp.tsx         # Registration screen
│   │   ├── Home.tsx           # Dashboard / home screen
│   │   ├── Trips.tsx          # All trips listing
│   │   ├── TripDetails.tsx    # Day-wise trip details & planner
│   │   ├── TripForm.tsx       # Create a new trip
│   │   ├── EditTrip.tsx       # Edit existing trip
│   │   ├── ManageExpenses.tsx # Add & track expenses per trip
│   │   ├── ManageFriends.tsx  # Add/remove trip participants
│   │   └── Profile.tsx        # User profile
│   └── components/
│       ├── MainTabNavigator.tsx  # Bottom tab bar
│       ├── TripCard.tsx          # Trip card UI component
│       ├── ExpenseItem.tsx       # Single expense row component
│       ├── CategoryPicker.tsx    # Expense category selector
│       ├── Currencies.tsx        # Currency list
│       ├── ExpenseService.tsx    # Firestore expense helpers
│       ├── GetTrips.tsx          # Firestore trip fetching
│       ├── Header.tsx            # Reusable header
│       ├── Types.tsx             # Shared TypeScript types
│       └── ...
├── assets/                   # App icons & images
├── app.json                  # Expo app config
├── package.json
└── tsconfig.json
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- A Firebase project with **Authentication**, **Firestore**, and **Storage** enabled
- [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) for emulators (or the **Expo Go** app on your phone)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Karthikeya0612/Tripzy.git
   cd Tripzy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**

   Update `firebaseConfig.ts` with your Firebase project credentials:
   ```ts
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Run the app**

   ```bash
   # Start the Expo development server
   npm start

   # Or run directly on a platform
   npm run android   # Android
   npm run ios       # iOS
   npm run web       # Web (limited support)
   ```

---

## 📱 App Screens

| Screen | Description |
|---|---|
| **Sign In / Sign Up** | Firebase email auth with email verification |
| **Home** | Dashboard showing upcoming trips at a glance |
| **Trips** | Full list of all your created trips |
| **Trip Details** | Day-by-day planner view for a selected trip |
| **Create Trip** | Form to create a new trip with dates, images & friends |
| **Edit Trip** | Modify trip info at any time |
| **Manage Expenses** | Add, view, and track all expenses for a trip |
| **Manage Friends** | Add or remove friends/participants from a trip |
| **Profile** | User profile and account management |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Karthikeya** — [@Karthikeya0612](https://github.com/Karthikeya0612)



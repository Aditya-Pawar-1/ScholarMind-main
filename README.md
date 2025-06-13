# 📚 ScholarMind - Smart Study Planner & Tracker

**ScholarMind** is a mobile application developed to help students effectively plan, track, and improve their study habits. The app supports session-based time management, subject-based goal tracking, and includes secure login with personalized dashboards. Designed as an educational productivity tool, ScholarMind aims to encourage consistent learning behavior through intuitive UI and progress tracking.

---

## Features

- 🔐 **Passcode Security**: Session lock ensures secure and private access.
- ⏱️ **Study Timer**: Track sessions with 25-min, 90-min, or custom durations.
- 📅 **Calendar View**: Visualize daily study activity and check progress.
- 📊 **Tracker Dashboard**: Monitor time spent per subject with simple analytics.
- 📚 **Subjects & Goals**: Add subjects with target hours and track progress.

---

## Technologies

- **Framework**: React Native (with Expo)
- **Navigation**: React Navigation
- **Authentication**: Firebase Authentication
- **State Management**: Context API
- **Icons**: Expo Vector Icons (Ionicons)
- **Charts & Visuals**: `react-native-svg-charts` (optional)

---

## Setup Instructions

### Prerequisites

Make sure the following are installed:

- **Node.js** (v14 or above)
- **npm or yarn**
- **Expo CLI**
- **Firebase Project** (for auth)

---

### Clone the Repository

```
git clone https://github.com/Aditya-Pawar-1/ScholarMind.git
cd ScholarMind
````

---

### Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

### Start the App

```bash
npx expo start
```

> You can run the app using Android Studio emulator, iOS simulator, or Expo Go on your phone.

---

### Build APK (Optional)

```bash
npx eas build --platform android
```

Make sure EAS CLI is configured and logged in to Expo.

---

## Usage

1. **User** installs the app and signs up with Firebase authentication.
2. **User** sets a secure passcode for future access.
3. **Subjects** and study **goals** are added through an intuitive UI.
4. **Study sessions** can be started using pre-defined or custom timers.
5. The app automatically logs the session under the selected subject.
6. The **Calendar** and **Tracker** show detailed progress.

---

## Folder Structure

```
ScholarMind/
├── assets/                  # Icons, splash screens
├── context/                 # Auth & data context files
├── screens/                 # All major app screens
│   ├── LoginScreen.js
│   ├── SignupScreen.js
│   ├── PasscodeScreen.js
│   ├── SetPasscodeScreen.js
│   ├── HomeScreen.js
│   ├── CalendarScreen.js
│   ├── TrackerScreen.js
│   └── TimerScreen.js
├── App.js                   # Root app with navigation
├── index.js                 # Entry point
├── app.json                 # App metadata for Expo
├── eas.json                 # EAS build config
└── README.md
```

---

## Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/1cd05312-2e61-42cd-8230-3d2da08623a8" height="400" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/921efcc6-b06d-4ff2-a7cd-d1454da5bb1e" height="400" />
  <br><br>
  <img src="https://github.com/user-attachments/assets/1131ea41-91d4-418d-a18f-de2553fb4152" height="400" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/9d38533f-541e-48c2-a687-f827d58ca19d" height="400" />
  <br><br>
  <img src="https://github.com/user-attachments/assets/138e526d-e7ff-414e-be92-aded8b92e696" height="400" />
</p>


---

## Author

**Aditya Pawar**
📧 [aditya.pawar.dev@outlook.com](mailto:aditya.pawar.dev@outlook.com)
🌐 [pawaraditya.com](https://pawaraditya.com)
🔗 [LinkedIn](https://linkedin.com/in/aditya-pawar-dev)

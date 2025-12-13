# StrongApp

StrongApp is a modern, aesthetically pleasing workout and exercise tracking application built with **Angular**. 
It is designed to help users organize their fitness routine by managing exercises and creating custom workouts, all wrapped in a sleek "Glassmorphism" user interface.

## 🚀 Features

### 💪 Exercise Management
- **View Exercises**: Browse through your library of exercises on the home screen.
- **Add Exercises**: Easily add new exercises to your collection with custom details.
- **Edit Exercises**: Update existing exercise information to keep your library current.

### 🏋️ Workout Management
- **Create Workouts**: Build custom workout plans by selecting exercises from your library.
- **View Workouts**: Access a dedicated list of all your created workouts.
- **Delete Workouts**: Remove old or unused workouts with a safe confirmation modal.

### 🎨 User Interface
- **Glassmorphism Design**: Consistent use of semi-transparent "glass" containers (`div-glass`) for a modern, premium feel.
- **Responsive Layout**: optimized for various screen sizes.
- **Interactive Elements**: Custom search bars, modals, and smooth navigation.

---

## 🛠️ Technology Stack

- **Framework**: [Angular](https://angular.io/) (v20+)
- **Language**: TypeScript
- **Icons**: [Lucide Angular](https://lucide.dev/guide/packages/lucide-angular)
- **Styling**: Custom CSS with Glassmorphism effects
- **Routing**: Angular Router

---

## 📂 Project Structure

The project is organized into logical directories within `src/app`:

- **`components/`**: Reusable UI components.
  - `div-glass`: The core container component implementing the glass effect.
  - `modal`: A reusable dialog component for alerts and confirmations.
  - `search-bar`: Component for filtering lists.
  - `footer`: Application navigation.
  
- **`pages/`**: Main application views (routed components).
  - `exercise-card`: The home view displaying the list of exercises.
  - `add-exercise`: Form to create new exercises.
  - `edit-exercise`: Form to modify existing exercises.
  - `workouts`: List view of all user workouts.
  - `create-workout`: Interface for building new workouts.

- **`services/`**: logic layer for state management.
  - `exercise.service`: Manages exercise data.
  - `workout.service`: Manages workout data.

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18 or higher recommended).
- **Angular CLI**: Install the Angular CLI globally if you haven't already:
  ```bash
  npm install -g @angular/cli
  ```

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd StrongApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development Server

Run the development server for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```bash
ng serve
```

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
ng build
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
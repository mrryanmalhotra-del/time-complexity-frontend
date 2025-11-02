# GrowthViz Frontend

Modern React application for visualizing and learning time complexity concepts.

## Features

- **Visualize Page**: Interactive graph with up to 5 algorithm comparisons
  - Real-time complexity visualization
  - Adjustable input size (n: 1-1000)
  - Linear and logarithmic Y-axis scaling
  - 8 basic complexities + 10 algorithm presets
  
- **Theory Page**: Educational cards for each complexity
  - Detailed explanations
  - Real-world examples
  - Visual sparklines
  - Expandable content

- **Quiz Page**: Interactive quiz system
  - 5, 10, or 15 question modes
  - Timed challenges (1-3 minutes)
  - Visual graph-based questions
  - Instant feedback with animations
  - Score and accuracy tracking

## Installation

```bash
cd frontend
npm install
```

## Running the App

```bash
npm run dev
```

The app will start on **http://localhost:5173**

## Build for Production

```bash
npm run build
```

## Technologies

- **React** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Chart.js** + **react-chartjs-2** - Graph visualization
- **React Router** - Navigation
- **Lucide React** - Icons
- **Axios** - API calls

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   ├── pages/
│   │   ├── Visualize.jsx    # Main visualization page
│   │   ├── Theory.jsx       # Learning page
│   │   └── Quiz.jsx         # Quiz page
│   ├── components/
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Footer.jsx       # Footer
│   │   ├── ComplexityGraph.jsx  # Main graph component
│   │   ├── RightSidebar.jsx     # Complexities & presets
│   │   ├── SliderN.jsx          # Input size slider
│   │   └── AlgorithmCard.jsx    # Algorithm info card
│   └── data/
│       └── presets.js       # Algorithm presets & calculations
├── public/
│   └── assets/              # Audio files (optional)
├── package.json
└── README.md
```

## Features Guide

### Visualize Page
1. Select complexities from the right sidebar (up to 5)
2. Add algorithm presets with the + button
3. Adjust n-value slider (1-1000)
4. Switch Y-axis scaling (Linear/Logarithmic)
5. Remove curves by clicking legend chips

### Theory Page
- Browse 8 complexity cards
- Click "Learn more" to expand details
- View mini sparklines for each complexity

### Quiz Page
1. Choose quiz length (5/10/15 questions)
2. Click "Start Quiz"
3. Select the correct complexity graph
4. Track progress and time
5. View results and retry

## Dark Mode

Toggle between light and dark modes using the sun/moon icon in the header.

## Backend Connection

The quiz feature requires the backend server running on `http://localhost:3001`.
Ensure the backend is started before using the quiz feature.

## Notes

- Audio files enhance quiz experience but are optional
- Maximum 5 simultaneous comparisons to maintain readability
- Graphs animate smoothly when adding/removing curves
- Responsive design works on desktop and mobile

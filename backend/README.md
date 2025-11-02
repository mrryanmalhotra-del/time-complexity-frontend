# GrowthViz Backend

REST API server for the GrowthViz Time Complexity Visualizer.

## Features

- **Quiz API**: Serves random quiz questions and processes submissions
- **Question Bank**: 300 diverse questions about time complexity
- **Score Calculation**: Evaluates answers and returns detailed results

## Installation

```bash
cd backend
npm install
```

## Running the Server

```bash
npm run dev
```

The server will start on **http://localhost:3001**

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status

### Get Random Quiz Questions
```
GET /api/quiz/random?count=5
```
Query params:
- `count`: Number of questions (1-50)

Returns: Array of random questions

### Submit Quiz
```
POST /api/quiz/submit
```
Body:
```json
{
  "answers": [
    {
      "questionId": 1,
      "selectedOptionId": "a",
      "timeTaken": 10
    }
  ],
  "duration": 60
}
```

Returns: Score, correctCount, accuracy, message, and results

### Quiz Stats
```
GET /api/quiz/stats
```
Returns total number of questions available

## Project Structure

```
backend/
├── src/
│   ├── server.js          # Express server
│   ├── routes/
│   │   └── quiz.js        # Quiz API routes
│   └── data/
│       └── questions.json # 300 quiz questions
├── package.json
└── README.md
```

## Technologies

- Node.js
- Express
- CORS middleware

## Development

Questions are stored in `src/data/questions.json`. To regenerate questions, run:

```bash
node generateQuestions.js
```

## Notes

- CORS is configured to allow requests from localhost:5173 and localhost:5174
- All endpoints return JSON
- Input validation is performed on all requests

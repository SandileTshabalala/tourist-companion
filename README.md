# Johannesburg Tourist Companion App

A comprehensive mobile application to help tourists explore and navigate landmarks in Johannesburg with an interactive and user-friendly interface.

## Features

- **Landmark Discovery**: Browse through Johannesburg's most notable landmarks
- **Rich Information**: Detailed descriptions, history, and practical information for each location
- **Search & Filter**: Find places by name, category, or tags
- **Audio Guide**: Text-to-speech descriptions for accessibility
- **Interactive UI**: Modern, responsive design with smooth animations

## Project Structure

```
/
├── frontend/           # React Native mobile app
│   ├── app/           # Main application code
│   ├── assets/        # Images and static files
│   └── ...
│
└── backend/           # Flask backend server
    ├── app.py        # Main server file
    └── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- Expo CLI
- Flask

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/joburg-tourist-app.git
cd joburg-tourist-app
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install flask flask-cors
```

### Running the App

1. Start the backend server:
```bash
cd backend
python app.py
```

2. Start the frontend app:
```bash
cd frontend
npx expo start
```

## Technologies Used

### Frontend
- React Native
- Expo
- Expo Router
- Expo Speech
- React Native Maps

### Backend
- Flask
- Flask-CORS
- Python

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

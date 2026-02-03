# Cardiovascular Disease Risk Prediction

## 🏥 Project Overview

This application is a modern, full-stack AI-powered dashboard designed to predict the risk of cardiovascular disease in patients. It utilizes a deep learning model (ANN) to analyze key health metrics and provide actionable insights. The system supports both **Single Patient Assessment** (manual entry) and **Batch Processing** (uploading datasets).

## ✨ Features

- **Accurate Predictions**: Uses a trained Neural Network (ANN) to classify risk.
- **Interactive Dashboard**: Premium UI built with React & Tailwind CSS.
- **Two Modes of Operation**:
  - **Manual Diagnosis**: Enter 13 clinical features manually.
  - **Batch Analysis**: Upload Excel/CSV files for bulk risk assessment.
- **Data Visualization**: View model performance metrics (ROC Curve, Confusion Matrix) and architectural details.
- **Secure & Fast**: Powered by FastAPI for high-performance inference.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend

- **Framework**: FastAPI
- **ML/Data**: TensorFlow (Keras), Scikit-learn, Pandas, NumPy
- **Server**: Uvicorn

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v18+)
- Python (v3.8+)

### 1. Backend Setup

Navigate to the backend directory and install dependencies.

```bash
cd backend
# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

The API will start at `http://127.0.0.1:8000`.

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies.

```bash
cd frontend

# Install packages
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
cardiovascular/
├── backend/
│   ├── models/             # Trained .h5 model and scalers
│   ├── main.py             # FastAPI entry & endpoints
│   ├── preprocessing.py    # Data transformation logic
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application views (Predict, Details, Accuracy)
│   │   └── lib/            # Utilities and API config
│   └── tailwind.config.js  # Styling configuration
└── README.md
```

## 🧠 Model Inputs

The model expects the following clinical features:

1. **Age**: Patient's age in years.
2. **Sex**: Male/Female.
3. **Chest Pain Type**: Typical, Atypical, Non-anginal, Asymptomatic.
4. **Resting BP**: Blood pressure (mm Hg).
5. **Cholesterol**: Serum cholesterol (mg/dl).
6. **Fasting Blood Sugar**: > 120 mg/dl or < 120 mg/dl.
7. **Resting ECG**: Normal, ST-T Abnormality, LV Hypertrophy.
8. **Max Heart Rate**: Maximum heart rate achieved.
9. **Exercise Induced Angina**: Yes/No.
10. **Oldpeak**: ST depression induced by exercise.
11. **Slope**: Upsloping, Flat, Downsloping.
12. **Vessels**: Number of major vessels (0-4).
13. **Thalassemia**: Normal, Fixed Defect, Reversable Defect.

## ⚠️ Notes

- Ensure `models/model.h5` and `models/scaler.pkl` are present in the `backend/` directory for predictions to work.
- The application automatically handles data normalization and encoding before passing it to the model.

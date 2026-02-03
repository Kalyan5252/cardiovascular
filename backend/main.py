# mrk
import joblib
import os
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import joblib

import tensorflow as tf
from tensorflow.keras.models import load_model

# import pickle
# Import preprocessing logic
# from preprocessing import get_preprocessing_metadata
# from processor import preprocess_input

app = FastAPI(title="Cardiovascular Disease Risk Prediction API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model and scaler
# model = None
# scaler = None

# --- Data Structures ---
# class PredictionInput(BaseModel):
#     age: float
#     sex: str
#     chest_pain_type: str
#     resting_blood_pressure: float
#     cholestoral: float
#     fasting_blood_sugar: str
#     rest_ecg: str
#     Max_heart_rate: float
#     exercise_induced_angina: str
#     oldpeak: float
#     slope: str
#     vessels_colored_by_flourosopy: str
#     thalassemia: str

class HeartInput(BaseModel):
    age: int
    sex: str
    chest_pain_type: str
    resting_blood_pressure: int
    cholestoral: int
    fasting_blood_sugar: str
    rest_ecg: str
    Max_heart_rate: int
    exercise_induced_angina: str
    oldpeak: float
    slope: str
    vessels_colored_by_flourosopy: str
    thalassemia: str

class PredictionResult(BaseModel):
    prediction: int
    probability: float
    risk: str

# class PredictionResult(BaseModel):
#     prediction: int
#     probability: float
#     input_data: dict

binary_mapping = {
    "sex": {"Male": 1, "Female": 0},
    "exercise_induced_angina": {"Yes": 1, "No": 0},
    "fasting_blood_sugar": {
        "Greater than 120 mg/ml": 1,
        "Lower than 120 mg/ml": 0
    }
}

preprocessor = joblib.load("./models/preprocessor.pkl")
model = load_model("./models/heart_ann_model.h5")

# --- Startup Event ---
@app.on_event("startup")
async def load_artifacts():
    global model, scaler
    print("Loading model and scaler...")
    # TODO: Load your actual model and scaler here
    try:
        model = tf.keras.models.load_model('./models/model.h5')
        
        scaler = joblib.load('./models/scaler.pkl')
        print("Model and scaler loaded successfully.")
    except Exception as e:
        print(f"Warning: Could not load model/scaler: {e}")
        print("Running in DEMO mode with random predictions.")

# --- Endpoints ---

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Cardiovascular Disease Predictor API is running"}

# this route preprocessing of data causes inaacurate results cozzz of dims scaling issue
# @app.post("/predict/single/processingfailed", response_model=PredictionResult)
# def predict_single_failed(data: PredictionInput):
#     """
#     Predicts cardiovascular disease risk for a single record.
#     """
#     input_df = pd.DataFrame([data.dict()])
    
#     # Preprocess
#     try:
#         # Pass dummy scaler if not loaded (for demo purposes)
#         processed_data = preprocess_input(input_df, scaler) 
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Preprocessing error: {str(e)}")

#     # Predict
#     probability = 0.0
#     prediction = 0
    
#     if model:
#         prediction_raw = model.predict(processed_data)
#         probability = float(prediction_raw[0][0])
#         prediction = 1 if probability > 0.5 else 0
#     else:
#         raise HTTPException(status_code=503, detail="Model and Scaler not loaded. Service unavailable.")

#     return {
#         "prediction": prediction,
#         "probability": probability,
#         "input_data": data.dict()
#     }


@app.post("/predict/single", response_model=PredictionResult)
def predict_single(data: HeartInput):
    df_input = pd.DataFrame([data.dict()])
    # print('df_input:',)
    for col, mapping in binary_mapping.items():
        df_input[col] = df_input[col].map(mapping)
    X_input = preprocessor.transform(df_input)
    prob = float(model.predict(X_input)[0][0])
    prediction = int(prob >= 0.5)

    print('results',{
        "prediction": prediction,
        "probability": round(prob, 4),
        "risk": "High" if prediction == 1 else "Low"
    })
    return {
        "prediction": prediction,
        "probability": round(prob, 4),
        "risk": "High" if prediction == 1 else "Low"
    }



@app.post("/predict/batch")
async def predict_batch(file: UploadFile = File(...)):
    """
    Accepts an Excel or CSV file and returns predictions for each row.
    """
    if not (file.filename.endswith('.xlsx') or file.filename.endswith('.csv')):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload .xlsx or .csv")
    
    try:
        if file.filename.endswith('.xlsx'):
            df = pd.read_excel(file.file)
        else:
            df = pd.read_csv(file.file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")

    # Check for required columns? (Optional - preprocessing will fail if missing)
    
    results = []
    
    # Process row by row for simplicity in response, or batch process
    # Batch process is better:
    try:
        # We need to ensure we handle the mapping per row or batch. 
        # preprocessing function handles dataframe.
        
        processed_data = preprocess_input(df, scaler) 
        
        if model:
            preds = model.predict(processed_data)
            probabilities = [float(p[0]) for p in preds]
        else:
            raise HTTPException(status_code=503, detail="Model and Scaler not loaded. Service unavailable.")
            
        df['probability'] = probabilities
        df['prediction'] = (df['probability'] > 0.5).astype(int)
        
        # Convert to dict for JSON response
        results = df.to_dict(orient='records')
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch processing error: {str(e)}")

    print({"results": results})
    return {"results": results}

@app.get("/metadata")
def get_metadata():
    """
    Returns field metadata for frontend dropdowns.
    """
    return get_preprocessing_metadata()

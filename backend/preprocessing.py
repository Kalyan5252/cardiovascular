from pandas.io import json
import pandas as pd
import numpy as np
import json

# --- Metadata ---
NUM_COLS = [
    "age",
    "resting_blood_pressure",
    "cholestoral",
    "Max_heart_rate",
    "oldpeak"
]

BINARY_COLS = [
    "sex",
    "exercise_induced_angina",
    "fasting_blood_sugar"
]

MULTI_CAT_COLS = [
    "chest_pain_type",
    "rest_ecg",
    "slope",
    "vessels_colored_by_flourosopy",
    "thalassemia"
]

# Mappings defined by user
BINARY_MAPPING = {
    "sex": {"Male": 1, "Female": 0},
    "exercise_induced_angina": {"Yes": 1, "No": 0},
    "fasting_blood_sugar": {
        "Greater than 120 mg/ml": 1,
        "Lower than 120 mg/ml": 0
    }
}

DROPDOWN_OPTIONS = {
    "sex": ["Male", "Female"],
    "chest_pain_type": [
        "Typical angina", "Atypical angina", "Non-anginal pain", "Asymptomatic"
    ],
    "fasting_blood_sugar": ["Greater than 120 mg/ml", "Lower than 120 mg/ml"],
    "rest_ecg": ["Normal", "ST-T wave abnormality", "Left ventricular hypertrophy"],
    "exercise_induced_angina": ["Yes", "No"],
    "slope": ["Upsloping", "Flat", "Downsloping"],
    "vessels_colored_by_flourosopy": ["0", "1", "2", "3", "4"],
    "thalassemia": ["Normal", "Fixed defect", "Reversable defect"]
}

def get_preprocessing_metadata():
    return {
        "num_cols": NUM_COLS,
        "binary_cols": BINARY_COLS,
        "multi_cat_cols": MULTI_CAT_COLS,
        "options": DROPDOWN_OPTIONS
    }

def get_expected_columns(scaler=None):
    """
    Returns the list of columns expected by the model.
    1. If scaler has 'feature_names_in_', use that (Gold Standard).
    2. Else, generate based on known metadata (Fallback).
    """
    if scaler is not None and hasattr(scaler, 'feature_names_in_'):
        return list(scaler.feature_names_in_)
    expected = list(NUM_COLS) + list(BINARY_COLS)
    for col in MULTI_CAT_COLS:
        options = sorted(DROPDOWN_OPTIONS[col])
        for i, opt in enumerate(options):
            if i == 0: continue
            expected.append(f"{col}_{opt}")
    return expected

def preprocess_input(df: pd.DataFrame, scaler=None) -> pd.DataFrame:
    """
    Transforms the input dataframe to match model input shape.
    """
    df_processed = df.copy()

    # 1. Binary Mapping
    for col, mapping in BINARY_MAPPING.items():
        if col in df_processed.columns:
            df_processed[col] = df_processed[col].map(mapping)
    
    df_processed = pd.get_dummies(df_processed, columns=MULTI_CAT_COLS, drop_first=True)

    expected_cols = get_expected_columns(scaler)
   
    df_processed = df_processed.reindex(columns=expected_cols, fill_value=0)

    print('df_processed st1:', df_processed.to_dict())
    
    if scaler:
        df_processed[NUM_COLS] = df_processed[NUM_COLS].astype(float)
        
        try:
            if hasattr(scaler, 'n_features_in_'):
                n_expected = scaler.n_features_in_
                print('scaler expects n as :', n_expected)
                n_current = df_processed.shape[1]
                print('scaler got n as :', n_current)
                n_nums = len(NUM_COLS)
                
                # CASE A: Scaler expects all columns (e.g. 22)
                if n_expected == n_current:
                    df_processed = df_processed.astype(float)
                    df_processed[:] = scaler.transform(df_processed)
                    print('scaler transformed df_processed as :', df_processed.to_dict())
                    # df_processed[NUM_COLS] = scaler.transform(df_processed[NUM_COLS])
                    
                # CASE B: Scaler expects only numerical columns (e.g. 5)
                elif n_expected == n_nums:
                    df_processed[NUM_COLS] = scaler.transform(df_processed[NUM_COLS])
                else:
                    print(f"Warning: Scaler expects {n_expected} features, but we have {n_current} aligned features (or {n_nums} numericals). Skipping scaling to prevent crash.")
            else:
                 try:
                    df_processed[NUM_COLS] = scaler.transform(df_processed[NUM_COLS])
                 except:
                    print('------exception-------')
                    df_processed = df_processed.astype(float)
                    df_processed[:] = scaler.transform(df_processed)

            df_json = df_processed.to_dict()

            print('processed:', df_json)
        except Exception as e:
            print(f"Scaling error: {e}")
    
    
    return df_processed


def preprocess_input_ktrail(df: pd.DataFrame, scaler=None) -> pd.DataFrame:
    try:
        df_processed = df.copy()

        print('processing on data:', df_processed.to_dict())

        binary_mapping = {
            "sex": {"Male": 1, "Female": 0},
            "exercise_induced_angina": {"Yes": 1, "No": 0},
            "fasting_blood_sugar": {
                "Greater than 120 mg/ml": 1,
                "Lower than 120 mg/ml": 0
            }
        }

        for col, mapping in binary_mapping.items():
            df_processed[col] = df_processed[col].map(mapping)

        df_new = pd.get_dummies(df_processed, columns=MULTI_CAT_COLS, drop_first=True)
        df_new = df_new.reindex
        print('df after MULTI process', df_new.to_dict())
        df_new[NUM_COLS] = scaler.transform(df_new[NUM_COLS])

        print('kalyan test on processing:', df_new)
        
        return df_new
    except Exception as e:
        print(f"Preprocessing error: {e}")
        return None
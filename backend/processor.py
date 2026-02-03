import pandas as pd
import numpy as np

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

BINARY_MAPPING = {
            "sex": {"Male": 1, "Female": 0},
            "exercise_induced_angina": {"Yes": 1, "No": 0},
            "fasting_blood_sugar": {
                "Greater than 120 mg/ml": 1,
                "Lower than 120 mg/ml": 0
            }
        }

df_for_original_X_cols = pd.read_csv("./data/HeartDiseaseTrain-Test.csv")

for col, mapping in BINARY_MAPPING.items():
  df_for_original_X_cols[col] = df_for_original_X_cols[col].map(mapping)
df_for_original_X_cols = pd.get_dummies(df_for_original_X_cols, columns=MULTI_CAT_COLS, drop_first=True)

original_X_columns_for_scaler = df_for_original_X_cols.drop("target", axis=1).columns

def preprocess_input(df: pd.DataFrame, scaler= None) -> pd.DataFrame:
  try:
    new_df_processed = df.copy()

    for col, mapping in BINARY_MAPPING.items():
      new_df_processed[col] = new_df_processed[col].map(mapping)

    new_df_processed = pd.get_dummies(new_df_processed, columns=MULTI_CAT_COLS, drop_first=True)
    new_df_processed = new_df_processed.reindex(columns=original_X_columns_for_scaler, fill_value=0)

    if scaler:
      new_df_processed = scaler.transform(new_df_processed)

    print('processed data:', new_df_processed)
    return new_df_processed
  except Exception as e:
    print('error in preprocessing:', e)
    raise HTTPException(status_code=400, detail=f"Preprocessing error: {str(e)}")
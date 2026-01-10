# attendance_app/ml/model_loader.py

import os
import joblib


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")
MODEL_PATH = os.path.join(BASE_DIR, "kmeans_model.pkl")
CLUSTER_LABEL_MAP= os.path.join(BASE_DIR,"cluster_labels.pkl")


scaler = joblib.load(SCALER_PATH)
kmeans = joblib.load(MODEL_PATH)
cluster_label_map = joblib.load(CLUSTER_LABEL_MAP)

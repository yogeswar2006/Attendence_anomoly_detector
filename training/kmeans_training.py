import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import joblib


dataset = pd.read_csv('attendence_data.csv')
X = dataset.iloc[:, 1:6].values

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

wcss = []
for i in range(1, 11):
    kmeans = KMeans(n_clusters = i, init = 'k-means++', random_state = 42)
    kmeans.fit(X_scaled)
    wcss.append(kmeans.inertia_)
    

kmeans = KMeans(n_clusters=4, init="k-means++", random_state=42)
kmeans.fit(X_scaled)

joblib.dump(kmeans, "kmeans_model.pkl")
joblib.dump(scaler, "scaler.pkl")



# get centroids
centroids_scaled = kmeans.cluster_centers_

centroids = scaler.inverse_transform(centroids_scaled)

centroid_df = pd.DataFrame(
    centroids,
    columns=[
        "attendance_ratio",
        "avg_checkin_hour",
        "checkin_variance",
        "consecutive_absent_days",
        "attendance_change"
    ]
)


centroid_df["risk_score"] = (
    (1 - centroid_df["attendance_ratio"]) * 3 +
    centroid_df["checkin_variance"] * 2 +
    centroid_df["consecutive_absent_days"] * 1.5 +
    (-centroid_df["attendance_change"]) * 2
)


centroid_df = centroid_df.sort_values("risk_score")

RISK_LABELS = [
    "Low Risk",
    "Medium Risk",
    "High Risk",
    "Very High Risk"
]

cluster_label_map = {
    cluster_id: RISK_LABELS[i]
    for i, cluster_id in enumerate(centroid_df.index)
}

print("Cluster → Label Mapping")
print(cluster_label_map)

joblib.dump(cluster_label_map, "cluster_labels.pkl")



# plt.plot(range(1, 11), wcss)
# plt.title('The Elbow Method')
# plt.xlabel('Number of clusters')
# plt.ylabel('WCSS')
# plt.show()
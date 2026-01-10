from django.shortcuts import render
import os
from django.http import JsonResponse
from django.conf import settings
import uuid
import pandas as pd
import numpy as np
from rest_framework.decorators import api_view
from rest_framework.response import Response



# Create your views here.

@api_view(["POST","GET"])
def upload_files(request):
    if request.method =="POST":  
        file = request.FILES.get("file")
        
        if not file:
            return Response({"error":"No file uploaded"})
        
        try:
           df = pd.read_csv(file)
        except Exception:
           return Response({"error": "Invalid CSV file"}, status=400)
        
       
        
        
        REQUIRED_COLUMNS = {
    "student_id",
    "attendance_ratio",
    "avg_checkin_hour",
    "checkin_variance",
    "consecutive_absent_days",
    "attendance_change"
}
          
        uploaded_cols = set(df.columns)

        if not REQUIRED_COLUMNS.issubset(uploaded_cols):
            return Response({"error":"Invalid CSV format, required columns are missing!"})
        
        job_id = str(uuid.uuid4())
        
        file_path = os.path.join(settings.MEDIA_ROOT,f"{job_id}.csv")
        
        with open(file_path,"wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)
                
        return Response({
            "Message":"File uploded Successfull",
                    "job_id":job_id
                })
            
    
    return Response({"error":"invalid request"})


@api_view(["POST","GET"])
def Analyze(request):
    job_id = request.data.get('job_id')
    
    if not job_id:
        return Response({"error": "job_id is required"}, status=400)
    
    file_path = os.path.join(settings.MEDIA_ROOT, f"{job_id}.csv")
    
    if not os.path.exists(file_path):
        return Response({"error": "File not found"}, status=404)
    
    try:
        df = pd.read_csv(file_path)
    except Exception:
         return Response({"error": "Failed to read CSV"}, status=400)
     
    FEATURE_COLUMNS = [
        "attendance_ratio",
        "avg_checkin_hour",
        "checkin_variance",
        "consecutive_absent_days",
        "attendance_change"
    ]   
    
    try:
        X = df[FEATURE_COLUMNS].values
    except KeyError:
         return Response({"error": "Invalid CSV format"}, status=400) 
     
    from .ml.model_loader import scaler,kmeans,cluster_label_map   
    
    X_scaled = scaler.transform(X)
    clusters = kmeans.predict(X_scaled)
    
    df["cluster"] = clusters
    df["risk_label"] = df["cluster"].map(cluster_label_map)
    
    return Response({
        "job_id":job_id,
        "summary":{
            "Low Risk":int((df["risk_label"]=="Low Risk").sum()),
            "Medium Risk": int((df["risk_label"] == "Medium Risk").sum()),
            "High Risk": int((df["risk_label"] == "High Risk").sum()),
            "Very High Risk": int((df["risk_label"] == "Very High Risk").sum())
         },
        "students": df[
        [
            "student_id",
            "attendance_ratio",
            "consecutive_absent_days",
            "attendance_change",
            "risk_label"
        ]
      ].to_dict(orient="records")
        
        }
    )
from django.shortcuts import render
import os
from django.http import JsonResponse
from django.conf import settings
import uuid


# Create your views here.


def upload_files(request):
    if request.method =="POST":  
        file = request.FILE.get("file")
        
        if not file:
            return JsonResponse({"error":"No file uploaded"})
        
        job_id = str(uuid.uuid4())
        
        file_path = os.path.join(settings.MEDIA_ROOT,f"{job_id}.csv")
        
        with open(file_path,"wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        
        return JsonResponse({
            "Message":"File uploded Successfull",
            "job_id":job_id
        })
    
    return JsonResponse({"error":"invalid request"})
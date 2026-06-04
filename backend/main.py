from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SurveyResponse(BaseModel):
    q1: str
    q2: str
    q3: str
    q4: str 
    q5: str
    responseTime: int
    browserInfo: str
    submittedAt: str

@app.get("/")
def home():
    return {"message": "Backend is working"}

@app.post("/submit")
def submit_response(response: SurveyResponse):
    data = response.model_dump()

    file_name = "responses.json"

    if not os.path.exists(file_name):
        with open(file_name, "w") as f:
            json.dump([], f)

    with open(file_name, "r") as f:
        responses = json.load(f)

    responses.append(data)

    with open(file_name, "w") as f:
        json.dump(responses, f, indent=4)

    return {
        "status": "success",
        "message": "Response saved successfully",
        "data": data
    }
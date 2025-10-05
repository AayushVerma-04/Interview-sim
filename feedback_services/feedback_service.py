from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import redis
import json
from sentence_transformers import SentenceTransformer, util
import numpy as np
from dotenv import load_dotenv
import os

app = FastAPI()

model = SentenceTransformer('all-MiniLM-L6-v2')

load_dotenv(".env")
print(os.getenv("host"))
redis_client = redis.Redis(
    host=str(os.getenv("host")),
    port=11760,
    decode_responses=True,
    username="default",
    password=str(os.getenv("password")),
)

try:
    redis_client.ping()
    print("Connected to Redis Cloud!")
except redis.ConnectionError as e:
    print("Redis connection failed:", e)


class FeedbackRequest(BaseModel):
    sessionId: str


@app.post("/generate-feedback")
def generate_feedback(req: FeedbackRequest):
    session_id = req.sessionId

    data = redis_client.hgetall(session_id)
    if not data:
        raise HTTPException(status_code=404, detail="Session not found in Redis")

    # Parse stored Q&A
    try:
        answers = json.loads(data.get("answers", "[]"))
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON for answers")

    if not answers:
        raise HTTPException(status_code=400, detail="No answers found for feedback generation")

    resume_text = data.get("resume", "")
    question_analysis = []
    scores = []

    # Compute semantic similarity between user & reference answers
    for item in answers:
        question = item.get("question", "").strip()
        user_answer = item.get("userAnswer", "").strip()
        ref_answer = item.get("referenceAnswer", "").strip()

        if not user_answer or not ref_answer:
            score = 0
        else:
            emb_user = model.encode(user_answer, convert_to_tensor=True)
            emb_ref = model.encode(ref_answer, convert_to_tensor=True)
            similarity = util.cos_sim(emb_user, emb_ref).item()
            score = round(similarity * 10, 2)

        scores.append(score)
        question_analysis.append({
            "question": question,
            "userAnswer": user_answer,
            "referenceAnswer": ref_answer,
            "score": score
        })

    overall_score = round(np.mean(scores), 2) if scores else 0
    resume_summary = summarize_resume(resume_text)

    feedback_payload = {
        "resumeSummary": resume_summary,
        "overallScore": overall_score,
        "questionAnalysis": question_analysis
    }

    return feedback_payload


def summarize_resume(resume_text: str):
    """Simple rule-based summarizer"""
    if not resume_text:
        return "No resume provided."
    lines = [line.strip() for line in resume_text.split("\n") if line.strip()]
    keywords = ["experience", "project", "skill", "education", "intern"]
    important = [line for line in lines if any(k in line.lower() for k in keywords)]
    return " ".join(important[:3]) if important else " ".join(lines[:3])


#test
import json

session_id = "test-session-123"

sample_data = {
    "resume": "Worked on AI-based women safety app using MERN stack. Skilled in React, Node.js, and NLP integration.",
    "answers": json.dumps([
        {
            "question": "What is normalization in DBMS?",
            "userAnswer": "It reduces redundancy and improves data organization.",
            "referenceAnswer": "Normalization organizes data into tables to reduce redundancy and maintain integrity."
        },
        {
            "question": "Explain REST API.",
            "userAnswer": "It uses HTTP methods to perform CRUD operations.",
            "referenceAnswer": "REST API follows client-server architecture and uses HTTP methods for data manipulation."
        }
    ])
}

redis_client.hset(session_id, mapping=sample_data)
print("Test data uploaded to Redis Cloud!")
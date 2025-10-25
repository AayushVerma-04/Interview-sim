import spacy
import os
import redis
from dotenv import load_dotenv


load_dotenv(".env")
print(os.getenv("host"))
redis_client = redis.Redis(
    host=str(os.getenv("host")),
    port=int(os.getenv("port")),
    decode_responses=True,
    username="default",
    password=str(os.getenv("password")),
)

try:
    redis_client.ping()
    print("Connected to Redis Cloud!")
except redis.ConnectionError as e:
    print("Redis connection failed:", e)

def summarize_resume(text: str):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)

    entities = {"Name": [], "ORG": [], "EDUCATION": [], "SKILL": []}
    for ent in doc.ents:
        if ent.label_ in ["PERSON"]:
            entities["Name"].append(ent.text)
        elif ent.label_ in ["ORG"]:
            entities["ORG"].append(ent.text)
        elif ent.label_ in ["GPE", "FAC", "NORP"]:
            entities["EDUCATION"].append(ent.text)

    summary = f"{' '.join(entities['Name'])} has worked with {', '.join(entities['ORG'][:3])}. "\
              f"Educational background includes {', '.join(entities['EDUCATION'][:2])}."
    return summary

if __name__ == "__main__":
    sample_text = redis_client.hget('98f1b7db-426c-476d-8ad6-d526b8abc1ba', "resume")
    print(summarize_resume(sample_text))
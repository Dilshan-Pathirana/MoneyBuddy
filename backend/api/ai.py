import os
import requests
import json

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = "mixtral-8x7b-32768"   # free & fast on Groq

def get_budget_suggestion(summary: str) -> str:
    """
    Sends user summary text to Groq LLM and returns advice string.
    """
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}"
    }
    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are a smart personal finance assistant that provides budget advice in short bullet points using LKR context."},
            {"role": "user", "content": summary}
        ]
    }
    resp = requests.post(url, headers=headers, data=json.dumps(payload))
    data = resp.json()
    return data["choices"][0]["message"]["content"]

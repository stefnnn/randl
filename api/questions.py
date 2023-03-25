#!/usr/bin/env python3

import sys, os
from dotenv import load_dotenv
import openai
from database import db
import json

load_dotenv()

# Configure OpenAI GPT
PROMPT = """
Can you please generate 3 questions of understandingv in English for the following text. 
Answer with a single JSON array in the following format 
[
  { "question": "What is 2+2?", "answer": "4" },
  { "question": "What's the name of our planet?", "answer": "earth" }
]

Text:
"""
GPT_MODEL = "gpt-3.5-turbo"
openai.organization = os.getenv("OPENAI_ORG")
openai.api_key = os.getenv("OPENAI_API_KEY")

if (not openai.api_key):
    print("\n\nError: You have not set the env variable OPENAI_API_KEY (and possibly OPENAI_ORG)\n\n")
    sys.exit(1)

def generate_questions(url):
  article = db.find_article(url)
  if 'questions' in article:
    print("Article already has questions. Skipping…")
  else:
    try:
      text = article['text']
      prompt = PROMPT + text
      gpt_messages = [gen_message(prompt)]
      questions = gpt_complete(gpt_messages)
      article['questions'] = json.loads(questions)
      db.update_article(article)
    except Exception as e:
      print("Failed to generate questions: " + e)

def gpt_complete(messages):
  api_response = openai.ChatCompletion.create(
      model=GPT_MODEL,
      messages=messages
  )
  completions = api_response['choices']
  first_completion = completions[0]['message']
  return first_completion["content"]

def gen_message(content, role = "user"):
  return {"role": role, "content": content}

if __name__ == "__main__":
  url = sys.argv[1]
  generate_questions(url)
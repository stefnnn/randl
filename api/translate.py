#!/usr/bin/env python3

import sys, os
import boto3
import re
from dotenv import load_dotenv
import openai
from database import db

load_dotenv()

# Configure AWS
translator = boto3.client('translate')
polly = boto3.client('polly')
AUDIO_DIR = "data/audio"
TARGET_LANG = "en"
TARGET_SPEACH_LANG = {"de": "de-DE", "en": "en-US", "fr": "fr-FR", "es": "es-ES", "it":"it-IT"}
POLLY_VOICES = {"en": "Joanna", "de": "Vicki", "fr": "Mathieu", "it":"Bianca", "es": "Sergio"}

# Configure OpenAI GPT
GPT_MODEL = "gpt-3.5-turbo"
openai.organization = os.getenv("OPENAI_ORG")
openai.api_key = os.getenv("OPENAI_API_KEY")

def translate(text, source, target=TARGET_LANG):
  response = translator.translate_text(Text=text, SourceLanguageCode=source, TargetLanguageCode=target)
  return response['TranslatedText']

def translate_article(url):
  article = db.find_article(url)
  if 'sentences_translated' in article:
    print("Already translated. Skipping…")
  else:
    language = article['language']
    text = article['summary']
    translated = translate(text, language)
    article['title_translated'] = translate(article['title'], language)
    article['sentences'] = re.split(r'\.(?=\.\s)', text)
    article['sentences_translated'] = re.split(r'\.(?=\s)', translated)

    db.update_article(article)
    print(f"Translated {len(text + article['title'])} characters and saved article")

if __name__ == "__main__":
  url = sys.argv[1]
  translate_article(url)
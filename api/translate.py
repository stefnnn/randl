#!/usr/bin/env python3

import sys, os
from tinydb import TinyDB, where
import boto3
import re
from dotenv import load_dotenv
import openai

load_dotenv()

articles_db = TinyDB('./data/articles.json')

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

def find_article(url):
  return articles_db.search(where('url') == url)[0]

def translate_article(url):
  article = find_article(url)
  if 'sentences_translated' in article:
    print("Already translated. Skipping…")
  else:
    sentences = re.split(r'\.(?=\s)', article['text'])
    full_text = article['title'] + "\n" + ".".join(sentences)
    print(f"- {len(sentences)} Sentences in {url}")
    raw = translate(full_text, article['language'])
    title_translated, text_tranlated = raw.split("\n", 1)
    article['title_translated'] = title_translated
    article['sentences'] = re.split(r'\.(?=\s)', article['text'])
    article['sentences_translated'] = re.split(r'\.(?=\s)', text_tranlated)

    articles_db.update(article, doc_ids=[article.doc_id])
    print(f"Translated {len(raw)} characters and saved article")

def generate_audio(url):
  article = find_article(url)
  sentences = article['sentences']
  dir = os.path.join(AUDIO_DIR, str(article.doc_id))
  
  if sentences is None or len(sentences) == 0:
    print("Article is not yet translated. Skipping audio generation…")
  elif os.path.exists(dir):
    print("Already generated audio for this article. Skipping…")
  else:
    os.makedirs(dir, exist_ok=True)
    language = TARGET_SPEACH_LANG[article['language']]
    voice = POLLY_VOICES[article['language']]
    print(f"Generating audio in {language} with neural voice actor {voice}")
  
    for ix, sentence in enumerate(sentences):
      try:
        response = polly.synthesize_speech(
          Text=sentence, Engine='neural', LanguageCode=language, OutputFormat="mp3", VoiceId=voice
        )
        path = os.path.join(dir, str(ix)+".mp3")
        file = open(path, 'wb')
        file.write(response['AudioStream'].read())
        file.close()
      except Exception as e:
        print("Error generating audio")
        print(e)
        sys.exit()

    article['audio'] = dir.replace("data", "")
    articles_db.update(article, doc_ids=[article.doc_id])
    print(f"Wrote {len(sentences)} MP3 files to disk into {dir}")

def generate_questions(url):
  article = find_article(url)

  

if __name__ == "__main__":
  url = sys.argv[1]
  translate_article(url)
  generate_audio(url)
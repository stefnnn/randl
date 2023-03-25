#!/usr/bin/env python3

import sys, os
import boto3
from dotenv import load_dotenv
from database import db

load_dotenv()

# Configure AWS
translator = boto3.client('translate')
polly = boto3.client('polly')
AUDIO_DIR = "data/audio"
TARGET_LANG = "en"
TARGET_SPEACH_LANG = {"de": "de-DE", "en": "en-US", "fr": "fr-FR", "es": "es-ES", "it":"it-IT"}
POLLY_VOICES = {"en": "Joanna", "de": "Vicki", "fr": "Mathieu", "it":"Bianca", "es": "Sergio"}

def generate_audio(url):
  article = db.find_article(url)
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
    db.update_article(article)
    print(f"Wrote {len(sentences)} MP3 files to disk into {dir}")

if __name__ == "__main__":
  url = sys.argv[1]
  generate_audio(url)
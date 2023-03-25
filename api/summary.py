#!/usr/bin/env python3

import sys, os
from dotenv import load_dotenv
import openai
from database import db
import json

load_dotenv()

SUMMARY_PROMPTS = {
  "de": "Kannst Du bitte eine kurze und sehr einfach verständliche Zusammenfassung für folgenden Text schreiben. Verwende etwa sehr 10 einfache Sätze.\n\nText:\n", 
  "fr": "Peux-tu s'il te plaît écrire un résumé court et très facile à comprendre pour le texte suivant. Utilise environ 10 phrases très simples.\n\nTexte:\n", 
  "en": "Can you please write a short and very easy to understand summary for the following text. Use about 10 very simple sentences.\n\nText:\n", 
  "it": "Potete scrivere un riassunto breve e molto semplice del seguente testo. Usa circa 10 frasi molto semplici.\nTesto:\n", 
  "uk": "Напишіть, будь ласка, короткий і дуже простий підсумок до наступного тексту. Використовуйте приблизно 10 дуже простих речень.\n\nТекст:\n", 
  "es": "¿Puede escribir un resumen breve y muy sencillo del siguiente texto? Utilice unas 10 frases muy sencillas.\nTexto:\n"
}

# Configure OpenAI GPT
GPT_MODEL = "gpt-3.5-turbo"
openai.organization = os.getenv("OPENAI_ORG")
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_summary(url):
  article = db.find_article(url)
  if 'gtp_summary' in article:
    print("Article already has a summary. Skipping…")
  else:
    prompt = SUMMARY_PROMPTS[article['language']] + article['text']
    gpt_messages = [gen_message(prompt)]
    article['summary'] = gpt_complete(gpt_messages)
    # print("Text: "+ article['text']+"\n"+"-"*80)
    # print("Summary: " + article['gpt_summary'])
    db.update_article(article)

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
  generate_summary(url)
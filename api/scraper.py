#!/usr/bin/env python3

import sys
from tinydb import TinyDB, where
from newspaper import Article
import feedparser

articles_db = TinyDB('./data/articles.json')

def extract_articles(url, language, topic):
  print(f"Parse RSS Feed {url} ({language} / {topic})")
  feed = feedparser.parse(url)
  source = feed['feed']['title']
  for entry in feed['entries']:
    extract_article(entry['link'], language, topic, source)

def extract_article(url, language, topic, source):
  global num
  if (num == 0): 
    return
  if articles_db.search(where('url') == url):
    print(f"… skipping {url}")
    return
  try:
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()
    print(f"- {article.title}")
    articles_db.insert({
      'language': language,
      'topics': [topic, *article.keywords],
      'title': article.title,
      'text': article.text,
      'image': article.top_image,
      'summary': article.summary,
      'url': article.url,
      'source': source
    })
    num -= 1
  except:
    print(f"Could not parse {url}")

if __name__ == "__main__":  
  language = sys.argv[1]
  if language == "init":
    import nltk
    nltk.download('punkt')
  else:
    topic = sys.argv[2]
    url = sys.argv[3]
    num = sys.argv[4] if len(sys.argv) > 4 else 10
    extract_articles(url, language, topic)
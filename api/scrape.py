#!/usr/bin/env python3

import sys
from tinydb import TinyDB, where
from newspaper import Article
import feedparser
from urllib.parse import urlparse
from generate import generate_metadata

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
    print(f"- {article.title}")
    articles_db.insert({
      'language': language,
      'topics': [topic],
      'title': article.title,
      'text': article.text,
      'image': article.top_image,
      'url': article.url,
      'source': source
    })
    num -= 1
    generate_metadata(article.url)
  except Exception as e:
    print(f"Could not parse {url}: " + e)

if __name__ == "__main__":  
  language = sys.argv[1]
  if language == "init":
    import nltk
    nltk.download('punkt')
  else:
    topic = sys.argv[2]
    url = sys.argv[3]
    num = int(sys.argv[4]) if len(sys.argv) > 4 else 10
    if "rss" in url:
      extract_articles(url, language, topic)
    else:
      source = urlparse(url).hostname
      extract_article(url, language, topic, source=source)
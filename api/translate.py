#!/usr/bin/env python3

import sys
from tinydb import TinyDB, where
from newspaper import Article
import feedparser

articles_db = TinyDB('../data/articles.json')

def translate_article(url):
  article = articles_db.search(where('url') == url)
  sentences = article.text.split('.')
  print(f"{len(sentences)} Sentences in {url}")

if __name__ == "__main__":
  url = sys.argv[1]
  translate_article(url)
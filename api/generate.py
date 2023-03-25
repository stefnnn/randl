#!/usr/bin/env python3
import sys
from translate import translate_article
from audio import generate_audio
from summary import generate_summary
from questions import generate_questions

def generate_metadata(url):
  generate_summary(url)
  translate_article(url)
  generate_audio(url)
  generate_questions(url)

if __name__ == "__main__":
  url = sys.argv[1]
  generate_metadata(url)
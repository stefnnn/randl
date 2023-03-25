#!/usr/bin/env python3
import sys
from translate import translate_article
from audio import generate_audio
from questions import generate_questions

if __name__ == "__main__":
  url = sys.argv[1]
  translate_article(url)
  generate_audio(url)
  generate_questions(url)
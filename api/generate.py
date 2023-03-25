#!/usr/bin/env python3
import sys
from translate import translate_article
from audio import generate_audio
from summary import generate_summary
from questions import generate_questions

if __name__ == "__main__":
  url = sys.argv[1]
  translate_article(url)
  generate_summary(url)
  generate_audio(url)
  generate_questions(url)
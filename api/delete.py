#!/usr/bin/env python3

import sys
from database import db

if __name__ == "__main__":
  url = sys.argv[1]
  db.delete_article(url)
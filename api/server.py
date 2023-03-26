import sys
from dotenv import load_dotenv
from flask import Flask, request, send_file
from flask_cors import CORS
from database import db
import os

load_dotenv()

app = Flask("RandL")
CORS(app)

@app.get('/api/languages')
def languages():
    return {"languages": db.get_languages()}

@app.get('/api/topics')
def topics():
    return {"topics": db.get_topics()}

@app.get('/api/articles')
def articles():
    language = request.args.get('language')
    topic = request.args.get('topic')
    articles = db.get_articles(language=language, topic=topic)
    #summary_fields = set(['doc_id', 'title', 'image', 'source', 'url'])
    #for article in articles:
    #    article = {k:v for k,v in article.items() if k in summary_fields}
    return {"articles": articles}

@app.get('/audio/<int:doc_id>/<int:sentence>')
def audio(doc_id, sentence):
    return send_file(os.path.join(f"./data/audio/{doc_id}/{sentence}.mp3"), mimetype="audio/mp3")

@app.get('/')
def index():
    return '<b>Not much to see here...</b>'

if __name__ == '__main__':
    app.run()
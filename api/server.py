import sys
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from database import db

load_dotenv()

app = Flask("RandL")
CORS(app)
PORT = 5000

@app.get('/api/languages')
def languages():
    return {"languages": db.get_languages()}

@app.get('/api/topics')
def topics():
    return {"topics": db.get_topics()}

@app.get('/')
def index():
    return '<b>Not much to see here...</b>'

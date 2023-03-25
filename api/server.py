import sys
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS

load_dotenv()

app = Flask("RandL")
CORS(app)
PORT = 5000

@app.get('/api/languages')
def languages():
    languages = [
        {"code": "de", "name": "German"},
        {"code": "fr", "name": "French"},
        {"code": "it", "name": "Italian"},
        {"code": "es", "name": "Spanish"},
    ]
    return {"languages": languages}

@app.get('/')
def index():
    return '<b>Not much to see here...</b>'

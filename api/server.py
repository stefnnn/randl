import sys
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS

load_dotenv()

app = Flask("RandL")
CORS(app)
PORT = 5000

@app.post('/api/languages')
def languages():
    return {"languages": ["de", "fr", "en"]}

@app.get('/')
def index():
    return '<b>Not much to see here...</b>'

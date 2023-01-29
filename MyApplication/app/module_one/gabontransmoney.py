import os
import sqlite3
import ast
import json
from .formatting_data import extract_data_db

import werkzeug
from flask import (
    Flask,
    request,
    render_template,
    url_for,
    redirect
)

template_dir = '/home/princeobiang/nancy_creation/MyApplication/app/templates/module_one'
static_dir = '/home/princeobiang/nancy_creation/MyApplication/app/static/module_one'

app = Flask(__name__, template_folder = template_dir,  static_folder=static_dir)


@app.route('/', methods=['GET', 'POST'])

def home():

    """the home page of our site"""
    if request.method == "POST":
        data = request.button
        print(data)

    return render_template('index.html')










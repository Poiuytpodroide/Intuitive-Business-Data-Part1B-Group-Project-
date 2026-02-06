from flask import Flask
import database

app = Flask(__name__)

@app.route("/")
def index():
    return "Flask API"

@app.route("/sqlTest")
def sql_test(): 
    return database.get_services()

@app.route("/api/getVPL=<vplID>")
def home_page(vplID):
    return vplID # get vpl file

@app.teardown_appcontext
def on_close(exception):
    database.close_connection(exception)
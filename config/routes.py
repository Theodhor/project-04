import os
from app import app

@app.route('/', defaults={'path': ''})
@app.route('/<pat:path>')
def catch_all(path):
    if os.path.isfile('public/' + path):
        return app.send_static_file(path)

    return app.send_static_file('index.html')    

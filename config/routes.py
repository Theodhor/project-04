import os
from app import app
from controllers import users, auth, events, friends, images, likes, comments, list

app.register_blueprint(friends.api, url_prefix='/api')
app.register_blueprint(users.api, url_prefix='/api')
app.register_blueprint(auth.api, url_prefix='/api')
app.register_blueprint(events.api, url_prefix='/api')
app.register_blueprint(images.api, url_prefix='/api')
app.register_blueprint(likes.api, url_prefix='/api')
app.register_blueprint(comments.api, url_prefix='/api')
app.register_blueprint(list.api, url_prefix='/api')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if os.path.isfile('public/' + path):
        return app.send_static_file(path)

    return app.send_static_file('index.html')

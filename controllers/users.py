from flask import Blueprint, request, jsonify
from models.User import User, UserSchema
from lib.secure_route import secure_route

user_schema = UserSchema()
users_schema = UserSchema(many=True)

api = Blueprint('users', __name__)

@api.route('/users', methods=['GET'])
def index():
    users = User.query.all()
    return users_schema.jsonify(users)

@api.route('/users/<int:id>', methods=['GET'])
def show(id):
    user = User.query.get(id)

    if not user:
        return jsonify({ 'message': 'Not found' }), 404

    return user_schema.jsonify(user)

@api.route('/users/<int:id>', methods=['PUT', 'PATCH'])
@secure_route
def update(id):
    user = User.query.get(id)

    if not user:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    del req_data['friends']
    del req_data['images']
    data, errors = user_schema.load(req_data, partial=True)

    if errors:
        return jsonify({'errors': errors}), 422

    user.update(data)

    return user_schema.jsonify(user)

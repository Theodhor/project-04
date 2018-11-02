from flask import Blueprint, request, jsonify, g
from models.Friend import Friend, FriendSchema
from lib.secure_route import secure_route

friend_schema = FriendSchema()
friends_schema = FriendSchema(many=True)


api = Blueprint('friends', __name__)


@api.route('/friends', methods=['GET'])
def index():
    friends = Friend.query.all()
    return friends_schema.jsonify(friends)


@api.route('/friends/<int:id>', methods=['GET'])
def show(id):
    friend = Friend.query.get(id)

    if not friend:
        return jsonify({'message': 'Not found'}), 404

    return friend_schema.jsonify(friend)


@api.route('/friends', methods=['POST'])
@secure_route
def create():
    req_data = request.get_json()
    data, errors = friend_schema.load(req_data)

    print(data)

    if errors:
        return jsonify({'errors': errors}), 422

    friend = Friend(data)
    friend.save()

    return friend_schema.jsonify(friend), 201


@api.route('/friends/<int:id>', methods=['PUT', 'PATCH'])
@secure_route
def update(id):
    friend = Friend.query.get(id)

    if not friend:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    data, errors = friend_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    friend.update(data)

    return friend_schema.jsonify(friend)


@api.route('/friends/<int:id>', methods=['DELETE'])
@secure_route
def delete(id):
    friend = Friend.query.get(id)

    if not friend:
        return jsonify({'message': 'Not found'}), 404

    friend.delete()
    return '', 204

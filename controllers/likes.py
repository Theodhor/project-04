from flask import Blueprint, request, jsonify, g
from models.Like import Like, LikeSchema
from lib.secure_route import secure_route

like_schema = LikeSchema()
likes_schema = LikeSchema(many=True)


api = Blueprint('likes', __name__)

@api.route('/likes', methods=['POST'])
@secure_route
def create():
    req_data = request.get_json()
    data, errors = like_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    like = Like(data)

    like.save()


    return like_schema.jsonify(like), 201

@api.route('/likes/<int:id>', methods=['DELETE'])
@secure_route
def delete(id):
    like = Like.query.get(id)

    if not like:
        return jsonify({'message': 'Not found'}), 404

    like.delete()
    return '', 204

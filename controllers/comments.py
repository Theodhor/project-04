from flask import Blueprint, request, jsonify, g
from models.Comment import Comment, CommentSchema
from lib.secure_route import secure_route

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)


api = Blueprint('comments', __name__)

@api.route('/comments', methods=['POST'])
@secure_route
def create():
    req_data = request.get_json()
    data, errors = comment_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    comment = comment(data)

    comment.save()


    return comment_schema.jsonify(comment), 201

@api.route('/comments/<int:id>', methods=['DELETE'])
@secure_route
def delete(id):
    comment = comment.query.get(id)

    if not comment:
        return jsonify({'message': 'Not found'}), 404

    comment.delete()
    return '', 204

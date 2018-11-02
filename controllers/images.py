from flask import Blueprint, request, jsonify, g
from models.Image import Image, ImageSchema
from lib.secure_route import secure_route

image_schema = ImageSchema()
images_schema = ImageSchema(many=True)


api = Blueprint('images', __name__)


@api.route('/images', methods=['GET'])
def index():
    images = Image.query.all()
    return images_schema.jsonify(images)


@api.route('/images/<int:id>', methods=['GET'])
def show(id):
    image = Image.query.get(id)

    if not image:
        return jsonify({'message': 'Not found'}), 404

    return image_schema.jsonify(image)


@api.route('/images', methods=['POST'])
@secure_route
def create():
    req_data = request.get_json()
    req_data['user_id'] = g.current_user.id
    req_data['status'] = True
    data, errors = image_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    image = Image(data)

    image.save()


    return image_schema.jsonify(image), 201


@api.route('/images/<int:id>', methods=['PUT', 'PATCH'])
@secure_route
def update(id):
    image = Image.query.get(id)

    if not image:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    data, errors = image_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    image.update(data)

    return image_schema.jsonify(image)


@api.route('/images/<int:id>', methods=['DELETE'])
@secure_route
def delete(id):
    image = Image.query.get(id)

    if not image:
        return jsonify({'message': 'Not found'}), 404

    image.delete()
    return '', 204

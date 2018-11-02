from flask import Blueprint, request, jsonify, g
from models.List import List, ListSchema
from lib.secure_route import secure_route

list_schema = ListSchema()
lists_schema = ListSchema(many=True)
api = Blueprint('list', __name__)

@api.route('/list/<int:id>', methods=['PUT', 'PATCH'])
@secure_route
def update(id):
    list = List.query.get(id)

    if not list:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    data, errors = list_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    list.update(data)

    return list_schema.jsonify(list)

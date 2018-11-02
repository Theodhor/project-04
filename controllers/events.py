from flask import Blueprint, request, jsonify, g
from models.Event import Event, EventSchema
from lib.secure_route import secure_route

event_schema = EventSchema()
events_schema = EventSchema(many=True)


api = Blueprint('events', __name__)


@api.route('/events', methods=['GET'])
def index():
    events = Event.query.all()
    return events_schema.jsonify(events)


@api.route('/events/<int:id>', methods=['GET'])
def show(id):
    event = Event.query.get(id)

    if not event:
        return jsonify({'message': 'Not found'}), 404

    return event_schema.jsonify(event)


@api.route('/events', methods=['POST'])
@secure_route
def create():
    req_data = request.get_json()
    req_data['creator_id'] = g.current_user.id
    data, errors = event_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    event = Event(data)
    event.add_attendees(g.current_user.get_friend_ids())

    event.save()


    return event_schema.jsonify(event), 201


@api.route('/events/<int:id>', methods=['PUT', 'PATCH'])
@secure_route
def update(id):
    event = Event.query.get(id)

    if not event:
        return jsonify({'message': 'Not found'}), 404

    req_data = request.get_json()
    data, errors = event_schema.load(req_data)

    if errors:
        return jsonify({'errors': errors}), 422

    event.update(data)

    return event_schema.jsonify(event)


@api.route('/events/<int:id>', methods=['DELETE'])
@secure_route
def delete(id):
    event = Event.query.get(id)

    if not event:
        return jsonify({'message': 'Not found'}), 404

    event.delete()
    return '', 204

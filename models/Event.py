from datetime import datetime
from app import db, ma
from marshmallow import fields
from models.List import List


class Event(db.Model):
    """
    Event model
    """

    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    what = db.Column(db.Text, nullable=False)
    where = db.Column(db.String(20), nullable=False)
    when = db.Column(db.String(20), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    creator = db.relationship('User')
    list = db.relationship('List')
    updated_at = db.Column(db.DateTime)

    def __init__(self, data):
        for key, item in data.items():
            setattr(self, key, item)

        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)

        self.updated_at = datetime.utcnow()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def add_attendees(self, friend_ids):
        for user_id in friend_ids:
            self.list.append(List({'invited_id': user_id}))


class EventSchema(ma.Schema):
    """
    Event schema
    """
    what = fields.String(required=True)
    where = fields.String(required=True)
    when = fields.String(required=True)
    creator = fields.Nested('UserSchema', only=('name', 'surname', 'id', 'profile_image'))
    list = fields.Nested('ListSchema', many=True)


    class Meta:
        model = Event
        fields = (
            'id',
            'what',
            'where',
            'when',
            'creator_id',
            'creator',
            'list',
            'updated_at'
        )
        dump_only = ('created_at', 'updated_at')
        load_only = ('creator_id', )

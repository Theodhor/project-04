from datetime import datetime
from app import db, ma
from marshmallow import fields


class Friend(db.Model):
    """
    Friend model
    """

    __tablename__ = 'friends'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sender = db.relationship('User', foreign_keys='Friend.sender_id')
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver = db.relationship('User', foreign_keys='Friend.receiver_id')
    status = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime)
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


class FriendSchema(ma.Schema):
    """
    Friend schema
    """

    sender = fields.Nested('UserSchema', only=('id', 'name', 'surname', 'email', 'profile_image'))
    receiver = fields.Nested('UserSchema', only=('id', 'name', 'surname', 'email', 'profile_image' ))

    class Meta:
        model = Friend
        fields = (
            'id',
            'sender_id',
            'sender',
            'receiver_id',
            'receiver',
            'status',
            'created_at',
            'updated_at'
        )
        dump_only = ('created_at', 'updated_at')
    

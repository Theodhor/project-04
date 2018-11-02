from datetime import datetime
from app import db, ma
from marshmallow import fields

class List(db.Model):
    """
    List model
    """

    __tablename__ = 'list'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    invited_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    invited = db.relationship('User', foreign_keys='List.invited_id')
    confirmed = db.Column(db.Boolean, nullable=False, default=False)
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

class ListSchema(ma.Schema):
    """
    List schema
    """

    invited = fields.Nested('UserSchema', only=('id', 'name','surname','email','profile_image'))

    class Meta:
        model = List
        fields = (
            'id',
            'event_id',
            'invited_id',
            'confirmed',
            'invited',
            'created_at',
            'updated_at'
        )
        dump_only = ('created_at', 'updated_at')
        load_only = ('invited_id')

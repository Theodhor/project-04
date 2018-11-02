from datetime import datetime
from app import db, ma
from marshmallow import fields


class Like(db.Model):
    """
    Like model
    """

    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
    liker_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
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


class LikeSchema(ma.Schema):
    """
    Like schema
    """

    class Meta:
        model = Like
        fields = (
            'id',
            'image_id',
            'liker_id',
            'created_at',
            'updated_at'
        )
        dump_only = ('created_at', 'updated_at')
        load_only = ('sender_id', 'receiver_id' )

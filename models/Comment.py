from datetime import datetime
from app import db, ma
from marshmallow import fields


class Comment(db.Model):
    """
    Comment model
    """

    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = user = db.relationship('User')
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


class CommentSchema(ma.Schema):
    """
    Comment schema
    """

    class Meta:
        model = Comment
        fields = (
            'id',
            'content',
            'image_id',
            'user_id',
            'user',
            'created_at',
            'updated_at'
        )
        dump_only = ('created_at', 'updated_at')
        load_only = ('sender_id', 'receiver_id' )

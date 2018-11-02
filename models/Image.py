from datetime import datetime
from app import db, ma
from marshmallow import fields
from models.List import List
from models.Like import Like


class Image(db.Model):
    """
    Image model
    """

    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(128), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', foreign_keys='Image.user_id')
    status = db.Column(db.Boolean, nullable=False)
    likes = db.relationship('Like')
    comments = db.relationship(
        'Comment',
        cascade='delete-orphan, delete'
    )
    updated_at = db.Column(db.DateTime)

    def __init__(self, data):
        for key, item in data.items():
            setattr(self, key, item)

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



class ImageSchema(ma.Schema):
    """
    Image schema
    """
    source = fields.String(required=True)
    user = fields.Nested('UserSchema', only=('id', 'name', 'surname', 'email'))
    likes = fields.Nested(
        'LikeSchema',
        many=True
    )
    comments = fields.Nested(
        'CommentSchema',
        many=True,
        exclude=('image_id', )
    )

    class Meta:
        model = Image
        fields = (
            'id',
            'source',
            'user_id',
            'status',
            'likes',
            'comments',
            'user',
            'updated_at'
        )
        dump_only = ('updated_at', )
        load_only = ('creator_id', )

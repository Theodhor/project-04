import datetime
from app import db, ma, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import fields, validates_schema, ValidationError, post_dump
from models.Image import Image


class User(db.Model):
    """
    User model
    """

    # table name
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    surname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    profile_image = db.Column(db.String(256), unique=True)
    _password = db.Column(db.String(128))
    friends = db.relationship(
        'Friend',
        primaryjoin='or_(User.id == Friend.sender_id, User.id == Friend.receiver_id)'
    )
    images = db.relationship('Image')
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self._password = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def __init__(self, data):
        for key, item in data.items():
            setattr(self, key, item)

        self.created_at = datetime.datetime.utcnow()
        self.updated_at = datetime.datetime.utcnow()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        self.updated_at = datetime.datetime.utcnow()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self._password, plaintext)

    def get_friend_ids(self):
        friend_ids = []
        for friend in self.friends:
            if friend.status:
                friend_id = friend.sender_id if friend.sender_id != self.id else friend.receiver_id
                friend_ids.append(friend_id)

        return friend_ids

class UserSchema(ma.Schema):
    """
    User schema
    """

    name = fields.String(required=True)
    surname = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)
    password_confirmation = fields.String(required=True)
    friends = fields.Nested(
        'FriendSchema',
        many=True
    )
    images = fields.Nested(
        'ImageSchema',
        many=True
    )

    @validates_schema
    def validate_password(self, data):
        if(data.get('password') != data.get('password_confirmation')):
            raise ValidationError(
                'Passwords do not match',
                'password_confirmation'
            )

    @post_dump
    def modify_friends(self, data):
        if 'friends' in data:
            user_id = data['id']
            accepted = []
            pending = []
            for friend in data['friends']:
                friend['sender']['friend_id'] = friend['id']
                friend['receiver']['friend_id'] = friend['id']

                if friend['status']:
                    accepted.append(friend)
                else:
                    pending.append(friend)

            receivers = [friend['receiver'] for friend in accepted if user_id == friend['sender']['id']]
            senders = [friend['sender'] for friend in accepted if user_id == friend['receiver']['id']]

            friends = receivers + senders

            pending_friends = [friend['sender'] for friend in pending if user_id == friend['receiver']['id']]
            not_friends = [friend['receiver'] for friend in pending if user_id == friend['sender']['id']]

            data['friends'] = friends
            data['not_confirmed_friends'] = pending_friends
            data['request_sent'] = not_friends
        return data

    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'surname',
            'profile_image',
            'email',
            'password',
            'password_confirmation',
            'friends',
            'images',
            'created_at',
            'updated_at'
        )
        load_only = ('password', )
        dump_only = ('created_at', 'updated_at')

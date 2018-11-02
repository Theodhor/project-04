import os

secret = os.getenv('SECRET', 'easyone')
db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/fakebook')

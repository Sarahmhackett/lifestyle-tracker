# schemas.py
from marshmallow import Schema, fields

class ValidationInputSchema(Schema):
    nhsNumber = fields.Str(required=True)
    surname = fields.Str(required=True)
    dateOfBirth = fields.Date(required=True, format="%Y-%m-%d")

class LifestyleInputSchema(Schema):
    nhsNumber = fields.Str(required=True)
    drink = fields.Boolean(required=True)
    smoke = fields.Boolean(required=True)
    exercise = fields.Boolean(required=True)

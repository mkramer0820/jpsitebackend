
from django.utils.encoding import force_text
from rest_framework.views import APIView
from rest_framework.metadata import SimpleMetadata
from rest_framework.relations import ManyRelatedField, RelatedField, PrimaryKeyRelatedField
from rest_framework.fields import ChoiceField, FloatField, DateTimeField, CharField, ImageField, DateField
import six
from rest_framework.fields import ChoiceField

class MyMetaData(SimpleMetadata):

    def get_field_info(self, field):
        field_info = super(MyMetaData, self).get_field_info(field)
        if isinstance(field, (RelatedField, PrimaryKeyRelatedField)):
            field_info['choices'] = [
                {
                    'key': choice_value,
                    'value': force_text(choice_name, strings_only=True)
                }
                for choice_value, choice_name in field.get_choices().items()
            ]
            field_info['type'] = 'option'
        if isinstance(field, ManyRelatedField):
            field_info['choices'] = [
                {
                    'key': choice_value,
                    'value': force_text(choice_name, strings_only=True)
                }
                for choice_value, choice_name in field.get_choices().items()
            ]
            field_info['type'] = 'many'
        if isinstance(field, FloatField):

            field_info['validators'] = 'number'
            field_info['formType'] = 'number'

        if isinstance(field, CharField):
            field_info['formType'] = 'text'

        if isinstance(field, CharField) and field.field_name == 'zipcode':

            field_info['customType'] = 'zip'

        if isinstance(field, CharField) and field.field_name == 'phone':

            field_info['formType'] = 'tel'
            field_info['telOption'] = ['us', 'international']

        if isinstance(field, ImageField):

            field_info['formType'] = 'img'

        if isinstance(field, (DateField, DateTimeField)):

            field_info['formType'] = 'datePicker'




        return field_info



class ChoiceDisplayField(ChoiceField):
    def __init__(self, *args, **kwargs):
        super(ChoiceDisplayField, self).__init__(*args, **kwargs)
        self.choice_strings_to_display = {
            six.text_type(key): value for key, value in self.choices.items()
        }

    def to_representation(self, value):
        if value is None:
            return value
        return {
            'key': self.choice_strings_to_values.get(six.text_type(value), value),
            'value': self.choice_strings_to_display.get(six.text_type(value), value),
        }

class MyView(APIView):
    metadata_class = MyMetaData
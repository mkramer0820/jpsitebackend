
from django.utils.encoding import force_text
from rest_framework.views import APIView
from rest_framework.metadata import SimpleMetadata
from rest_framework.relations import ManyRelatedField, RelatedField, PrimaryKeyRelatedField


class MyMetaData(SimpleMetadata):

    def get_field_info(self, field):
        field_info = super(MyMetaData, self).get_field_info(field)
        if isinstance(field, (RelatedField, ManyRelatedField, PrimaryKeyRelatedField)):
            field_info['choices'] = [
                {
                    'key': choice_value,
                    'value': force_text(choice_name, strings_only=True)
                }
                for choice_value, choice_name in field.get_choices().items()
            ]
            field_info['type'] = 'option'
        return field_info


class MyView(APIView):
    metadata_class = MyMetaData
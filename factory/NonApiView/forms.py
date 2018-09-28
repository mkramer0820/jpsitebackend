from django.forms import ModelForm
from factory.models import Factory, FactoryContact


class FactoryCreateForm(ModelForm):

    class Meta:
        model = Factory
        fields = '__all__'


class UpdateFactoryForm(ModelForm):

    class Meta:

        model = Factory
        fields = '__all__'


class FactoryContactCreateForm(ModelForm):

    class Meta:
        model = FactoryContact
        fields = '__all__'


class UpdateFactoryContactForm(ModelForm):

    class Meta:

        model = FactoryContact
        fields = '__all__'


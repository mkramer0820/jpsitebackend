# Create your views here.


from django.views.generic import DetailView, ListView
from .models import Factory, FactoryContact

# form imports
from factory.NonApiView.forms import FactoryCreateForm, UpdateFactoryForm, FactoryContactCreateForm, UpdateFactoryContactForm
from django.views.generic import CreateView, UpdateView
from django.http import HttpResponseRedirect
from django.urls import reverse


class FactoryList(ListView):
    model = Factory
    template_name = 'factory:factory_list'
    context_object_name = 'factories'

    def get_queryset(self):
        """Return the last five published questions."""
        return Factory.objects.order_by('name')


class FactoryDetail(DetailView):
    model = Factory
    template_name = 'factory/factory_detail.html'
    context_object_name = 'factory'


class FactoryCreateView(CreateView):
    form_class = FactoryCreateForm
    template_name = 'factory/factory_add.html'
    context_object_name = 'factory_fields'
    model = Factory

    def form_valid(self, form):
        Factory = form.save(commit=False)
        Factory.save()

        return HttpResponseRedirect(reverse('factory:Factory_list'))


class FactoryUpdateView(UpdateView):
    form_class = UpdateFactoryForm
    model = Factory
    context_object_name = 'factory_info'
    template_name_suffix = '_update_form'


"""
###
Factory Contacts

###
"""


class FactoryContactDetailView(DetailView):
    model = FactoryContact
    template_name = 'factory/factory_contact_detail.html'
    context_object_name = 'contact'


class FactoryContactList(ListView):
    model = FactoryContact
    template_name = 'factory/factory_contact_list.html'
    context_object_name = 'factory_contact'

    def get_queryset(self):
        """Return the last five published questions."""
        return FactoryContact.objects.order_by('first_name')

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get the context
        context = super(FactoryContactList, self).get_context_data(**kwargs)
        # Create any data and add it to the context
        context['some_data'] = 'This is just some data'
        return context


class FactoryContactCreateView(CreateView):
    form_class = FactoryContactCreateForm
    template_name = 'factory/factory_contact_add.html'
    context_object_name = 'factory_contact_fields'
    model = FactoryContact

    def form_valid(self, form):
        FactoryContact = form.save(commit=False)
        FactoryContact.save()

        return HttpResponseRedirect(reverse('factory:factory_contact_list'))


class FactoryContactUpdateView(UpdateView):
    form_class = UpdateFactoryContactForm
    model = FactoryContact
    context_object_name = 'factory_contact_info'
    template_name = 'factory/factory_update_form.html'
    success_url = '/factory/'


"""
guery meta = from orders.models import Order as O

O._meta.get_fields()

class FactoryDetail(DetailView):

    model = FactoryProfile


    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context['Factory_detail'] = FactoryProfile.objects.all()
        return context


from django.views import generic

class BookListView(generic.ListView):
    model = Book  


class BookListView(generic.ListView):
    model = Book
    context_object_name = 'my_book_list'   # your own name for the list as a template variable
    queryset = Book.objects.filter(title__icontains='war')[:5] # Get 5 books containing the title war
    template_name = 'books/my_arbitrary_template_name_list.html'  # Specify your own template name/location

"""

from django.conf.urls import url, include
from factory.views import FactoryList, FactoryDetail, FactoryCreateView
from factory.views import  FactoryUpdateView, FactoryContactList, FactoryContactCreateView\
    , FactoryContactDetailView, FactoryContactUpdateView
from django.contrib.auth.decorators import login_required

app_name = 'factory'

urlpatterns = [


    url(r'^$', FactoryList.as_view(), name='factory_list'),
    url(r'list/id/(?P<pk>\w+)/$', login_required(FactoryDetail.as_view()), name='factory_detail'),

    #form views
    url(r'^add/$', FactoryCreateView.as_view(), name='add_factory'),
    url(r'^list/id/(?P<pk>\d+)/update/$', FactoryUpdateView.as_view(), name='update_factory'),
    #url(r'list/factory/id/(?P<pk>\w+)/$', login_required(FactoryDetail.as_view()), name='factory_detail'),


    url(r'^contact/list/$', login_required(FactoryContactList.as_view()), name='factory_contact_list'),
    url(r'contact/factory/id/(?P<pk>\w+)/$', login_required(FactoryContactDetailView.as_view()), name='factory_contact_detail'),
    url(r'^contact/factory/id/(?P<pk>\d+)/update/$', FactoryContactUpdateView.as_view(), name='update_factory_contact'),
    url(r'^contact/add/$', FactoryContactCreateView.as_view(), name='add_factory_contact'),


]





"""
useful regex urls
pk (?P<pk>\d+)
slug : (?P<slug>[-\w]+)
slug + pk (?P<slug>[-\w]+)-(?P<pk>\d+)
(?P<username>[\w.@+-]+)

dates = (?P<year>[0-9]{4})
year mont  = (?P<year>[0-9]{4})/(?P<month>[0-9]{2})
ymd (?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2})

"""

from home.views import Login, Logout, index
from django.conf.urls import url
from django.urls import path

app_name = 'home'


urlpatterns = [


    url(r'^$', index, name='index'),

]

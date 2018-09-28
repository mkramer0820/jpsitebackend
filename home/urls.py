from home.views import Login, Logout, index
from django.conf.urls import url
from django.urls import path

app_name = 'home'


urlpatterns = [

    url(r'^login/$', Login.as_view(), name='login'),
    url(r'^logout/$', Logout.as_view(), name='logout'),
    url(r'^$', index, name='index'),

]

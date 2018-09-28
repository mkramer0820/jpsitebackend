from django.conf.urls import url, include
from .views import OrderList, OrderDetails, OrderReadView, OrderCreateView, OrderUpdateView

app_name = 'order'

urlpatterns = [

    url(r'^list/$', OrderList.as_view(), name='orderlist'),
    #url(r'(?P<pk>\w+)/$', OrderDetails.as_view(), name='order_details'),
    url(r'^api/$', OrderReadView.as_view(), name='order_rest_api'),
    #url(r'(?P<slug>[-\w]+)/$', OrderDetails.as_view(), name='order_details'),
    url(r'^list/id/(?P<pk>\d+)/$', OrderDetails.as_view(), name='order_details'),

    #form views
    url(r'^add/$', OrderCreateView.as_view(), name='add_order'),
    url(r'^list/id/(?P<pk>\d+)/update/$', OrderUpdateView.as_view(), name='update_order')



]


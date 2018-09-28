from django.shortcuts import render
from django.contrib.auth.views import LoginView, LogoutView


class Login(LoginView):

    template_name = 'login.html'
    success_url = 'index.html'

class Logout(LogoutView):

    success_url = 'index.html'


def index(request):
    return render(request, 'index.html')


# Create your views here.

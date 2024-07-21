from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class NewUserForm(UserCreationForm):
    class Meta:
        email = forms.EmailField(max_length=100, required=True,help_text="Informs a valid email address")
        model=User
        fields=['username','email','password1','password2']
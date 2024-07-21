from django.db import models
from django.contrib.auth.models import  User

# Create your models here.
class pizza(models.Model):
    name = models.CharField(max_length=120)
    priceM = models.IntegerField()
    priceL= models.IntegerField()
    pImage= models.URLField()
    
    
class Burger(models.Model):
    name = models.CharField(max_length=120)
    priceM = models.IntegerField()
    priceL= models.IntegerField()
    bImage= models.URLField()
    
class Order(models.Model):
    customer=models.ForeignKey(User, on_delete=models.CASCADE)
    number=models.CharField(max_length=60)
    bill=models.IntegerField()
    date= models.DateTimeField(auto_now_add=True, blank=True)
    note=models.TextField(blank=True, null=True)
    
class Item(models.Model):
    order=models.ForeignKey(Order, on_delete=models.CASCADE)
    name=models.CharField(max_length=120)
    price = models.IntegerField()
    size=models.CharField(max_length=60)
    
    
    
    


from django.test import TestCase
from django.urls import reverse
from .models import pizza
# Create your tests here.
class homepageTestCase(TestCase):
    def test_home_page(self):
        response=self.client.get(reverse('index'))
        self.assertEqual(response.status_code,200)
        
class PizzaTestCase(TestCase):
    def test_newPizza_added(self):
        numPizza= pizza.objects.count()
        pizza.objects.create(name='pizza5',priceM=6,priceL=8,pImage="url")
        self.assertEqual(pizza.objects.count(),numPizza+1)
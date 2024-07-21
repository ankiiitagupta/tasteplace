from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import pizza as p, Burger as b, Order , Item
from .forms import NewUserForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
import random
import json
import logging

logger = logging.getLogger(__name__)

def randomOrderNumber(length):
    sample='ABCDEFGH0123456789'
    number0=''.join((random.choice(sample) for i in range(length)))
    return number0

# Create your views here.
def index(request):
    request.session.set_expiry(0)
    ctx= {'active_link':'index'}
    return render(request,'food/index.html',ctx)

def pizza(request):
    request.session.set_expiry(0)
    pizzas= p.objects.all()
    ctx= {'pizzas':pizzas,'active_link':'pizza'}
    return render(request, 'food/pizza.html',ctx)

def Burger(request):
    request.session.set_expiry(0)
    burgers= b.objects.all()
    ctx= {'burgers':burgers, 'active_link':'Burger'}
    return render(request, 'food/burger.html',ctx)


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

@csrf_exempt
def order(request):
    request.session.set_expiry(0)
    bill = 0.0   
    logger.debug("Order view called")
    
    if is_ajax(request=request):
        logger.debug("AJAX request detected")
        request.session['note'] = request.POST.get('note')
        request.session['order'] = request.POST.get('orders')
        request.session['bill'] = request.POST.get('bill')
        
        logger.debug(f"Order session data set: {request.session['order']}")
        logger.debug(f"Bill session data set: {request.session['bill']}")

        orders = json.loads(request.session['order'])
        randomNum = randomOrderNumber(6)

        while Order.objects.filter(number=randomNum).count() > 0:
            randomNum = randomOrderNumber(6)

        if request.user.is_authenticated:
            # bill = bill if request.session['bill'] else 0.0
            bill_str = request.session.get('bill', '0.0')  # default to '0.0' if 'bill' is not present
            if bill_str is not None:
                bill = float(bill_str)
            order = Order(customer=request.user, number=randomNum, bill=bill, note=request.session['note'])
            order.save()
            request.session['orderNum'] = order.number
            request.session['bill'] = bill
            for article in orders:
                item = Item(order=order, name=article['name'], price=article['price'], size=article['size'])
                item.save()

    ctx = {'active_link': 'order'}
    return render(request, 'food/order.html', ctx)

def success(request):
    orderNum=  request.session.get('orderNum','')
    bill= request.session.get('bill',0.0)
    items=Item.objects.filter(order__number=orderNum)
    # order = request.session.get('order')
    print("Bill value:", bill)
    ctx={'orderNum':orderNum,'bill':bill, 'items':items}
    return render(request, 'food/success.html', ctx)

def signup(request):
    ctx={}
    if request.POST:
        form= NewUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
        else:
            ctx['form']=form
    else:
        form= NewUserForm()
        ctx['form']=form
    return render(request, 'food/signup.html', ctx)

def logIn(request):
    if request.POST:
        username=request.POST.get('username')
        pwd=request.POST.get('password')
        user= authenticate(username=username, password=pwd)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.info(request,'username and/or password are incorrect')
            
    ctx={'active_link':'login'}
    return render(request, 'food/login.html', ctx)

def logOut(request):
    logout(request)
    return redirect('index')
    
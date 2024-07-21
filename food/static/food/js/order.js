var pcart= document.querySelector("#pcart");
var ptotal= document.querySelector("#ptotal");

//add pizza
function addPizza(pid){
    pizzaId= '#pizza' + pid;
    var name= document.querySelector(pizzaId).innerHTML;
    var radio= 'pizza' + pid;
    var pri= document.getElementsByName(radio);
    var size, price;
    if(pri[0].checked){
        price=pri[0].value;
        size='M';
    }else{
        price=pri[1].value; 
        size='L';
    }
    var orders= JSON.parse( localStorage.getItem('orders'));
    var total= localStorage.getItem('total');
    var cartsize= orders.length;
    orders[cartsize]=[name, size ,price];
    localStorage.setItem('orders', JSON.stringify(orders));
    
    total=Number(total)+Number(price);
    localStorage.setItem('total',total);

    var cart= document.querySelector('#cart');
    cart.innerHTML= orders.length;


    butt= '<button class="del" onclick="removePizza('+ cartsize +')">x<button>';
    ptotal.innerHTML= 'Total: Rs.  '+ total;
    pcart.innerHTML += '<li>'+ name +' '+ size + ':Rs. '+ price +butt + '</li>';
}

function pshoppingCart(){
    var orders= JSON.parse( localStorage.getItem('orders'));
    var total= localStorage.getItem('total');
    var cartsize= orders.length;
    pcart.innerHTML='';
    for(let i=0;i<cartsize;i++){
        butt= '<button class="del" onclick="removePizza('+i+')">x</button>';
        pcart.innerHTML+='<li>'+ orders[i][0]+ ' '+ orders[i][1] + ": Rs. " + orders[i][2] +butt+ '</li>';
    }
    ptotal.innerHTML= 'Total: Rs.  '+ total;
}

pshoppingCart();

function removePizza(n){
    var orders= JSON.parse( localStorage.getItem('orders'));
    var total= localStorage.getItem('total');
    
    total=Number(total)-Number(orders[n][1]);
    orders.splice(n,1);

    var cart= document.querySelector('#cart');
    cart.innerHTML= orders.length;

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('total',total);
    pshoppingCart();
}


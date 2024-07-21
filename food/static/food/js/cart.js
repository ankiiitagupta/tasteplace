var nam = document.querySelector("#name");
var size = document.querySelector("#size");
var price = document.querySelector("#price");
var bill = document.querySelector("#total");
var rm = document.querySelector("#rm");

function shoppingCart() {
    var orders = JSON.parse(localStorage.getItem('orders')) || [];
    var total = localStorage.getItem('total');
    var cartsize = orders.length;
    nam.innerHTML = '<h3>Name</h3>';
    size.innerHTML = '<h3>Size</h3>';
    price.innerHTML = '<h3>Price</h3>';
    rm.innerHTML = '<h3><br></h3>';
    for (let i = 0; i < cartsize; i++) {
        rm.innerHTML += '<h4><button class="btn-danger" onclick="removeItem(' + i + ')">x</button></h4>';
        nam.innerHTML += '<h4>' + orders[i][0] + '</h4>';
        size.innerHTML += '<h4>' + orders[i][1] + '</h4>';
        price.innerHTML += '<h4>' + orders[i][2] + '</h4>';
    }
    bill.innerHTML = 'Total: Rs.  ' + total;
}

shoppingCart();

function removeItem(n) {
    var orders = JSON.parse(localStorage.getItem('orders')) || [];
    var total = localStorage.getItem('total');

    total = Number(total) - Number(orders[n][2]);
    orders.splice(n, 1);

    var cart = document.querySelector('#cart');
    cart.innerHTML = orders.length;

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('total', total);
    // shoppingCart();/
    
    var cartsize = orders.length;
    nam.innerHTML = '<h3>Name</h3>';
    price.innerHTML = '<h3>Price</h3>';
    rm.innerHTML = '<h3><br></h3>';
    
    for (let i = 0; i < cartsize; i++) {
        rm.innerHTML += '<h4><button class="btn-danger" onclick="removeItem(' + i + ')">x</button></h4>';
        nam.innerHTML += '<h4>' + orders[i][0] + '</h4>';
        size.innerHTML += '<h4>' + '' + '</h4>';
        price.innerHTML += '<h4>' + orders[i][2] + '</h4>';
    }
    // total= total- price.innerHTML;
    bill.innerHTML = 'Total: Rs.  ' + total;
}

var note = document.querySelector('#message')

// function submitorders() {
//     var msg = note.value;
//     var orders = JSON.parse(localStorage.getItem('orders'));
//     var total = JSON.parse(localStorage.getItem('total'));
//     var ur = '/food/order';
//     var orderData = {};
//     orderData['orders'] = JSON.stringify(orders);
//     orderData['note'] = msg;
//     orderData['total'] = total;
//     $.ajax({
//         url: ur,
//         type: "POST",
//         data: orderData,
//         success: function (data) {
//             window.location.replace('/food/success')
//             localStorage.setItem('order', JSON.stringify([]));
//             localStorage.setItem('total', 0);
//             // return render(request,'food/success.html')
//         },
//         error: function (textStatus, errorThrown) {
//             console.error('AJAX Error:', textStatus, errorThrown);
//         }
//     })
// }

function submitorders() {
    try {
        var msg = note.value;
        var orders = JSON.parse(localStorage.getItem('orders'));
        var total = JSON.parse(localStorage.getItem('total'));
        var ur = '/food/order';
        var orderData = {};
        orderData['orders'] = JSON.stringify(orders);
        orderData['note'] = msg;
        orderData['total'] = total;
        $.ajax({
            url: ur,
            type: "POST",
            data: orderData,
            success: function (data) {
                window.location.replace('/food/success')
                localStorage.setItem('order', JSON.stringify([]));
                localStorage.setItem('total', 0);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('AJAX Error:', xhr);
                console.error('Status:', textStatus);
                console.error('Error Thrown:', errorThrown);
                console.error('Response Text:', xhr.responseText);
            }
        });
        // $.ajax({
        //     type: "POST",
        //     url: ur,
        //     data: {
        //         'note': $('#note').val(),
        //         'orders': JSON.stringify(orderData), // Ensure orderData is correct
        //         'bill': $('#bill').val(),
        //         'csrfmiddlewaretoken': '{{ csrf_token }}'
        //     },
        //     success: function(response) {
        //         window.location.href = '/success/';
        //     },
        //     error: function(response) {
        //         console.error("Order submission failed:", response);
        //     }
        // });
        
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
}

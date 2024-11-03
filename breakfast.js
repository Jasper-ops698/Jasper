const product = [
    {
        id: 0,
        image: 'pics/chapati.jpeg',
        title: 'Chapati Plain',
        price: 15,
    },
    {
        id: 1,
        image: 'pics/chipoo.jpeg',
        title: 'Chips Plain',
        price: 80,
    },
    {
        id: 2,
        image: 'pics/hotdogs.jpeg',
        title: 'Hotdogs',
        price: 60,
    },
    {
        id: 3,
        image: 'pics/chapatistew.jpeg',
        title: 'Chapati-Stew',
        price: 80,
    }
];

const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item) =>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
            <div class='bottom'>
            <p>${title}</p>
            <h2>Ksh ${price}.00</h2>`+
            "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
            `</div>
            </div>`
    )
}).join('')

var cart = [];

function addtocart(a){
    cart.push({...categories[a]});
    displayCart();
}

function delElement(a){
    cart.splice(a, 1);
    displayCart();
}
function displayCart(a){
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length==0){
        document.getElementById('cartItem').innerHTML = 'Your cart is empty';
        document.getElementById("total").innerHTML = "Ksh "+0+".00";
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items) =>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "Ksh "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:13px;'>${title}</p>
                <h2 style='font-size:15px;'>Ksh ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('')
    }
}

 // Handle payment button click
 document.getElementById('pay-button').addEventListener('click', function() {
    const grandTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const mpesaNumber = prompt("Enter your M-Pesa number:");
    if (mpesaNumber) {
        alert(`Processing payment of KSh ${grandTotal} from M-Pesa number ${mpesaNumber}`);
        // Here you could implement actual payment logic via M-Pesa API
    } else {
        alert("Payment cancelled.");
    }
});
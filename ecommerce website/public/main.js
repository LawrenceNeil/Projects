// Working Cart
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}
// Making function
function ready(){
    getItems();
    //remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++)
    {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++)
    {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    // Add to cart
    var addCart = document.getElementsByClassName('add-cart')
    console.log(addCart)
    for (var j = 0; j < addCart.length; j++)
    {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    // Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

// cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

// Open Cart
cartIcon.onclick = () =>{
    cart.classList.add("active")
}
// Close Cart
closeCart.onclick = () =>{
    cart.classList.remove("active")
}


//items listing
async function getItems(){
    let url = 'http://localhost:3000/products';
    try {
        var jsondata = fetch(url).then(
            function(u){ return u.json();}
          ).then(
            function(json){
                console.log(json.products);
                populateProducts(json.products);
            }
          )
    } catch (error) {
        console.log(error)
    }
    
}

async function populateProducts(products) {
    let items = products;
    let html = "";
    items.forEach(item => {
        let htmlSegment =  
        `
        <div class="product-box">
            <img src="${item.productImg}" alt="" class="product-img">
            <h2 class="product-title">${item.name}</h2>
            <span class="price">₱${item.price/100}</span>
            <i class="fa fa-cart-plus add-cart"></i>
        </div>
        `;
        console.log(htmlSegment);
        html += htmlSegment; 
    });
    let container = document.querySelector('.shop-content');
    container.innerHTML = html;
}

//buy button clicked
function buyButtonClicked(){
    alert('Your order has been placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
}
//removeCartButtons
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//Quantity Changes
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updatetotal();
}
// add cart clicked
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerHTML;
    var price = shopProducts.getElementsByClassName('price')[0].innerHTML;
    var productImage = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImage);
    updatetotal();
}
// add to cart function
function addProductToCart(title, price, productImage){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for (var i = 0; i < cartItemsNames.length; i++)
    {
        if(cartItemsNames[i].innerText == title){
            alert("You have already add this item to cart");
            return;
        }
    }
    var cartBoxContent = `<img src="${productImage}" alt="" class="cart-img"> 
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                         </div>
                        <!--    Remove Cart Item    -->
                        <i class="fa fa-trash-o cart-remove"></i> `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
}

//update Total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++)
    {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerHTML.replace("₱", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) /100;
    document.getElementsByClassName('total-price')[0].innerHTML = "₱"+total;
    
}

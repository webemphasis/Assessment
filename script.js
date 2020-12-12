
var url  = "./cart.json";
var thumbnail = '';
var products_list = '';
var totalPrice = [];
var totalDiscount = [];
var totoalItems = [];
var total_amount = document.getElementById("total_amout");
var total_value = document.getElementById("total_value");
var total_discount = document.getElementById("total_discount");
var items1 = document.getElementById('amoutItems'); 
var items2 = document.getElementById('itemsAdded');
// add to cart

 function addCart(e){
     var model = e;
     let qty = 1;
     totalPrice.push(model.price['actual']);
     totalDiscount.push(model.price['display']);
     totoalItems.push(model);
     products_list +=  `
                    <div class="productTocart">
                    <div id="product_title">
                        ${ model.name.slice(0, 4)  + "..." }
                    </div>
                    <div> 
                        <span>-</span>
                        <input type="text" id="qty" disabled value="${qty}">
                        +
                    </div>
                    <div class="product_price">
                     $${model.price['actual'] * qty}
                    </div>
                </div>
    `;

    document.getElementById("products_list").innerHTML = products_list;
    orderTotal();

}


// total amount of product costs
function orderTotal(){
    
   
    let finalAmount =  totalPrice.reduce((a,b)=>{
        return a + b;
    });

    let finalDiscount =  totalDiscount.reduce((a,b)=>{
        return a + b;
    });
    discount = finalDiscount - finalAmount
    items1.innerText = totoalItems.length;
    items2.innerText = totoalItems.length;
    total_discount.innerText = "-$" + discount;
    total_value.innerText = "$" + finalAmount;
    total_amount.innerText = "$" + finalAmount;

}

var xhr  = new XMLHttpRequest()
xhr.open('GET', url, true)
xhr.onload = function () {
	var users = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
        users['items'].forEach((product, i) => {
            thumbnail  += `
            <div class="product">
                <img src="${product.Image}"  width="150" alt="imag${i}">
                <div class="main_title">
                    <h3>${product.name}</h3>
                    <div class="main_price">
                        <p class="actual_price">
                            <span style='color:red;text-decoration:line-through'>
                                <span style='color:#696969'>$${product.price['display']}</span>
                            </span>
                        </p>
                        <p class="product_price">$${product.price['actual']}</p>
                        <button onclick='addCart(${JSON.stringify(product)})'>Add to Cart</button>

                    </div>
                </div>
                </div> 
            `; 
            
            document.getElementById("product_thumbnail").innerHTML = thumbnail;
        });
	} else {
        console.log(users);
	}
}
xhr.send(null);
const searchText = document.getElementById('searchtext');
const searchBtn = document.getElementById('searchBtn');
const productContainer = document.getElementById('product-container');

// select all id------------------
const totalProductElement = document.getElementById('totalProduct')
const priceElement = document.getElementById('price');
const deliveryCostElement = document.getElementById('deliveryCharge');
const taxElement = document.getElementById('tax');
const totalPriceElement = document.getElementById('totalPrice');

const detilsContainer = document.getElementById("details-container");


// load data
function loadData() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
    .then(data=>showData(data))
}
loadData();

// search product------------->>>>>>>>>>>
searchBtn.addEventListener('click', () => {
    
    const searchValue = (searchText.value).toLowerCase();
    searchText.value = '';
    const api = `https://fakestoreapi.com/products/category/${searchValue}`
    fetch(api)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                showData(data)
            } else {
                alert('oops!! please enter valid category name')
        }
    })
}) 


function showData(data) {
    productContainer.innerHTML = '';
    data.forEach(product => {
        let count = 0;
        let stars = '';
        let stop = 0;
        const rating = product.rating.rate;
        for (let i = 0; i < 5; i++){
            if (Math.floor(rating) > count) {
                stars += '<i class="fas fa-star"> </i> '
                count++
            
            } else if (rating + ''.includes('.')&& stop==0) {
                stars += '<i class="fas fa-star-half-alt"> </i> ';
                stop++;
            } else {
                stars += '<i class="far fa-star"> </i> '
            }
        }

        // console.log(stars)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
        <div style='min-height:500px'  class="card h-100">
            <div  class="product-image">
              <img style='max-height:200px ' src=${product.image} class="card-img-top margin-top:20px" alt="...">
            </div>
            <div class="card-body text-black text-center">
            <h5 class="card-title text-info">${product.title.slice(0,20)}</h5>
            <h4>Price: $ <span>${product.price}</span></h4>
            <p class="card-text text-capitalize"> <b>Category: <span>${product.category}</span> </b> </p>
            <p class="card-ratings"> 
              <b>Ratings: <i class="fas fa-star"> </i> 
              <span>${stars}</span>
              
              </b> 
           </p>
            <p class="card-text"> <b>Total Review: <i class="text-black fas fa-user-tie"></i> <span>${product.rating.count}</span></b> </p>

          </div>
          <div class="card-footer d-flex justify-content-around">
            <button onclick='addToCart(${product.price})' class="btn btn-primary">Add to cart</button>
            <button onclick="details(${product.id})" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
          </div>
        </div>
      </div>
        `
        productContainer.appendChild(div)

    })
}
function addToCart(price) {
    console.log(price)
     //updated price---------
    const previousprice = getValue('price');
    priceElement.innerText = (previousprice + price).toFixed(2);

    //updated quantity---------
    const previousQuantity = getValue('totalProduct');
    totalProductElement.innerText = previousQuantity + 1;

     //updated delivery charge---------
    taxAndDeliveryUpdate();
    totalpriceUpdate();
}

function taxAndDeliveryUpdate(){
    const currentPrice = getValue('price');

    if (currentPrice >=200 && currentPrice < 400) {
        deliveryCostElement.innerText = 30;
        const tax = (currentPrice / 100) * 20;
        taxElement.innerText = tax.toFixed(2);
        
    }
    else if (currentPrice >= 400 && currentPrice < 500) {
        deliveryCostElement.innerText = 50;
        const tax = (currentPrice / 100) * 30;
        taxElement.innerText = tax.toFixed(2);
        
    }
    else if(currentPrice >= 500){
        deliveryCostElement.innerText = 60;
        const tax = (currentPrice / 100) * 40;
        taxElement.innerText = tax.toFixed(2);
        
    }
}

function getValue(id) {
    let value = document.getElementById(id).innerText;
    return Number(value)
}

function totalpriceUpdate() {
    const total = getValue('price') + getValue('deliveryCharge') + getValue('tax');
    totalPriceElement.innerText=total.toFixed(2)
}

function purchage() {
    totalProductElement.innerText = 0;
    priceElement.innerText = 0;
    deliveryCostElement.innerText = 0;
    taxElement.innerText = 0;
    totalPriceElement.innerText = 0;
}

// details for single product

function details(id) {
    const api = `https://fakestoreapi.com/products/${id}`
    const div = document.createElement('div');
    fetch(api)
    .then(res => res.json())
        .then(product => {
            let count = 0;
            let stars = '';
            let stop = 0;
            const rating = product.rating.rate;
            for (let i = 0; i < 5; i++){
                if (Math.floor(rating) > count) {
                    stars += '<i class="fas fa-star"> </i> '
                    count++
                
                } else if (rating + ''.includes('.')&& stop==0) {
                    stars += '<i class="fas fa-star-half-alt"> </i> ';
                    stop++;
                } else {
                    stars += '<i class="far fa-star"> </i> '
                }
            }
            div.innerHTML = `
            <div class="col">
                <div style='min-height:auto'  class="card h-100">
                   <div  class="product-image">
                  <img style='max-height:200px ' src=${product.image} class="card-img-top margin-top:20px" alt="...">
                   </div>
                  <div class="card-body text-black text-center">
                <h5 class="card-title text-info">${product.title.slice(0,20)}</h5>
                <h4>Price: $ <span>${product.price}</span></h4>
                <p class="card-text text-capitalize"> <b>Category: <span>${product.category}</span> </b> </p>
                <p class="card-ratings"> 
                  <b>Ratings: <i class="fas fa-star"> </i> 
                  <span>${stars}</span>
                  
                  </b> 
               </p>
                <p class="card-text"> <b>Total Review: <i class="text-black fas fa-user-tie"></i> <span>${product.rating.count}</span></b> </p>
    
              </div>
              <div class="card-footer d-flex justify-content-around">
                <button onclick='addToCart(${product.price})' class="btn btn-primary">Add to cart</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
              </div>
              </div>
            </div>
            `
        })
    detilsContainer.innerHTML = '';
   detilsContainer.appendChild(div);
}
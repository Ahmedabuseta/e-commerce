let favContainer = document.querySelector(".fav");
let cartContainer = document.querySelector(".cart"); 

let productsLocalStorage =JSON.parse(localStorage.getItem("products") ) ;
let productsLocalStorageFav =JSON.parse(localStorage.getItem("fav") ) ;

function drawData(arr,place){
    place.innerHTML ="";
    arr.map(function (ele){
    place.innerHTML +=`<div class=" bg-dark product p-0 pb-3 rounded   col-xs-12 d-flex flex-column border border-info justify-content-between" style="width:250px;cursor:pointer;" price=${ele.price} id=${ele.id}>
    <div>
    <div  class="img-div rounded position-relative" >
    <div  class="position-absolute top-0 end-0 bg-danger p-2 rounded">
        <i class="fa fa-money-bill-1 "> </i>
        <span id="widge" class="ms-3 d-none " >${ele.discountPercentage}%OFF</span>
    </div>
    <div  class="position-absolute bottom-0 start-50 text-center bg-primary p-2 rounded add-to-fav"  id="${ele.id}" style="transform:translate(-50%,50%); opacity:0;transition:.4s;">
        <i class="fa-solid fa-heart fav-btn fav-icon  d-block mx-auto" style="cursor:pointer" id="${ele.id}"></i>
        <p sytle="font-size:12px;cursor:pointer" class="m-0 fav-btn" style="cursor:pointer" id="${ele.id}">  add to fav</p>
    </div>
    <img src=${ele.thumbnail}  style="width: 100%;" class="rounded" height='200' alt="product" class="product-img">
    </div><!-- /img-div -->
    <div class="product-info d-flex flex-column mt-3 p-2">
    <p class="p-1 ps-3 d-flex gap-3  m-0">
        <span class="text-decoration-line-through text-mute d-block">${(ele.price *(100-ele.discountPercentage)).toFixed(0)}</span>
        <span class="d-block text-primary price d-flex" price = ${ele.price}>${ele.price} L.E</span> 
    </p>
    <p class="ms-3 ">
        <span class="text-warning  ">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star-half-stroke"></i>(${ele.rating})
        </span>
        <p class="mt-0 mb-0 product-title">${ele.title}</p>
        <p class="mt-0 mb-0">( ${ele.brand} )</p>
    </p>
    </div><!-- /product-info -->
    </div>
    </div>`;

})}
drawData(productsLocalStorage,cartContainer)
drawData(productsLocalStorageFav,favContainer)

let cartCounter = document.querySelector("#product-counter")
let favCounter = document.querySelector("#product-counter-fav")

function getCounter(arr,place){
    let counter = arr.length
    place.innerHTML = counter;
}
getCounter(productsLocalStorage,cartCounter)
getCounter(productsLocalStorageFav,favCounter)

let goToCartBtn = document.querySelectorAll(".go-to-cart")
let goToproductsBtn = document.querySelector(".go-to-products")
goToproductsBtn.addEventListener("click",()=>{
    location = "index.htm"
})
goToCartBtn.forEach(btn=>{
    btn.addEventListener("click",()=>{
        location = "cart.htm"
    })
})
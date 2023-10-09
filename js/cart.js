let cart     = document.getElementById('cart');
let toastContainer = document.getElementById("toastContainer");
let removeProductFromCart = document.querySelector('.remove-product-from-cart')
let showTotalPrice  = document.getElementById('total');
let itemNum = document.getElementById('item-num')
const controlsContainer = document.getElementById("controls");
let totalPrice = 1.49 ;

// logout
// let logoutBtn = document.querySelector('#logout-link');
// logoutBtn.addEventListener("click",function(){
//   localStorage.clear();
//   location="loginRIgesiter.htm";
// })
  // logoutBtn.remove();

// whenlogin
// let loginBtn = document.querySelector('#login-register-link');
// let userInfo = document.querySelector('.userInfo');
// let userData =document.querySelector('#userData');
// if(localStorage.getItem('userName')){
//   loginBtn.remove();
//   userInfo.style.setProperty("display", "block", 'important');
//   userData.innerHTML = localStorage.getItem("userName")
//   logoutBtn.parentElement.style.setProperty("display", "block", 'important');
// }
// checkout
let checkoutBtn = document.getElementById("checkOut");
let displayCart = document.getElementsByClassName("display-cart");
let displayCheckout = document.querySelector(".checkout")
checkoutBtn.addEventListener("click", ()=>{
displayCart[0].style.setProperty("display", "none", 'important')
displayCart[1].style.setProperty("display", "none", 'important')
displayCheckout.classList.remove("d-none")
})
let finshOrder = document.querySelector(".order");
finshOrder.onclick =()=>{
  window.location = "index.htm";
  localStorage.removeItem("products")
} 
let cartCOntainer = document.getElementById('cart-added-products');
let productsLocalStorage =JSON.parse(localStorage.getItem("products") ) ;
function drawData(){
  let i=0;
  cartCOntainer.innerHTML ="";
productsLocalStorage.map(function (ele){
  cartCOntainer.innerHTML +=`
  <div class="cart-product p-3 d-flex justify-content-between position-relative flex-row border-bottom mb- align-items-center text-light" id=${ele.id}>
      <div id="product-cart-info" class="d-flex gap-2 align-items-center justify-content-between flex-row w-75 h-50">
          <div class=" border-end pe-2 me-4 " style="width: 161px; height: 108px;">
              <img id="cart-img" src=${ele.thumbnail} alt="product" class="  rounded  w-100 h-100">
          </div>
          <div  class="d-flex flex-column text-light flex-grow-1 gap-2"> 
              <p id="product-cart-name">${ele.title}</p>
              <div id="controls" idC=${ele.id}>
                  <span id="munise-one" class=" text-primary " style="cursor: pointer;">-</span>
                  <span id="item-num" class="p-2">${ele.quantity}</span>
                  <span id="pluse-one" class=" text-primary" style="cursor: pointer;">+</span>
              </div>
              <p > <span id="price" class="one-product-price text-light" price = "${ele.price}">${ele.price}</span> L.E</p>
          </div>
      </div>
      <i class="fa-regular fa-trash-can position-absolute top-50 end-0  bg-danger rounded p-2 text-dark  remove-product-from-cart" style="transform:translateY(-50%);line-height:40px font-size:40px;cursor:pointer;"></i>
  </div>`;
  pricequantties(i)
  i++;
})}

function pricequantties(index){
  let oneprice =parseFloat(document.querySelectorAll("#price")[index].getAttribute("price"));
  let quantityPrice = productsLocalStorage[index].quantity*oneprice
  document.querySelectorAll("#price")[index].textContent = quantityPrice;
}
drawData();
getTotalPrice()
  // function getTotalPrice
  function getTotalPrice(){
    totalPrice=1.49;
    for(let j=0 ; j<productsLocalStorage.length ; j++){
      totalPrice += parseFloat(productsLocalStorage[j].price)*(productsLocalStorage[j].quantity);
    }
    console.log(totalPrice.toFixed(2))
    showTotalPrice.textContent = totalPrice.toFixed(2);
  }
// Function to remove a product from the cart
function removeFromCart(event) {
    const removeButton = event.target.closest(".remove-product-from-cart");
    if (removeButton) {
        const cartProduct = removeButton.closest(".cart-product");
        if (cartProduct) {
        let idOfRemovedProduct = cartProduct.getAttribute("id")
        let index = productsLocalStorage.map((obj)=> obj.id).indexOf(parseInt(idOfRemovedProduct));
        if(index!==-1){
          productsLocalStorage.splice(index,1);
          localStorage.setItem("products",JSON.stringify(productsLocalStorage))
          drawData()
        }
        // console.log(productsCartData.map((obj)=> obj.id))
        // console.log(index)
        }
        removalToast()

      }
    }
    function handleStorageChange(event) {
      if (event.key === 'products') {
        location.reload();
      }
    }
    window.addEventListener('storage', handleStorageChange)
// Show the toast notification for removal
function removalToast(){
  const newToast = document.createElement("div");
  newToast.classList.add("toast", "show");
  newToast.innerHTML = `<div class="toast-body bg-danger text-light">Item removed from cart.</div>`;
  toastContainer.appendChild(newToast);
  setTimeout(function () {
  newToast.classList.remove("show");
  }, 1200);
}
// Add event listener to the cart container for removing items
cartCOntainer.addEventListener("click", function(){
  removeFromCart(event);
  getTotalPrice();
});
// Function to update the quantity of items in the cart product
function updateQuantity(event) {
    const target = event.target;
    const quantitySpan = target.parentElement.querySelector("#item-num");
    let index = productsLocalStorage.map((obj)=> obj.id).indexOf(parseInt(target.parentElement.getAttribute("idC"))
    );
    // pluse
    if (target.id === "pluse-one") {
      productsLocalStorage[index].quantity +=1;
      localStorage.setItem("products",JSON.stringify(productsLocalStorage))
      // minuse
    } else if (target.id === "munise-one") {
      if (productsLocalStorage[index].quantity > 0) {
        productsLocalStorage[index].quantity -=1;
        localStorage.setItem("products",JSON.stringify(productsLocalStorage))
        // if quantity =0 remove
      if (productsLocalStorage[index].quantity === 0){
        console.log(productsLocalStorage)
        if(index!==-1){
          productsLocalStorage.splice(index,1);
          localStorage.setItem("products",JSON.stringify(productsLocalStorage))
          //.splice(index,1);
          drawData()
        }
        removalToast()
      }}

    }
    // Update the content of the "item-num" span with the new quantity
    if (quantitySpan) {
      quantitySpan.textContent = productsLocalStorage[index].quantity;
      pricequantties(index);
    }
  }
  // Add event listener to the cart container for updating items' quantity
  cartCOntainer.addEventListener("click", function (event) {
    const target = event.target;
    if (target.id === "pluse-one" || target.id === "munise-one") {
      updateQuantity(event);
      getTotalPrice();
    }
  });
  
// fav
let productsLocalStorageFav =JSON.parse(localStorage.getItem("fav") ) ;
let favContainer = document.querySelector(".fav");
function drawDataFav(arr,place){
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
drawDataFav(productsLocalStorageFav,favContainer)
let goToproductsBtn = document.querySelector(".go-to-products")
goToproductsBtn.addEventListener("click",()=>{
    location = "index.htm"
})
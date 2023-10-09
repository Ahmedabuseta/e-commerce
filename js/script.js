
let cartIcon = document.getElementById('cart-icon');
let cart     = document.getElementById('cart');
let closeCart= document.querySelector('.btn-close');
let prdctcnr = document.querySelector('#product-counter')
let products = document.querySelectorAll('.add');
let toastContainer = document.getElementById("toastContainer");
let cartCOntainer = document.getElementById('cart-added-products');
let removeProductFromCart = document.querySelector('.remove-product-from-cart')
let showTotalPrice  = document.getElementById('total');
let itemNum = document.getElementById('item-num')
const controlsContainer = document.getElementById("controls");
let totalPrice = 1.49 ;

let prevButton = document.querySelector("#prev")
let nextButton = document.querySelector("#next")

let token =localStorage.getItem("token")
// logout
let logoutBtn = document.querySelector('#logout-link');
logoutBtn.addEventListener("click",function(){
  loading()
  localStorage.clear();
  stopLoading()
  location="loginRIgesiter.htm";
})
// whenlogin
let loginBtn = document.querySelector('#login-register-link');
let userInfo = document.querySelector('.userInfo');
let userData = document.querySelector('#userData');
let userImg  = localStorage.getItem("photo")
let userName = localStorage.getItem('userName')
if(userName){
  loginBtn.remove();
  userInfo.style.setProperty("display", "flex", 'important');
  userData.innerHTML = userName;
  if(userImg){
    let profileimg = document.getElementById("userImg")
    profileimg.src = userImg
  }
  logoutBtn.parentElement.style.setProperty("display", "flex", 'important');
}
let prdcts = []
let allProductsContainer = document.querySelector("#products");
let bannerContainer      = document.querySelector(".carousel-inner");
let bannerSwitchies      = document.querySelector(".carousel-indicators")
let selectedSort =document.getElementById("selectedSort")

// open close cart
cartIcon.addEventListener("click",function(){
  if(cart.style.display === 'none'){
      cart.style.setProperty("display", "flex", "important");}
      else{
        cart.style.setProperty("display", "none", "important")
      }
})
closeCart.onclick = function(){
    cart.style.setProperty("display", "none", "important");
}
// go to cart page
let cartPage = document.querySelector("#checkOut")
cartPage.addEventListener("click",function goTOCart(){
  location="cart.htm"
})
let productsFetchedFromApi;
let end = 20;
let currentPage = 1 ;
let itemPerPage = 20 ;
loadProducts()
// productmarketdata
function  loadProducts(){
  loading()
  axios.get("https://dummyjson.com/products?limit=100")
  .then(function (response) {
    // handle success
    setTimeout(()=>{
      stopLoading()
      console.log("shit")
    } ,3000)
    selectedSort.addEventListener("change",()=>{
      console.log("hiudshfuh")
      sortProduct(response.data.products,selectedSort.value)
      drawData(response.data.products)
    })
    productsFetchedFromApi = response.data.products
    drawPagination(productsFetchedFromApi.length,20)
    // drawData (response.data.products)
    let displayedProdecuts=productsFetchedFromApi.slice(1,21)
    let pages =Array.from(document.querySelectorAll(".page")) 
    pages[0].classList.add("active")
    console.log(displayedProdecuts)
    drawData(displayedProdecuts)
    getBrands(response.data.products)
    getStock(response.data.products)
    filter(response.data.products)
    search(response.data.products)
    let addToFavBtn = document.querySelectorAll(".add-to-fav")
    addToFavBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
      let id = e.target.getAttribute("id") 
      let favIcon = e.target.closest(".fav-icon");
      if(favIcon.classList.contains("text-danger")){
        favIcon.classList.remove("text-danger")
      }else{
        favIcon.classList.add("text-danger")
      }
      addToFav(id,productsFetchedFromApi)
      console.log(id)
    })
    })
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.error("Fetch error:", error);
  })
}
setTimeout(() => {
  console.log(productsFetchedFromApi);
}, 3000); //
console.log(prdcts)

  // draw pageProduct
function drawData (arr){
  allProductsContainer.innerHTML=""
arr.map(function (ele){{
    allProductsContainer.innerHTML +=`
          <div class=" bg-dark product p-0 pb-3 rounded  col-lg-3  col-m-6 col-xs-12 d-flex flex-column justify-content-between" style="width:250px;" price=${ele.price} id=${ele.id}>
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
            <div>
            <hr class="mt-1 ms-3 me-3">
            <button  class="btn  btn-outline-primary m-auto d-block w-50 add" onClick="checkExist(${ele.id})">add to cart</button>
            </div>
          </div><!-- /broduct -->`
  }
})
let favIcon = document.querySelectorAll(".fav-icon")
console.log(favIcon)
setFav(favIcon)

}




// filter 
let categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting"
]
let category0 = document.querySelectorAll(".category .accordion-body")[0];
let category1 = document.querySelectorAll(".category .accordion-body")[1];
let brand0   = document.querySelectorAll(".brand .accordion-body")[0]
let brand1   = document.querySelectorAll(".brand .accordion-body")[1]
let bars =document.querySelectorAll(".fa-bars")
bars.forEach(bar=>{
  bar.addEventListener("click",function (){bar.classList.toggle("on")})
})
// draw category
function drawFilter(arr,place,atribtute,i){
  arr.map((category)=>{

    place.innerHTML+=`
      <div class="d-flex ps-3" style="cursor:pointer" >
        <input type="checkbox" id=${category+i} ${atribtute}="${category}">
        <label for=${category+i} class="m-2 text-light" style="font-weight: 900; cursor:pointer;" >${category}</label>
      </div>
    `
  })
}
drawFilter(categories,category0,"category",0)
drawFilter(categories,category1,"category",1)

//  getBrands 
let brands=[];
function getBrands(arr){
  arr.map(product=>{
    if(brands.indexOf(product.brand) == -1){
      brands.push(product.brand)
    }
  })
drawFilter(brands,brand0,"brand",0)
drawFilter(brands,brand1,"brand",1)

}
// getStock
let inStock=document.querySelector(".stock .accordion-body #in-stock")
let outStock =document.querySelector(".stock .accordion-body #out-of-stock")
function getStock(arr){
  let stock = 0 ;
  let notStock = 0 ;
  arr.map(product=>{
    if(product.stock !==0 ){
      stock++
    }else{
      notStock++
    }
  })
  inStock.innerHTML = `in stock (${stock})`;
  outStock.innerHTML = `out stock (${notStock})`
}

let categorySelctor=[]
let rateSelector   =[]
let brandSelector  =[]
let stockSelector  =[]
let outStockSelector=[]
let priceSelector  =[{min:0,max:999999}]

// console.log(filterelements,'hffgmjgg')

function filter(arr){

  let filterelements = Array.from(document.querySelectorAll("input[type='checkbox']"));
  filterelements.map((ele)=>{
    ele.addEventListener("click",()=>{
        let categoryFilter =[]
        let ratingFilter=[]
        let stockFilter =[]
        let brandFilter =[]
        let outStockFilter=[]
      let filterSelctor = filterelements.filter(element=>element.checked)
          filterSelctor.map(rate=>{
            if(rate.hasAttribute("rating") ){
              ratingFilter.push(parseInt(rate.getAttribute("rating")))
              rateSelector= [...ratingFilter]
              }
          })
          filterSelctor.map(cate=>{
            if( cate.hasAttribute("category")){
            categoryFilter.push(cate.getAttribute("category"))
            categorySelctor= [...categoryFilter]
            }
          })
          filterSelctor.map(brand=>{
              if(brand.hasAttribute("brand")){
                brandFilter.push(brand.getAttribute("brand"))
                brandSelector= [...brandFilter]
              }
          })
          filterSelctor.map(stock=>{
            if(stock.hasAttribute("stock")){
            stockFilter.push(arr.filter(product=> product.stock> 0))
            console.log(stockFilter)
            stockFilter= [...stockFilter]
            }
          })

          filterSelctor.map(outstock=>{
            if(outstock.hasAttribute("stock")){
            outStockFilter.push(arr.filter(product=> product.stock == 0))
            outStockSelector= [...outStockFilter]
            }
          })

      console.log(categorySelctor)
      console.log(priceSelector)

      getMainFilterArr(arr,categorySelctor,brandSelector,stockSelector,outStockSelector,priceSelector,rateSelector)
    })
  })
  let minPrice = document.querySelector(".price #from")
  let maxPrice = document.querySelector(".price #to")

    minPrice.addEventListener("change",()=>{
      priceSelector[0].min = minPrice.value
      getMainFilterArr(arr,categorySelctor,brandSelector,stockSelector,outStockSelector,priceSelector,rateSelector)
    })

    maxPrice.addEventListener("change",()=>{
      priceSelector[0].max = maxPrice.value
      getMainFilterArr(arr,categorySelctor,brandSelector,stockSelector,outStockSelector,priceSelector,rateSelector)
      
    })

}
function getMainFilterArr(products,category,brand,stock,outstock,price,rate){
  let mainFilterArr = products.filter(product=>{
    return((category.length === 0 ||category.includes(product.category))&&( brand.length === 0 ||brand.includes(product.brand))&& (parseInt(price[0].max) >= product.price && product.price  >=parseInt(price[0].min) )&&(stock.length === 0 || stock )&&(outstock.length === 0 || outstock )&&(rate.length === 0 || 5>parseFloat(product.rating)>=1 ))
  })
  console.log(mainFilterArr)
  // , console.log(parseInt(price[0].max) >= product.price >=parseInt(price[0].min))
  if(mainFilterArr==""){
    drawData(products)

  }else{
    drawData(mainFilterArr)
    selectedSort.addEventListener("change",()=>{
      console.log("hiudshfuh")
      sortProduct(mainFilterArr,selectedSort.value)
      drawData(mainFilterArr)
    })
  }
}

// sort
function sortProduct(arr,type){

  switch(type){
    case "alphabet, A to Z":
      arr.sort((a,b)=>{
        let nameA = a.title.toUpperCase()
        let nameB = b.title.toUpperCase()
        if(nameA>nameB) return 1;
        if(nameA<nameB) return -1;
        return 0
      })
      break;
      case "alphabet, Z to A":
        arr.sort((a,b)=>{
          let nameA = a.title.toUpperCase()
          let nameB = b.title.toUpperCase()
          if(nameA>nameB) return -1;
          if(nameA<nameB) return 1;
          return 0
        })
      break;
      case "price, low to high":
      arr.sort((a,b)=>a.price-b.price)
      break;
      case "price, high to low":
        arr.sort((a,b)=>b.price-a.price)
      break;
      case "rating, low to high":
        arr.sort((a,b)=>a.rating-b.rating)
      break;
      case "rating, high to low":
        arr.sort((a,b)=>b.rating-a.rating)
      break;
      default:
        return 0;
  }
}
// search 
let searchInput = document.getElementById("select-seacrch");
function search(arr){
  let seacrchType = document.getElementById("select-search");
  // let searchedProducts[]
  searchInput.addEventListener("input",()=>{
    switch(seacrchType.value){
      case "search by name":
        let searchedProductsByName = arr.filter((product)=>  product.title.toLowerCase().includes(searchInput.value.toLowerCase()))
        drawData(searchedProductsByName)
        break;
      case "search by category":
        let searchedProductsByCate = arr.filter((product)=>  product.category.toLowerCase().includes(searchInput.value.toLowerCase()))
        drawData(searchedProductsByCate)
        break;
        case "search by brand":
          let searchedProductsByBrand = arr.filter((product)=>  product.brand.toLowerCase().includes(searchInput.value.toLowerCase()))
          drawData(searchedProductsByBrand)
          break;
      default :
      drawData(arr)
    }
  })
}
// loading
function loading(){
  let body = document.querySelector(".body")
  let load = document.querySelector("#load")
  body.classList.add("d-none")
  load.style.setProperty("display","flex",'important')
}
// stop loading
function stopLoading(){
  let body = document.querySelector(".body")
  let load = document.querySelector("#load")
  body.classList.remove("d-none")
  load.style.setProperty("display","none",'important')
}


// cartData

// show toast
function showToast(type,message){
  const newToast = document.createElement("div");
  newToast.classList.add("toast", "show");
  newToast.innerHTML = `<div class="toast-body ${type}">${message}</div>`;
  toastContainer.appendChild(newToast);
  setTimeout(function () {
      newToast.classList.remove("show");
  }, 2000);
}
let productsCartData =[];
let existIds = [];
let localStorageData = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
window.addEventListener("load",()=>{
    localStorageData.forEach((obj)=>{
    productsCartData.push({...obj,quantity:obj.quantity})
    existIds.push(obj.id);
  });
  addToCart();
  getallQuantity()
  console.log(productsCartData,existIds)
})

function handleStorageChange(event) {
  if (event.key === 'products' || 'fav') {
    location.reload();
  }
}
window.addEventListener('storage', handleStorageChange)

// function add to cart
function addToCart(){
  cartCOntainer.innerHTML= ""
  let newProductsCartData = [];
  productsCartData.forEach(function(itm){
    newProductsCartData.push(itm);
  })
  // console.log(newProductsCartData)
  for(let i=0 ; i<newProductsCartData.length ; i++){
    existIds.push(`${newProductsCartData[i].id}`);
  const addProduct = document.createElement('div');
  addProduct.innerHTML = `
  <div class="cart-product p-1 d-flex justify-content-between position-relative flex-row border-bottom mb-3 align-items-center " id=${newProductsCartData[i].id}>
      <div id="product-cart-info" class="d-flex gap-2 align-items-center justify-content-between flex-row w-75 h-50">
          <div class=" border-end pe-2 " style="width: 161px; height: 108px;">
              <img id="cart-img" src=${newProductsCartData[i].thumbnail} alt="product" class="  rounded  w-100 h-100">
          </div>
          <div  class="d-flex flex-column  flex-grow-1 gap-2"> 
              <p id="product-cart-name">${newProductsCartData[i].title}</p>
              <div id="controls" idC=${newProductsCartData[i].id}>
                  <span id="munise-one" class=" text-success " style="cursor: pointer;">-</span>
                  <span id="item-num" class="p-2">${productsCartData[i].quantity}</span>
                  <span id="pluse-one" class=" text-success" style="cursor: pointer;">+</span>
              </div>
          </div>
      </div>
      <p > <span id="price" class="one-product-price" price = "${newProductsCartData[i].price}">${newProductsCartData[i].price}</span> L.E</p>
      <button type="button" class="btn-close position-absolute top-0 end-0 btn bg-danger rounded-circle remove-product-from-cart" aria-label="Close"></button>
  </div>`
  cartCOntainer.appendChild(addProduct);
  pricequantties(i)
}

getTotalPrice();
}
// function check product in the cart or not 
function checkExist(id){
  if(localStorage.getItem('phone')){
    console.log(productsFetchedFromApi)

  let choosenItm =productsFetchedFromApi.find((item)=> item.id == `${id}`);
  console.log(choosenItm)
  if(existIds.includes(`${id}`)){
    let index = productsCartData.findIndex((object)=> object.id == `${id}` );
    let quantitySpan =document.querySelectorAll("#controls")[index].querySelector("#item-num")
    console.log(index)
    productsCartData[index].quantity +=1;
    quantitySpan.textContent = productsCartData[index].quantity;
    pricequantties(index);
    getTotalPrice();
    showToast("bg-success","your order add to card")
    getallQuantity()
    localStorage.setItem("products",JSON.stringify(productsCartData))
  }else{
    productsCartData.push({...choosenItm,quantity:1})
    localStorage.setItem("products",JSON.stringify(productsCartData))
    addToCart();
    showToast("bg-success","your order add to card")
    // getTotalPrice()
    getallQuantity()
  }}else{
    location="loginRIgesiter.htm"
  }
  // quantitySpan.textContent = productsCartData[index].quantity;
}
// fav
let productsFav =[];
let existedFav=[];
let localStorageFav = localStorage.getItem("fav") ? JSON.parse(localStorage.getItem("fav")) : [];


let favCounter = document.getElementById("product-counter-fav")

  window.addEventListener("load",()=>{
      localStorageFav.forEach((obj)=>{
        productsFav.push({...obj})
      existedFav.push(obj.id);
      favCounter.innerHTML = existedFav.length
      console.log(existedFav,localStorageFav)
    })
  });



function addToFav(id,arr){
  if(localStorage.getItem('phone')){
    let choosenItm = arr.find(item=> item.id == `${id}`);
    console.log(choosenItm)
    if(existedFav.includes(parseInt(`${id}`))){
      let index = productsFav.findIndex((object)=> object.id == `${id}` );
      if(index!==-1){
        productsFav.splice(index,1);
        existedFav.splice(index,1);
        localStorage.setItem("fav",JSON.stringify(productsFav))
      
      showToast("bg-danger","product removed from fav")
      favCounter.innerHTML = existedFav.length
    }}else{
      productsFav.push({...choosenItm})
      localStorage.setItem("fav",JSON.stringify(productsFav))
      showToast("bg-success","prodcut added to fav")
      existedFav.push(id)
      favCounter.innerHTML = existedFav.length
    }
  }else{
      location="loginRIgesiter.htm"
  }
}
function setFav(favIcon){
  existedFav.map(id=>{
    favIcon.forEach(icon=>{
      if(icon.getAttribute("id") == id){
        icon.classList.add("text-danger")
        console.log("vnvnvn")
      }
    })
  })

}


// pricequantties
function pricequantties(index){
  let oneprice =parseFloat(document.querySelectorAll("#price")[index].getAttribute("price"));
  let quantityPrice = productsCartData[index].quantity*oneprice
  document.querySelectorAll("#price")[index].textContent = quantityPrice;
}
  // function getTotalPrice
  function getTotalPrice(){
    totalPrice=49.99;
    for(let j=0 ; j<productsCartData.length ; j++){
      totalPrice += parseFloat(productsCartData[j].price)*(productsCartData[j].quantity);
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
        let idOfRemovedProduct = parseInt(cartProduct.getAttribute("id"))
        let index = productsCartData.map((obj)=> obj.id).indexOf(idOfRemovedProduct);
        console.log(idOfRemovedProduct)
        console.log(index)

        if(index!==-1){
          console.log(productsCartData)
          productsCartData.splice(index,1);
          console.log(productsCartData)
          existIds.splice(index,1);
          addToCart()
          localStorage.setItem("products",JSON.stringify(productsCartData))
          getallQuantity()
        }
        }
        showToast("bg-danger","order removed from cart.")
      }
    }
    // get allQuantity
    function getallQuantity(){
      let allQuantityArr= productsCartData.map((obj)=> obj.quantity)
      let allQuantity   = allQuantityArr.reduce((acc,current)=> acc + current,0)
      console.log(allQuantity);
      prdctcnr.innerHTML =allQuantity;
    }

// Add event listener to the cart container for removing items
cartCOntainer.addEventListener("click", function(){
  removeFromCart(event);
});
// Function to update the quantity of items in the cart product
function updateQuantity(event) {
    const target = event.target;
    const quantitySpan = target.parentElement.querySelector("#item-num");
    let index = productsCartData.map((obj)=> obj.id).indexOf(parseInt(target.parentElement.getAttribute("idC")));
    // pluse
    if (target.id === "pluse-one") {
      productsCartData[index].quantity +=1;
      getallQuantity()
      localStorage.setItem("products",JSON.stringify(productsCartData))
      // minuse
    } else if (target.id === "munise-one") {
      if (productsCartData[index].quantity > 0) {
        productsCartData[index].quantity -=1;
        getallQuantity()
        localStorage.setItem("products",JSON.stringify(productsCartData))
        }// if quantity =0 remove
      if (productsCartData[index].quantity === 0){
        console.log(productsCartData)
        if(index!==-1){
          productsCartData.splice(index,1);
          existIds.splice(index,1);
          addToCart()
          getallQuantity()
          localStorage.setItem("products",JSON.stringify(productsCartData))
        }
        showToast("bg-danger","order removed from cart.")
      }
    }
    // Update the content of the "item-num" span with the new quantity
    if (quantitySpan) {
      quantitySpan.textContent = productsCartData[index].quantity;
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
let goToFavPage = document.querySelector(".fav-page");
goToFavPage.addEventListener("click",()=>{
  location.href="fav.htm"
  console.log("sagfuhcgjahkjh")
});

// show numper of product in the page

function next(btn){
  let pages =Array.from(document.querySelectorAll(".page")) 
    if(currentPage<pages.length){
      pages.map(pageBtn=>pageBtn.classList.remove("active"))
      currentPage++;
      pages[currentPage-1].classList.add("active")
      let start = (currentPage-1)*itemPerPage;
      let end   = start+itemPerPage;
      displayedProdecuts = productsFetchedFromApi.slice(start,end)
      drawData(displayedProdecuts)
      btn.classList.remove('d-none')
    }if(currentPage==pages.length){
      btn.classList.add('d-none')
  }
}
function back(btn){

  let pages =Array.from(document.querySelectorAll(".page")) 
    if(currentPage > 1){
      console.log(currentPage)
      pages.map(pageBtn=>pageBtn.classList.remove("active"))
      currentPage--;
      pages[currentPage-1].classList.add("active")
      let start = (currentPage-1)*itemPerPage;
      let end   = start+itemPerPage;
      displayedProdecuts = productsFetchedFromApi.slice(start,end)
      drawData(displayedProdecuts)
    }if(currentPage==1){
      btn.classList.add('d-none')    }
}
function pagination(btn){
  let pages =Array.from(document.querySelectorAll(".page")) 

      document.querySelector(".next").classList.remove('d-none')
      if(btn.textContent==5){
        document.querySelector(".next").classList.add('d-none')
      }    document.querySelector(".back").classList.remove('d-none')
      if(btn.textContent==1){
        document.querySelector(".back").classList.add('d-none')
      }
      pages.map(pageBtn=>pageBtn.classList.remove("active"))
          btn.classList.add('active')
          currentPage = parseInt(btn.textContent)
          let start = (currentPage-1)*itemPerPage;
          let end   = start+itemPerPage;
          displayedProdecuts = productsFetchedFromApi.slice(start,end)
          drawData(displayedProdecuts)
}

// draw pagination 
function drawPagination(length,perPage){
  let paginationPlace = document.querySelector(".pagination") 
let pages = Math.ceil(length/perPage)
paginationPlace.innerHTML = `
<li class="page-item "  style="cursor:pointer">
<a class="page-link back" onclick="back(this)">Previous</a>
</li>`
for(let i = 1 ; i<=pages ; i++){
  paginationPlace.innerHTML += `
  <li class="page-item"><a class="page-link page"  style="cursor:pointer" onclick="pagination(this)">${i}</a></li>
  `}
  paginationPlace.innerHTML += `
<li class="page-item">
<a class="page-link next" onclick="next(this)" style="cursor:pointer">Next</a>
</li>`
}

// let darkMode = document.querySelector(".dark")
// darkMode.addEventListener("click",()=>{
//   document.querySelector("body").style.backgroundColor = "#e5e5e5"
//   let bgDark = document.querySelectorAll(".bg-dark")
//   let textLight = document.querySelectorAll(".text-light")
//   bgDark.forEach((bg) => {
//     bg.classList.remove("bg-dark");
//     bg.classList.add("bg-light")
//   });

//   textLight.forEach((color) => {
//     color.classList.remove("text-dark");;
//     color.classList.add("text-dark");
//   });


// console.log(bgDark)
// })

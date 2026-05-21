document.addEventListener("DOMContentLoaded", function(){
    const slider = document.getElementById("price_range");
const rangeVal=document.querySelector(".range .values .min");

slider.oninput = function() {
  
  const value = (this.value - this.min) / (this.max - this.min) * 100;
  rangeVal.innerHTML=`$ ${this.value}`;
  
  
  this.style.background = `linear-gradient(to right, #120e62 0%, #120e62 ${value}%, #fff ${value}%, #fff 100%)`;
};

// =====================================================

// cart preview

const cartPrev = document.querySelector(".cart");
const openCartPrev=document.querySelector(".open_cart");
const closeCartPrev=document.querySelector(".close_cart");
const shopMorePrev=document.querySelector(".cart .buttons .trans");


openCartPrev.addEventListener("click",function(){
    cartPrev.classList.add("active")
    console.log(cartPrev);

});

closeCartPrev.addEventListener("click",function(){
    cartPrev.classList.remove("active")
});

shopMorePrev.addEventListener("click",function(){
    cartPrev.classList.remove("active")
});

// =============================================================

// filter category 

const categoryContainer=document.querySelector(".filter__category .category");

categoryContainer.addEventListener("click",function(e){
    if (e.target.tagName==='LI'){
        const active = e.currentTarget.querySelector("li.active");
        
        
        if (active){
            active.classList.remove("active")
        }
        e.target.classList.toggle("active")

    }
});

// ========================================================================

// filter color

const colorContainer=document.querySelector(".filter__color .colors");

colorContainer.addEventListener("click",function(e){
    if (e.target.classList.contains("color")){
        const active = e.currentTarget.querySelector(".active");
        if (active){
            active.classList.remove("active");
            active.innerHTML='';
        }
        e.target.classList.toggle("active");
        e.target.innerHTML="&#10004;";
        
    }   
    
});

// ========================================================================

const applyBtn=document.getElementById("apply_btn");
let allProducts = [];
const filterMenu = document.querySelector(".filter");
const filterdCat = document.getElementById("filterd_cat");

async function getData(){
    const res  = await fetch("../files/products.json");
    const data = await  res.json()
    allProducts=data;

    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category'); 

    if (categoryFromUrl) {
        const categoriesLI = document.querySelectorAll(".filter__category .category li");
        categoriesLI.forEach(li => {
            li.classList.remove("active");
            if (li.dataset.category === categoryFromUrl) {
                li.classList.add("active");
            }
        });

        filterProducts(allProducts);
    } else {
        displayProducts(allProducts);
    }



    // -------------------------------------------
    displayProducts(allProducts);
    applyBtn.addEventListener("click", () =>{
        filterProducts(allProducts)
    filterMenu.classList.toggle("active");});

    const addToCartBtn=document.querySelectorAll(".product .cart_btn");
    addToCartBtn.forEach(function(btn){
        btn.addEventListener("click",function(e){
            
            
            const btnId=e.currentTarget.getAttribute("data-id");
            
            
            const selectedProduct=data.find(product => product.id == btnId)


            addToCart(selectedProduct);
            const btnsAllMAtching=document.querySelectorAll(`.cart_btn[data-id="${btnId}"]`);
            btnsAllMAtching.forEach(function(btn){
                btn.classList.add("active");
                btn.querySelector("span").innerHTML='item in cart'; 

            })
        })

    })
}

function filterProducts(products){
   
        const cat = document.querySelector(".filter__category .category .active")?.dataset.category || "all";
        const cost = document.getElementById("price_range").value;
        const color = document.querySelector(".filter__color .colors .active")?.dataset.color || "all";
        const result = products.filter(product => {
            const matchCat = ( cat === 'all' || cat ===product.category );
            const matchCol = ( color === 'all' || color===product.color );
            const matchCost = (product.price <= cost); 
            
            return matchCat && matchCol && matchCost;
        });
        displayProducts(result);
        filterdCat.innerText=cat.toUpperCase();
}




function displayProducts(products){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productsContainer = document.querySelector(".products .products__grid");
    productsContainer.innerHTML='';

    if (products.length <= 0) {
        productsContainer.innerHTML = "<h3>Sorry, There are no products matches your search!</h3>";
        return;
    }
    products.forEach(product => {
        
        
        let stars = getStars(product);
        if (product.old_price){
            const isInCart = cart.some(item => item.id === product.id);
            let disc = Math.floor(((product.old_price-product.price) / product.old_price) *100)
            productsContainer.innerHTML+=`
            <div class="product">
                            <div class="product__img">
                            <img src="../${product.img}" alt="">
                            </div>
                            <div class="product__info">
                            <div class="product__rate">
                                    <div class="rate__stars">
                                    ${stars}
                                    </div>
                                    <span class="rate__num">${product.rate}/5.0</span>
                                    </div>
                                    <div class="product__desc">
                                    <a href="#"  onclick="redirect(${product.id})"><p class="pname">${product.name}</p></a>
                                        <div class="price">
                                        <span class="actaul_price">$${product.price}</span>
                                        <span class="old_price">$${product.old_price}</span>
                                        <span class="discount">-${disc}%</span>                                
                                    </div>
                                </div>
                                <div class="cart_btn ${ isInCart ? 'active' : ''} " data-id="${product.id}" >
                                <span>${ isInCart ? 'item in cart' : 'add to cart'}</span><i class="fa-solid fa-cart-shopping"></i>
                                </div>
                            </div>
                        </div>
            
                        
            `;
            
            
        }
        else {
                const isInCart = cart.some(item => item.id === product.id);
                productsContainer.innerHTML+=`
                <div class="product">
                                <div class="product__img">
                                <img src="../${product.img}" alt="">
                                </div>
                                <div class="product__info">
                                <div class="product__rate">
                                        <div class="rate__stars">
                                        ${stars}
                                        </div>
                                        <span class="rate__num">${product.rate}/5.0</span>
                                        </div>
                                        <div class="product__desc">
                                        <a href="#"  onclick="redirect(${product.id})"><p class="pname">${product.name}</p></a>
                                            <div class="price">
                                            <span class="actaul_price">$${product.price}</span>
                                            
                                                                           
                                        </div>
                                    </div>
                                     <div class="cart_btn ${ isInCart ? 'active' : ''} " data-id="${product.id}" >
                                <span>${ isInCart ? 'item in cart' : 'add to cart'}</span><i class="fa-solid fa-cart-shopping"></i>
                                </div>
                                </div>
                            </div>
                
                            
                `;
            }

     
    });
}

function getStars(product){

    let rate=product.rate;
    let stars=``
    for (let i=1;i<6;i++)
    {
        check = rate-(i-1);
        if (check >=1)
            offset=100;
        else if(check > 0)
            offset = check*100;
        else offset = 0;

        stars+=`
        <svg class="stars" stroke="#ccc"  stroke-width="1" viewBox="0 0 24 24" width="19" height="19" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-${product.id}-${i}">
                    <stop offset="${offset}%" stop-color="#FFD700" /> <stop offset="${offset}%" stop-color="#E0E0E0" /> </linearGradient>
            </defs>
            <path fill="url(#grad-${product.id}-${i})" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
    
    
        `
    }

    return stars;

}

getData();




// =============================================================

// filter menu

const openFilter = document.querySelector(".products__header .icon");

const closeFilter = document.getElementById("close_filter");
openFilter.addEventListener("click",function(){
    filterMenu.classList.add("active");
})
closeFilter.addEventListener("click",function(){
    filterMenu.classList.remove("active");
})







})


function redirect(id){
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'productDeatails.html';
}





// ========================================================================

// filter products





// fetch("../files/products.json").then(res => res.json())
// .then( data => {


// applyBtn.addEventListener("click",function(){
        
//         const cat = document.querySelector(".filter__category .category .active").innerText || "all";
//         const cost = document.getElementById("price_range").value;
//         const color = document.querySelector(".filter__color .colors .active").innerText || "all";
//         const result = data.forEach(product => {
//             const matchCat = ( cat === 'all' || cat ===product.category );
//             const matchCol = ( color === 'all' || color===product.color );
//             const matchCost = (product.price <= cost); 
            
//             return matchCat && matchCol && matchCost;
//         });
//     })
    
// =================================================================================

// add to cart preview




// ====================================================================
const nav = document.querySelector(".nav")
const openMenuBtn = document.querySelector(".open_menu")
const closeMenuBtn = document.querySelector(".close_menu i")

// header 

function openMenu(){
    nav.classList.toggle("active");
}

nav.addEventListener("click",function(e){
    if (e.target.classList.contains("nav__link"))
    {
        let activeLink=document.querySelector(".nav__link.active");
        if(activeLink){
            activeLink.classList.remove("active")
        }
        
        e.target.classList.toggle("active")
    }
})
openMenuBtn.addEventListener("click",openMenu)
closeMenuBtn.addEventListener("click",openMenu)


// ============================================================

// slider


let slideIndex = 1;
let actualSlide = null;
let actualDot = null;
let slides = document.getElementsByClassName("slideshow-slide");
let dotContainer = document.getElementById("slideshow-bar");
let dots = null;
let slideLeft=document.querySelector(".slideshow-left")
let slideRight=document.querySelector(".slideshow-right")

if (dotContainer){

    initSlides();
    


function initSlides() {
  dots = document.getElementById("slideshow-bar").children;
  if (slides.length != 0) {
    for (let i = 0; i < slides.length; i++) {
      
        let child = document.createElement("div");
        child.className = "slideshow-dot";
        child.onclick = function () {
          showSlides(i + 1);
          resetInterval();
        };
        dotContainer.appendChild(child);
      }
    }
    dots = dotContainer.children;
    actualDot = dots[0];
    actualSlide = slides[0];
    actualDot.className += " active";
    actualSlide.style.display = "inline-block";
  }

slideLeft.addEventListener("click",function(){
    showSlides(slideIndex + -1)
    resetInterval()
})
slideRight.addEventListener("click",function(){
    showSlides(slideIndex + 1)
    resetInterval()
})

let slideInterval = setInterval(autoSlide, 3000);

function autoSlide() {
    showSlides(slideIndex + 1);
}


function resetInterval() {
    clearInterval(slideInterval); 
    slideInterval = setInterval(autoSlide, 3000); 
}



function showSlides(index) {
  if (index > slides.length) slideIndex = 1;
  else if (index < 1) slideIndex = slides.length;
  else slideIndex = index;
  actualSlide.className = "slideshow-slide slideOut";
  actualDot.className = "slideshow-dot";
  actualSlide = slides[slideIndex - 1];
  actualDot = dots[slideIndex - 1];
  actualSlide.className = "slideshow-slide slideIn";
  actualSlide.style.display = "inline-block";
  actualDot.className += " active";
}


}


// ============================================================

let allSlides = document.querySelectorAll(".sec-slide")


allSlides.forEach(function(section){
let productsContainer = section.querySelector(".products");
let next=section.querySelector(".go_next");
let prev=section.querySelector(".go_prev");


next.addEventListener("click",function(){
    const firstCard = productsContainer.querySelector('.product');
    
    if (firstCard) {
        const cardWidth = firstCard.offsetWidth + 15; 
        
        productsContainer.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    }
})

prev.addEventListener("click",function(){
    const firstCard = productsContainer.querySelector('.product');
    
    if (firstCard) {
        const cardWidth = firstCard.offsetWidth + 15; 
        
        productsContainer.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    }
})

})



// cart

const cart = document.querySelector(".cart");
const openCart=document.querySelector(".open_cart");
const closeCart=document.querySelector(".close_cart");
const shopMore=document.querySelector(".cart .buttons .trans");

openCart.addEventListener("click",function(){
    cart.classList.toggle("active")
});

closeCart.addEventListener("click",function(){
    cart.classList.toggle("active")
})

shopMore.addEventListener("click",function(){
    cart.classList.toggle("active")
})



// add to cart preview


fetch("../files/products.json").then(res => res.json())
.then(data=>{
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
    
});


function addToCart(product){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({...product,quantity:1});
    localStorage.setItem('cart',JSON.stringify(cart));
    updateCart();
}

function updateCart(){
    const cartItemsContainer = document.querySelector(".cart .items");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemsNumber = 0;
    let totalPriceItems=0;
    
    cartItemsContainer.innerHTML='';
    cart.forEach(function(item,i){
    let totalPrice=item.quantity*item.price;
    itemsNumber+=item.quantity;
    totalPriceItems+=totalPrice;
    cartItemsContainer.innerHTML +=`
        <section class="cart_item">
                <section class="item_img">
                    <img src="../${item.img}" alt="">
                </section>
                <section class="item_desc">
                    <h4>${item.name}</h4>
                    <p class="price">${totalPrice}$</p>
                    <section class="quantiy_control">
                        <button class="decrease" data-index="${i}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase" data-index="${i}">+</button>
                    </section>
                </section>
                <button class="delete_item" data-index="${i}" ><i class="fa-solid fa-trash"></i></button>
            </section>
    
    
    `;

    })

const totalPriceCart=document.querySelector(".cart__buttom .total_price");
const itemsNumberCart=document.querySelector(".cart__top .items_number");
const itemsNumberHeader=document.querySelector(".items_header");

totalPriceCart.innerHTML=totalPriceItems;
itemsNumberCart.innerHTML=itemsNumber;
itemsNumberHeader.innerHTML=itemsNumber;

const increaseBtns=document.querySelectorAll(".quantiy_control .increase");
const decreaseBtns=document.querySelectorAll(".quantiy_control .decrease");


increaseBtns.forEach(function(btn){
    btn.addEventListener("click",function(e){
    itemIndex=e.target.getAttribute("data-index");
    ;
    
    increaseQuantity(itemIndex);
    })
})

decreaseBtns.forEach(function(btn){
    btn.addEventListener("click",function(e){
    itemIndex=e.target.getAttribute("data-index");
    decreaseQuantity(itemIndex);
    })
})



const deletBtns=document.querySelectorAll(".cart_item .delete_item");


deletBtns.forEach(function(btn){
        btn.addEventListener("click",function(e){
        const itemIndex = e.currentTarget.getAttribute("data-index");
        
        
        removeFromCart(itemIndex);
    })
    });


   
}

updateCart();


function increaseQuantity(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity+=1;
    localStorage.setItem('cart',JSON.stringify(cart));
    updateCart();
}

function decreaseQuantity(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity>1){
        cart[index].quantity-=1;
        localStorage.setItem('cart',JSON.stringify(cart));
        updateCart();

    }
}

function removeFromCart(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const removedItem = cart.splice(index,1)[0];
    localStorage.setItem('cart',JSON.stringify(cart));
    updateCart();
    updateBtnState(removedItem.id);
}

function updateBtnState(id){
    const allMatchingBtns=document.querySelectorAll(`.cart_btn[data-id="${id}"]`);
    allMatchingBtns.forEach(function(btn){
        btn.classList.remove("active");
        btn.querySelector("span").innerHTML="add to cart";
    })
}

// =================================================

const shopBtn= document.getElementById("drop");
shopBtn.addEventListener("click",function(){
    window.location.href="allproducts.html";
})



// ===================================================
// animations

const bannersContainer = document.querySelector(".small-banners");
const banners = document.querySelectorAll(".small-banners .box");


let observer1 = new IntersectionObserver(function(entries){
    
    let entry = entries[0];

    if(entry.isIntersecting){
        banners[0].style.animation = "fadeInRight 1.5s 0.5s forwards"
        banners[1].style.animation = "fadeInRight 1.5s 1s forwards"
        banners[2].style.animation = "fadeInRight 1.5s 1.2s forwards"
        banners[3].style.animation = "fadeInRight 1.5s 1.4s forwards"
    }
    

});

observer1.observe(bannersContainer);

document.querySelector('a[href="#for_hot"]').addEventListener('click', function(e) {
    e.preventDefault();
    
    
    const targetElement = document.getElementById('for_hot');
    
    targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'      
    });
});

document.querySelector('a[href="#for_mob"]').addEventListener('click', function(e) {
    e.preventDefault();
    
    
    const targetElement = document.getElementById('for_mob');
    
    targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'      
    });
});

document.querySelector('a[href="#for_app"]').addEventListener('click', function(e) {
    e.preventDefault(); 
    
    const targetElement = document.getElementById('for_app');
    
    targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'      
    });
});


document.querySelector('a[href="#for_elec"]').addEventListener('click', function(e) {
    e.preventDefault(); 
    
    const targetElement = document.getElementById('for_elec');
    
    targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end'     
    });
});
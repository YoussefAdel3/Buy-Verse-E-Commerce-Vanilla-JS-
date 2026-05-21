// view product

const pId=localStorage.getItem("selectedProductId");
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

function addItem(){

}

async function getData(){
    const res  = await fetch("../files/products.json");
    const data = await  res.json()
    allProducts=data;

    const selectedProduct=allProducts.find(function(p){
        return p.id == pId;
    });

    if (selectedProduct)
        showProduct(selectedProduct);
    else 
        document.querySelector(".details").innerHTML=`Sorry, Element not found!!`;    


    
}


function showProduct(p){
     let stars = getStars(p);
     let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isInCart = cart.some(item => item.id === p.id);

     if (p.old_price){
        let disc = Math.floor(((p.old_price-p.price) / p.old_price) *100)

         document.querySelector(".details").innerHTML=`
          <section class="images">
                <section class="small__imgs">
                    <section class="img__container"><img src="../${p.img}" alt=""></section>
                    <section class="img__container"><img src="../${p.img}" alt=""></section>
                    <section class="img__container"><img src="../${p.img}" alt=""></section>
                </section>
                <section class="main__img">
                    <section class="img__container"><img src="../${p.img}" alt=""></section>
                </section>
            </section>
    
            <section class="details__content">
                <section class="title">
                    <h1>${p.name}</h1>
                </section>
                <section class="rate">
                    <div class="rate__stars">
                    ${stars}
                    </div>
                    <span class="rate__num">${p.rate}/5.0</span>
                </section>
    
                <section class="price">
                    <span class="actaul_price">$${p.price}</span>
                    <span class="old_price">$${p.old_price}</span>
                    <span class="discount">-${disc}%</span> 
                </section>
                <section class="desc">
                    <p>${p.desc}</p>
                </section>
                <section class="select_colors">
                    <section class="wrapper">
                            <h3>Select colors</h3>
                    </section>
                    <section class="colors">
                        <div class="color red " data-color="red"></div>
                        <div class="color black" data-color="black"></div>
                        <div class="color silver" data-color="silver"></div>
                        <div class="color blue" data-color="blue"></div>
                    </section>
                    
                </section>
                <section class="action">
                     <button class="add_btn ${ isInCart ? 'active' : ''} " data-id="${p.id}">${ isInCart ? 'item in cart' : 'Add to Cart'}</button>
                    
                </section>
               
            </section>
         `
     }
     else {
        document.querySelector(".details").innerHTML=`
          <section class="images">
                <section class="small__imgs">
                    <section class="img__container"><img src="../${p.img}" alt=""></section>
                    <section class="img__container"><img src="../${p.img}" alt=""></section>
                    <section class="img__container"><img src="../${p.img}" alt=""></section>
                </section>
                <section class="main__img">
                    <section class="img__container"><img src="../${p.img}" alt=""></section>
                </section>
            </section>
    
            <section class="details__content">
                <section class="title">
                    <h1>${p.name}</h1>
                </section>
                <section class="rate">
                    <div class="rate__stars">
                    ${stars}
                    </div>
                    <span class="rate__num">${p.rate}/5.0</span>
                </section>
    
                <section class="price">
                    <span class="actaul_price">$${p.price}</span>
                </section>
                <section class="desc">
                    <p>${p.desc}</p>
                </section>
                <section class="select_colors">
                    <section class="wrapper">
                            <h3>Select colors</h3>
                    </section>
                    <section class="colors">
                        <div class="color red " data-color="red"></div>
                        <div class="color black" data-color="black"></div>
                        <div class="color silver" data-color="silver"></div>
                        <div class="color blue" data-color="blue"></div>
                    </section>
                    
                </section>
                <section class="action">
                     <button class="add_btn ${ isInCart ? 'active' : ''} " data-id="${p.id}">${ isInCart ? 'item in cart' : 'Add to Cart'}</button>
                </section>
               
            </section>
         `
     }

     const colorContainer=document.querySelector(".select_colors .colors");

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

const addBtn=document.querySelector(".action .add_btn");
    addBtn.addEventListener("click",function(){
            if (! addBtn.classList.contains("active")){
                addToCart(p);
                addBtn.classList.add("active");
                addBtn.innerHTML='item in cart'; 
            }
    })

    
window.addEventListener('storage',function(e){
    if (e.key == 'cart'){
        let cart = JSON.parse(localStorage.getItem('cart'))|| []
        if (!cart.some(item => item.id == p.id)){
             addBtn.classList.remove("active");
            addBtn.innerHTML='Add to Cart'; 
        }
        
    }
})

}

getData();

// ==========================================================================================


// section 3 in 1 

const detailBtn = document.getElementById("details_btn");
const reviewlBtn = document.getElementById("reviews_btn");
const faqBtn = document.getElementById("faq_btn");

const btnsContainer = document.querySelectorAll(".three_in_one .buttons button");
const productDetails =document.querySelector(".show .p_details");
const review =document.querySelector(".show .p_details");
const faq =document.querySelector(".show .p_details");

const showContainer = document.querySelectorAll(".show .main_content");




btnsContainer.forEach(function(btn,i){
    btn.addEventListener("click",function(e){
        
        if (e.target.tagName === "BUTTON"){
            let active=document.querySelector(".three_in_one .buttons button.active");
            if(active){
                active.classList.remove("active")
            }
            e.target.classList.add("active");
            let activeContainer = document.querySelector(".show .main_content.active");
            if (activeContainer){
                activeContainer.classList.remove("active"); 
            }

            showContainer[i].classList.add("active");

        }
    })
});

// ==========================================================================================
// faq 

const qustBtns = document.querySelectorAll(".question");
qustBtns.forEach(function(quest){
    quest.addEventListener("click",function(e){
    if (e.target.tagName === "BUTTON"){
        let active = document.querySelector(".answer.active");
        if (active){
            active.classList.remove("active");
        }
        e.currentTarget.querySelector(".answer").classList.toggle("active");
    }

})
});

// ==========================================================================================
const originalUpdateCart = updateCart;
updateCart = function() {
    originalUpdateCart(); 

    const addBtn = document.querySelector(".action .add_btn");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (addBtn) {
        const isStillInCart = cart.some(item => item.id == pId); 
        
        if (isStillInCart) {
            addBtn.classList.add("active");
            addBtn.innerHTML = 'item in cart';
        } else {
            addBtn.classList.remove("active");
            addBtn.innerHTML = 'Add to Cart';
        }
    }
};
// ==========================================================================================

// filter color 

// const colorContainer=document.querySelector(".select_colors .colors");

// colorContainer.addEventListener("click",function(e){
//     if (e.target.classList.contains("color")){
//         const active = e.currentTarget.querySelector(".active");
//         if (active){
//             active.classList.remove("active");
//             active.innerHTML='';
//         }
//         e.target.classList.toggle("active");
//         e.target.innerHTML="&#10004;";
        
//     }   
    
// });

// ==========================================================================================
// 



// ==========================================================================================
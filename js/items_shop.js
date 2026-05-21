
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

fetch("../files/products.json").then(res => res.json())
.then(data=>{
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productsContainer = document.querySelector(".products .products__grid");

    data.forEach(product => {
        
        
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
    
});

function redirect(id){
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'productDeatails.html';
}




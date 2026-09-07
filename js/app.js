
const getCart=()=>JSON.parse(localStorage.getItem("techworld_cart")||"[]");
const saveCart=c=>{localStorage.setItem("techworld_cart",JSON.stringify(c));updateCartCount()};
function updateCartCount(){const n=getCart().reduce((s,i)=>s+i.qty,0);document.querySelectorAll(".cart-count").forEach(e=>e.textContent=n)}
function toast(msg){const t=document.querySelector(".toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function addToCart(id,qty=1){const c=getCart(),x=c.find(i=>i.id===id);x?x.qty+=qty:c.push({id,qty});saveCart(c);toast("Added to cart ✓")}
function toggleWish(id,btn){let w=JSON.parse(localStorage.getItem("techworld_wishlist")||"[]");w.includes(id)?w=w.filter(x=>x!==id):w.push(id);localStorage.setItem("techworld_wishlist",JSON.stringify(w));btn.classList.toggle("active");btn.textContent=w.includes(id)?"♥":"♡"}
function productCard(p){return `<article class="product-card">
<div class="product-img"><button class="wish" onclick="toggleWish(${p.id},this)">♡</button><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
<div class="product-body"><span class="brand">${p.brand}</span><h3>${p.name}</h3><div class="rating">★ ${p.rating} <span style="color:#94a3b8">(${Math.floor(p.rating*47)})</span></div>
<div class="price"><strong>${money(p.price)}</strong><span class="old">${money(p.old)}</span><span class="discount">${Math.round((1-p.price/p.old)*100)}% OFF</span></div>
<div class="card-actions"><a class="btn btn-dark" href="product-details.html?id=${p.id}">View</a><button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button></div></div></article>`}
document.addEventListener("DOMContentLoaded",()=>{updateCartCount();document.querySelectorAll("[data-menu]").forEach(b=>b.addEventListener("click",()=>document.querySelector(".mobile-nav")?.classList.toggle("open")))});

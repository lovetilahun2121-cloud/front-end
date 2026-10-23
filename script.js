let cart = JSON.parse(localStorage.getItem("cart")) || [];





const products = [
    // electronics products
    {
        id: 1,
        name: "designer sunglass",
        price: 199.99,
        image: "./assets/images.jfif",
        category: "electronics",
        decription: "uv protection"
    },
    {
        id: 2,
        name: "Smart watch",
        price: 299.99,
        image: "./assets/watch.jfif",
        category: "electronics",
        decription: "fitness tracking smarat watch"
    },
    {
        id:3 ,
        name: "robet",
        price: 199.99,
        image: "./assets/robet.jfif",
        category: "electronics",
        decription: "Noise-cancelling wireless headphones"
    },

 {
        id: 4,
        name: "blender",
        price: 199.99,
        image: "./assets/blende.jfif",
        category: "electronics",
        decription: "Noise-cancelling wireless headphones"
    },

{
        id: 5,
        name: "air fresh",
        price: 99.99,
        image: "./assets/air.jfif",
        category: "home",
        decription: "silent killer of mosquto"
    },

{
        id: 6,
        name: "GMNAZIM",
        price: 499.99,
        image: "./assets/kibdet.jfif",
        category: "SPORT",
        decription: "ITis very impotrant tool"
    },
{
        id: 7,
        name: "vip shoes",
        price: 899.99,
        image: "./assets/shoes.jfif",
        category: "sport",
        decription: "users use it for sport"
    },
     {
        id: 8,
        name: "mat",
        price: 799.99,
        image: "./assets/mat.jfif",
        category: "spott",
        decription: "used to physical fitness"
    },
   
    {
        id: 9,
        name: "4k camera",
        price: 799.99,
        image: "./assets/download.jfif",
        category: "electronics",
        decription: "profesional 4k video camera"
    },
{
        id: 10,
        name: "headphone",
        price: 699.99,
        image: "./assets/headphone.jfif",
        category: "electronics",
        decription: "Noise-cancelling wireless headphone"
    },
    {
        id: 11,
        name: "head halmet",
        price: 999.99,
        image: "./assets/halmet.jfif",
        category: "sport",
        decription: "protect from hurt"
    },
    {
        id: 12,
        name: "leather jacket",
        price: 399.99,
        image: "./assets/chlose.jfif",
        category: "fashion",
        decription: "made in ethiopia"
    },
];


function initProducts() {
    const container = document.getElementById("products-container");

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h2 class="product-title">${product.name}</h2>
            <p class="product-description">${product.decription}</p>
            <p class="product-price">${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})"> Add to Cart</button>
        `;

        container.appendChild(productCard);
    });
}


function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    saveCartToLocalStorage();
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cart-item");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="${item.image}" alt="${item.name}">
            <div>
            <h5>${item.name}</h5>
            <p>${item.price} * ${item.quantity}</p>
            
            </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})"></button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartDisplay();
    saveCartToLocalStorage();
}

document.addEventListener("DOMContentLoaded", () => {
    initProducts();
    initStore();
});



function showPaymentModal() {
    if (cart.length === 0) {
        return alert("Your cart is empty. Please add items to the cart before proceeding to checkout.");

    }
  document.getElementById("payment-total").textContent = cart
  .reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  document.getElementById("payment-modal").style.display = "block";
}
function closePaymentModal() {
    document.getElementById("payment-modal").style.display = "none";
  
   document.getElementById("payment-processing").style.display = "none"; 
   document.getElementById("payment-success").style.display = "none"; 
   document.getElementById("payment-form").style.display = "block";
}
function processPayment(event) {
event.preventDefault();
// Show processing animation
document.getElementById("payment-form").style.display = "none";
document.getElementById("payment-processing").style.display = "block";
setTimeout(() => {
    // Hide processing animation and show success message
    document.getElementById("payment-processing").style.display = "none";
    document.getElementById("payment-success").style.display = "block";
    setTimeout(() => {
        cart = []
        localStorage.removeItem("cart");
        updateCartDisplay();
        closePaymentModal();


    }, 2000);
}, 3000);
}



/* CATEGORY BUTTONS */
document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => {
        // Remove active class from every category
        document.querySelectorAll(".category-btn").forEach((btn) => {
            btn.classList.remove("active");
        });

        // Highlight selected category
        button.classList.add("active");

        // Save selected category
        selectedCategory = button.dataset.category;

        // Display matching products
        initProducts();
    });
});


/* SEARCH PRODUCTS */
document
    .getElementById("search-input")
    .addEventListener("input", initProducts);


/* START WEBSITE AFTER HTML LOADS */
document.addEventListener("DOMContentLoaded", () => {
    initProducts();
    updateCart();
});
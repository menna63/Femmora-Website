const products = [
    { img: "photos/1.jpg", name: "Pearl Bracelet", price: "$100" },
    { img: "photos/2.jpg", name: "Flower Necklace", price: "$100" },
    { img: "photos/3.jpg", name: "Emerald Green Stone Necklane", price: "$100" },
    { img: "photos/4.jpg", name:"Butterfly necklace", price: "$100" },
    { img: "photos/5.jpg", name: "Fresh Water Pearl Necklace", price: "$100" },
    { img: "photos/6.jpg", name: "Green Amber Necklace", price: "$100" },
    { img: "photos/7.jpg", name: "V Earnings", price: "$100" },
    { img: "photos/8.jpg", name: "Butterfly Earnings", price: "$100" },
    { img: "photos/9.jpg", name: "Heart Earnings", price: "$100" },
    { img: "photos/10.jpg", name: "Adeleine Knotted Knob Bracelet", price: "$100" },
    { img: "photos/11.jpg", name: "Heart Ring", price: "$100" },
    { img: "photos/12.jpg", name: "ٍStainless Steel Bracelet", price: "$100" },
    { img: "photos/13.jpg", name: "Silver Bracelet", price: "$100" },
    { img: "photos/14.jpg", name: "Chunky Gold Ring", price: "$100" },
    { img: "photos/15.jpg", name: "Heart Necklace", price: "$100" },
    { img: "photos/16.jpg", name: "Solid Gold Necklace", price: "$100" },
    { img: "photos/17.jpg", name: "Ocean Ring", price: "$100" },
    { img: "photos/18.jpg", name: "Infinty Ring", price: "$100" }
];

const itemsPerPage = 6;
let currentPage = 1;
let cart = [];  


function displayProducts(page) {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = products.slice(start, end);

    paginatedItems.forEach(product => {
        productContainer.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}" width="200" height="300"><br>
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button onclick="addToCart('${product.name}', '${product.price}')">Add to Cart</button>
            </div>
        `;
    });

    updateCartCount();
}


function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartCount();
    showSuccessMessage(name);
}


function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}


function showSuccessMessage(name) {
    alert('${name} has been added to your cart!');
}


function showCartModal() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <h4>${item.name}</h4>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: <button onclick="changeQuantity('${item.name}', -1)">-</button> ${item.quantity} <button onclick="changeQuantity('${item.name}', 1)">+</button></p>
                    <button onclick="removeFromCart('${item.name}')">Remove</button>
                </div>
            `;
        });
    }

    document.getElementById("cartModal").style.display = "block";
}


function changeQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);  
        updateCartCount();
        showCartModal();
    }
}


function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartCount();
    showCartModal();
}


function closeCartModal() {
    document.getElementById("cartModal").style.display = "none";
}


document.getElementById("checkoutBtn").addEventListener("click", function() {
    window.location.href = "checkout.html";  
});


document.getElementById("closeCartBtn").addEventListener("click", closeCartModal);


function changePage(page) {
    if (page < 1 || page > Math.ceil(products.length / itemsPerPage)) return;
    currentPage = page;
    displayProducts(page);
}


document.addEventListener("DOMContentLoaded", () => {
    displayProducts(currentPage);
    
    
    document.querySelector(".cart-link").addEventListener("click", function(event) {
        event.preventDefault();  
        showCartModal();
    });

//search bar filter
const searchInput = document.querySelector('input[name=search]');

searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    
    filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));

    
    currentPage = 1;
    displayFilteredProducts(currentPage);
});


let filteredProducts = [...products];


function displayFilteredProducts(page) {
    productContainer.classList.add("fade-out");

    setTimeout(() => {
        productContainer.innerHTML = "";

        let start = (page - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = filteredProducts.slice(start, end);

        paginatedItems.forEach(product => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}" width="200" height="300"><br>
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button>Add to Cart</button>
            </div>
        `;
        });

        updatePaginationButtons(page);

        productContainer.classList.remove("fade-out");
        productContainer.classList.add("fade-in");

    }, 400);
}

});

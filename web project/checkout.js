

document.addEventListener("DOMContentLoaded", function() {
   
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

   
    function updateCartSummary() {
        const cartItemsContainer = document.getElementById("cart-items");
        let cartHtml = '';
        let totalPrice = 0;

       
        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            cartHtml += <p>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}</p>;
        });

       
        cartItemsContainer.innerHTML = cartHtml;
        document.getElementById("total-price").innerText = totalPrice.toFixed(2);
    }

    
    updateCartSummary();

    
    document.getElementById("checkout-form").addEventListener("submit", function(event) {
        event.preventDefault();

        
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const city = document.getElementById("city").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const paymentMethod = document.getElementById("payment-method").value;

        
        if (!fname || !lname || !city || !address || !email || !phone || !paymentMethod) {
            alert("Please fill out all the fields.");
            return;
        }

        
        alert(`Thank you for your order, ${fname} ${lname}!\nHappy Shopping!`);

        
        localStorage.removeItem('cart');

        
        window.location.href = "project.html"; 
    });

    
    document.getElementById("go-back-shopping").addEventListener("click", function() {
        window.location.href = "project.html"; });
});





































/*document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Populate the checkout page with cart items
    function updateCartSummary() {
        const cartItemsContainer = document.getElementById("cart-items");
        let cartHtml = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            cartHtml += `<p>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}</p>`;
        });

        cartItemsContainer.innerHTML = cartHtml;
        document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
    }

    // Update the order summary when page loads
    updateCartSummary();

    // Handle form submission (order confirmation)
    document.getElementById("checkout-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Retrieve form data
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const city = document.getElementById("city").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const paymentMethod = document.getElementById("payment-method").value;

        // Validate form fields
        if (!fname || !lname || !city || !address || !email || !phone || !paymentMethod) {
            alert("Please fill out all the fields.");
            return;
        }

        // Show confirmation message
        alert('Thank you for your order, ${fname} ${lname}!\nHappy Shopping!');

        // Clear the cart from localStorage after order
        localStorage.removeItem('cart');

        // Redirect to the shopping page (replace 'index.html' with the correct URL)
        window.location.href = "index.html";
    });

    // "Go back to shopping" button functionality
    document.getElementById("go-back-shopping").addEventListener("click", function() {
        window.location.href = "index.html"; // Redirect to the shopping page
    });
});*/
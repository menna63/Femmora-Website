document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartSummary() {
        const cartItemsContainer = document.getElementById("cart-items");
        let cartHtml = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            cartHtml += <p>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>;
        });

        cartItemsContainer.innerHTML = cartHtml;
        document.getElementById("total-price").innerText = totalPrice.toFixed(2);
    }

    updateCartSummary();

    document.getElementById("checkout-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const fname = document.getElementById("fname").value.trim();
        const lname = document.getElementById("lname").value.trim();
        const city = document.getElementById("city").value;
        const address = document.getElementById("address").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const paymentMethod = document.getElementById("payment-method").value;

        if (!fname || !lname || !city || !address || !email || !phone || !paymentMethod) {
            alert("Please fill out all the fields.");
            return;
        }

        alert(`Thank you for your order, ${fname} ${lname}!\nHappy Shopping!`);

        localStorage.removeItem('cart');
        window.location.href = "project.html";
    });

    document.getElementById("go-back-shopping").addEventListener("click", function () {
        window.location.href = "project.html";
    });
});
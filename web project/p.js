// Menu Toggle for Mobile (Hamburger Menu)
const menuOpenButton = document.getElementById('menu-open-button');
const menuCloseButton = document.getElementById('menu-close-button');
const navMenu = document.querySelector('.nav-menu');


// When the menu open button (hamburger) is clicked
menuOpenButton.addEventListener('click', () => {
    navMenu.style.display = 'block'; // Show the menu
    menuOpenButton.style.display = 'none'; // Hide the open button
    menuCloseButton.style.display = 'block'; // Show the close button
});

// When the menu close button (X) is clicked
menuCloseButton.addEventListener('click', () => {
    navMenu.style.display = 'none'; // Hide the menu
    menuOpenButton.style.display = 'block'; // Show the open button
    menuCloseButton.style.display = 'none'; // Hide the close button
});

// JavaScript for Authentication Buttons
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");

// Check if the user is already logged in
checkLoginStatus();

if (loginBtn && signupBtn && logoutBtn) {

    // Login functionality
    loginBtn.addEventListener("click", () => {
        const email = prompt("Enter your email:");
        const password = prompt("Enter your password:");

        if (validateEmail(email) && validatePassword(password)) {
            alert("Login successful (simulation)");
            // Store the login status and user info in localStorage
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            loginBtn.classList.add("hidden");
            signupBtn.classList.add("hidden");
            logoutBtn.classList.remove("hidden");
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });

    // Sign Up functionality
    signupBtn.addEventListener("click", () => {
        const email = prompt("Enter your email:");
        const password = prompt("Create a password (min 6 chars):");

        if (validateEmail(email) && validatePassword(password)) {
            alert("Sign Up successful (simulation)");
            // Store the user info in localStorage
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            loginBtn.classList.add("hidden");
            signupBtn.classList.add("hidden");
            logoutBtn.classList.remove("hidden");
        } else {
            alert("Invalid email or weak password. Please try again.");
        }
    });

    // Logout functionality
    logoutBtn.addEventListener("click", () => {
        alert("Logged out successfully!");
        // Remove user login info from localStorage
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userEmail');

        loginBtn.classList.remove("hidden");
        signupBtn.classList.remove("hidden");
        logoutBtn.classList.add("hidden");
    });
}

// Check login status on page load
function checkLoginStatus() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (userLoggedIn === 'true') {
        const userEmail = localStorage.getItem('userEmail');
        alert(`Welcome back, ${userEmail}`);
        loginBtn.classList.add("hidden");
        signupBtn.classList.add("hidden");
        logoutBtn.classList.remove("hidden");
    } else {
        loginBtn.classList.remove("hidden");
        signupBtn.classList.remove("hidden");
        logoutBtn.classList.add("hidden");
    }
}

// Basic Email & Password Validation
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    return password && password.length >= 6;
}

// Sidebar Toggle Functionality
const sidebar = document.querySelector('.sidebar');
const sidebarToggleButton = document.querySelector('.sidebar-toggle-button');
const closeSidebarButton = document.getElementById('sidebar-close');

// Show the sidebar
function openSidebar() {
    sidebar.style.left = '0'; // Slide in the sidebar
    document.body.style.marginLeft = '230px'; // Adjust body layout when sidebar is open
}

// Hide the sidebar
function closeSidebar() {
    sidebar.style.left = '-230px'; // Slide out the sidebar
    document.body.style.marginLeft = '0'; // Restore original body layout
}

// Event listener to toggle the sidebar visibility
sidebarToggleButton.addEventListener('click', () => {
    if (sidebar.style.left === '0px') {
        closeSidebar(); // Close the sidebar if it's already open
    } else {
        openSidebar(); }
});
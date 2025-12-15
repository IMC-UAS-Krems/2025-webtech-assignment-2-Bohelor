let cart = [];
let total = 0;

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

// Remove item from cart
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Update cart display
function updateCart() {
    const cartOverlay = document.getElementById("cartOverlay");
    const cartList = document.getElementById("cartList");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartOverlay || !cartList || !cartTotal) return;

    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
    ${item.name} - $${item.price.toFixed(2)}
    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
    `;
        cartList.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Open/Close cart overlay
function openCart() {
    const cartOverlay = document.getElementById("cartOverlay");
    if (!cartOverlay) return;
    cartOverlay.classList.add("show");
}

function closeCart() {
    const cartOverlay = document.getElementById("cartOverlay");
    if (!cartOverlay) return;
    cartOverlay.classList.remove("show");
}

// Show checkout form (only form, not summary yet)
function showCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Hide cart list and header
    document.getElementById("cartList").style.display = "none";
    document.querySelector(".cart-header").style.display = "none";
    document.querySelector("button[onclick='showCheckout()']").style.display = "none";

    // Show the registration form
    document.getElementById("checkoutForm").style.display = "block";
        const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) {
        cartOverlay.style.display = "none"; // hides the overlay completely
    }

    // Show the registration form
    const checkoutForm = document.getElementById("checkoutForm");
    if (checkoutForm) {
        checkoutForm.style.display = "block";
    }
}

// Submit registration form and show order summary
function submitCheckout() {
    // Form validation
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    if (!firstName || !lastName || !email || !address) {
        alert("Please fill out all fields!");
        return;
    }

    // Hide registration form
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("cartConfirmation").style.display = "block";
}
function showRegistration() {
    // Show confirmation summary
    const confirmation = document.getElementById("cartConfirmation");
    confirmation.style.display = "block";

    const confirmationList = document.getElementById("confirmationList");
    confirmationList.innerHTML = "";

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price;
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        confirmationList.appendChild(li);
    });
    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) {
        cartOverlay.style.display = "none"; 
    }
    const checkoutForm = document.getElementById("checkoutForm");
    if (checkoutForm) {
        checkoutForm.style.display = "block";
    }
    // Discount for 3 or more items
    let discount = 0;
    if (cart.length >= 3) discount = subtotal * 0.1; // 10%

    const tax = (subtotal - discount) * 0.10; // 10% tax
    const totalAmount = subtotal - discount + tax;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("discount").textContent = discount.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("finalTotal").textContent = totalAmount.toFixed(2);

    // Optionally clear cart
    cart = [];
    total = 0;
}
function confirmDonation() {
    alert("Thank you for donating to feed hungry kitties!");
    document.getElementById("cartConfirmation").style.display = "none";
}
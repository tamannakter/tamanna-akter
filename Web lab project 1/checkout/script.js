const cart = JSON.parse(localStorage.getItem('cart')) || {};

const orderSummary = document.querySelector('.order-summary');

function renderOrder() {
  let total = 0;
  orderSummary.innerHTML = '<h2>Your Order</h2>';

  Object.values(cart).forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `<span>${item.name} × ${item.quantity}</span><span>৳${subtotal}</span>`;
    orderSummary.appendChild(div);
  });

  const totalDiv = document.createElement('div');
  totalDiv.className = 'order-total';
  totalDiv.innerHTML = `<strong>Total:</strong><strong>৳${total}</strong>`;
  orderSummary.appendChild(totalDiv);
}

document.getElementById("place-order-btn").addEventListener("click", function () {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();

  // Check if cart is empty
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }

  if (!name || !phone || !address) {
    alert("Please fill out all fields before placing the order.");
    return;
  }

  // Show confirmation
  document.getElementById("order-confirmation").style.display = "block";

  // Clear cart
  localStorage.removeItem("cart");

  // Optionally disable the button
  this.disabled = true;
  this.innerText = "Order Placed";
});



// Run after DOM loaded
document.addEventListener('DOMContentLoaded', renderOrder);

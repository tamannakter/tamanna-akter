const foods = [
  { id: 1, name: "Mughlai paratha", price: 120, img: "./img/image1.jpg" },
  { id: 2, name: "Chotpoti", price: 250, img: "./img/image2.jpg" },
  { id: 3, name: "Roshogolla", price: 180, img: "./img/image3.jpg" },
  { id: 4, name: "Panta Bhat", price: 90, img: "./img/image4.jpg" },
  { id: 5, name: "Mutton Curry", price: 280, img: "./img/image5.jpg" },
  { id: 6, name: "Haleem", price: 90, img: "./img/image6.jpg" },
  { id: 7, name: "Lassi", price: 180, img: "./img/image7.jpg" },
  { id: 8, name: "Nakshi Pitha", price: 140, img: "./img/image8.jpg" },
  { id: 9, name: "Kuli Pitha", price: 100, img: "./img/image9.jpg" },
  { id: 10, name: "Chomchom misty", price: 280, img: "./img/image10.jpg" },


];

const foodList = document.getElementById("food-list");
const cartBtn = document.getElementById("cart-btn");
const cartPopup = document.getElementById("cart-popup");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = {};
let quantities = {};

foods.forEach(food => {
  const item = document.createElement("div");
  item.className = "food-item";
  item.innerHTML = `
    <img src="${food.img}" alt="${food.name}" />
    <h3>${food.name}</h3>
    <p>৳${food.price}</p>
    <div class="qty-control">
      <button onclick="decreaseQty(${food.id})">-</button>
      <span id="qty-${food.id}">1</span>
      <button onclick="increaseQty(${food.id})">+</button>
    </div>
    <button onclick="addToCart(${food.id})">Add to Cart</button>
  `;
  foodList.appendChild(item);
  quantities[food.id] = 1;
});

function increaseQty(id) {
  if (cart[id]) {
    cart[id].quantity++;
    updateCart();
  } else {
    quantities[id]++;
    document.getElementById(`qty-${id}`).innerText = quantities[id];
  }
}

function decreaseQty(id) {
  if (cart[id]) {
    if (cart[id].quantity > 1) {
      cart[id].quantity--;
      updateCart();
    }
  } else {
    if (quantities[id] > 1) {
      quantities[id]--;
      document.getElementById(`qty-${id}`).innerText = quantities[id];
    }
  }
}

function addToCart(id) {
  const qty = quantities[id];
  const food = foods.find(f => f.id === id);
  if (!cart[id]) {
    cart[id] = { ...food, quantity: qty };
  } else {
    cart[id].quantity += qty;
  }
  quantities[id] = 1;
  document.getElementById(`qty-${id}`).innerText = 1;
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;
  Object.values(cart).forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" />
      <div class="cart-item-details">
        <strong>${item.name}</strong><br>
        <div class="item-mul">
            <h3>৳${item.price} ×</h3>
            <div class="qty-control">
                <button onclick="decreaseQty(${item.id})">-</button>
                <span id="qty-cart-${item.id}">${item.quantity}</span>
                <button onclick="increaseQty(${item.id})">+</button>
            </div>
            <button onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });
  cartCount.innerText = count;
  cartTotal.innerText = total;

  // ✅ Correct saving to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}


function removeItem(id) {
  delete cart[id];
  updateCart();
}

cartBtn.addEventListener("click", () => {
  cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
});

window.onload = function () {
  const introShown = localStorage.getItem("introShown");

  if (introShown) {
    document.getElementById("introPage").style.display = "none";
    document.getElementById("container").style.display = "block";
  } else {
    document.getElementById("introPage").style.display = "block";
    document.getElementById("container").style.display = "none";
  }

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart); // ✅ assign to global `cart` variable
    updateCart(); // ✅ re-render from the cart
  }
};


function showMainPage() {
  localStorage.setItem("introShown", "true");
  document.getElementById("introPage").style.display = "none";
  document.getElementById("container").style.display = "block";
}
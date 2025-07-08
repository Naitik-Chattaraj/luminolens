const productGrid = document.getElementById('product-grid');
const loadMoreBtn = document.getElementById('load-more');
const cartSummary = document.getElementById('cart-summary');

let currentIndex = 1;
const perPage = 4;
const maxProducts = 5;
    const productNames = [
  "Lumino Flexo",
  "Lovino Smart",
  "Clarity Shield Pro",
  "LumoGuard Alpha",
  "UV Breaker Pro",
  "Pixel Protect Max",
  "NightSight Vision",
  "GlareSafe Ultra",
  "OptiGuard X",
  "VisionPro Elite"
];
function loadProducts() {
  const remaining = maxProducts - currentIndex + 1;
  const count = Math.min(perPage, remaining);
const productPrices = [399, 499, 299, 599, 699, 450, 550, 620, 480, 520];
  for (let i = currentIndex; i < currentIndex + count; i++) {
const product = {
  id: i,
  name: productNames[i - 1],
  price: productPrices[i - 1],
  image: `media/product${i}.png`
};

    

    const card = document.createElement('div');
    card.className = 'cards';
    card.innerHTML = `
      <div class="media-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <video class="product-video" muted loop preload="none">
          <source src="media/product${i}.mp4" type="video/mp4" />
        </video>
      </div>
      <h2>${product.name}</h2>
      <p>₹${product.price}</p>
      <div style="padding: 0 1rem 1rem;">
        <button onclick="location.href='product.html?id=${product.id}'">View</button>
      </div>
    `;

    const video = card.querySelector('video');
    card.addEventListener('mouseenter', () => video.play());
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });

    productGrid.appendChild(card);
  }

  currentIndex += count;

  if (currentIndex > maxProducts) {
    loadMoreBtn.style.display = 'none';
  }
}

function getCart() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const key = user ? `user_cart_${user.id}` : "guest_cart";
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function updateCartSummary() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const key = user ? `user_cart_${user.id}` : "guest_cart";
  const cart = JSON.parse(localStorage.getItem(key) || "[]");

  if (!cart.length) {
    cartSummary.innerHTML = "<h3>Your cart is empty.</h3>";
    return;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartSummary.innerHTML = `
    <h3>Your Cart</h3>
    <p><strong>${totalItems}</strong> items | <strong>₹${totalPrice}</strong> total</p>
    <button onclick="location.href='cart.html'">Go to Cart</button>
  `;
}


loadProducts();
updateCartSummary();

loadMoreBtn.addEventListener('click', loadProducts);

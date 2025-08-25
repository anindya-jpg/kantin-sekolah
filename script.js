//Toggle class active
const navbarNav = document.querySelector
('.navbar-nav');

//ketika menu di klik//
document.querySelector('#menu').onclick = ( ) => 
  {navbarNav.classList.toggle ('active').onclick}



// === Shopping Cart ===
let cart = [];
const cartCount = document.getElementById("cart-count");

// tombol pesan
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", function() {
    const name = this.dataset.name;
    const img = this.dataset.img;

    // ambil harga dari select varian
    const varianSelect = this.parentElement.querySelector(".menu-varian");
    const price = varianSelect ? parseInt(varianSelect.value) : 0;
    const varianText = varianSelect 
      ? varianSelect.options[varianSelect.selectedIndex].text 
      : "-";

    // ambil level / bumbu
    const levelSelect = this.parentElement.querySelector(".menu-level");
    const levelText = levelSelect 
      ? levelSelect.options[levelSelect.selectedIndex].text 
      : "-";

    // item yang masuk keranjang
    const item = { name, price, varian: varianText, level: levelText };
    cart.push(item);

    updateCartUI();
  });
});

const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

// buka sidebar
document.getElementById("shopping-cart").addEventListener("click", (e) => {
  e.preventDefault();
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
});

// tutup sidebar
cartOverlay.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

// update keranjang
function updateCartUI() {
  if (cart.length > 0) {
    cartCount.style.display = "inline-block";
    cartCount.textContent = cart.length;
  } else {
    cartCount.style.display = "none";
  }

  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong>${item.name}</strong><br>
          Varian: ${item.varian}<br>
          Pilihan: ${item.level}<br>
          Rp ${item.price.toLocaleString()}
        </div>
        <button class="remove-item" data-index="${index}" 
          style="margin-left:10px; color:red; background:none; border:none; cursor:pointer;">
          ✖
        </button>
      </div>
    `;
    cartItemsList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toLocaleString();

  // event hapus item
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", function() {
      const idx = this.dataset.index;
      cart.splice(idx, 1);   // hapus dari array
      updateCartUI();        // refresh ulang tampilan keranjang
    });
  });
}



// Payment Sidebar
const paymentSidebar = document.getElementById("payment-sidebar");
const paymentTotal = document.getElementById("payment-total");
const paymentMethod = document.getElementById("payment-method");
const qrisSection = document.getElementById("qris-section");
const cashSection = document.getElementById("cash-section");
const payNowBtn = document.getElementById("pay-now-btn");


// Klik checkout di cart → buka payment sidebar
checkoutBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");       // tutup cart
  paymentSidebar.classList.add("active");       // buka payment
  cartOverlay.classList.add("active");          // overlay aktif
  paymentTotal.textContent = cartTotal.textContent; // total ikut cart
});

// Pilih metode pembayaran → tampilkan section sesuai
paymentMethod.addEventListener("change", () => {
  if(paymentMethod.value === "qris") {
    qrisSection.style.display = "block";
    cashSection.style.display = "none";
  } else {
    qrisSection.style.display = "none";
    cashSection.style.display = "block";
  }
});

// Klik payment bayar
payNowBtn.addEventListener("click", () => {
  // tutup sidebar payment
  paymentSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");

  // kosongkan keranjang
  cart = [];
  updateCartUI();

// Klik overlay → tutup semua sidebar
cartOverlay.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  paymentSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

  // notifikasi diatas
  alert("Terima kasih, pesanan Anda sedang diproses!");
});




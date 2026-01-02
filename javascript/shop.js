const products = [
  // Women 
  { id: 'w1', name: 'My Way | Armani', category: 'women', price: 79.99, img: '../images/image1.jpg' },
  { id: 'w2', name: 'African Leather | Memo Paris', category: 'women', price: 69.99, img: '../images/image2.jpg' },
  { id: 'w3', name: 'Angels Share Anniversary Edition | Kilian', category: 'women', price: 89.99, img: '../images/image3.jpg' },
  { id: 'w4', name: 'Arabians Tonka | Montale', category: 'women', price: 99.99, img: '../images/image4.jpg' },
  { id: 'w5', name: 'Jasmin Noir | Bvlgari', category: 'women', price: 109.99, img: '../images/image5.jpg' },
  { id: 'w6', name: 'Good Girl | Carolina Herrera', category: 'women', price: 59.99, img: '../images/image6.jpg' },
  { id: 'w7', name: 'Ari | Ariana Grande', category: 'women', price: 59.99, img: '../images/image21.jpg' },
  { id: 'w8', name: 'Gabrielle | Chanel', category: 'women', price: 69.99, img: '../images/image22.jpg' },


  // Men 
  { id: 'm1', name: 'Dolce Gabana', category: 'men', price: 120.00, img: '../images/image8.jpg' },
  { id: 'm2', name: 'Ambassador Men | Gisada', category: 'men', price: 95.00, img: '../images/image9.jpg' },
  { id: 'm3', name: 'Amouage', category: 'men', price: 110.00, img: '../images/image10.jpg' },
  { id: 'm4', name: 'Sauvage Elixir | Dior', category: 'men', price: 85.00, img: '../images/image13.jpg' },
  { id: 'm5', name: 'Code Man | Armani', category: 'men', price: 99.99, img: '../images/image11.jpg' },
  { id: 'm6', name: 'Bleu | Chanel', category: 'men', price: 75.00, img: '../images/image12.jpg' },
  { id: 'm7', name: 'Baccarat Rouge 540 Extrait | Kurkdjian', category: 'men', price: 75.00, img: '../images/image23.jpg' },
  { id: 'm8', name: 'Valentino Uomo Born In Roma Intens', category: 'men', price: 95.00, img: '../images/image25.jpg' },


  // Unisex 
  { id: 'u1', name: 'YSL', category: 'unisex', price: 69.00, img: '../images/image14.jpg' },
  { id: 'u2', name: 'Oud Satin Mood | Kurkdjian', category: 'unisex', price: 88.00, img: '../images/image15.jpg' },
  { id: 'u3', name: 'Kirke | Tiziana Terenzi', category: 'unisex', price: 78.50, img: '../images/image16.jpg' },
  { id: 'u4', name: 'Myrrhe Mystere | Tom Ford', category: 'unisex', price: 99.00, img: '../images/image17.jpg' },
  { id: 'u5', name: 'Vodka on the Rocks | Kilian', category: 'unisex', price: 82.00, img: '../images/image18.jpg' },
  { id: 'u6', name: 'More Than Words | Xerjoff', category: 'unisex', price: 92.00, img: '../images/image20.jpg' },
  { id: 'u7', name: 'Fucking Fabulous | Tom Ford', category: 'unisex', price: 92.00, img: '../images/image26.jpg' },
  { id: 'u8', name: 'Cherry Smoke | Tom Ford', category: 'unisex', price: 92.00, img: '../images/image27.jpg' },

];
/* RENDERS PRODUCTS */

const productsNode = document.getElementById('products');
function renderProducts(list) {
  productsNode.innerHTML = '';

  list.map(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
          <img src="${p.img}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p class="desc">Category: ${p.category}</p>
          <div class="price">$${p.price.toFixed(2)}</div>
          <button class="add-btn" data-id="${p.id}">Add to cart</button>
        `;
    productsNode.appendChild(div);
  });
}
/* FILTERING PRODUCTS */

const categorySelect = document.getElementById('category');
const searchInput = document.getElementById('search');

function getFiltered() {
  const cat = categorySelect.value;
  const q = searchInput.value.trim().toLowerCase();
  return products.filter(p => (cat === 'all' || p.category === cat) && (p.name.toLowerCase().includes(q) || p.category.includes(q)));
}


renderProducts(products);

categorySelect.addEventListener('change', () => renderProducts(getFiltered()));
searchInput.addEventListener('input', () => renderProducts(getFiltered()));
document.getElementById('clearFilters').addEventListener('click', () => {
  categorySelect.value = 'all'; searchInput.value = '';
  renderProducts(products);
});
/*  CART FUNCTIONALITY */

let cart = [];

function saveCartToStorage() { localStorage.setItem('aroma_cart', JSON.stringify(cart)); }
function loadCartFromStorage() { const raw = localStorage.getItem('aroma_cart'); cart = raw ? JSON.parse(raw) : []; }

function findProductById(id) { return products.find(p => p.id === id); }

function addToCart(id) {
  const found = cart.find(it => it.id === id);
  if (found) { found.qty += 1; }
  else { cart.push({ id, qty: 1 }); }
  saveCartToStorage();
  renderCart();
  // efekt me jQuery
  $('#cartList').fadeOut(120).fadeIn(350);
}


function updateQty(id, qty) {
  cart = cart.map(it => it.id === id ? { ...it, qty: Number(qty) } : it).filter(it => it.qty > 0);
  saveCartToStorage(); renderCart();
}
/* REMOVE FROM CART */

function removeFromCart(id) {
  cart = cart.filter(it => it.id !== id);
  saveCartToStorage(); renderCart();
  $('#cartList').slideUp(100).slideDown(250);
}


function totals() {
  const items = cart.map(it => {
    const p = findProductById(it.id);
    return { ...p, qty: it.qty, line: p.price * it.qty };
  });
  const subtotal = items.reduce((s, i) => s + i.line, 0);
  const shipping = items.length ? 5.00 : 0;
  const grand = subtotal + shipping;
  return { items, subtotal, shipping, grand };
}
/* RENDER CART */

function renderCart() {
  const listNode = document.getElementById('cartList');
  const totalsArea = document.getElementById('totalsArea');
  listNode.innerHTML = '';
  if (cart.length === 0) {
    listNode.innerHTML = '<i style="color:#cfc6b8">The cart is empty-add a product.</i>';
    totalsArea.hidden = true;
    document.getElementById('payBtn').disabled = true;
    return;
  }

  const { items, subtotal, shipping, grand } = totals();
  items.forEach(it => {
    const node = document.createElement('div');
    node.className = 'cart-item';
    node.innerHTML = `
          <img src="${it.img}" alt="${it.name}">
          <div class="meta">
            <b>${it.name}</b>
            <div style="font-size:.85rem;color:#cfc6b8">$${it.price.toFixed(2)} x ${it.qty}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
            <div class="qty">
              <button class="dec" data-id="${it.id}">-</button>
              <input class="qtyInput" data-id="${it.id}" value="${it.qty}" type="number" min="1">
              <button class="inc" data-id="${it.id}">+</button>
            </div>
            <button class="remove" data-id="${it.id}" style="background:#2a2a2a;border:1px solid #333;color:#cfc6b8;padding:6px;border-radius:6px;cursor:pointer">Remove</button>
          </div>
        `;
    listNode.appendChild(node);
  });
  /* UPDATE TOTALS */

  document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById('shipping').innerText = `$${shipping.toFixed(2)}`;
  document.getElementById('grandTotal').innerText = `$${grand.toFixed(2)}`;
  totalsArea.hidden = false;


  document.getElementById('payBtn').disabled = false;


  document.querySelectorAll('.inc').forEach(b => b.onclick = e => {
    const id = e.target.dataset.id; const it = cart.find(x => x.id === id); it.qty++; saveCartToStorage(); renderCart();
  });
  document.querySelectorAll('.dec').forEach(b => b.onclick = e => {
    const id = e.target.dataset.id; const it = cart.find(x => x.id === id); it.qty = Math.max(1, it.qty - 1); saveCartToStorage(); renderCart();
  });
  document.querySelectorAll('.remove').forEach(b => b.onclick = e => removeFromCart(e.target.dataset.id));
  document.querySelectorAll('.qtyInput').forEach(inp => inp.onchange = e => {
    const id = e.target.dataset.id; const val = Number(e.target.value) || 1; updateQty(id, val);
  });
}
/* ADD TO CART BUTTONS */

productsNode.addEventListener('click', (e) => {
  if (e.target.matches('.add-btn')) {
    const id = e.target.dataset.id;
    addToCart(id);
  }
});
/* CHECKOUT FORM */


loadCartFromStorage();
renderCart();


const checkoutForm = document.getElementById('checkoutForm');
const payBtn = document.getElementById('payBtn');
const formMsg = document.getElementById('formMsg');


function checkFormReady() {
  const validHtml = checkoutForm.checkValidity();
  const cartOk = cart.length > 0;
  payBtn.disabled = !(validHtml && cartOk);
}

/* CHECK FORM INPUTS */
checkoutForm.addEventListener('input', checkFormReady);
window.addEventListener('storage', () => { loadCartFromStorage(); renderCart(); checkFormReady(); });

checkoutForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const email = document.getElementById('cemail').value.trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    formMsg.innerText = 'Email is not valid. Please enter a valid email address.';
    return;
  }
  if (cart.length === 0) {
    formMsg.innerText = 'The cart is empty.';
    return;
  }

  /*  PROCESS ORDER */
  const orderItems = cart.map(ci => {
    const p = findProductById(ci.id);
    return { id: p.id, name: p.name, unit: p.price, qty: ci.qty, line: (p.price * ci.qty) };
  });

  /* IDENTIFY BIG LINES */
  const bigLines = orderItems.filter(it => it.line > 90);


  const subtotal = orderItems.reduce((s, i) => s + i.line, 0);
  const shipping = orderItems.length ? 5.00 : 0;
  const grand = subtotal + shipping;


  formMsg.style.color = '#cfc6b8';
  formMsg.innerText = 'We are processing your order...';
  payBtn.disabled = true;
  /* SIMULATE PROCESSING DELAY */
  setTimeout(() => {

    const orderId = 'ORD' + Math.floor(Math.random() * 90000 + 10000);

    document.getElementById('successModal').style.display = 'flex';

    document.getElementById('orderSummary').innerText = `
          Thank you!, ${document.getElementById('cname').value}!
          Order ${orderId} created. Total: €${grand.toFixed(2)}.

          Large items (line>90€): ${bigLines.map(b => b.name).join(', ') || 'None'}.
        `;


    cart = []; saveCartToStorage(); renderCart();
    checkoutForm.reset();
    formMsg.innerText = 'Order placed successfully!';
    payBtn.disabled = true;
  }, 1100);
});
/* CLOSE MODAL */


const closeBtn = document.getElementById('closeModal');
const successModal = document.getElementById('successModal');

if (closeBtn && successModal) {
  closeBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
  });
}
/* INITIAL CHECK FORM */


checkFormReady();


$('#search').on('input', function () {
  $('#products').fadeTo(120, 0.6).fadeTo(120, 1);
});


categorySelect.addEventListener('change', () => renderProducts(getFiltered()));
searchInput.addEventListener('input', () => renderProducts(getFiltered()));


renderProducts(products);


document.getElementById('search').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); renderProducts(getFiltered()); }
});


//Funksionni per rregullim te scroll te headerit
$(function () {
  let lastScrollTop = 0;
  const nav = $('.nav-container');
  $(window).on('scroll', function () {
    let st = $(this).scrollTop();
    if (st > lastScrollTop && st > 120) {
      nav.css({
        transform: 'translateY(-100%)',
        transition: 'transform 0.3s ease'
      });
    } else {
      nav.css({
        transform: 'translateY(0)',
        transition: 'transform 0.3s ease'
      });
    }
    lastScrollTop = st;
  });
});

//Funksioni per butonin "Back to Top"
$(document).ready(function () {
  $('body').append('<div id="backToTop">&#8679;</div>');

  var backToTop = $('#backToTop');

  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      backToTop.fadeIn(300);
    } else {
      backToTop.fadeOut(300);
    }
  });
  backToTop.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
    return false;
  });
});



// Dados Mockados - Apenas Bolos Simples (Com rawPrice para cálculo)
const menuData = [
  {
    id: 1,
    title: "Bolo de Cenoura",
    description: "Clássico imperdível. Massa fofinha de cenoura com uma generosa cobertura de chocolate caseiro.",
    rawPrice: 35.00,
    price: "R$ 35,00",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Bolo de Fubá com Erva Doce",
    description: "Sabor de casa de vó! Fubá molhadinho com toque de erva doce. Ideal para acompanhar um café.",
    rawPrice: 30.00,
    price: "R$ 30,00",
    image: "https://images.unsplash.com/photo-1614707683935-460d65ff9bc6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Bolo de Laranja Caseiro",
    description: "Receita de família. Massa super leve, fofa e muito cheirosa, finalizada com calda natural.",
    rawPrice: 32.00,
    price: "R$ 32,00",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Bolo Formigueiro",
    description: "Alegria da criançada! Massa branca macia com granulados de chocolate derretidos por dentro.",
    rawPrice: 35.00,
    price: "R$ 35,00",
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Bolo de Milho Verde",
    description: "Feito com milho verde fresquinho. Cremoso na medida certa com aquele sabor do campo.",
    rawPrice: 38.00,
    price: "R$ 38,00",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Bolo Mesclado",
    description: "União perfeita da massa fofa de baunilha com chocolate. Impossível comer uma fatia só.",
    rawPrice: 35.00,
    price: "R$ 35,00",
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=800&auto=format&fit=crop"
  }
];

const menuGrid = document.getElementById('menu-grid');

// Estado do Carrinho
let cart = [];

// Inicialização
function init() {
  renderMenu();
  setupNavbarScroll();
  setupScrollReveal();
  updateCartUI();
  
  // Bind funções no window para chamadas inline (do HTML)
  window.toggleCart = toggleCart;
  window.addToCart = addToCart;
  window.updateQuantity = updateQuantity;
  window.sendOrderToWhatsApp = sendOrderToWhatsApp;
}

// Lógica de Scroll da Navbar
function setupNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Animações de Entrada (Intersection Observer)
function setupScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Renderizar Menu com botão Adicionar ao Carrinho
function renderMenu() {
  menuGrid.innerHTML = '';
  
  if (menuData.length === 0) {
    menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-primary); font-size: 1.2rem;">Cardápio em atualização...</p>';
    return;
  }
  
  menuData.forEach((item, index) => {
    const card = document.createElement('div');
    const rotateClass = index % 2 === 0 ? 'note-rotate' : 'note-rotate-alt';
    const delayClass = index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : '';
    card.className = `menu-card reveal ${delayClass} ${rotateClass}`;
    
    card.innerHTML = `
      <div class="tape-piece"></div>
      <div class="menu-card-price-badge">${item.price}</div>
      <div class="menu-card-img-container">
        <img src="${item.image}" alt="${item.title}" class="menu-card-img" loading="lazy">
      </div>
      <div class="menu-card-content">
        <h3 class="menu-card-title">${item.title}</h3>
        <p class="menu-card-desc">${item.description}</p>
        <div class="menu-card-footer-stacked">
          <button class="menu-card-add-btn w-100" onclick="addToCart(${item.id})">+ Adicionar</button>
          <a href="https://wa.me/5500000000000?text=Ol%C3%A1!%20Gostaria%20de%20pedir%3A%20${encodeURIComponent(item.title)}%20%E2%80%94%20${encodeURIComponent(item.price)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-outline w-100">WhatsApp</a>
        </div>
      </div>
    `;
    
    menuGrid.appendChild(card);
  });

  setupScrollReveal();
}

// ==========================================
// LÓGICA DO CARRINHO
// ==========================================

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

function addToCart(productId) {
  const product = menuData.find(item => item.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartUI();
  
  // Feedback visualzinho maroto para o botão do carrinho flutuante pulsar
  const btn = document.getElementById('cart-floating-btn');
  btn.style.transform = 'scale(1.2) translateY(-5px)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

function updateQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;

  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  updateCartUI();
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotalPrice = document.getElementById('cart-total-price');
  
  // Atualizar contagem no ícone
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.innerText = totalItems;
  
  // Atualizar itens no painel
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align: center; margin-top: 2rem; opacity: 0.6;">Seu carrinho está vazio.</p>';
    cartTotalPrice.innerText = 'R$ 0,00';
    return;
  }

  let totalValue = 0;

  cart.forEach(item => {
    totalValue += (item.rawPrice * item.quantity);
    
    const itemTotalFormatted = (item.rawPrice * item.quantity).toFixed(2).replace('.', ',');
    
    const cartItemEl = document.createElement('div');
    cartItemEl.className = 'cart-item';
    cartItemEl.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <div class="cart-item-price">R$ ${itemTotalFormatted}</div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-btn-qty" onclick="updateQuantity(${item.id}, -1)">-</button>
        <span class="cart-item-qty">${item.quantity}</span>
        <button class="cart-btn-qty" onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemEl);
  });

  // Atualizar total
  cartTotalPrice.innerText = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
}

// Geração de Link para o WhatsApp
function sendOrderToWhatsApp() {
  if (cart.length === 0) {
    alert("Adicione pelo menos um bolo ao carrinho antes de pedir!");
    return;
  }

  const phone = "5500000000000"; // INSIRA O NÚMERO REAL AQUI (Código do País + DDD + Número)
  
  let message = "Olá! Gostaria de fazer o seguinte pedido da *Sabor de Casa*:%0A%0A";
  
  let totalValue = 0;
  cart.forEach(item => {
    totalValue += (item.rawPrice * item.quantity);
    message += `▪ ${item.quantity}x ${item.title} - R$ ${(item.rawPrice * item.quantity).toFixed(2).replace('.', ',')}%0A`;
  });
  
  message += `%0A*Total: R$ ${totalValue.toFixed(2).replace('.', ',')}*%0A%0A`;
  message += "Qual a chave PIX para pagamento e o tempo estimado?";

  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
  
  window.open(whatsappUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', init);

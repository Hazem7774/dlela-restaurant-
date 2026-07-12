// ============================================
// EDLALA — الدلالة — site interactions
// Pure static site: no backend required.
// To edit menu/gallery content, edit the arrays below.
// ============================================

document.getElementById('year').textContent = new Date().getFullYear();

const RESTAURANT_WHATSAPP = '21625035034'; // format international sans le +

/* ---------- Header scroll state + progress bar ---------- */
const header = document.getElementById('siteHeader');
const tide = document.getElementById('tideProgress');

function onScroll(){
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  tide.style.width = docH > 0 ? (y / docH * 100) + '%' : '0%';
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mainNav.classList.remove('open'));
});

/* ---------- Reveal on scroll ---------- */
document.querySelectorAll('section > *').forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ============================================
   MENU DATA
   ============================================ */
const MENU = {
  salades: [
    { name:'Salade méchouia', desc:'Poivrons et tomates grillés, thon, œuf', price:'10 DT' },
    { name:'Salade tunisienne', desc:'Tomate, concombre, oignon, olives', price:'12 DT' },
    { name:'Salade César', desc:'', price:'30 DT' },
    { name:'Salade pêcheur', desc:'Fruits de mer', price:'32 DT' },
    { name:'Salade trio Edlala', desc:'', price:'34 DT' },
  ],
  plats: [
    { name:'Escalope grillée', desc:'', price:'25 DT' },
    { name:'Escalope panée', desc:'', price:'28 DT' },
    { name:'Plat dorade', desc:'', price:'26 DT' },
    { name:'Plat loup', desc:'', price:'29 DT' },
    { name:'Suprême de poulet à la crème', desc:'', price:'30 DT' },
    { name:'Filet de dorade sauce crevette', desc:'', price:'35 DT' },
    { name:'Plat crevette grillée', desc:'', price:'38 DT' },
    { name:'Plat crevette panée', desc:'', price:'39 DT' },
    { name:'Plat saumon', desc:'', price:'40 DT' },
    { name:'Plat mixte', desc:'Pour une personne', price:'47 DT' },
    { name:'Saumon Edlala', desc:'', price:'49 DT' },
    { name:'Plat saumon sauce crevette', desc:'', price:'49 DT' },
    { name:'Fruits de mer sautés à l\'ail', desc:'', price:'52 DT' },
    { name:'Chtar Chario', desc:'', price:'125 DT' },
    { name:'Chario Edlala', desc:'', price:'198 DT' },
    { name:'Chario Royale Extra Edlala', desc:'', price:'348 DT' },
  ],
  entrees: [
    { name:'Brick au thon', desc:'', price:'6 DT' },
    { name:'Brick crevette', desc:'', price:'8 DT' },
    { name:'Plat frites', desc:'', price:'10 DT' },
    { name:'Plat Mo9li', desc:'', price:'13 DT' },
    { name:'Moules-frites', desc:'', price:'29 DT' },
    { name:'Ojja fruits de mer', desc:'', price:'38 DT' },
    { name:'Gratin fruits de mer', desc:'', price:'45 DT' },
  ],
  pates: [
    { name:'Spaghetti putanesca', desc:'', price:'32 DT' },
    { name:'Spaghetti bolognaise', desc:'', price:'35 DT' },
    { name:'Spaghetti fruits de mer', desc:'', price:'42 DT' },
    { name:'Tagliatelle fruits de mer sauce rosée', desc:'', price:'42 DT' },
    { name:'Riz fruits de mer', desc:'', price:'44 DT' },
    { name:'Spaghetti saumon sauce rosée', desc:'', price:'44 DT' },
    { name:'Spaghetti aglio olio', desc:'Boutargue', price:'46 DT' },
  ],
  enfants: [
    { name:'Plat nuggets', desc:'Menu enfant', price:'22 DT' },
    { name:'Plat garniture 5amsa w 5mis', desc:'', price:'35 DT' },
    { name:'Tabouna', desc:'', price:'3 DT' },
  ],
  desserts: [
    { name:'1 boule de glace', desc:'', price:'5 DT' },
    { name:'2 boules de glace', desc:'', price:'8 DT' },
    { name:'Cheesecake au choix', desc:'', price:'10 DT' },
    { name:'Salade de fruits de saison', desc:'', price:'10 DT' },
  ],
  boissons: [
    { name:'Eau 1L', desc:'', price:'3 DT' },
    { name:'Garsi', desc:'', price:'4 DT' },
    { name:'Soda', desc:'', price:'4 DT' },
    { name:'Café express', desc:'Capsule', price:'5 DT' },
    { name:'Citronnade', desc:'', price:'6 DT' },
    { name:'Schweppes', desc:'', price:'6 DT' },
    { name:'Jus fraise', desc:'', price:'7 DT' },
    { name:'Jus mangue', desc:'', price:'8 DT' },
    { name:'Jus kiwi', desc:'', price:'8 DT' },
    { name:'Citronnade aux amandes', desc:'', price:'8,5 DT' },
    { name:'Celtia sans alcool', desc:'', price:'9 DT' },
    { name:'Shark', desc:'', price:'10 DT' },
  ]
};

const CATCH_OF_DAY = ['Loup de mer','Dorade','Poulpe','Crevettes royales','Calamars','Rouget','Sole','Pageot'];

function renderMenu(cat){
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';
  MENU[cat].forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'menu-item';
    el.style.animationDelay = (i * 0.06) + 's';
    const orderMsg = encodeURIComponent(`Bonjour Edlala, je voudrais commander : ${item.name}`);
    const descHtml = item.desc ? `<div class="menu-item-desc">${item.desc}</div>` : '';
    el.innerHTML = `
      <div>
        <div class="menu-item-name">${item.name}</div>
        ${descHtml}
        <a class="order-link" href="https://wa.me/${RESTAURANT_WHATSAPP}?text=${orderMsg}" target="_blank" rel="noopener">Commander →</a>
      </div>
      <div class="menu-item-price">${item.price}</div>
    `;
    grid.appendChild(el);
  });
}
renderMenu('salades');

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.cat);
  });
});

/* ---------- Criée ticker ---------- */
const track = document.getElementById('criee-track');
function buildTicker(){
  const items = CATCH_OF_DAY.map(f => `<span>${f} <span class="dot">•</span></span>`).join('');
  track.innerHTML = items + items;
}
buildTicker();

/* ============================================
   GALLERY DATA
   ============================================ */
const GALLERY = [
  { src:'images/galerie-1.jpg', alt:'Plateau de fruits de mer', size:'wide' },
  { src:'images/galerie-2.jpg', alt:'Poisson grillé', size:'' },
  { src:'images/galerie-3.jpg', alt:'Poissonnerie, étal du jour', size:'tall' },
  { src:'images/galerie-4.jpg', alt:'Salle du restaurant', size:'' },
  { src:'images/galerie-5.jpg', alt:'Crevettes grillées', size:'' },
  { src:'images/galerie-6.jpg', alt:'Terrasse en bord de mer', size:'wide' },
];

function renderGallery(){
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  GALLERY.forEach(g => {
    const el = document.createElement('div');
    el.className = 'gallery-item photo-slot ' + g.size;
    el.dataset.bg = g.src;
    el.innerHTML = `<span class="img-fallback">📷 ${g.src}</span>`;
    grid.appendChild(el);
  });
  loadPhotoSlots();
}
renderGallery();

/* ---------- Auto-detect real photos ---------- */
function loadPhotoSlots(){
  document.querySelectorAll('.photo-slot[data-bg]').forEach(el => {
    const src = el.dataset.bg;
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url('${src}')`;
      el.classList.add('loaded');
    };
    img.onerror = () => { el.classList.remove('loaded'); };
    img.src = src;
  });
}
loadPhotoSlots();

/* ---------- Reservation form -> WhatsApp ---------- */
document.getElementById('reservationForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('resName').value.trim();
  const phone = document.getElementById('resPhone').value.trim();
  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const guests = document.getElementById('resGuests').value;
  const note = document.getElementById('resNote').value.trim();

  let msg = `Bonjour Edlala, je souhaite réserver une table.\n`;
  msg += `Nom: ${name}\n`;
  msg += `Téléphone: ${phone}\n`;
  msg += `Date: ${date}\n`;
  msg += `Heure: ${time}\n`;
  msg += `Personnes: ${guests}`;
  if(note) msg += `\nNote: ${note}`;

  const url = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
});

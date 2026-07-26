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
    { name:'Salade méchouia', desc:'Poivrons et tomates grillés, thon, œuf', price:'10 DT', img:'images/menu/salade-mechouia.jpg' },
    { name:'Salade tunisienne', desc:'Tomate, concombre, oignon, olives', price:'12 DT', img:'images/menu/salade-tunisienne.jpg' },
    { name:'Salade César', desc:'', price:'30 DT', img:'images/menu/salade-cesar.jpg' },
    { name:'Salade pêcheur', desc:'Fruits de mer', price:'32 DT', img:'images/menu/salade-pecheur.jpg' },
    { name:'Salade trio Edlala', desc:'', price:'34 DT', img:'images/menu/salade-trio-edlala.jpg' },
  ],
  plats: [
    { name:'Escalope grillée', desc:'', price:'25 DT', img:'images/menu/escalope-grillee.jpg' },
    { name:'Escalope panée', desc:'', price:'28 DT', img:'images/menu/escalope-panee.jpg' },
    { name:'Plat dorade', desc:'', price:'26 DT', img:'images/menu/plat-dorade.jpg' },
    { name:'Plat loup', desc:'', price:'29 DT', img:'images/menu/plat-loup.jpg' },
    { name:'Suprême de poulet à la crème', desc:'', price:'30 DT', img:'images/menu/supreme-de-poulet-a-la-creme.jpg' },
    { name:'Filet de dorade sauce crevette', desc:'', price:'35 DT', img:'images/menu/filet-de-dorade-sauce-crevette.jpg' },
    { name:'Plat crevette grillée', desc:'', price:'38 DT', img:'images/menu/plat-crevette-grillee.jpg' },
    { name:'Plat crevette panée', desc:'', price:'39 DT', img:'images/menu/plat-crevette-panee.jpg' },
    { name:'Plat saumon', desc:'', price:'40 DT', img:'images/menu/plat-saumon.jpg' },
    { name:'Plat mixte', desc:'Pour une personne', price:'47 DT', img:'images/menu/plat-mixte.jpg' },
    { name:'Saumon Edlala', desc:'', price:'49 DT', img:'images/menu/saumon-edlala.jpg' },
    { name:'Plat saumon sauce crevette', desc:'', price:'49 DT', img:'images/menu/plat-saumon-sauce-crevette.jpg' },
    { name:'Fruits de mer sautés à l\'ail', desc:'', price:'52 DT', img:'images/menu/fruits-de-mer-sautes-a-l-ail.jpg' },
    { name:'Chtar Chario', desc:'', price:'125 DT', img:'images/menu/chtar-chario.jpg' },
    { name:'Chario Edlala', desc:'', price:'198 DT', img:'images/menu/chario-edlala.jpg' },
    { name:'Chario Royale Extra Edlala', desc:'', price:'348 DT', img:'images/menu/chario-royale-extra-edlala.jpg' },
  ],
  entrees: [
    { name:'Brick au thon', desc:'', price:'6 DT', img:'images/menu/brick-au-thon.jpg' },
    { name:'Brick crevette', desc:'', price:'8 DT', img:'images/menu/brick-crevette.jpg' },
    { name:'Plat frites', desc:'', price:'10 DT', img:'images/menu/plat-frites.jpg' },
    { name:'Plat Mo9li', desc:'', price:'13 DT', img:'images/menu/plat-mo9li.jpg' },
    { name:'Moules-frites', desc:'', price:'29 DT', img:'images/menu/moules-frites.jpg' },
    { name:'Ojja fruits de mer', desc:'', price:'38 DT', img:'images/menu/ojja-fruits-de-mer.jpg' },
    { name:'Gratin fruits de mer', desc:'', price:'45 DT', img:'images/menu/gratin-fruits-de-mer.jpg' },
  ],
  pates: [
    { name:'Spaghetti putanesca', desc:'', price:'32 DT', img:'images/menu/spaghetti-putanesca.jpg' },
    { name:'Spaghetti bolognaise', desc:'', price:'35 DT', img:'images/menu/spaghetti-bolognaise.jpg' },
    { name:'Spaghetti fruits de mer', desc:'', price:'42 DT', img:'images/menu/spaghetti-fruits-de-mer.jpg' },
    { name:'Tagliatelle fruits de mer sauce rosée', desc:'', price:'42 DT', img:'images/menu/tagliatelle-fruits-de-mer-sauce-rosee.jpg' },
    { name:'Riz fruits de mer', desc:'', price:'44 DT', img:'images/menu/riz-fruits-de-mer.jpg' },
    { name:'Spaghetti saumon sauce rosée', desc:'', price:'44 DT', img:'images/menu/spaghetti-saumon-sauce-rosee.jpg' },
    { name:'Spaghetti aglio olio', desc:'Boutargue', price:'46 DT', img:'images/menu/spaghetti-aglio-olio.jpg' },
  ],
  enfants: [
    { name:'Plat nuggets', desc:'Menu enfant', price:'22 DT', img:'images/menu/plat-nuggets.jpg' },
    { name:'Plat garniture 5amsa w 5mis', desc:'', price:'35 DT', img:'images/menu/plat-garniture-5amsa-w-5mis.jpg' },
    { name:'Tabouna', desc:'', price:'3 DT', img:'images/menu/tabouna.jpg' },
  ],
  desserts: [
    { name:'1 boule de glace', desc:'', price:'5 DT', img:'images/menu/1-boule-de-glace.jpg' },
    { name:'2 boules de glace', desc:'', price:'8 DT', img:'images/menu/2-boules-de-glace.jpg' },
    { name:'Cheesecake au choix', desc:'', price:'10 DT', img:'images/menu/cheesecake-au-choix.jpg' },
    { name:'Salade de fruits de saison', desc:'', price:'10 DT', img:'images/menu/salade-de-fruits-de-saison.jpg' },
  ],
  boissons: [
    { name:'Eau 1L', desc:'', price:'3 DT', img:'images/menu/eau-1l.jpg' },
    { name:'Garsi', desc:'', price:'4 DT', img:'images/menu/garsi.jpg' },
    { name:'Soda', desc:'', price:'4 DT', img:'images/menu/soda.jpg' },
    { name:'Café express', desc:'Capsule', price:'5 DT', img:'images/menu/cafe-express.jpg' },
    { name:'Citronnade', desc:'', price:'6 DT', img:'images/menu/citronnade.jpg' },
    { name:'Schweppes', desc:'', price:'6 DT', img:'images/menu/schweppes.jpg' },
    { name:'Jus fraise', desc:'', price:'7 DT', img:'images/menu/jus-fraise.jpg' },
    { name:'Jus mangue', desc:'', price:'8 DT', img:'images/menu/jus-mangue.jpg' },
    { name:'Jus kiwi', desc:'', price:'8 DT', img:'images/menu/jus-kiwi.jpg' },
    { name:'Citronnade aux amandes', desc:'', price:'8,5 DT', img:'images/menu/citronnade-aux-amandes.jpg' },
    { name:'Celtia sans alcool', desc:'', price:'9 DT', img:'images/menu/celtia-sans-alcool.jpg' },
    { name:'Shark', desc:'', price:'10 DT', img:'images/menu/shark.jpg' },
  ],
};

const CATCH_OF_DAY = ['Loup de mer','Dorade','Poulpe','Crevettes royales','Calamars','Rouget','Sole','Pageot'];

const CATEGORY_ICON = {
  salades: '🥗', plats: '🐟', entrees: '🍤', pates: '🍝',
  enfants: '🍽️', desserts: '🍰', boissons: '🥤'
};

function renderMenu(cat){
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';
  MENU[cat].forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'menu-item';
    el.style.animationDelay = (i * 0.06) + 's';
    const orderMsg = encodeURIComponent(`Bonjour Edlala, je voudrais commander : ${item.name}`);
    const descHtml = item.desc ? `<div class="menu-item-desc">${item.desc}</div>` : '';
    const icon = CATEGORY_ICON[cat] || '🍴';
    el.innerHTML = `
      <div class="menu-item-photo photo-slot" data-bg="${item.img}">
        <span class="img-fallback menu-fallback">${icon}</span>
      </div>
      <div class="menu-item-body">
        <div class="menu-item-top">
          <div class="menu-item-name">${item.name}</div>
          <div class="menu-item-price">${item.price}</div>
        </div>
        ${descHtml}
        <a class="order-link" href="https://wa.me/${RESTAURANT_WHATSAPP}?text=${orderMsg}" target="_blank" rel="noopener">Commander →</a>
      </div>
    `;
    grid.appendChild(el);
  });
  loadPhotoSlots();
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
   GALLERY CAROUSEL — stacked, draggable cards
   Vanilla JS/CSS version (no React/build step needed)
   ============================================ */
const GALLERY = [
  { src:'images/galerie-1.jpg', alt:'Plateau de fruits de mer' },
  { src:'images/galerie-2.jpg', alt:'Poisson grillé' },
  { src:'images/galerie-3.jpg', alt:'Poissonnerie, étal du jour' },
  { src:'images/galerie-4.jpg', alt:'Salle du restaurant' },
  { src:'images/galerie-5.jpg', alt:'Crevettes grillées' },
  { src:'images/galerie-6.jpg', alt:'Terrasse en bord de mer' },
];

let carouselProgress = 0;
let dragStartProgress = 0;
let dragStartX = 0;
let isDragging = false;
let carouselCards = [];

function carouselConfig(){
  const w = window.innerWidth;
  if (w < 640) return { x:70, y:14, rot:8, scale:.08, sensitivity:180 };
  if (w < 1024) return { x:100, y:22, rot:10, scale:.10, sensitivity:220 };
  return { x:130, y:28, rot:12, scale:.12, sensitivity:250 };
}

function renderGallery(){
  const track = document.getElementById('carouselTrack');
  track.innerHTML = '';
  carouselCards = GALLERY.map((g, i) => {
    const el = document.createElement('div');
    el.className = 'carousel-card photo-slot';
    el.dataset.bg = g.src;
    el.innerHTML = `<span class="img-fallback">📷 ${g.src}</span>`;
    track.appendChild(el);
    return el;
  });
  loadPhotoSlots();
  updateCarousel(false);
}
renderGallery();

function updateCarousel(animate){
  const n = GALLERY.length;
  const cfg = carouselConfig();
  carouselCards.forEach((el, i) => {
    let diff = (i - carouselProgress) % n;
    if (diff > n/2) diff -= n;
    if (diff < -n/2) diff += n;

    const absDiff = Math.abs(diff);
    const x = diff * cfg.x;
    const rot = absDiff < 0.05 ? 0 : diff * cfg.rot;
    const y = absDiff < 0.05 ? 0 : absDiff * cfg.y;
    const scale = 1 - absDiff * cfg.scale;
    let opacity = 1 - Math.max(0, absDiff - 1.5) / (n/2 - 1.5);
    opacity = Math.max(0, Math.min(1, opacity));
    const z = Math.round(100 - absDiff * 10);

    el.style.transition = animate ? 'transform .5s cubic-bezier(.22,.61,.36,1), opacity .5s' : 'none';
    el.style.transform = `translate(-50%,-50%) translateX(${x}px) translateY(${y}px) rotate(${rot}deg) scale(${scale})`;
    el.style.opacity = opacity;
    el.style.zIndex = z;
  });
}

const dragSurface = document.getElementById('carouselDrag');

function pointerDown(e){
  isDragging = true;
  dragStartProgress = carouselProgress;
  dragStartX = (e.touches ? e.touches[0].clientX : e.clientX);
}
function pointerMove(e){
  if(!isDragging) return;
  const x = (e.touches ? e.touches[0].clientX : e.clientX);
  const delta = x - dragStartX;
  const cfg = carouselConfig();
  carouselProgress = dragStartProgress - delta / cfg.sensitivity;
  updateCarousel(false);
}
function pointerUp(){
  if(!isDragging) return;
  isDragging = false;
  carouselProgress = Math.round(carouselProgress);
  updateCarousel(true);
}

dragSurface.addEventListener('mousedown', pointerDown);
window.addEventListener('mousemove', pointerMove);
window.addEventListener('mouseup', pointerUp);
dragSurface.addEventListener('touchstart', pointerDown, { passive:true });
window.addEventListener('touchmove', pointerMove, { passive:true });
window.addEventListener('touchend', pointerUp);
window.addEventListener('resize', () => updateCarousel(false));

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

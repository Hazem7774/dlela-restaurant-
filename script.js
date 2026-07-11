// ============================================
// EDLALA — الدلالة — site interactions
// Pure static site: no backend required.
// To edit menu/gallery content, edit the arrays below.
// ============================================

document.getElementById('year').textContent = new Date().getFullYear();

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
   Prix indicatifs en DT — à ajuster selon vos tarifs réels.
   ============================================ */
const MENU = {
  grilles: [
    { name:'Loup de mer grillé', desc:'Poisson entier grillé au feu de bois, citron et huile d\'olive', price:'Selon poids' },
    { name:'Dorade royale grillée', desc:'Grillée entière, servie avec salade méchouia', price:'Selon poids' },
    { name:'Poulpe grillé', desc:'Poulpe mariné, grillé et laqué à l\'huile d\'olive', price:'28 DT' },
    { name:'Crevettes royales grillées', desc:'Grillées à l\'ail et au piment', price:'32 DT' },
    { name:'Mixed grill du pêcheur', desc:'Sélection du jour, pour 2 personnes', price:'65 DT' },
  ],
  fruitsdemer: [
    { name:'Plateau de fruits de mer', desc:'Crevettes, calamars, moules, poisson du jour', price:'55 DT' },
    { name:'Friture de calamars', desc:'Calamars frits, sauce tartare maison', price:'24 DT' },
    { name:'Moules marinière', desc:'Moules fraîches, vin blanc, ail et persil', price:'20 DT' },
    { name:'Gambas à l\'ail', desc:'Sautées à l\'huile d\'olive et piment', price:'34 DT' },
  ],
  tunisien: [
    { name:'Couscous au poisson', desc:'Couscous traditionnel, poisson et légumes de saison', price:'22 DT' },
    { name:'Ojja aux crevettes', desc:'Sauce tomate épicée, œuf poché, crevettes', price:'19 DT' },
    { name:'Poisson au four à la tunisienne', desc:'Poisson mariné aux épices, cuit au four', price:'26 DT' },
    { name:'Chapchouka aux fruits de mer', desc:'Poivrons, tomates mijotées, fruits de mer', price:'21 DT' },
  ],
  entrees: [
    { name:'Salade méchouia', desc:'Poivrons et tomates grillés, thon, œuf', price:'9 DT' },
    { name:'Brik à l\'œuf et thon', desc:'Feuille croustillante, cœur fondant', price:'6 DT' },
    { name:'Salade tunisienne', desc:'Tomate, concombre, oignon, olives', price:'7 DT' },
    { name:'Soupe de poisson', desc:'Recette du jour, croûtons et rouille', price:'10 DT' },
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
    el.innerHTML = `
      <div>
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-desc">${item.desc}</div>
      </div>
      <div class="menu-item-price">${item.price}</div>
    `;
    grid.appendChild(el);
  });
}
renderMenu('grilles');

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
  track.innerHTML = items + items; // duplicated for seamless loop
}
buildTicker();

/* ============================================
   GALLERY DATA
   Remplacez les fichiers dans /images par vos vraies photos
   en gardant les mêmes noms, ou changez les chemins ci-dessous.
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

/* ---------- Auto-detect real photos ----------
   Any element with [data-bg] gets tested: if the file
   exists, it becomes the background and the "photo
   manquante" label disappears automatically. This means
   you can just drop your real files into /images with the
   matching names and refresh the page — no code to touch. */
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
const RESTAURANT_WHATSAPP = '21625035034'; // format international sans le +

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

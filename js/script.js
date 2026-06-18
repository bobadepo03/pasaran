const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* =======================
   DATE SYSTEM
======================= */
const dateRules = {
  alaska: 1,
  atlanta: 1,
  carolina: 1,
  kentucky: 1,
  oregon12: 1,
  oregon9: 1,
  oregon6: 1,
  oregon3: 1,
  '4d6': 1,
  virginia: 1,
  default: 0
};

function formatDate(date){
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

function getTanggalByBg(bgName){
  const date = new Date();
  const offset = dateRules[bgName] || 0;
  date.setDate(date.getDate() + offset);
  return formatDate(date);
}

/* =======================
   ASSETS
======================= */
const backgrounds = {
  alaska: 'assets/background/alaska.jpg',
  atlanta: 'assets/background/atlanta.jpg',
  carolina: 'assets/background/carolina.jpg',
  kentucky: 'assets/background/kentucky.jpg',
  oregon12: 'assets/background/oregon12.jpg',
  oregon9: 'assets/background/oregon9.jpg',
  oregon6: 'assets/background/oregon6.jpg',
  oregon3: 'assets/background/oregon3.jpg',
  '4d6': 'assets/background/4d6.jpg',
  virginia: 'assets/background/virginia.jpg'
};

const shios = {
  none: null,
  tikus: 'assets/shio/TIKUS.png',
  kerbau: 'assets/shio/KERBAU.png',
  harimau: 'assets/shio/HARIMAU.png',
  kelinci: 'assets/shio/KELINCI.png',
  naga: 'assets/shio/NAGA.png',
  ular: 'assets/shio/ULAR.png',
  kuda: 'assets/shio/KUDA.png',
  kambing: 'assets/shio/KAMBING.png',
  monyet: 'assets/shio/MONYET.png',
  ayam: 'assets/shio/AYAM.png',
  anjing: 'assets/shio/ANJING.png',
  babi: 'assets/shio/BABI.png'
};

/* =======================
   STATE
======================= */
const state = {
  kep: '',
  ekor: '',
  cm: '',
  cb: '',
  bbfs: '',
  top2d: '',
  topN: '',
  pastResult: '',
  background: '',
  shio: ''
};

/* =======================
   CLEANER (FIX UTAMA DI SINI)
======================= */

// hanya hapus TOP2D / TOP4D / TOP5D
const forbidden = /top\s*[245]\s*d/gi;

// angka saja
const cleanNumber = val => String(val).replace(/[^0-9]/g, '');

// dash + angka + hapus keyword topXd
function cleanDash(val) {
  return String(val)
    .replace(forbidden, '')   // hanya top2d/top4d/top5d
    .replace(/[^0-9-]/g, '')   // angka + dash
    .replace(/-+/g, '-')       // rapikan dash
    .replace(/^-+/, '');       // hapus dash depan
}

/* =======================
   INPUT BIND (STABLE)
======================= */
function bind(id, key, cleaner) {
  const el = document.getElementById(id);
  if (!el) return;

  function apply(val) {
    const cleaned = cleaner(val);
    state[key] = cleaned;
    el.value = cleaned;
    render();
  }

  el.addEventListener('input', () => {
    apply(el.value);
  });

  el.addEventListener('paste', (e) => {
    e.preventDefault();
    let text = (e.clipboardData || window.clipboardData).getData('text');
    apply(text);
  });
}

/* =======================
   DRAW
======================= */
function drawData(bgName){

  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 24px Myriad Pro Bold';

  const tanggal = getTanggalByBg(bgName);

  ctx.fillText(tanggal, 55, 110);

  ctx.fillText(state.kep, 90, 170);
  ctx.fillText(state.ekor, 90, 230);
  ctx.fillText(state.cm, 85, 293);

  ctx.fillText(state.bbfs, 205, 180);
  ctx.fillText(state.cb, 228, 270);

  drawTop2D(state.top2d, 530, 180);
  drawTopN(state.topN, 660, 180);

  ctx.fillText(state.pastResult, 660, 315);
}

function drawTop2D(text, x, y, lineHeight = 30){

  const items = String(text).split('-').filter(Boolean);

  for(let i = 0; i < items.length; i += 2){
    const pair = `${items[i]}-${items[i+1] || ''}`;
    ctx.fillText(pair, x, y + ((i/2) * lineHeight));
  }
}

function drawTopN(text, x, y, lineHeight = 24){

  const items = String(text).split('-').filter(Boolean);

  items.forEach((item, i) => {
    ctx.fillText(item, x, y + (i * lineHeight));
  });
}

function drawShio(name){
  if (!shios[name]) return;

  const img = new Image();
  img.src = shios[name];

  img.onload = () => {
    ctx.drawImage(img, 330, 180, 150, 150);
  };
}

/* =======================
   RENDER (SAFE)
======================= */
function render(){

  const bgName =
    state.background || document.getElementById('background')?.value;

  const shioName =
    state.shio || document.getElementById('shio')?.value;

  const bgSrc = backgrounds[bgName];
  if (!bgSrc) return;

  const bg = new Image();

  bg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    drawData(bgName);
    drawShio(shioName);
  };

  bg.src = bgSrc;
}

/* =======================
   INIT INPUTS
======================= */
bind('bbfs', 'bbfs', cleanNumber);
bind('pastResult', 'pastResult', cleanNumber);

bind('kep', 'kep', cleanDash);
bind('ekor', 'ekor', cleanDash);
bind('cm', 'cm', cleanDash);
bind('cb', 'cb', cleanDash);
bind('top2d', 'top2d', cleanDash);
bind('topN', 'topN', cleanDash);

/* =======================
   SELECT EVENTS
======================= */
document.getElementById('background').addEventListener('change', e => {
  state.background = e.target.value;
  render();
});

document.getElementById('shio').addEventListener('change', e => {
  state.shio = e.target.value;
  render();
});

/* =======================
   START
======================= */
state.background = document.getElementById('background')?.value;
state.shio = document.getElementById('shio')?.value;

render();

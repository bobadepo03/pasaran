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

function updateTimestamp(){
    const now = new Date();
    const options = { 
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const formatted = now.toLocaleString('en-GB', options).replace(',', '');
    document.getElementById("timestamp").textContent = formatted;
}
setInterval(updateTimestamp, 1000);
updateTimestamp();

/* =======================
   ASSETS
======================= */
const backgrounds = {
  alaska: 'assets/background/alaska.jpg',
  alberta: 'assets/background/alberta.jpg',
  atlanta: 'assets/background/atlanta.jpg',
  baghdad: 'assets/background/baghdad.jpg',
  boston: 'assets/background/boston.jpg',
  bullseye: 'assets/background/bullseye.jpg',
  cambodia: 'assets/background/cambodia.jpg',
  capetown: 'assets/background/capetown.jpg',
  carolina: 'assets/background/carolina.jpg',
  ceko: 'assets/background/ceko.jpg',
  china: 'assets/background/china.jpg',
  gaza: 'assets/background/gaza.jpg',
  hongkong: 'assets/background/hongkong.jpg',
  jakarta: 'assets/background/jakarta.jpg',
  japan: 'assets/background/japan.jpg',
  kairo: 'assets/background/kairo.jpg',
  kanada: 'assets/background/kanada.jpg',
  kanagawa: 'assets/background/kanagawa.jpg',
  kazan: 'assets/background/kazan.jpg',
  kentucky: 'assets/background/kentucky.jpg',
  kkmalam: 'assets/background/kkmalam.jpg',
  kksore: 'assets/background/kksore.jpg',
  norwegia: 'assets/background/norwegia.jpg',
  nusa: 'assets/background/nusa.jpg',
  oregon12: 'assets/background/oregon12.jpg',
  oregon9: 'assets/background/oregon9.jpg',
  oregon6: 'assets/background/oregon6.jpg',
  oregon3: 'assets/background/oregon3.jpg',
  pcso: 'assets/background/pcso.jpg',
  porto: 'assets/background/porto.jpg',
  pyongyang: 'assets/background/pyongyang.jpg',
  singapore: 'assets/background/singapore.jpg',
  sydney: 'assets/background/sydney.jpg',
  taiwan: 'assets/background/taiwan.jpg',
  '4d6': 'assets/background/4d6.jpg',
  '4d5': 'assets/background/4d5.jpg',
  '4d4': 'assets/background/4d4.jpg',
  '4d3': 'assets/background/4d3.jpg',
  '4d2': 'assets/background/4d2.jpg',
  '4d1': 'assets/background/4d1.jpg',
  '5dmalam': 'assets/background/5dmalam.jpg',
  '5dsore': 'assets/background/5dsore.jpg',
  venice: 'assets/background/venice.jpg',
  verona: 'assets/background/verona.jpg',
  virginia: 'assets/background/virginia.jpg',
  washington: 'assets/background/washington.jpg'
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

function downloadImage(){

  const select = document.getElementById("background");
  const namaPasaran = select.options[select.selectedIndex].text;

  const scale = 2;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width * scale;
  tempCanvas.height = canvas.height * scale;

  const tempCtx = tempCanvas.getContext('2d');

  tempCtx.setTransform(scale, 0, 0, scale, 0, 0);
  tempCtx.drawImage(canvas, 0, 0);

  const dataURL = tempCanvas.toDataURL("image/jpeg", 0.98);

  const link = document.createElement('a');
  link.href = dataURL;

  // 🔥 FORCE EXTENSION JPG
  link.download = `${namaPasaran}.jpg`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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

const layoutDefault = {
  topN: { x: 660, y: 180 },
  bbfs: { x: 205, y: 180 },
  pastResult: { x: 660, y: 315 }
};

const layoutMap = {
  '5dmalam': {
    topN: { x: 655, y: 180 },
    bbfs: { x: 200, y: 180 },
    pastResult: { x: 655, y: 315 }
  },
  '5dsore': {
    topN: { x: 655, y: 180 },
    bbfs: { x: 200, y: 180 },
    pastResult: { x: 655, y: 315 }
  }
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
  ctx.fillText(state.cb, 228, 270);

  drawTop2D(state.top2d, 530, 180);

  const layout = layoutMap[bgName] || layoutDefault;

drawTopN(state.topN, layout.topN.x, layout.topN.y);

ctx.fillText(state.bbfs, layout.bbfs.x, layout.bbfs.y);

ctx.fillText(state.pastResult, layout.pastResult.x, layout.pastResult.y);
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

    if (name === 'ayam') {
      ctx.drawImage(img, 330, 180, 130, 170);
      return;
    }

    if (name === 'kuda') {
      ctx.drawImage(img, 345, 180, 130, 170);
      return;
    }

    // default semua shio lain
    ctx.drawImage(img, 335, 180, 130, 170);

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

  // reset state
  state.kep = '';
  state.ekor = '';
  state.cm = '';
  state.cb = '';
  state.bbfs = '';
  state.top2d = '';
  state.topN = '';
  state.pastResult = '';
  state.shio = 'none';

  // reset textbox
  document.getElementById('kep').value = '';
  document.getElementById('ekor').value = '';
  document.getElementById('cm').value = '';
  document.getElementById('cb').value = '';
  document.getElementById('bbfs').value = '';
  document.getElementById('top2d').value = '';
  document.getElementById('topN').value = '';
  document.getElementById('pastResult').value = '';

  // reset dropdown shio
  document.getElementById('shio').value = 'none';

  // bersihkan canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', {
  alpha: false,
  desynchronized: true
});

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
  alaska: 'assets/background/ALASKA.webp',
  alberta: 'assets/background/ALBERTA.webp',
  atlanta: 'assets/background/ATLANTA.webp',
  baghdad: 'assets/background/BAGHDAD.webp',
  boston: 'assets/background/BOSTON.webp',
  bullseye: 'assets/background/BULLSEYE.webp',
  cambodia: 'assets/background/CAMBODIA.webp',
  capetown: 'assets/background/CAPETOWN.webp',
  carolina: 'assets/background/CAROLINA.webp',
  ceko: 'assets/background/CEKO.webp',
  china: 'assets/background/CHINA.webp',
  gaza: 'assets/background/GAZA.webp',
  hongkong: 'assets/background/HONGKONG.webp',
  jakarta: 'assets/background/JAKARTA.webp',
  japan: 'assets/background/JAPAN.webp',
  kairo: 'assets/background/KAIRO.webp',
  kanada: 'assets/background/KANADA.webp',
  kanagawa: 'assets/background/KANAGAWA.webp',
  kazan: 'assets/background/KAZAN.webp',
  kentucky: 'assets/background/KENTUCKY.webp',
  kkmalam: 'assets/background/KKMALAM.webp',
  kksore: 'assets/background/KKSORE.webp',
  norwegia: 'assets/background/NORWEGIA.webp',
  nusa: 'assets/background/NUSA.webp',
  oregon12: 'assets/background/OREGON12.webp',
  oregon9: 'assets/background/OREGON9.webp',
  oregon6: 'assets/background/OREGON6.webp',
  oregon3: 'assets/background/OREGON3.webp',
  pcso: 'assets/background/PCSO.webp',
  porto: 'assets/background/PORTO.webp',
  pyongyang: 'assets/background/PYONGYANG.webp',
  singapore: 'assets/background/SINGAPORE.webp',
  sydney: 'assets/background/SYDNEY.webp',
  taiwan: 'assets/background/TAIWAN.webp',
  '4d6': 'assets/background/4D6.webp',
  '4d5': 'assets/background/4D5.webp',
  '4d4': 'assets/background/4D4.webp',
  '4d3': 'assets/background/4D3.webp',
  '4d2': 'assets/background/4D2.webp',
  '4d1': 'assets/background/4D1.webp',
  '5dmalam': 'assets/background/5DMALAM4.webp',
  '5dsore': 'assets/background/5DSORE4.webp',
  venice: 'assets/background/VENICE.webp',
  verona: 'assets/background/VERONA.webp',
  virginia: 'assets/background/VIRGINIA.webp',
  washington: 'assets/background/WASHINGTON.webp'
  };

/* =======================
   IMAGE CACHE
======================= */
const bgCache = {};
const shioCache = {};

const shios = {
  none: null,
  tikus: 'assets/shio/TIKUS.webp',
  kerbau: 'assets/shio/KERBAU.webp',
  harimau: 'assets/shio/HARIMAU.webp',
  kelinci: 'assets/shio/KELINCI.webp',
  naga: 'assets/shio/NAGA.webp',
  ular: 'assets/shio/ULAR.webp',
  kuda: 'assets/shio/KUDA.webp',
  kambing: 'assets/shio/KAMBING.webp',
  monyet: 'assets/shio/MONYET.webp',
  ayam: 'assets/shio/AYAM.webp',
  anjing: 'assets/shio/ANJING.webp',
  babi: 'assets/shio/BABI.webp'
};

function downloadImage() {

  const select = document.getElementById("background");
  const namaPasaran = select.options[select.selectedIndex].text;

  const scale = 2;

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width * scale;
  tempCanvas.height = canvas.height * scale;

  const tempCtx = tempCanvas.getContext("2d");

  tempCtx.setTransform(scale, 0, 0, scale, 0, 0);
  tempCtx.drawImage(canvas, 0, 0);

  tempCanvas.toBlob(function(blob) {

    if (!blob) return;

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${namaPasaran}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 100);

  }, "image/png");

}

/* =======================
   STATE
======================= */
const state = {
  /*kep: '',
  ekor: '',*/
  cm: '',
  cb: '',
  bbfs: '',
  top2d: '',
  top3d: '',
  topN: '',
  pastResult: '',
  background: '',
  shio: ''
};

const layoutDefault = {
  topN: { x: 660, y: 185 },
  bbfs: { x: 90, y: 190 },
  pastResult: { x: 220, y: 318 }
};

  const layoutMap = {
  '5dmalam': {
    topN: { x: 660, y: 185 },
    bbfs: { x: 90, y: 190 },
    pastResult: { x: 220, y: 318 }
  },
  '5dsore': {
    topN: { x: 660, y: 185 },
    bbfs: { x: 90, y: 190 },
    pastResult: { x: 220, y: 318 }
  }
};
  

/*const layoutMap = {
  '5dmalam': {
    topN: { x: 655, y: 180 },
    bbfs: { x: 200, y: 180 },
    pastResult: { x: 215, y: 318 }
  },
  '5dsore': {
    topN: { x: 655, y: 180 },
    bbfs: { x: 200, y: 180 },
    pastResult: { x: 215, y: 318 }
  }
}; */

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
    .replace(/[^0-9\-*/]/g, '')   // angka + dash
    .replace(/-+/g, '-')       // rapikan dash
    .replace(/^-+/, '');       // hapus dash depan
}

/* =======================
   RENDER DEBOUNCE
======================= */

let renderTimer = null;

function requestRender(){

    clearTimeout(renderTimer);

    renderTimer = setTimeout(render, 16);

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
    requestRender();
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

  /*ctx.fillText(state.kep, 90, 170);
  ctx.fillText(state.ekor, 90, 230);*/
  ctx.fillText(state.cb, 105, 255);
  ctx.fillText(state.cm, 90, 310);

  function drawTop3D(text, x, y, lineHeight = 24) {
  const items = String(text).split(/[-*/]/).filter(Boolean);

  items.forEach((item, i) => {
    ctx.fillText(item, x, y + (i * lineHeight));
  });
}
  drawTop3D(state.top3d, 542, 175);
  drawTop2D(state.top2d, 200, 190);

  const layout = layoutMap[bgName] || layoutDefault;

drawTopN(state.topN, layout.topN.x, layout.topN.y);

ctx.fillText(state.bbfs, layout.bbfs.x, layout.bbfs.y);

ctx.fillText(state.pastResult, layout.pastResult.x, layout.pastResult.y);
}

function drawTop2D(text, x, y, lineHeight = 30) {

    const items = String(text)
        .split(/[-*/]/)
        .filter(Boolean);

    for (let i = 0; i < items.length; i += 3) {

        const row = items.slice(i, i + 3).join('-');

        ctx.fillText(row, x, y + ((i / 3) * lineHeight));
    }
}

function drawTopN(text, x, y, lineHeight = 24){

  const items = String(text).split(/[-*/]/).filter(Boolean);

  items.forEach((item, i) => {
    ctx.fillText(item, x, y + (i * lineHeight));
  });
}

function drawShio(name){

  if (!shios[name]) return;

  function draw(img){

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

  }

  if (shioCache[name]) {
    draw(shioCache[name]);
    return;
  }

  const img = new Image();

  img.onload = () => {
    shioCache[name] = img;
    draw(img);
  };

  img.src = shios[name];
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

  function draw(img){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    drawData(bgName);
    drawShio(shioName);
  }

  // Gunakan cache jika sudah pernah dimuat
  if (bgCache[bgSrc]) {
    draw(bgCache[bgSrc]);
    return;
  }

  const img = new Image();

  img.onload = () => {
    bgCache[bgSrc] = img;
    draw(img);
  };

  img.src = bgSrc;
}

/* =======================
   INIT INPUTS
======================= */
bind('bbfs', 'bbfs', cleanNumber);
bind('pastResult', 'pastResult', cleanNumber);

/*bind('kep', 'kep', cleanDash);
bind('ekor', 'ekor', cleanDash);*/
bind('cm', 'cm', cleanDash);
bind('cb', 'cb', cleanDash);
bind('top3d', 'top3d', cleanDash);
bind('top2d', 'top2d', cleanDash);
bind('topN', 'topN', cleanDash);

/* =======================
   SELECT EVENTS
======================= */
document.getElementById('background').addEventListener('change', e => {

  state.background = e.target.value;

  // reset state
 /* state.kep = '';
  state.ekor = '';*/
  state.cm = '';
  state.cb = '';
  state.bbfs = '';
  state.top3d = '';
  state.top2d = '';
  state.topN = '';
  state.pastResult = '';
  state.shio = 'none';

  // reset textbox
 /* document.getElementById('kep').value = '';
  document.getElementById('ekor').value = '';*/
  document.getElementById('cm').value = '';
  document.getElementById('cb').value = '';
  document.getElementById('bbfs').value = '';
  document.getElementById('top3d').value = '';
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

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* =======================
   DATE SYSTEM (BARU)
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
/* ======================= */


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

function render() {

  const bgName = document.getElementById("background").value;
  const shioName = document.getElementById("shio").value;

  const bg = new Image();
  bg.src = backgrounds[bgName];

  bg.onload = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    drawData(bgName);      // 🔥 UDAH PAKAI BGNAME
    drawShio(shioName);

  };
}

const myriad = new FontFace(
  'Myriad Pro Bold',
  'url(assets/font/Myriad Pro Bold.ttf)'
);

myriad.load().then(function(font) {
  document.fonts.add(font);

  render();
});


function drawData(bgName){
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 24px Myriad Pro Bold';

  const tanggal = getTanggalByBg(bgName);

  ctx.fillText(tanggal,55,110);
  ctx.fillText(document.getElementById('kep').value,90,170);
  ctx.fillText(document.getElementById('ekor').value,90,230);
  ctx.fillText(document.getElementById('cm').value,85,293);
  ctx.fillText(document.getElementById('bbfs').value,205,180);
  ctx.fillText(document.getElementById('cb').value,228,270);
  drawTop2D(document.getElementById('top2d').value,530,180);
  drawTopN(document.getElementById('topN').value,660,180);
  ctx.fillText(document.getElementById('pastResult').value,660,315);
}

function drawTop2D(text, x, y, lineHeight = 30){

  const items = String(text)
    .split('-')
    .filter(item => item.trim() !== '');

  for(let i = 0; i < items.length; i += 2){

    const pair =
      `${items[i]}-${items[i + 1] || ''}`;

    ctx.fillText(
      pair,
      x,
      y + ((i / 2) * lineHeight)
    );
  }
}

function drawTopN(text, x, y, lineHeight = 24){

  const items = String(text)
    .split('-')
    .filter(item => item.trim() !== '');

  items.forEach((item, index) => {

    ctx.fillText(
      item.trim(),
      x,
      y + (index * lineHeight)
    );

  });
}

function drawShio(name){
  const img = new Image();
  img.src = shios[name];

  img.onload = () => {
    ctx.drawImage(img,330,180,150,150);
  };
}

function downloadImage(){

  const select =
    document.getElementById("background");

  const namaPasaran =
    select.options[select.selectedIndex].text;

  const link = document.createElement('a');

  link.download = namaPasaran + '.png';

  link.href = canvas.toDataURL('image/png');

  link.click();
}

document.querySelectorAll("input, textarea, select").forEach(el => {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
});

render();

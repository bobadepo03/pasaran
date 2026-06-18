const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

async function generateImage(){
  const bgName = document.getElementById('background').value;
  const shioName = document.getElementById('shio').value;

  const bg = new Image();
  bg.src = backgrounds[bgName];

  bg.onload = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(bg,0,0,800,450);
    drawData();
    drawShio(shioName);
  };
}

function drawData(){
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 24px Arial';

  ctx.fillText(document.getElementById('tanggal').value,40,90);
  ctx.fillText(document.getElementById('kep').value,90,140);
  ctx.fillText(document.getElementById('ekor').value,90,230);
  ctx.fillText(document.getElementById('cm').value,90,330);
}

function drawShio(name){
  const img = new Image();
  img.src = shios[name];

  img.onload = () => {
    ctx.drawImage(img,330,110,150,150);
  };
}

function downloadImage(){
  const link = document.createElement('a');
  link.download = 'bobatoto.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

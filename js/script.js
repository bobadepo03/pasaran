const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const backgrounds = {
  macau4d: 'assets/background/4d1.jpg',
  macau5d: 'assets/background/5dsore.jpg'
};

const shios = {
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

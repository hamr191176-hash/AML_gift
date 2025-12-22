// مصفوفة الصور بالأسماء الحقيقية اللي ظاهرة في الـ GitHub عندك
const images = [
  'images/jpg.1000315417.jpeg',
  'images/jpg.1000315429.jpeg',
  'images/jpg.1000315415.jpeg',
  'images/jpg.1000315413.jpeg',
  'images/jpg.1000315419.jpeg',
  'images/jpg.1000315420.jpeg',
  'images/jpg.1000315414.jpeg',
  'images/jpg.1000315431.jpeg',
  'images/jpg.1000315418.jpeg'
];

let currentIndex = 0;

function unlockGift() {
  const pass = document.getElementById('password').value;
  if(pass === "123") {
    document.getElementById('ui-content').classList.add('hidden');
    document.getElementById('gift-scene').classList.remove('hidden');
    const music = document.getElementById('bgMusic');
    if(music) music.play().catch(e => console.log("الصوت محتاج تفاعل"));
    confetti();
  } else {
    document.getElementById('error').innerText = "كلمة السر غلط! 😂";
  }
}

function showCarousel() {
  document.getElementById('gift-scene').classList.add('hidden');
  document.getElementById('carousel-scene').classList.remove('hidden');
  updateImage(); // استدعاء الصورة الأولى فوراً
}

function showMessagePage() {
  const bgMusic = document.getElementById('bgMusic');
  const endMusic = document.getElementById('endMusic');
  if(bgMusic) bgMusic.pause();
  if(endMusic) endMusic.play().catch(e => console.log("الصوت محتاج تفاعل"));
  
  document.getElementById('carousel-scene').classList.add('hidden');
  document.getElementById('message-page').classList.remove('hidden');
  confetti({ particleCount: 150, spread: 70 });
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

function updateImage() {
  const imgElement = document.getElementById('carousel-img');
  if(imgElement) {
    // نضع المسار ونضيف رقم عشوائي في الآخر عشان نلغي "كاش" المتصفح ونخليه يحمل الصورة فوراً
    imgElement.src = images[currentIndex] + "?v=" + Math.random();
  }
}

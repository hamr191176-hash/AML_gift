const images = [
  'images/1000315417.jpg', 'images/1000315429.jpg', 'images/1000315415.jpg',
  'images/1000315413.jpg', 'images/1000315419.jpg', 'images/1000315420.jpg',
  'images/1000315414.jpg', 'images/1000315431.jpg', 'images/1000315418.jpg'
];
let currentIndex = 0;

function unlockGift() {
  const pass = document.getElementById('password').value;
  if(pass === "123") {
    document.getElementById('ui-content').classList.add('hidden');
    document.getElementById('gift-scene').classList.remove('hidden');
    document.getElementById('bgMusic').play().catch(e => console.log("الصوت يحتاج تفاعل"));
    confetti();
  } else {
    document.getElementById('error').innerText = "كلمة السر غلط! 😂";
  }
}

function showCarousel() {
  document.getElementById('gift-scene').classList.add('hidden');
  document.getElementById('carousel-scene').classList.remove('hidden');
}

function showMessagePage() {
  document.getElementById('bgMusic').pause();
  document.getElementById('endMusic').play().catch(e => console.log("الصوت يحتاج تفاعل"));
  document.getElementById('carousel-scene').classList.add('hidden');
  document.getElementById('message-page').classList.remove('hidden');
  confetti({ particleCount: 150, spread: 70 });
}

function nextImage() { currentIndex = (currentIndex + 1) % images.length; updateImage(); }
function prevImage() { currentIndex = (currentIndex - 1 + images.length) % images.length; updateImage(); }
function updateImage() { document.getElementById('carousel-img').src = images[currentIndex]; }

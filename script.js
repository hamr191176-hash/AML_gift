// مصفوفة الصور بالأسماء الحقيقية من GitHub بتاعك
const images = [
  'images/jpg.1000315417.jpeg', 'images/jpg.1000315429.jpeg', 'images/jpg.1000315415.jpeg',
  'images/jpg.1000315413.jpeg', 'images/jpg.1000315419.jpeg', 'images/jpg.1000315420.jpeg',
  'images/jpg.1000315414.jpeg', 'images/jpg.1000315431.jpeg', 'images/jpg.1000315418.jpeg'
];

let currentIndex = 0;

function unlockGift() {
  const pass = document.getElementById('password').value;
  if(pass === "123") {
    document.getElementById('ui-content').classList.add('hidden');
    document.getElementById('gift-scene').classList.remove('hidden');
    const music = document.getElementById('bgMusic');
    if(music) music.play().catch(e => console.log("المتصفح منع التشغيل التلقائي"));
    confetti();
  } else {
    document.getElementById('error').innerText = "كلمة السر غلط! 😂";
  }
}

function showCarousel() {
  document.getElementById('gift-scene').classList.add('hidden');
  document.getElementById('carousel-scene').classList.remove('hidden');
  updateImage();
}

function showMessagePage() {
  const bgMusic = document.getElementById('bgMusic');
  const endMusic = document.getElementById('endMusic');
  if(bgMusic) bgMusic.pause();
  if(endMusic) endMusic.play();
  document.getElementById('carousel-scene').classList.add('hidden');
  document.getElementById('message-page').classList.remove('hidden');
  confetti();
}

function nextImage() { currentIndex = (currentIndex + 1) % images.length; updateImage(); }
function prevImage() { currentIndex = (currentIndex - 1 + images.length) % images.length; updateImage(); }

function updateImage() {
  const imgElement = document.getElementById('carousel-img');
  // بنضيف عشوائي في الآخر عشان نجبر المتصفح يحدّث الصورة وميجبش القديمة المكسورة
  imgElement.src = images[currentIndex] + "?v=" + Math.random();
  
  // لو الصورة لسه مكسورة، جرب يشيل اسم الفولدر images ويجيبها من الرئيسي
  imgElement.onerror = function() {
      if (!imgElement.src.includes('retry')) {
          imgElement.src = images[currentIndex].replace('images/', '') + "?retry=1";
      }
  };
}

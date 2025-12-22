// مصفوفة الصور بالأسماء الدقيقة التي ظهرت في صورتك
const images = [
  'images/jpg.1000315417.jpeg', 'images/jpg.1000315429.jpeg', 'images/jpg.1000315415.jpeg',
  'images/jpg.1000315413.jpeg', 'images/jpg.1000315419.jpeg', 'images/jpg.1000315420.jpeg',
  'images/jpg.1000315414.jpeg', 'images/jpg.1000315431.jpeg', 'images/jpg.1000315418.jpeg'
];

let currentIndex = 0;

function unlockGift() {
  if(document.getElementById('password').value === "123") {
    document.getElementById('ui-content').classList.add('hidden');
    document.getElementById('gift-scene').classList.remove('hidden');
    document.getElementById('bgMusic').play();
    confetti();
  } else { document.getElementById('error').innerText = "غلط! 😂"; }
}

function showCarousel() {
  document.getElementById('gift-scene').classList.add('hidden');
  document.getElementById('carousel-scene').classList.remove('hidden');
  updateImage(); 
}

function showMessagePage() {
  document.getElementById('bgMusic').pause();
  document.getElementById('endMusic').play();
  document.getElementById('carousel-scene').classList.add('hidden');
  document.getElementById('message-page').classList.remove('hidden');
  confetti();
}

function nextImage() { currentIndex = (currentIndex + 1) % images.length; updateImage(); }
function prevImage() { currentIndex = (currentIndex - 1 + images.length) % images.length; updateImage(); }

function updateImage() { 
    const imgElement = document.getElementById('carousel-img');
    // محاولة تحميل الصورة بالمسار المكتوب
    imgElement.src = images[currentIndex];
    
    // لو الصورة لم تظهر (خطأ في المسار)، سيحاول الكود البحث عنها بدون اسم الفولدر كحل احتياطي
    imgElement.onerror = function() {
        const fallbackSrc = images[currentIndex].replace('images/', '');
        if (imgElement.src !== window.location.origin + '/' + fallbackSrc) {
            imgElement.src = fallbackSrc;
        }
    };
}

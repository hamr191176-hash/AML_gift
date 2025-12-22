// مصفوفة الصور بالأسماء الموجودة في الـ GitHub الخاص بك
const images = [
  'images/jpg.1000315417.jpeg', 'images/jpg.1000315429.jpeg', 'images/jpg.1000315415.jpeg',
  'images/jpg.1000315413.jpeg', 'images/jpg.1000315419.jpeg', 'images/jpg.1000315420.jpeg',
  'images/jpg.1000315414.jpeg', 'images/jpg.1000315431.jpeg', 'images/jpg.1000315418.jpeg'
];

let rotation = 0;

function unlockGift() {
    const pass = document.getElementById('password').value;
    if(pass === "123") {
        document.getElementById('ui-content').classList.add('hidden');
        document.getElementById('carousel-scene').classList.remove('hidden');
        document.getElementById('bgMusic').play();
        setup3DCarousel();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
        document.getElementById('error').innerText = "الباسورد غلط يا نجم! 😂";
    }
}

function setup3DCarousel() {
    const container = document.getElementById('carousel-container');
    container.innerHTML = '';
    const angleStep = 360 / images.length;
    
    // حساب مسافة الـ Z بناءً على عدد الصور لضمان دائرة مثالية
    const radius = 400; 

    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src + "?v=" + Math.random(); // لضمان عدم تحميل صورة قديمة
        img.style.transform = `rotateY(${i * angleStep}deg) translateZ(${radius}px)`;
        
        // إذا فشل تحميل الصورة جرب مسار احتياطي
        img.onerror = function() {
            this.src = src.replace('images/', '') + "?retry=1";
        };
        
        container.appendChild(img);
    });
}

function rotate(direction) {
    const angleStep = 360 / images.length;
    rotation += (direction * angleStep);
    document.getElementById('carousel-container').style.transform = `rotateY(${rotation}deg)`;
}

function showMessagePage() {
    document.getElementById('bgMusic').pause();
    document.getElementById('endMusic').play();
    document.getElementById('carousel-scene').classList.add('hidden');
    document.getElementById('message-page').classList.remove('hidden');
    confetti({ particleCount: 200, spread: 100 });
}
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


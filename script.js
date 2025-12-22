const images = [
    'images/jpg.1000315417.jpeg', 'images/jpg.1000315429.jpeg', 'images/jpg.1000315415.jpeg',
    'images/jpg.1000315413.jpeg', 'images/jpg.1000315419.jpeg', 'images/jpg.1000315420.jpeg',
    'images/jpg.1000315414.jpeg', 'images/jpg.1000315431.jpeg', 'images/jpg.1000315418.jpeg'
];

let rotation = 0;

function unlockGift() {
    const pass = document.getElementById('password').value;
    if (pass === "123") {
        document.getElementById('ui-content').classList.add('hidden');
        document.getElementById('carousel-scene').classList.remove('hidden');
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.play().catch(e => console.log('خطأ في تشغيل الموسيقى:', e));
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
    const radius = 150 + (images.length * 10);
    
    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src + "?v=" + Math.random();
        img.style.transform = `rotateY(${i * angleStep}deg) translateZ(${radius}px)`;
        
        img.onerror = function() {
            console.log('فشل تحميل الصورة:', src);
            this.src = 'https://via.placeholder.com/300x400?text=صورة+غير+متوفرة';
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
    const endMusic = document.getElementById('endMusic');
    endMusic.play().catch(e => console.log('خطأ في تشغيل الموسيقى النهائية:', e));
    document.getElementById('carousel-scene').classList.add('hidden');
    document.getElementById('message-page').classList.remove('hidden');
    confetti({ particleCount: 200, spread: 100 });
}

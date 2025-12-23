// خلفية متحركة بـ D3.js (أشجار وورود متحركة)
const svg = d3.select("#background-canvas");
const width = window.innerWidth;
const height = window.innerHeight;
svg.attr("width", width).attr("height", height);

// أشجار (دوائر خضراء)
const trees = [];
for (let i = 0; i < 20; i++) {
    trees.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 30 + 10,
        color: '#228b22',
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1
    });
}

// ورود (دوائر وردية)
const flowers = [];
for (let i = 0; i < 30; i++) {
    flowers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 15 + 5,
        color: '#ff69b4',
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
    });
}

const treeElements = svg.selectAll(".tree")
    .data(trees)
    .enter()
    .append("circle")
    .attr("class", "tree")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.r)
    .attr("fill", d => d.color)
    .attr("opacity", 0.4);

const flowerElements = svg.selectAll(".flower")
    .data(flowers)
    .enter()
    .append("circle")
    .attr("class", "flower")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.r)
    .attr("fill", d => d.color)
    .attr("opacity", 0.6);

function animateBackground() {
    trees.forEach(d => {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > width) d.dx *= -1;
        if (d.y < 0 || d.y > height) d.dy *= -1;
    });
    flowers.forEach(d => {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > width) d.dx *= -1;
        if (d.y < 0 || d.y > height) d.dy *= -1;
    });
    treeElements.attr("cx", d => d.x).attr("cy", d => d.y);
    flowerElements.attr("cx", d => d.x).attr("cy", d => d.y);
    requestAnimationFrame(animateBackground);
}
animateBackground();

// باقي الكود
const images = [
    'images/jpg.1000315417.jpeg', 'images/jpg.1000315429.jpeg', 'images/jpg.1000315415.jpeg',
    'images/jpg.1000315413.jpeg', 'images/jpg.1000315419.jpeg', 'images/jpg.1000315420.jpeg',
    'images/jpg.1000315414.jpeg', 'images/jpg.1000315431.jpeg', 'images/jpg.1000315418.jpeg'
];

const imageTexts = [
    "أنتِ أغلى هدية", "حبيبي دائماً", "عيد ميلاد سعيد", "وردة لك", "شجرة حبنا", "ذكريات جميلة", "أنتِ الوحيدة", "حبي الأبدي", "فرحة قلبي"
]; // النصوص تحت الصور – غيرها لو عايز

let rotation = 0;
let autoRotateInterval;

function unlockGift() {
    const pass = document.getElementById('password').value;
    if (pass === "123") {
        document.getElementById('ui-content').classList.add('hidden');
        document.getElementById('carousel-scene').classList.remove('hidden');
        // شغل الموسيقى فوراً
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.play().catch(e => console.log('خطأ في تشغيل الموسيقى:', e));
        setup3DCarousel();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        // ابدأ الدوران التلقائي (كل صورة بتتحرك لوحدها)
        autoRotateInterval = setInterval(() => rotate(-1), 4000);
    } else {
        document.getElementById('error').innerText = "الباسورد غلط يا نجم! 😂";
    }
}

function setup3DCarousel() {
    const container = document.getElementById('carousel-container');
    container.innerHTML = '';
    const angleStep = 360 / images.length;
    const radius = 300; // زاد عشان مش يتداخل
    
    images.forEach((src, i) => {
        const containerDiv = document.createElement('div');
        containerDiv.className = 'image-container';
        containerDiv.style.transform = `rotateY(${i * angleStep}deg) translateZ(${radius}px)`;
        
        const img = document.createElement('img');
        img.src = src + "?v=" + Math.random();
        
        img.onerror = function() {
            console.log('فشل تحميل الصورة:', src);
            this.src = 'https://via.placeholder.com/400x500?text=صورة+واضحة+عالية+الجودة';
        };
        
        const textDiv = document.createElement('div');
        textDiv.className = 'image-text';
        textDiv.innerText = imageTexts[i] || "نص رومانسي";
        
        containerDiv.appendChild(img);
        containerDiv.appendChild(textDiv);
        container.appendChild(containerDiv);
    });
}

function rotate(direction) {
    const angleStep = 360 / images.length;
    rotation += (direction * angleStep);
    document.getElementById('carousel-container').style.transform = `rotateY(${rotation}deg)`;
}

function showMessagePage() {
    clearInterval(autoRotateInterval); // وقف الدوران التلقائي
    document.getElementById('bgMusic').pause();
    const endMusic = document.getElementById('endMusic');
    endMusic.play().catch(e => console.log('خطأ في تشغيل الموسيقى النهائية:', e));
    document.getElementById('carousel-scene').classList.add('hidden');
    document.getElementById('message-page').classList.remove('hidden');
    confetti({ particleCount: 200, spread: 100 });
}

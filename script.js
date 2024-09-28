// 背面圖片的路徑數組（8張圖片，每張重複兩次）
let backImages = [
    "images/pokemon1.png",
    "images/pokemon2.png",
    "images/pokemon3.png",
    "images/pokemon4.png",
    "images/pokemon5.png",
    "images/pokemon6.png",
    "images/pokemon7.png",
    "images/pokemon8.png",
    "images/pokemon1.png",
    "images/pokemon2.png",
    "images/pokemon3.png",
    "images/pokemon4.png",
    "images/pokemon5.png",
    "images/pokemon6.png",
    "images/pokemon7.png",
    "images/pokemon8.png"
];

// Fisher-Yates 演算法打亂陣列
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 動態生成卡片
const cardContainer = document.getElementById('card-container');

function createCards() {
    cardContainer.innerHTML = ''; // 清空卡片容器
    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        // 正面圖片（初始化顯示統一的背面圖片）
        const imgFront = document.createElement('img');
        imgFront.src = "images/pokemon0.jpg"; // 統一的正面圖片
        imgFront.alt = 'Front';
        cardFront.appendChild(imgFront);

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const imgBack = document.createElement('img');
        imgBack.src = ''; // 背面圖片初始化為空
        imgBack.alt = 'Back';
        cardBack.appendChild(imgBack);

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        cardContainer.appendChild(card);
    }
}

// 初始化遊戲
createCards();

// 開始遊戲函數
function startGame() {
    backImages = shuffle(backImages); // 隨機打亂圖片順序

    const cards = document.querySelectorAll('.card');

    // 為每張卡片設置隨機的背面圖片
    cards.forEach((card, index) => {
        const imgBack = card.querySelector('.card-back img');
        imgBack.src = backImages[index]; // 將打亂後的背面圖片設置上
        card.style.transform = 'rotateY(180deg)'; // 初始化時全部顯示背面
    });

    // 10秒倒數後將卡片翻回正面
    setTimeout(() => {
        cards.forEach(card => {
            card.style.transform = 'rotateY(0deg)'; // 翻回正面
        });
    }, 10000); // 10秒後翻回正面
}

// 為「開始遊戲」按鈕添加事件監聽
document.getElementById('startGame').addEventListener('click', () => {
    startGame();
});

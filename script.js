// 背面圖片的路徑數組
const themes = {
    pokemon: {
        backImages: [
            "images/pokemon1.png",
            "images/pokemon2.png",
            "images/pokemon3.png",
            "images/pokemon4.png",
            "images/pokemon5.png",
            "images/pokemon6.png",
            "images/pokemon7.png",
            "images/pokemon8.png"
        ],
        frontImage: "images/pokemon0.jpg" // 寶可夢的正面圖片
    },
    sanrio: {
        backImages: [
            "C:/0925/images/Sanrio1.png",
            "C:/0925/images/Sanrio2.png",
            "C:/0925/images/Sanrio3.png",
            "C:/0925/images/Sanrio4.png",
            "C:/0925/images/Sanrio5.png",
            "C:/0925/images/Sanrio6.png",
            "C:/0925/images/Sanrio7.png",
            "C:/0925/images/Sanrio8.png"
        ],
        frontImage: "C:/0925/images/Sanrio0.png" // 三麗鷗的正面圖片
    }
};

// Fisher-Yates 演算法打亂陣列
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 動態生成卡片
function createCards(theme) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // 清空卡片容器

    const backImages = themes[theme].backImages; // 獲取主題的背面圖片
    const frontImage = themes[theme].frontImage; // 根據主題獲取正面圖片

    // 複製背面圖片，並打亂
    const cardImages = [...backImages, ...backImages]; // 複製一組背面圖片，生成配對
    shuffle(cardImages); // 隨機打亂

    // 動態生成16張卡片
    for (let i = 0; i < cardImages.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.image = cardImages[i]; // 儲存卡片背面圖片的路徑

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        // 正面圖片
        const imgFront = document.createElement('img');
        imgFront.src = frontImage; // 根據主題設置正面圖片
        imgFront.alt = 'Front';
        cardFront.appendChild(imgFront);

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const imgBack = document.createElement('img');
        imgBack.src = cardImages[i]; // 初始化卡片後背面圖片按隨機順序放置
        imgBack.alt = 'Back';
        cardBack.appendChild(imgBack);

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        cardContainer.appendChild(card);
    }
}

// 初始化遊戲
let firstCard = null; // 儲存第一張被點擊的卡片
let secondCard = null; // 儲存第二張被點擊的卡片
let lockBoard = false; // 判斷遊戲是否處於鎖定狀態
let matchedCardsCount = 0; // 記錄已匹配的卡片數量

function startGame() {
    const themeSelect = document.getElementById('themeSelect');
    const selectedTheme = themeSelect.value; // 獲取當前選擇的主題
    createCards(selectedTheme); // 根據主題生成卡片

    const cards = document.querySelectorAll('.card');
    // 初始化時將所有卡片翻到背面
    cards.forEach(card => {
        card.style.transform = 'rotateY(180deg)'; // 顯示背面
    });

    // 點擊「開始遊戲」後，等待 10 秒後所有卡片同時翻回正面
    setTimeout(() => {
        cards.forEach(card => {
            card.style.transform = 'rotateY(0deg)'; // 翻回正面
        });

        // 為每張卡片添加點擊事件，點擊後卡片翻轉
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (lockBoard) return; // 如果遊戲處於鎖定狀態，則不執行
                if (card.style.transform === 'rotateY(180deg)') {
                    return; // 如果卡片已經翻轉，則不執行
                }

                // 翻轉卡片
                card.style.transform = 'rotateY(180deg)'; // 翻回背面

                if (!firstCard) {
                    firstCard = card; // 記錄第一張卡片
                } else {
                    secondCard = card; // 記錄第二張卡片
                    lockBoard = true; // 鎖定遊戲以避免點擊

                    // 比對圖片
                    if (firstCard.dataset.image === secondCard.dataset.image) {
                        // 如果匹配，則保持翻轉狀態
                        matchedCardsCount += 2; // 增加已匹配的卡片數量
                        resetCards();

                        // 如果所有卡片都匹配成功
                        if (matchedCardsCount === 16) {
                            setTimeout(() => {
                                if (confirm('所有卡片匹配成功！是否要重新遊玩？')) {
                                    resetGame(); // 重新開始遊戲
                                }
                            }, 500); // 延遲0.5秒後提示玩家
                        }
                    } else {
                        // 如果不匹配，稍後翻回
                        setTimeout(() => {
                            firstCard.style.transform = 'rotateY(0deg)'; // 翻回正面
                            secondCard.style.transform = 'rotateY(0deg)'; // 翻回正面
                            resetCards(); // 重置卡片狀態
                        }, 1000); // 1秒後翻回正面
                    }
                }
            });
        });
    }, 10000); // 倒數10秒後翻回正面
}

// 重置卡片狀態
function resetCards() {
    [firstCard, secondCard] = [null, null]; // 清空卡片記錄
    lockBoard = false; // 解鎖遊戲
}

// 重置遊戲
function resetGame() {
    matchedCardsCount = 0; // 重置已匹配的卡片數量
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // 清空卡片容器
    const themeSelect = document.getElementById('themeSelect');
    themeSelect.selectedIndex = 0; // 重置主題選擇器為初始值
}

// 為「開始遊戲」按鈕添加事件監聽
document.getElementById('startGame').addEventListener('click', () => {
    startGame(); // 按下按鈕後才開始生成卡片
});

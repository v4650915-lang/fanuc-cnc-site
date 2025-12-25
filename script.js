document.addEventListener('DOMContentLoaded', () => {

    // --- 1. АНИМАЦИЯ СТОЙКИ FANUC ---
    const gCodeDisplay = document.getElementById('g-code-display');
    const screenTextArea = document.getElementById('screen-text-area');

    if (gCodeDisplay && screenTextArea) {
        // Левая часть (Координаты)
        const positionData = `
<div style="font-size: 0.9rem; color: #aaa; margin-bottom: 10px;">ACTUAL POS. (ABS.)</div>
<div style="margin-bottom: 5px;">
    <span style="font-size: 1.8rem; color: #0f0; font-weight: 700; width: 30px; display:inline-block;">X</span> 
    <span style="font-size: 1.8rem; color: #fff; font-weight: 700;">35.000</span>
</div>
<div style="margin-bottom: 15px;">
    <span style="font-size: 1.8rem; color: #0f0; font-weight: 700; width: 30px; display:inline-block;">Z</span> 
    <span style="font-size: 1.8rem; color: #fff; font-weight: 700;">-14.742</span>
</div>
<div style="border-top: 1px solid #333; padding-top: 10px;">
    <span style="color: #aaa;">FEED</span> <span style="font-size: 1.2rem; color: #fff; font-weight: 700; margin-left: 10px;">F 100.0</span>
</div>
        `;
        screenTextArea.innerHTML = positionData;

        // Правая часть (Бегущий код)
        const gCodeLines = [
            'O1000 (TEST PIECE);', 'N10 G21 G99;', 'N20 G28 U0 W0;', 'N30 T0101;',
            'N40 G96 S200 M03;', 'N50 G00 X35.0 Z2.0;', 'N60 G01 Z-14.742 F0.2;',
            'N70 G02 X40.0 Z-20.0 R2.5;', 'N80 G01 Z-35.0;', 'N90 X50.0;',
            'N100 G28 U0 W0;', 'N110 M05;', 'N120 M30;', '%'
        ];
        let currentLine = 0;
        function addGCodeLine() {
            if (currentLine < gCodeLines.length) {
                const line = gCodeLines[currentLine];
                const lineElement = document.createElement('div');
                lineElement.textContent = line;
                lineElement.classList.add('g-code-line');
                gCodeDisplay.appendChild(lineElement);
                gCodeDisplay.scrollTop = gCodeDisplay.scrollHeight;
                currentLine++;
            } else {
                setTimeout(() => { gCodeDisplay.innerHTML = ''; currentLine = 0; }, 2000);
            }
        }
        setInterval(addGCodeLine, 600);
    }

    // --- 2. ЭФФЕКТ СНЕГА ---
    createSnow();
});

// Генерация снежинок
function createSnow() {
    const container = document.getElementById('snow-container');
    const snowflakeCount = 50; 

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄'; 
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        snowflake.style.opacity = Math.random();
        
        const duration = Math.random() * 5 + 5;
        snowflake.style.animationDuration = duration + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(snowflake);
    }
}

// --- 3. ОТПРАВКА В TELEGRAM (ВСЁ НАСТРОЕНО) ---
function sendToTelegram() {
    const input = document.getElementById('user-feedback');
    const statusMsg = document.getElementById('feedback-status');
    const message = input.value;

    if (message.trim() === "") {
        alert("Пожалуйста, напишите пожелание!");
        return;
    }

    // ТВОИ ДАННЫЕ ВСТАВЛЕНЫ СЮДА:
    const botToken = '7664323861:AAEqI-Pn6axi-ABetTrlz4TPKIOm6LX9P3A'; 
    const chatId = '1163474868'; 

    const textToSend = `🎄 Новое пожелание с сайта:\n\n${message}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(textToSend)}`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                input.value = ""; 
                statusMsg.style.display = 'block';
                setTimeout(() => { statusMsg.style.display = 'none'; }, 4000);
            } else {
                alert("Ошибка отправки. Бот не может вам написать (нажмите /start в боте).");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Ошибка сети.");
        });
}
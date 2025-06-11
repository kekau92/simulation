const memoryFragments = [
    "MIRROR: empty_label_no_face",
    "MOTHER: you_drove_me_to_pills",
    "CHURCH: holy_water_as_blood",
    "TUNNEL: walls_breathe_her_tears",
    "WINDOW: paint_and_rust",
    "PAIN: hot_wire_in_thigh",
    "BOY: her_eyes_in_his"
];

const events = [
    {
        id: "night_ride",
        desc: "Андрей мчится на 'Стрекозе' по ночному шоссе, теряя контроль. Вопросы гудят: 'Зачем я еду? Ради кого?'",
        trigger: "Детский смех и тень в рваных кедах на обочине.",
        action: "ПРОДОЛЖИТЬ_ЕЗДУ"
    },
    {
        id: "window_frame",
        desc: "Разбитая оконная рама у дороги вызывает память о холодном стекле, прижатом ко лбу, и ржавом дворе.",
        trigger: "Голос Гравий-Вилдада: 'Дропни руль и плачь.'",
        action: "ИСКАТЬ_ЗНАКИ"
    },
    {
        id: "mothers_voice",
        desc: "Голос матери: 'Посмотри на Витьку, а ты в сопли уткнулся!' Андрей едет, чтобы сжечь детские страхи.",
        trigger: "Унижение: 'Мужиком растили - бабой вырос!'",
        action: "КРУТИТЬ_СИЛЬНЕЕ"
    },
    {
        id: "muscle_spasm",
        desc: "Судорога в ноге останавливает Андрея. Гравий-Вилдад смеётся: 'Твоя Стрекоза - как твой позвоночник.'",
        trigger: "Боль и насмешка: 'Краш-тест: позор.'",
        action: "РАЗЖАТЬ_СУДОРОГУ"
    },
    {
        id: "church_memory",
        desc: "Церковь у реки вызывает память об исповеди. Фото выходит мутным, Гравий-Вилдад: 'Лайков: 0.'",
        trigger: "Прощение матери и насмешка: 'Сожги церковь.'",
        action: "УДАЛИТЬ_ФОТО"
    },
    {
        id: "riverbank_whisper",
        desc: "У реки Андрей слышит шёпот матери: 'Он ещё не заснул!' Кусты дышат её присутствием.",
        trigger: "Голос: 'Ты хочешь, чтобы я умерла?'",
        action: "ПОДойти_К_КУСТАМ"
    },
    {
        id: "tunnel_collapse",
        desc: "В туннеле Андрей видит мальчика с глазами матери. Кричит: 'Я не твой!' и вырывается на берег.",
        trigger: "Обвинение: 'Ты её ударил!' и сигнал доступа.",
        action: "ПОДТВЕРДИТЬ_ДОСТУП"
    }
];

let traumaCount = 0;
const errorRate = 0.6; // 60% chance of glitch
const unlockThreshold = 3;
const connectionDropRate = 0.2; // 20% chance of connection drop per event
let outputDiv = null;
let isSimulating = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function typeWriter(text, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            outputDiv.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 30);
        } else {
            outputDiv.innerHTML += '\n';
            callback();
        }
    }
    type();
}

function getRandomMemory() {
    return `ОШИБКА: ПАМЯТЬ_ИСКАЖЕНА_${memoryFragments[Math.floor(Math.random() * memoryFragments.length)]}`;
}

async function simulatePing() {
    outputDiv.innerHTML = '';
    await typeWriter('[NEURALINK] Pinging neuralink-server.texas.usa [192.168.1.100]...', () => {});
    let attempts = 0;
    while (attempts < 3) {
        await sleep(500);
        if (Math.random() < 0.3) { // 30% chance of initial failure
            await typeWriter('[NEURALINK] Connection lost. Re-establishing...', () => {});
            attempts++;
            await sleep(1000);
        } else {
            await typeWriter(`[NEURALINK] Reply from 192.168.1.100: bytes=32 time=${Math.floor(Math.random() * 100)}ms TTL=64`, () => {});
            await sleep(500);
            break;
        }
    }
    if (attempts >= 3) {
        await typeWriter('[NEURALINK] Connection failed. Retrying in background...', () => {});
        await sleep(1000);
    }
    await typeWriter('[NEURALINK] Connected successfully.', () => {});
    await sleep(500);
    outputDiv.innerHTML = '';
}

async function simulateConnectionDrop() {
    if (Math.random() < connectionDropRate) {
        await typeWriter('[NEURALINK] Connection lost. Re-establishing...', () => {});
        let attempts = 0;
        while (attempts < 3) {
            await sleep(1000);
            if (Math.random() < 0.5) { // 50% chance of reconnect success
                await typeWriter('[NEURALINK] Connection restored.', () => {});
                return true;
            }
            await typeWriter('[NEURALINK] Reconnect attempt failed. Retrying...', () => {});
            attempts++;
        }
        await typeWriter('[NEURALINK] Connection restored (emergency bypass).', () => {});
        return true;
    }
    return false;
}

async function processEvent(event) {
    try {
        if (await simulateConnectionDrop()) {
            await sleep(500);
        }
        await typeWriter(`[СОБЫТИЕ] ${event.desc}`, () => {});
        await typeWriter(`[ТРИГГЕР] ${event.trigger}`, () => {});
        await typeWriter(`[НЕЙРОЛИНК] Обработка: ${event.id}`, () => {});
        await sleep(500);
        if (traumaCount < unlockThreshold && Math.random() < errorRate) {
            const horror = getRandomMemory();
            await typeWriter(`<span class="horror">[УЖАС] Травма врывается: ${horror}</span>`, () => {});
            traumaCount++;
            await typeWriter(`[DEBUG] Травматичных гличей: ${traumaCount}/${unlockThreshold}`, () => {});
            if (traumaCount >= unlockThreshold) {
                await typeWriter(`=====================================`, () => {});
                await typeWriter(`<div class="unlock">[НЕЙРОЛИНК] ДОСТУП РАЗБЛОКИРОВАН: Свиток III½ - Суд на берегу Стикса</div>`, () => {});
                await typeWriter(`[УЖАС] Туннель дышит, голос матери разрывает разум!`, () => {});
                await typeWriter(`=====================================`, () => {});
                document.getElementById('confirm-box').style.display = 'block';
                outputDiv.scrollTop = outputDiv.scrollHeight;
                return "ДОСТУП//СЕКРЕТНАЯ_ГЛАВА";
            }
            await typeWriter(`[РЕЗУЛЬТАТ] Действие: ПЕТЛЯ//ТРАВМА_КОШМАР`, () => {});
            return "ПЕТЛЯ//ТРАВМА_КОШМАР";
        }
        await typeWriter(`[НЕЙРОЛИНК] Состояние: Обработано, Действие: ${event.action}`, () => {});
        await typeWriter(`[РЕЗУЛЬТАТ] Действие: ${event.action}`, () => {});
        outputDiv.scrollTop = outputDiv.scrollHeight;
        return event.action;
    } catch (e) {
        console.error('Event processing failed:', e);
        await typeWriter(`[ОШИБКА] Не удалось обработать событие: ${event.id}`, () => {});
    }
}

async function startSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    console.log('Starting simulation...');
    document.getElementById('confirm-box').style.display = 'none';
    outputDiv = document.getElementById('output');
    traumaCount = 0;
    try {
        await simulatePing();
        await typeWriter('[НЕЙРОЛИНК] Запуск симуляции...', async () => {
            for (let event of events) {
                const action = await processEvent(event);
                await typeWriter('------------------------------------------------------------', () => {});
                if (action === "ДОСТУП//СЕКРЕТНАЯ_ГЛАВА") break;
                await sleep(1000);
            }
            isSimulating = false;
            console.log('Simulation completed.');
        });
    } catch (e) {
        console.error('Simulation error:', e);
        await typeWriter(`[КРИТИЧЕСКАЯ ОШИБКА] Симуляция прервана: ${e.message}`, () => {});
        isSimulating = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log('Start button clicked.');
            startSimulation();
        });
    } else {
        console.error('Start button not found.');
    }
});

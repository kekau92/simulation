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

function appendLine(text, callback) {
    outputDiv.textContent += text + '\n';
    outputDiv.scrollTop = outputDiv.scrollHeight;
    callback();
}

function getRandomMemory() {
    return `ERROR: MEMORY_CORRUPTED_${memoryFragments[Math.floor(Math.random() * memoryFragments.length)]}`;
}

async function simulatePing() {
    outputDiv.textContent = '';
    appendLine('[NEURALINK] Pinging neuralink-server.texas.usa [192.168.1.100]...', () => {});
    await sleep(500);
    let attempts = 0;
    while (attempts < 3) {
        if (Math.random() < 0.3) {
            appendLine('[NEURALINK] Connection lost. Re-establishing...', () => {});
            attempts++;
            await sleep(1000);
        } else {
            appendLine(`[NEURALINK] Reply from 192.168.1.100: bytes=32 time=${Math.floor(Math.random() * 100)}ms TTL=64`, () => {});
            await sleep(500);
            break;
        }
    }
    if (attempts >= 3) {
        appendLine('[NEURALINK] Connection failed. Retrying in background...', () => {});
        await sleep(1000);
    }
    appendLine('[NEURALINK] Connected successfully.', () => {});
    await sleep(500);
    outputDiv.textContent = '';
}

async function simulateConnectionDrop() {
    if (Math.random() < connectionDropRate) {
        appendLine('[NEURALINK] Connection lost. Re-establishing...', () => {});
        await sleep(1000);
        let attempts = 0;
        while (attempts < 3) {
            if (Math.random() < 0.5) {
                appendLine('[NEURALINK] Connection restored.', () => {});
                return true;
            }
            appendLine('[NEURALINK] Reconnect attempt failed. Retrying...', () => {});
            attempts++;
            await sleep(1000);
        }
        appendLine('[NEURALINK] Connection restored (emergency bypass).', () => {});
        return true;
    }
    return false;
}

async function processEvent(event) {
    try {
        if (await simulateConnectionDrop()) {
            await sleep(500);
        }
        appendLine(`[EVENT] ${event.desc}`, () => {});
        await sleep(500);
        appendLine(`[TRIGGER] ${event.trigger}`, () => {});
        await sleep(500);
        appendLine(`[NEURALINK] Processing: ${event.id}`, () => {});
        await sleep(500);
        if (traumaCount < unlockThreshold && Math.random() < errorRate) {
            const horror = getRandomMemory();
            appendLine(`[HORROR] Trauma detected: ${horror}`, () => {});
            traumaCount++;
            appendLine(`[DEBUG] Traumatic glitches: ${traumaCount}/${unlockThreshold}`, () => {});
            await sleep(500);
            if (traumaCount >= unlockThreshold) {
                appendLine('=====================================', () => {});
                appendLine('[NEURALINK] ACCESS UNLOCKED: Hidden Chapter', () => {});
                appendLine('[HORROR] The tunnel breathes, her voice tears through the mind!', () => {});
                appendLine('=====================================', () => {});
                document.getElementById('confirm-box').style.display = 'block';
                return "ACCESS//HIDDEN_CHAPTER";
            }
            appendLine('[RESULT] Action: LOOP//TRAUMA_NIGHTMARE', () => {});
            return "LOOP//TRAUMA_NIGHTMARE";
        }
        appendLine(`[NEURALINK] Status: Processed, Action: ${event.action}`, () => {});
        await sleep(500);
        appendLine(`[RESULT] Action: ${event.action}`, () => {});
        await sleep(500);
        return event.action;
    } catch (e) {
        console.error('Event processing failed:', e);
        appendLine(`[ERROR] Failed to process event: ${event.id}`, () => {});
    }
}

async function startSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    console.log('Starting simulation...');
    document.getElementById('confirm-box').style.display = 'none';
    outputDiv = document.getElementById('output');
    outputDiv.textContent = '';
    traumaCount = 0;
    try {
        await simulatePing();
        appendLine('[NEURALINK] Starting simulation...', async () => {});
        await sleep(500);
        for (let event of events) {
            const action = await processEvent(event);
            appendLine('------------------------------------------------------------', () => {});
            await sleep(1000);
            if (action === "ACCESS//HIDDEN_CHAPTER") break;
        }
        isSimulating = false;
        console.log('Simulation completed.');
    } catch (e) {
        console.error('Simulation error:', e);
        appendLine(`[CRITICAL ERROR] Simulation aborted: ${e.message}`, () => {});
        isSimulating = false;
    }
}

function confirmChapter(confirmed) {
    if (confirmed) {
        window.location.href = 'https://docs.google.com/document/d/1VEqjaU44MljjK2iTDZGMpIbrW4BD05cNUMKUZlFl0zI/view';
    } else {
        window.location.href = 'https://t.me/santabeansreserveandlab';
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
        alert('Error: Start button not found. Please refresh the page.');
    }
});

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
            setTimeout(type, 50); // Typing speed
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

async function processEvent(event) {
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
            await typeWriter(`<div class="unlock">[НЕЙРОЛИНК] ДОСТУП РАЗБЛОКИРОВАН: Свиток III½ - Суд на берегу Стикса`, () => {});
            await typeWriter(`[УЖАС] Туннель дышит, голос матери разрывает разум!`, () => {});
            await typeWriter(`=====================================</div>`, () => {});
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
}

async function startSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    document.getElementById('confirm-box').style.display = 'none';
    outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    traumaCount = 0;
    await typeWriter('[НЕЙРОЛИНК] Запуск симуляции...', async () => {
        for (let event of events) {
            const action = await processEvent(event);
            await typeWriter('------------------------------------------------------------', () => {});
            if (action === "ДОСТУП//СЕКРЕТНАЯ_ГЛАВА") break;
            await sleep(1000);
        }
        isSimulating = false;
    });
}

function confirmChapter(confirmed) {
    outputDiv = document.getElementById('output');
    document.getElementById('confirm-box').style.display = 'none';
    if (confirmed) {
        outputDiv.innerHTML += `\n[ССЫЛКА] Читайте скрытую главу: <a href="https://raw.githubusercontent.com/tekau82/kniqsa-andreya/main/%D0%A1%D0%B2%D0%B8%D1%82%D0%BE%D0%BA%20III%C2%BD_%20%D0%A1%D1%83%D0%B4%20%D0%BD%D0%B0%20%D0%B1%D0%B5%D1%80%D0%B5%D0%B3%D1%83%20%D0%A1%D1%82%D0%B8%D0%BA%D1%81%D0%B0.pdf" target="_blank">Свиток III½</a>\n`;
    } else {
        outputDiv.innerHTML += `\n[НЕЙРОЛИНК] Доступ отклонён. Прочтите историю снова, чтобы подготовиться.\n`;
    }
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

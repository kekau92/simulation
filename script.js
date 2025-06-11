const memoryFragments = [
    "ЗЕРКАЛО: пустая_бирка_без_лица",
    "МАТЬ: 'ты_довёл_меня_до_таблеток'",
    "ЦЕРКОВЬ: капли_святой_воды_как_кровь",
    "ТУННЕЛЬ: стены_дышат_её_слезами",
    "ЗРАЧОК_ШПРИЦ: йод_сочится_в_вены",
    "СМЕХ: шрапнель_рвёт_тишину"
];

const events = [
    { id: "взгляд_в_зеркало", desc: "Зеркало пусто, неокортекс не находит себя", action: "ПРОВЕРИТЬ_ТЕЛЕГРАМ" },
    { id: "проверка_телеграм", desc: "Нет ответа, жажда признания толкает к импульсу", action: "КУПИТЬ_СТРЕКОЗУ" },
    { id: "встреча_с_трио", desc: "Трио манит, идеализация спасает от пустоты", action: "ПРИСОЕДИНИТЬСЯ_К_ТРИО" },
    { id: "ночная_езда", desc: "Гонка в ночи, бег от голоса матери", action: "ГНАТЬ_ДО_СЛОМА" },
    { id: "истощение", desc: "Тело ломается, травма всплывает как труп", action: "СТОЛКНУТЬСЯ_С_РЕБЁНКОМ" },
    { id: "видение_ребёнка", desc: "Ребёнок в туннеле, проблеск среди кошмара", action: "ПРОДОЛЖИТЬ_С_ГЛИТЧАМИ" }
];

let traumaCount = 0;
const errorRate = 0.6; // 60% chance of glitch
const unlockThreshold = 3;
let outputDiv = null;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomMemory() {
    return `ОШИБКА: ПАМЯТЬ_ИСКАЖЕНА_${memoryFragments[Math.floor(Math.random() * memoryFragments.length)]}`;
}

async function processEvent(event) {
    outputDiv.innerHTML += `\n[СОБЫТИЕ] ${event.desc}\n[НЕЙРОЛИНК] Обработка: ${event.id}\n`;
    await sleep(500); // 0.5s pause
    if (traumaCount < unlockThreshold && Math.random() < errorRate) {
        const horror = getRandomMemory();
        outputDiv.innerHTML += `<span class="horror">[УЖАС] Травма врывается: ${horror}</span>\n`;
        traumaCount++;
        outputDiv.innerHTML += `[DEBUG] Травматичных гличей: ${traumaCount}/${unlockThreshold}\n`;
        if (traumaCount >= unlockThreshold) {
            outputDiv.innerHTML += `=====================================\n`;
            outputDiv.innerHTML += `<div class="unlock">[НЕЙРОЛИНК] ДОСТУП РАЗБЛОКИРОВАН: Свиток III½ - Суд на берегу Стикса\n`;
            outputDiv.innerHTML += `[УЖАС] Туннель дышит, голос матери разрывает разум!\n`;
            outputDiv.innerHTML += `[ССЫЛКА] Читайте скрытую главу: <a href="YOUR_ACTUAL_URL_HERE" target="_blank">Свиток III½</a>\n`;
            outputDiv.innerHTML += `=====================================</div>\n`;
            return "ДОСТУП//СЕКРЕТНАЯ_ГЛАВА";
        }
        outputDiv.innerHTML += `[РЕЗУЛЬТАТ] Действие: ПЕТЛЯ//ТРАВМА_КОШМАР\n`;
        return "ПЕТЛЯ//ТРАВМА_КОШМАР";
    }
    outputDiv.innerHTML += `[НЕЙРОЛИНК] Состояние: Обработано, Действие: ${event.action}\n`;
    outputDiv.innerHTML += `[РЕЗУЛЬТАТ] Действие: ${event.action}\n`;
    return event.action;
}

async function runSimulation() {
    outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "[НЕЙРОЛИНК] Запуск симуляции...\n";
    traumaCount = 0;
    for (let event of events) {
        const action = await processEvent(event);
        outputDiv.innerHTML += "------------------------------------------------------------\n";
        if (action === "ДОСТУП//СЕКРЕТНАЯ_ГЛАВА") break;
        await sleep(1000); // 1s pause between events
    }
}

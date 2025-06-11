const postClickIntro = `> Попытка: взаимно стабилизировать нервную систему...
> Результат: частичный успех.
> Формируется биохимическая петля...
> Источник: знакомая травма → реакция страха → всплеск дофамина
> Цикл устойчив. Саморазрушение маскируется под близость.`;

const memoryFragments = [
    "MIRROR: empty_label_no_face",
    "MOTHER: you_drove_me_to_pills",
    "CHURCH: holy_water_as_blood",
    "TUNNEL: walls_breathe_her_tears",
    "WINDOW: paint_and_rust",
    "PAIN: hot_wire_in_thigh",
    "BOY: her_eyes_in_his"
];

const readerTraumaProfile = [
    "MOTHER: you_drove_me_to_pills",
    "CHURCH: holy_water_as_blood",
    "TUNNEL: walls_breathe_her_tears"
];

const events = [
    { id: "night_ride", desc: "Андрей мчится по шоссе.", trigger: "Смех на обочине." },
    { id: "window_frame", desc: "Оконная рама холодит лоб.", trigger: "Голос: 'Плачь.'" },
    { id: "mothers_voice", desc: "Мать: 'Ты не мужик!'", trigger: "Унижение." },
    { id: "muscle_spasm", desc: "Судорога в ноге.", trigger: "Насмешка: 'Позор.'" },
    { id: "church_memory", desc: "Церковь у реки.", trigger: "Призыв: 'Сожги.'" },
    { id: "riverbank_whisper", desc: "Шёпот матери у реки.", trigger: "Голос: 'Я умерла?'" },
    { id: "tunnel_collapse", desc: "Мальчик с её глазами.", trigger: "Крик: 'Ты ударил!'" }
];

let traumaAlignmentCount = 0;
const alignmentThreshold = 3;
const connectionDropRate = 0.2;
let outputDiv = null;
let isSimulating = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function typeWriter(text, callback) {
    outputDiv.textContent = ''; // Clear output
    let i = 0;
    function type() {
        if (i < text.length) {
            outputDiv.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        } else {
            outputDiv.textContent += '\n';
            outputDiv.scrollTop = outputDiv.scrollHeight;
            callback();
        }
    }
    type();
}

function getRandomServerTrauma() {
    return memoryFragments[Math.floor(Math.random() * memoryFragments.length)];
}

async function simulateConnection() {
    await typeWriter(postClickIntro, async () => {
        await sleep(500);
        await typeWriter('[NEURALINK] Connecting DEVICE: USER_LOCAL to server...', async () => {
            await sleep(500);
            await typeWriter('[NEURALINK] Reply: time=' + Math.floor(Math.random() * 100) + 'ms', async () => {
                await sleep(500);
                await typeWriter('[NEURALINK] Connected. Scanning psyche...', () => {});
            });
        });
    });
}

async function simulateConnectionDrop() {
    if (Math.random() < connectionDropRate) {
        await typeWriter('[NEURALINK] Connection lost. Retrying...', async () => {
            await sleep(1000);
            await typeWriter('[NEURALINK] Connection restored.', () => {});
        });
        return true;
    }
    return false;
}

async function processEvent(event) {
    if (await simulateConnectionDrop()) {
        await sleep(500);
    }
    await typeWriter(`[EVENT] ${event.desc}`, () => {});
    await typeWriter(`[TRIGGER] ${event.trigger}`, () => {});
    await sleep(500);
    if (traumaAlignmentCount < alignmentThreshold) {
        const serverTrauma = getRandomServerTrauma();
        await typeWriter(`[NEURALINK] Trauma: ${serverTrauma}`, () => {});
        if (readerTraumaProfile.includes(serverTrauma)) {
            traumaAlignmentCount++;
            await typeWriter(`[TRAUMA] Aligned: ${serverTrauma} (${traumaAlignmentCount}/${alignmentThreshold})`, () => {});
            if (traumaAlignmentCount >= alignmentThreshold) {
                await typeWriter('=================', () => {});
                await typeWriter('[NEURALINK] ACCESS UNLOCKED', () => {});
                await typeWriter('[TRAUMA] Her voice tears through!', () => {});
                await typeWriter('=================', () => {});
                document.getElementById('confirm-box').style.display = 'block';
                outputDiv.scrollTop = outputDiv.scrollHeight;
                return "ACCESS";
            }
        } else {
            await typeWriter('[NEURALINK] No alignment.', () => {});
        }
    }
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

async function startSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    console.log('Simulation started');
    outputDiv = document.getElementById('output');
    document.getElementById('confirm-box').style.display = 'none';
    traumaAlignmentCount = 0;
    try {
        await simulateConnection();
        await sleep(500);
        for (let event of events) {
            await processEvent(event);
            await typeWriter('-----', () => {});
            if (traumaAlignmentCount >= alignmentThreshold) break;
            await sleep(1000);
        }
        isSimulating = false;
        console.log('Simulation ended');
    } catch (e) {
        console.error('Error:', e);
        await typeWriter(`[ERROR] Failed: ${e.message}`, () => {});
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
        startButton.addEventListener('click', startSimulation);
        startButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log('Touchstart triggered');
            startSimulation();
        });
    } else {
        console.error('Start button missing');
        alert('Error: Button not found. Refresh page.');
    }
});

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
    if (!outputDiv) return;
    const lines = text.split('\n');
    let currentLine = 0;
    
    function writeLine() {
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            let i = 0;
            
            function typeChar() {
                if (i < line.length) {
                    outputDiv.textContent += line.charAt(i);
                    i++;
                    setTimeout(typeChar, 30);
                } else {
                    outputDiv.textContent += '\n';
                    outputDiv.scrollTop = outputDiv.scrollHeight;
                    currentLine++;
                    setTimeout(writeLine, 100);
                }
            }
            
            typeChar();
        } else if (callback) {
            callback();
        }
    }
    
    writeLine();
}

function getRandomServerTrauma() {
    return memoryFragments[Math.floor(Math.random() * memoryFragments.length)];
}

async function simulateConnection() {
    await new Promise(resolve => {
        typeWriter(postClickIntro, resolve);
    });
    
    await sleep(500);
    
    await new Promise(resolve => {
        typeWriter('[NEURALINK] Connecting DEVICE: USER_LOCAL to server...', resolve);
    });
    
    await sleep(500);
    
    await new Promise(resolve => {
        typeWriter('[NEURALINK] Reply: time=' + Math.floor(Math.random() * 100) + 'msms', resolve);
    });
    
    await sleep(500);
    
    await new Promise(resolve => {
        typeWriter('[NEURALINK] Connected. Scanning psyche...', resolve);
    });
}

async function simulateConnectionDrop() {
    if (Math.random() < connectionDropRate) {
        await new Promise(resolve => {
            typeWriter('[NEURALINK] Connection lost. Retry...', resolve);
        });
        
        await sleep(1200);
        
        await new Promise(resolve => {
            typeWriter('[NEURALINK] Connection restored.', resolve);
        });
        
        return true;
    }
    return false;
}

async function processEvent(event) {
    if (await simulateConnectionDrop()) {
        await sleep(500);
    }
    
    await new Promise(resolve => {
        typeWriter(`\n[EVENT] ${event.desc}`, resolve);
    });
    
    await new Promise(resolve => {
        typeWriter(`[TRIGGER] ${event.trigger}`, resolve);
    });
    
    await sleep(500);
    
    if (traumaAlignmentCount < alignmentThreshold) {
        const serverTrauma = getRandomServerTrauma();
        
        await new Promise(resolve => {
            typeWriter(`[NEURALINK] Trauma: ${serverTrauma}`, resolve);
        });
        
        if (readerTraumaProfile.includes(serverTrauma)) {
            traumaAlignmentCount++;
            
            await new Promise(resolve => {
                typeWriter(`[TRAUMA] Aligned: ${serverTrauma} (${traumaAlignmentCount}/${alignmentThreshold})`, resolve);
            });
            
            if (traumaAlignmentCount >= alignmentThreshold) {
                await new Promise(resolve => {
                    typeWriter('\n-----------------', resolve);
                });
                
                await new Promise(resolve => {
                    typeWriter('[NEURALINK] ACCESS UNLOCKED', resolve);
                });
                
                await new Promise(resolve => {
                    typeWriter('[TRAUMA] Her voice tears through!', resolve);
                });
                
                await new Promise(resolve => {
                    typeWriter('-----------------', resolve);
                });
                
                document.getElementById('confirm-box').style.display = 'block';
                outputDiv.scrollTop = outputDiv.scrollHeight;
                return true;
            }
        } else {
            await new Promise(resolve => {
                typeWriter('[NEURALINK] No alignment.', resolve);
            });
        }
    }
}

async function startSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    console.log('Simulation started');
    
    const startButton = document.getElementById('start-button');
    startButton.textContent = "ПОДКЛЮЧЕНИЕ...";
    startButton.disabled = true;
    
    outputDiv = document.getElementById('output');
    outputDiv.textContent = '';
    document.getElementById('confirm-box').style.display = 'none';
    traumaAlignmentCount = 0;
    
    try {
        await simulateConnection();
        
        for (let event of events) {
            const result = await processEvent(event);
            if (result) break;
            
            await new Promise(resolve => {
                typeWriter('----------------------------------------', resolve);
            });
            await sleep(1000);
        }
        
        if (traumaAlignmentCount < alignmentThreshold) {
            await new Promise(resolve => {
                typeWriter('\n[NEURALINK] Insufficient trauma alignment.', resolve);
            });
        }
    } catch (e) {
        console.error('Error:', e);
        await new Promise(resolve => {
            typeWriter(`[ERROR] Failed: ${e.message}`, resolve);
        });
    } finally {
        startButton.textContent = "ПЕРЕЗАПУСТИТЬ";
        startButton.disabled = false;
        isSimulating = false;
        console.log('Simulation ended');
    }
}

function confirmChapter(confirmed) {
    if (confirmed) {
        window.location.href = 'https://docs.google.com/document/d/1VEqjaU44MljjK2iTDZGMpIbrW4BD05cNUMiKUZlFl0zI/view';
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
    
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');
    confirmYes.addEventListener('click', () => confirmChapter(true));
    confirmNo.addEventListener('click', () => confirmChapter(false));
});

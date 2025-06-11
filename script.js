const postClickIntro = `> Попытка: взаимно стабилизировать нервную систему...
> Результат: частичный успех.
> Требуется 3 из 3 совпадений:
[✓] Амигдала — отклик на угрозу
[✓] Гиппокамп — фрагмент контекста распознан
[✗] Префронтальная кора — активность недостаточна
> Формируется биохимическая петля...
> Источник: знакомая травма → реакция страха → всплеск дофамина
> Поведение: компульсивное сближение → активация схемы спасения → углубление зависимости
> Цикл устойчив. Саморазрушение маскируется под близость.
> Внутренний отклик:
- Инсула: частичная диссоциация, соматическая спутанность
- Амигдала: уровень тревоги ↑↑
- Префронтальная кора: связь с реальностью нестабильна
> Доступ к скрытой памяти возможен.
> Условие: принудительная активация всей триады — страх, контекст, рационализация
> Запрос:
>> Войти в травматическое воспоминание`;

const memoryFragments = [
    "MIRROR: empty_label_no_face",
    "MOTHER: you_drove_me_to_pills",
    "CHURCH: holy_water_as_blood",
    "TUNNEL: walls_breathe_her_tears",
    "WINDOW: paint_and_rust",
    "PAIN: hot_wire_in_thigh",
    "BOY: her_eyes_in_his",
    "OFFICE: hollow_chest_echo",
    "BICYCLE: carbon_crucifixion",
    "COFFEE: mourning_brew_sips",
    "ORLENOK: rusty_bones_bell"
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
    { id: "tunnel_collapse", desc: "Мальчик с её глазами.", trigger: "Крик: 'Ты ударил!'" },
    { id: "office_procol", desc: "Офис гудит пустотой.", trigger: "Шёпот: 'Ты не здесь.'" },
    { id: "peloton_call", desc: "Чёрный Пелотон зовёт.", trigger: "Уведомление: 'Исповедь.'" },
    { id: "coffee_ritual", desc: "Траурный напиток в кафе.", trigger: "Взгляд: 'Чужой.'" },
    { id: "orlenok_vision", desc: "Орлёнок на пустой дороге.", trigger: "Звонок: 'Смех травы.'" }
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
            // Trim leading spaces for consistent alignment, but preserve intentional formatting
            const line = lines[currentLine].replace(/^\s+/, line => line.match(/^(\s*[-[✓✗>]|\s*\>)/) ? line : '');
            let i = 0;
            
            function typeChar() {
                if (i < line.length) {
                    outputDiv.textContent += line.charAt(i);
                    i++;
                    setTimeout(typeChar, 15);
                } else {
                    outputDiv.textContent += '\n';
                    outputDiv.scrollTop = outputDiv.scrollHeight;
                    currentLine++;
                    setTimeout(writeLine, 50);
                }
            }
            
            typeChar();
        } else if (callback) {
            callback();
        }
    }
    
    writeLine();
}

function typeWriterWithLink(text, linkText, url, callback) {
    if (!outputDiv) return;
    
    const lines = text.split('\n');
    let currentLine = 0;
    
    function writeLine() {
        if (currentLine < lines.length) {
            const line = lines[currentLine].replace(/^\s+/, '');
            if (line.includes(linkText)) {
                const parts = line.split(linkText);
                typeWriter(parts[0], () => {
                    const link = document.createElement('a');
                    link.href = url;
                    link.textContent = linkText;
                    link.className = 'access-link';
                    link.target = '_blank';
                    outputDiv.appendChild(link);
                    outputDiv.appendChild(document.createTextNode('\n'));
                    outputDiv.scrollTop = outputDiv.scrollHeight;
                    currentLine++;
                    setTimeout(writeLine, 50);
                });
            } else {
                typeWriter(line, () => {
                    currentLine++;
                    setTimeout(writeLine, 50);
                });
            }
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
        typeWriter('[NEURALINK] Connecting DEVICE: USER_LOCAL to server at 600 Navarro St, Ste 350, San Antonio, TX 78205, US...', resolve);
    });
    
    await sleep(800);
    
    await new Promise(resolve => {
        typeWriter('[NEURALINK] Reply: time=' + Math.floor(Math.random() * 100) + 'ms', resolve);
    });
    
    await sleep(600);
    
    await new Promise(resolve => {
        typeWriter('[NEURALINK] Connected. Scanning psyche...', resolve);
    });
}

async function simulateConnectionDrop() {
    if (Math.random() < connectionDropRate) {
        await new Promise(resolve => {
            typeWriter('[NEURALINK] Connection lost. Retrying...', resolve);
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
    
    await sleep(700);
    
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
                    typeWriter('\n=================', resolve);
                });
                
                await new Promise(resolve => {
                    typeWriter('[NEURALINK] ACCESS UNLOCKED', resolve);
                });
                
                await new Promise(resolve => {
                    typeWriter('[TRAUMA] Her voice tears through!', resolve);
                });
                
                await new Promise(resolve => {
                    typeWriterWithLink('=================\nДОСТУП РАЗБЛОКИРОВАН: СКРЫТАЯ ЧАСТЬ', 
                        'ДОСТУП РАЗБЛОКИРОВАН: СКРЫТАЯ ЧАСТЬ', 
                        'https://docs.google.com/document/d/1VEqjaU44MljjK2iTDZGMpIbrW4BD05cNUMKUZlFl0zI/view', 
                        resolve);
                });
                
                return "ACCESS";
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
    
    const startButton = document.getElementById('start-button');
    startButton.textContent = "ПОДКЛЮЧЕНИЕ...";
    startButton.disabled = true;
    
    outputDiv = document.getElementById('output');
    outputDiv.textContent = '';
    traumaAlignmentCount = 0;
    
    try {
        await simulateConnection();
        
        for (let event of events) {
            const result = await processEvent(event);
            if (result === "ACCESS") break;
            
            await new Promise(resolve => {
                typeWriter('----------------------------------------', resolve);
            });
            
            await sleep(1000);
        }
        
        if (traumaAlignmentCount < alignmentThreshold) {
            await new Promise(resolve => {
                typeWriter(`\n> [NEURALINK] Недостаточное совпадение травмы. Доступ запрещён.
> Insufficient trauma alignment. Access denied.
> Возможные причины:
- Эмоциональное подавление
- Нарушена связь между телесными ощущениями и воспоминаниями
- Триггер активирует имитацию, а не подлинное ядро травмы
> Рекомендация:
>> Восстановить сенсорный след (через запах, звук, голос)
>> Запросить внешний стимул для разблокировки памяти
> Повторить попытку подключения`, resolve);
            });
        }
    } catch (e) {
        console.error('Error:', e);
        await new Promise(resolve => {
            typeWriter(`[ERROR] Simulation failed: ${e.message}`, resolve);
        });
    } finally {
        startButton.textContent = "ПЕРЕЗАПУСТИТЬ СИМУЛЯЦИЮ";
        startButton.disabled = false;
        isSimulating = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startSimulation);
});

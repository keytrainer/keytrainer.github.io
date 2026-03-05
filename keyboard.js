// keyboard.js

const KEYBOARD_LAYOUT = [
    [
        { id: 'Backquote', label: '`', finger: 'l-pinky' },
        { id: 'Digit1', label: '1', finger: 'l-pinky' },
        { id: 'Digit2', label: '2', finger: 'l-ring' },
        { id: 'Digit3', label: '3', finger: 'l-middle' },
        { id: 'Digit4', label: '4', finger: 'l-index' },
        { id: 'Digit5', label: '5', finger: 'l-index' },
        { id: 'Digit6', label: '6', finger: 'r-index' },
        { id: 'Digit7', label: '7', finger: 'r-index' },
        { id: 'Digit8', label: '8', finger: 'r-middle' },
        { id: 'Digit9', label: '9', finger: 'r-ring' },
        { id: 'Digit0', label: '0', finger: 'r-pinky' },
        { id: 'Minus', label: '-', finger: 'r-pinky' },
        { id: 'Equal', label: '=', finger: 'r-pinky' },
        { id: 'Backspace', label: 'Back', class: 'wide-3', finger: 'r-pinky' }
    ],
    [
        { id: 'Tab', label: 'Tab', class: 'wide-1', finger: 'l-pinky' },
        { id: 'KeyQ', label: 'Q', finger: 'l-pinky' },
        { id: 'KeyW', label: 'W', finger: 'l-ring' },
        { id: 'KeyE', label: 'E', finger: 'l-middle' },
        { id: 'KeyR', label: 'R', finger: 'l-index' },
        { id: 'KeyT', label: 'T', finger: 'l-index' },
        { id: 'KeyY', label: 'Y', finger: 'r-index' },
        { id: 'KeyU', label: 'U', finger: 'r-index' },
        { id: 'KeyI', label: 'I', finger: 'r-middle' },
        { id: 'KeyO', label: 'O', finger: 'r-ring' },
        { id: 'KeyP', label: 'P', finger: 'r-pinky' },
        { id: 'BracketLeft', label: '[', finger: 'r-pinky' },
        { id: 'BracketRight', label: ']', finger: 'r-pinky' },
        { id: 'Backslash', label: '\\', class: 'wide-1', finger: 'r-pinky' }
    ],
    [
        { id: 'CapsLock', label: 'Caps', class: 'wide-2', finger: 'l-pinky' },
        { id: 'KeyA', label: 'A', finger: 'l-pinky' },
        { id: 'KeyS', label: 'S', finger: 'l-ring' },
        { id: 'KeyD', label: 'D', finger: 'l-middle' },
        { id: 'KeyF', label: 'F', finger: 'l-index' },
        { id: 'KeyG', label: 'G', finger: 'l-index' },
        { id: 'KeyH', label: 'H', finger: 'r-index' },
        { id: 'KeyJ', label: 'J', finger: 'r-index' },
        { id: 'KeyK', label: 'K', finger: 'r-middle' },
        { id: 'KeyL', label: 'L', finger: 'r-ring' },
        { id: 'Semicolon', label: ';', finger: 'r-pinky' },
        { id: 'Quote', label: "'", finger: 'r-pinky' },
        { id: 'Enter', label: 'Enter', class: 'wide-2', finger: 'r-pinky' }
    ],
    [
        { id: 'ShiftLeft', label: 'Shift', class: 'wide-3', finger: 'l-pinky' },
        { id: 'KeyZ', label: 'Z', finger: 'l-pinky' },
        { id: 'KeyX', label: 'X', finger: 'l-ring' },
        { id: 'KeyC', label: 'C', finger: 'l-middle' },
        { id: 'KeyV', label: 'V', finger: 'l-index' },
        { id: 'KeyB', label: 'B', finger: 'l-index' },
        { id: 'KeyN', label: 'N', finger: 'r-index' },
        { id: 'KeyM', label: 'M', finger: 'r-index' },
        { id: 'Comma', label: ',', finger: 'r-middle' },
        { id: 'Period', label: '.', finger: 'r-ring' },
        { id: 'Slash', label: '/', finger: 'r-pinky' },
        { id: 'ShiftRight', label: 'Shift', class: 'wide-3', finger: 'r-pinky' }
    ],
    [
        { id: 'Space', label: 'Space', class: 'space', finger: 'thumb' }
    ]
];

function renderKeyboard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    KEYBOARD_LAYOUT.forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'key-row';
        
        row.forEach(key => {
            const keyEl = document.createElement('div');
            keyEl.className = `key ${key.finger} ${key.class || ''}`;
            keyEl.id = `key-${key.id}`;
            keyEl.textContent = key.label;
            rowEl.appendChild(keyEl);
        });
        
        container.appendChild(rowEl);
    });
}

function highlightKey(code, type) {
    const keyEl = document.getElementById(`key-${code}`);
    if (!keyEl) return;
    
    if (type === 'press') {
        keyEl.classList.add('pressed');
        setTimeout(() => keyEl.classList.remove('pressed'), 100);
    } else if (type === 'correct') {
        keyEl.classList.add('flash-correct');
        setTimeout(() => keyEl.classList.remove('flash-correct'), 200);
    } else if (type === 'incorrect') {
        keyEl.classList.add('flash-incorrect');
        setTimeout(() => keyEl.classList.remove('flash-incorrect'), 200);
    }
}

function setTargetKey(char) {
    document.querySelectorAll('.key.target').forEach(el => el.classList.remove('target'));
    
    if (!char) return;
    
    let targetCode = null;
    
    if (char === ' ') {
        targetCode = 'Space';
    } else {
        const upperChar = char.toUpperCase();
        for (const row of KEYBOARD_LAYOUT) {
            const key = row.find(k => k.label.toUpperCase() === upperChar);
            if (key) {
                targetCode = key.id;
                break;
            }
        }
    }
    
    if (targetCode) {
        const keyEl = document.getElementById(`key-${targetCode}`);
        if (keyEl) keyEl.classList.add('target');
    }
}
// keyboard.js

const KEYBOARD_LAYOUT = [
    [
        { id: 'Backquote', label: '`', sec: '~', finger: 'l-pinky' },
        { id: 'Digit1', label: '1', sec: '!', finger: 'l-pinky' },
        { id: 'Digit2', label: '2', sec: '@', finger: 'l-ring' },
        { id: 'Digit3', label: '3', sec: '#', finger: 'l-middle' },
        { id: 'Digit4', label: '4', sec: '$', finger: 'l-index' },
        { id: 'Digit5', label: '5', sec: '%', finger: 'l-index' },
        { id: 'Digit6', label: '6', sec: '^', finger: 'r-index' },
        { id: 'Digit7', label: '7', sec: '&', finger: 'r-index' },
        { id: 'Digit8', label: '8', sec: '*', finger: 'r-middle' },
        { id: 'Digit9', label: '9', sec: '(', finger: 'r-ring' },
        { id: 'Digit0', label: '0', sec: ')', finger: 'r-pinky' },
        { id: 'Minus', label: '-', sec: '_', finger: 'r-pinky' },
        { id: 'Equal', label: '=', sec: '+', finger: 'r-pinky' },
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
        { id: 'BracketLeft', label: '[', sec: '{', finger: 'r-pinky' },
        { id: 'BracketRight', label: ']', sec: '}', finger: 'r-pinky' },
        { id: 'Backslash', label: '\\', sec: '|', class: 'wide-1', finger: 'r-pinky' }
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
        { id: 'Semicolon', label: ';', sec: ':', finger: 'r-pinky' },
        { id: 'Quote', label: "'", sec: '"', finger: 'r-pinky' },
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
        { id: 'Comma', label: ',', sec: '<', finger: 'r-middle' },
        { id: 'Period', label: '.', sec: '>', finger: 'r-ring' },
        { id: 'Slash', label: '/', sec: '?', finger: 'r-pinky' },
        { id: 'ShiftRight', label: 'Shift', class: 'wide-3', finger: 'r-pinky' }
    ],
    [
        { id: 'Space', label: 'Space', class: 'space', finger: 'thumb' }
    ]
];

const CHAR_TO_KEY_MAP = {
    '`': 'Backquote', '~': 'Backquote',
    '1': 'Digit1', '!': 'Digit1',
    '2': 'Digit2', '@': 'Digit2',
    '3': 'Digit3', '#': 'Digit3',
    '4': 'Digit4', '$': 'Digit4',
    '5': 'Digit5', '%': 'Digit5',
    '6': 'Digit6', '^': 'Digit6',
    '7': 'Digit7', '&': 'Digit7',
    '8': 'Digit8', '*': 'Digit8',
    '9': 'Digit9', '(': 'Digit9',
    '0': 'Digit0', ')': 'Digit0',
    '-': 'Minus', '_': 'Minus',
    '=': 'Equal', '+': 'Equal',
    'q': 'KeyQ', 'w': 'KeyW', 'e': 'KeyE', 'r': 'KeyR', 't': 'KeyT', 'y': 'KeyY', 'u': 'KeyU', 'i': 'KeyI', 'o': 'KeyO', 'p': 'KeyP',
    '[': 'BracketLeft', '{': 'BracketLeft',
    ']': 'BracketRight', '}': 'BracketRight',
    '\\': 'Backslash', '|': 'Backslash',
    'a': 'KeyA', 's': 'KeyS', 'd': 'KeyD', 'f': 'KeyF', 'g': 'KeyG', 'h': 'KeyH', 'j': 'KeyJ', 'k': 'KeyK', 'l': 'KeyL',
    ';': 'Semicolon', ':': 'Semicolon',
    '\'': 'Quote', '"': 'Quote',
    'z': 'KeyZ', 'x': 'KeyX', 'c': 'KeyC', 'v': 'KeyV', 'b': 'KeyB', 'n': 'KeyN', 'm': 'KeyM',
    ',': 'Comma', '<': 'Comma',
    '.': 'Period', '>': 'Period',
    '/': 'Slash', '?': 'Slash',
    ' ': 'Space'
};

function getKeyId(char) {
    if (!char) return null;
    return CHAR_TO_KEY_MAP[char.toLowerCase()] || CHAR_TO_KEY_MAP[char];
}

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
            
            if (key.sec) {
                const secEl = document.createElement('div');
                secEl.className = 'sec-label';
                secEl.textContent = key.sec;
                keyEl.appendChild(secEl);
            }
            
            const mainLabel = document.createElement('div');
            mainLabel.textContent = key.label;
            keyEl.appendChild(mainLabel);
            
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
    
    let isShiftNeeded = false;
    if (char === char.toUpperCase() && char.toLowerCase() !== char.toUpperCase()) {
        isShiftNeeded = true; // Uppercase letters
    } else if ("~!@#$%^&*()_+{}|:\"<>?".includes(char)) {
        isShiftNeeded = true; // Shifted symbols
    }
    
    let targetCode = CHAR_TO_KEY_MAP[char.toLowerCase()] || CHAR_TO_KEY_MAP[char];
    
    if (targetCode) {
        const keyEl = document.getElementById(`key-${targetCode}`);
        if (keyEl) {
            keyEl.classList.add('target');
            
            if (isShiftNeeded) {
                // If main key is pressed with right hand, target left shift, else target right shift
                let shiftCode = 'ShiftLeft';
                if (keyEl.className.includes(' r-')) {
                    shiftCode = 'ShiftLeft';
                } else if (keyEl.className.includes(' l-')) {
                    shiftCode = 'ShiftRight';
                }
                const shiftEl = document.getElementById(`key-${shiftCode}`);
                if (shiftEl) shiftEl.classList.add('target');
            }
        }
    }
}
// script.js

const state = {
    text: "",
    currentIndex: 0,
    startTime: null,
    mistakes: 0,
    totalTyped: 0,
    lessonId: 1,
    isActive: false
};

const elements = {
    textDisplay: document.getElementById('text-display'),
    wpmDisplay: document.getElementById('wpm'),
    accuracyDisplay: document.getElementById('accuracy'),
    mistakesDisplay: document.getElementById('mistakes'),
    progressBar: document.getElementById('progress-bar'),
    lessonSelect: document.getElementById('lesson-select'),
    restartBtn: document.getElementById('restart-btn')
};

function init() {
    renderKeyboard('keyboard');
    setupEventListeners();
    startLesson(1);
}

function setupEventListeners() {
    document.addEventListener('keydown', handleKeyDown);
    
    elements.lessonSelect.addEventListener('change', (e) => {
        startLesson(parseInt(e.target.value));
        e.target.blur(); // Remove focus so spacebar doesn't trigger dropdown
    });
    
    elements.restartBtn.addEventListener('click', (e) => {
        startLesson(state.lessonId);
        e.target.blur(); // Remove focus
    });
}

function startLesson(lessonId) {
    state.lessonId = lessonId;
    state.text = generateLessonText(lessonId);
    state.currentIndex = 0;
    state.startTime = null;
    state.mistakes = 0;
    state.totalTyped = 0;
    state.isActive = true;
    
    updateDisplay();
    updateStats();
    updateTargetKey();
}

function updateDisplay() {
    elements.textDisplay.innerHTML = '';
    
    for (let i = 0; i < state.text.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = state.text[i];
        charSpan.className = 'char';
        
        if (i < state.currentIndex) {
            charSpan.classList.add('correct');
        } else if (i === state.currentIndex) {
            charSpan.classList.add('current');
        }
        
        elements.textDisplay.appendChild(charSpan);
    }
    
    const progress = state.text.length > 0 ? (state.currentIndex / state.text.length) * 100 : 0;
    elements.progressBar.style.width = `${progress}%`;
}

function updateStats() {
    elements.mistakesDisplay.textContent = state.mistakes;
    
    if (state.totalTyped > 0) {
        const accuracy = Math.round(((state.totalTyped - state.mistakes) / state.totalTyped) * 100);
        elements.accuracyDisplay.textContent = `${Math.max(0, accuracy)}%`;
    } else {
        elements.accuracyDisplay.textContent = '100%';
    }
    
    if (state.startTime && state.totalTyped > 0) {
        const timeElapsed = (Date.now() - state.startTime) / 60000;
        if (timeElapsed > 0) {
            const wordsTyped = state.currentIndex / 5;
            const wpm = Math.round(wordsTyped / timeElapsed);
            elements.wpmDisplay.textContent = wpm;
        }
    } else {
        elements.wpmDisplay.textContent = '0';
    }
}

function updateTargetKey() {
    if (state.currentIndex < state.text.length) {
        setTargetKey(state.text[state.currentIndex]);
    } else {
        setTargetKey(null);
    }
}

function handleKeyDown(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Shift' || e.key === 'CapsLock' || e.key === 'Tab' || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Escape') {
        return;
    }

    if (e.code === 'Space') {
        e.preventDefault();
    }
    
    if (!state.isActive) return;
    
    if (state.startTime === null) {
        state.startTime = Date.now();
    }
    
    state.totalTyped++;
    const targetChar = state.text[state.currentIndex];
    
    highlightKey(e.code, 'press');
    
    if (e.key === targetChar) {
        highlightKey(e.code, 'correct');
        state.currentIndex++;
        
        if (state.currentIndex >= state.text.length) {
            state.isActive = false;
            updateStats();
        }
    } else {
        highlightKey(e.code, 'incorrect');
        state.mistakes++;
        
        const currentSpan = elements.textDisplay.children[state.currentIndex];
        if (currentSpan) {
            currentSpan.classList.add('incorrect');
            setTimeout(() => {
                currentSpan.classList.remove('incorrect');
            }, 200);
        }
    }
    
    updateDisplay();
    updateStats();
    updateTargetKey();
}

window.addEventListener('DOMContentLoaded', init);
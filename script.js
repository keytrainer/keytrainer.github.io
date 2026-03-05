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
    restartBtn: document.getElementById('restart-btn'),
    
    // Modal elements
    modalOverlay: document.getElementById('completion-modal'),
    modalWpm: document.getElementById('modal-wpm'),
    modalAcc: document.getElementById('modal-acc'),
    modalMistakes: document.getElementById('modal-mistakes'),
    nextLessonBtn: document.getElementById('next-lesson-btn'),
    retryLessonBtn: document.getElementById('retry-lesson-btn'),
    
    // Settings elements
    themeToggle: document.getElementById('theme-toggle'),
    soundToggle: document.getElementById('sound-toggle')
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
    
    // Modal buttons
    elements.nextLessonBtn.addEventListener('click', () => {
        hideModal();
        let nextLessonId = state.lessonId + 1;
        const options = Array.from(elements.lessonSelect.options).map(o => parseInt(o.value));
        if (options.includes(nextLessonId)) {
            elements.lessonSelect.value = nextLessonId;
            startLesson(nextLessonId);
        } else {
            startLesson(state.lessonId); // Restart current if it's the last one
        }
    });
    
    elements.retryLessonBtn.addEventListener('click', () => {
        hideModal();
        startLesson(state.lessonId);
    });
    
    // Settings toggles
    elements.themeToggle.addEventListener('click', (e) => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        e.target.textContent = document.body.dataset.theme === 'dark' ? '☀️' : '🌙';
        e.target.blur();
    });
    
    elements.soundToggle.addEventListener('click', (e) => {
        if (typeof audio !== 'undefined') {
            const isEnabled = audio.toggle();
            e.target.textContent = isEnabled ? '🔊' : '🔇';
        }
        e.target.blur();
    });
}

function showModal() {
    elements.modalWpm.textContent = `${elements.wpmDisplay.textContent} WPM`;
    elements.modalAcc.textContent = elements.accuracyDisplay.textContent;
    elements.modalMistakes.textContent = state.mistakes;
    elements.modalOverlay.classList.add('show');
}

function hideModal() {
    elements.modalOverlay.classList.remove('show');
    if (typeof confetti !== 'undefined') {
        confetti.stop();
    }
}

function startLesson(lessonId) {
    state.lessonId = lessonId;
    state.text = generateLessonText(lessonId);
    state.currentIndex = 0;
    state.startTime = null;
    state.mistakes = 0;
    state.totalTyped = 0;
    state.isActive = true;
    
    renderText();
    updateCursor();
    updateStats();
    updateTargetKey();
}

// Renders the text spans exactly ONCE per lesson
function renderText() {
    elements.textDisplay.innerHTML = '';
    for (let i = 0; i < state.text.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = state.text[i];
        charSpan.className = 'char';
        elements.textDisplay.appendChild(charSpan);
    }
}

// Updates only the classes of existing spans, much faster!
function updateCursor() {
    const spans = elements.textDisplay.children;
    
    // If it's the very beginning, just set the first character to current
    if (state.currentIndex === 0 && spans.length > 0) {
        for (let i = 0; i < spans.length; i++) {
            spans[i].className = 'char'; // Reset all
        }
        spans[0].classList.add('current');
    } else if (state.currentIndex > 0 && state.currentIndex <= spans.length) {
        // Mark previous character as correct
        const prevSpan = spans[state.currentIndex - 1];
        if (prevSpan) {
            prevSpan.classList.remove('current');
            prevSpan.classList.add('correct');
        }
        
        // Mark new character as current
        const currentSpan = spans[state.currentIndex];
        if (currentSpan) {
            currentSpan.classList.add('current');
        }
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
        if (typeof audio !== 'undefined') audio.playClick();
        state.currentIndex++;
        
        updateCursor();
        updateStats();
        updateTargetKey();
        
        if (state.currentIndex >= state.text.length) {
            state.isActive = false;
            updateStats();
            setTimeout(() => {
                if (typeof confetti !== 'undefined') {
                    confetti.start();
                }
                showModal();
            }, 100);
        }
    } else {
        highlightKey(e.code, 'incorrect');
        if (typeof audio !== 'undefined') audio.playError();
        state.mistakes++;
        
        const currentSpan = elements.textDisplay.children[state.currentIndex];
        if (currentSpan) {
            currentSpan.classList.add('incorrect');
            setTimeout(() => {
                currentSpan.classList.remove('incorrect');
            }, 200);
        }
        updateStats(); // Only update stats on mistake, no need to update cursor
    }
}

window.addEventListener('DOMContentLoaded', init);
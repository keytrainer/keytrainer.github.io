// lessons.js

const LESSONS = {
    1: { chars: ['f', 'j'], length: 20 },
    2: { chars: ['f', 'j', 'd', 'k'], length: 25 },
    3: { chars: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'], length: 30 },
    4: { chars: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'], length: 40 }
};

function generateLessonText(lessonId) {
    const lesson = LESSONS[lessonId] || LESSONS[1];
    const chars = lesson.chars;
    let text = "";
    
    let currentLength = 0;
    while (currentLength < lesson.length) {
        const wordLength = Math.floor(Math.random() * 3) + 2; // Words of 2-4 chars
        let word = "";
        for (let i = 0; i < wordLength; i++) {
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            word += randomChar;
        }
        text += word + " ";
        currentLength += wordLength + 1;
    }
    
    return text.trim();
}
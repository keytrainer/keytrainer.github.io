// lessons.js

const WORDS = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

const SENTENCES = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How quickly daft jumping zebras vex.",
    "Sphinx of black quartz, judge my vow.",
    "Two driven jocks help fax my big quiz.",
    "Five quacking zephyrs jolt my wax bed.",
    "Hello world, learning to type is great!",
    "Are you able to type fast enough today?",
    "Programming is the art of algorithm design.",
    "Focus on accuracy before increasing speed."
];

const CODE_SNIPPETS = [
    "function add(a, b) { return a + b; }",
    "const arr = [1, 2, 3]; arr.map(x => x * 2);",
    "if (x === true) { console.log('Yes!'); }",
    "document.getElementById('app').innerHTML = 'Hello';",
    "let user = { name: 'John', age: 30 };",
    "for (let i = 0; i < 10; i++) { sum += i; }",
    "setTimeout(() => { alert('Done'); }, 1000);"
];

const LESSONS = {
    1: { type: 'random', chars: ['f', 'j'], length: 20 },
    2: { type: 'random', chars: ['f', 'j', 'd', 'k'], length: 25 },
    3: { type: 'random', chars: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'], length: 30 },
    4: { type: 'words', length: 35 },
    5: { type: 'sentences', length: 45 },
    6: { type: 'random', chars: ['1','2','3','4','5','6','7','8','9','0','-','=','!','@','#','$','%','^','&','*','(',')','_','+','[',']','{','}','\\','|',';',':','\'','"',',','.','/','<','>','?'], length: 30 },
    7: { type: 'code', length: 3 }
};

function generateLessonText(lessonId) {
    const lesson = LESSONS[lessonId] || LESSONS[1];
    let text = "";
    
    if (lesson.type === 'words') {
        let wordsArr = [];
        for(let i=0; i < Math.max(5, lesson.length / 5); i++) {
            wordsArr.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
        }
        return wordsArr.join(" ");
    } else if (lesson.type === 'sentences') {
        let sentencesArr = [];
        for(let i=0; i<3; i++) {
            sentencesArr.push(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
        }
        return sentencesArr.join(" ");
    } else if (lesson.type === 'code') {
        let codeArr = [];
        for(let i=0; i<lesson.length; i++) {
            codeArr.push(CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]);
        }
        return codeArr.join(" ");
    }
    
    // random char logic
    const chars = lesson.chars;
    let currentLength = 0;
    while (currentLength < lesson.length) {
        const wordLength = Math.floor(Math.random() * 3) + 2; 
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
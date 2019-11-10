const wordsArray = [
    'bułka',
    'kubek',
    'anatomia',
    'grzyby'
];

const alphabetArray = [
    'a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n',
    'ń', 'o', 'ó', 'p', 'r', 's', 'ś', 't', 'u',
    'w', 'y', 'z', 'ź', 'ż'
];

const wordGenerateBtn = document.getElementById('wordGenerateBtn');
const letters = document.getElementById('letters');
const alphabet = document.getElementById('alphabet');
const wonBox = document.getElementById('won-box');
const loseBox = document.getElementById('lose-box');
const hangMan = document.getElementById('hang-man');

let randomWord = '';
let wordToGuess = [];
let counter = 0;
let visual = {
    element1: "element1",
    element2: "element2",
    element3: "element3",
    element4: "element4",
    element5: "element5",
    element6: "element6",
    element7: "element7",
    element8: "element8",
    element9: "element9",
    element10: "element10",
    element11: "element11"
}

for (alphabetLetter of alphabetArray) {
    let letter = document.createElement('li');
    letter.innerText = alphabetLetter;
    alphabet.appendChild(letter);
    letter.addEventListener('click', function() {
        checkIfIsInWord(letter.innerText);
    });
}

function checkIfIsInWord(literaAlfabetu) {
    if (randomWord.includes(literaAlfabetu)) {
        for (let i = 0; i <= randomWord.length; i++){
            if (randomWord[i] === literaAlfabetu){
                wordToGuess[i] = literaAlfabetu;
                letters.children[i].innerText = literaAlfabetu;
                !wordToGuess.includes('_') && (wonBox.style.display="block")
            }    
        }
    } else {
        counter++;
        let hangManElement = document.createElement('div');
        hangManElement.innerHTML = counter;
        hangManElement.className = visual[`element${counter}`];
        hangMan.appendChild(hangManElement);
        counter === 11 && (loseBox.style.display="block");
    }
};

function generateDashesAmount(randomWord) {
    for (randomWordLetter of randomWord) {
        wordToGuess.push('_');
    }
    for (letter of wordToGuess) {
        let letterToGuess = document.createElement('li');
        letterToGuess.innerText = letter;
        letters.appendChild(letterToGuess);
    }
};

function genereteWord(words) {
    wordToGuess = [];
    counter = 0;
    letters.innerHTML = null;
    let randomWordIndex = Math.floor(Math.random() * (words.length));
    randomWord = words[randomWordIndex];
    generateDashesAmount(randomWord);
};

wordGenerateBtn.addEventListener('click', function() {
    genereteWord(wordsArray);
});

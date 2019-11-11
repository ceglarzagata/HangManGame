const wordsArray = [
    'bułka',
    'kubek',
    'anatomia',
    'grzyby',
    'biurko',
    'pióro',
    'kura',
    'dzban',
    'koń',
    'lisica',
    'pawlacz',
    'tapczan',
    'gapa',
    'licznik',
    'słownik',
    'przyjaciel',
    'tusz',
    'sztywniak',
    'spawacz',
    'lufa',
    'luneta',
    'komoda',
    'jezioro',
    'wędkarstwo',
    'motoryzacja',
    'sznycel',
    'kot',
    'dogoterapia',
    'rzeczpospolita',
    'ubezwłasnowolnienie',
    'rozżalony',
    'transgraniczny'
];

const alphabetArray = [
    'a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n',
    'ń', 'o', 'ó', 'p', 'r', 's', 'ś', 't', 'u',
    'w', 'y', 'z', 'ź', 'ż'
];

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

const alphabet = document.getElementById('alphabet');
const wordGenerateBtn = document.getElementById('word-generate-btn');
const startGameBtns = document.getElementsByClassName('start-game-btn');
const startGameBox = document.getElementById('start-game-box');
const howToPlayBtns = document.getElementsByClassName('how-to-play-btn');
const howToPlayBox = document.getElementById('how-to-play-box');
const lettersToGuess = document.getElementById('lettersToGuess');
const hangManImg = document.querySelector('#hang-man img');
const resultBox = document.getElementById('result-box');
const resultInfo = resultBox.querySelector('p');
const resultIcon = resultBox.querySelector('i');
const palyAgainBtn = document.getElementById('play-again-btn');
const wonBox = document.querySelector('#won-box span');
const failBox = document.querySelector('#fail-box span');

const startWord = 'zaczynajmy';
let randomWord = '';
let wordToGuess = [];
let wrongAnswersCounter = 0;
let failsAmount = 0;
let wonsAmount = 0;
let errorLimit = 11;

for (alphabetLetter of alphabetArray) {
    let letter = document.createElement('li');
    letter.innerText = alphabetLetter;
    letter.className='letter';
    alphabet.appendChild(letter);
    letter.addEventListener('click', function() {
        checkIfIsInWord(letter.innerText);
    });
};

generateDashesAmount(startWord);

function checkIfIsInWord(literaAlfabetu) {
    if (randomWord.includes(literaAlfabetu)) {
        for (let i = 0; i <= randomWord.length; i++){
            if (randomWord[i] === literaAlfabetu){
                wordToGuess[i] = literaAlfabetu;
                lettersToGuess.children[i].innerText = literaAlfabetu;
                if(!wordToGuess.includes('_')) {
                    wonsAmount++;
                    wonBox.innerHTML = `<strong>${wonsAmount}</strong> ${wonsAmount===1 ? 'raz' : 'razy'}`;
                    resultBox.style.display="block";
                    resultIcon.classList.add("mdi-trophy");
                    resultInfo.innerText="Wygrałeś!";
                }
            }    
        }
    } else {
        wrongAnswersCounter++;
        hangManImg.src = `./images/${visual[`element${wrongAnswersCounter}`]}.png`;
        if (wrongAnswersCounter === errorLimit) {
            failsAmount++;
            failBox.innerHTML = `<strong>${failsAmount}</strong> ${failsAmount===1 ? 'raz' : 'razy'}`;
            resultBox.style.display="block";
            resultIcon.classList.add("mdi-emoticon-sad-outline");
            resultInfo.innerText="Przegrałeś!";
        }
    }
};

function generateDashesAmount(randomWord) {
    for (randomWordLetter of randomWord) {
        wordToGuess.push('_');
    }
    for (letter of wordToGuess) {
        let letterToGuess = document.createElement('li');
        letterToGuess.innerText = letter;
        letterToGuess.className='letter-to-guess';
        lettersToGuess.appendChild(letterToGuess);
    }
};

function genereteWord(words) {
    wordToGuess = [];
    wrongAnswersCounter = 0;
    lettersToGuess.innerHTML = null;
    hangManImg.src = "";
    let randomWordIndex = Math.floor(Math.random() * (words.length));
    randomWord = words[randomWordIndex];
    generateDashesAmount(randomWord);
};

wordGenerateBtn.addEventListener('click', function() {
    genereteWord(wordsArray);
});

for(button of startGameBtns){
    button.addEventListener('click', function() {
        startGameBox.style.display='none';
        howToPlayBox.style.display='none'; 
        genereteWord(wordsArray);
    });   
};

for(button of howToPlayBtns){
    button.addEventListener('click', function() {
        startGameBox.style.display="none";
        howToPlayBox.style.display='block';
    });    
};

palyAgainBtn.addEventListener('click', function() {
    genereteWord(wordsArray);
    resultBox.style.display="none";
});
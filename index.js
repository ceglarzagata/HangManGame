const wordsArray = [
    'bułka',
    'kubek',
    'anatomia',
    'grzyby'
];

const alphabetArray = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'r', 's', 'ś', 't', 'u', 'w', 'y', 'z', 'ź', 'ż'];

const wordGenerateBtn = document.getElementById('wordGenerateBtn');
const randomWordTitle = document.getElementById('randomWord');
const letters = document.getElementById('letters');
const alphabet = document.getElementById('alphabet');

let randomWord = '';
let slowodozganiecia = [];

function generateDashesAmount(randomWord) {
    for (randomWordLetter of randomWord) {
        slowodozganiecia.push('_');
    }
    for (litera of slowodozganiecia) {
        let li = document.createElement('li');
        li.innerText = litera;
        letters.appendChild(li);
    }
};

function genereteWord(words) {
    slowodozganiecia = [];
    letters.innerHTML = null;
    let randomWordIndex = Math.floor(Math.random() * (words.length));
    randomWord = words[randomWordIndex];
    randomWordTitle.innerText = randomWord;
    generateDashesAmount(randomWord);
};

function checkIfIsInWord(literaAlfabetu) {
    if (randomWord.includes(literaAlfabetu)) {
        for (let i = 0; i <= randomWord.length; i++){
            if (randomWord[i] === literaAlfabetu){
                slowodozganiecia[i] = literaAlfabetu;
                letters.children[i].innerText = literaAlfabetu;    
            }    
        }
    } else {
        console.log('nie ma!')
    }
}

function generateAlphabet() {
    for (literaAlfabetu of alphabetArray) {
        let litera = document.createElement('li');
        litera.innerText = literaAlfabetu;
        alphabet.appendChild(litera);
        litera.addEventListener('click', function() {
            checkIfIsInWord(litera.innerText);
        })
    }
}
generateAlphabet();


wordGenerateBtn.addEventListener('click', function() {
    genereteWord(wordsArray)
});


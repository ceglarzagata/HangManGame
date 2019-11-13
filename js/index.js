{
    const levels = {
        easy: { 
            words: [
                'bułka',
                'kubek',
                'grzyby',
                'biurko',
                'pióro',
                'kura',
                'dzban',
                'koń',
                'gapa',
                'kot',

            ],
            image: 'hangman',
            errorLimit: 11
        },
        medium: { 
            words: [
                'lisica',
                'pawlacz',
                'tapczan',
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
                'motoryzacja',
                'sznycel',
            ],
            image: 'hamburger',
            errorLimit: 6
        },
        hard: { 
            words: [
                'wędkarstwo',
                'anatomia',
                'dogoterapia',
                'kołowrotek',
                'ubezwłasnowolnienie',
                'rozżalony',
                'transgraniczny'
            ],
            image: 'apple',
            errorLimit: 4
        }
    }

    const alphabetArray = [
        'a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n',
        'ń', 'o', 'ó', 'p', 'r', 's', 'ś', 't', 'u',
        'w', 'y', 'z', 'ź', 'ż'
    ];

    const alphabet = document.getElementById('alphabet');
    const wordGenerateBtn = document.getElementById('word-generate-btn');
    const startGameBtns = document.getElementsByClassName('start-game-btn');
    const startGameBox = document.getElementById('start-game-box');
    const howToPlayBtns = document.getElementsByClassName('how-to-play-btn');
    const howToPlayBox = document.getElementById('how-to-play-box');
    const lettersToGuess = document.getElementById('lettersToGuess');
    const levelBox = document.getElementById('level-box');
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
    let levelName = 'easy';


    for (alphabetLetter of alphabetArray) {
        let letter = document.createElement('button');
        letter.innerText = alphabetLetter;
        letter.setAttribute("data-key", alphabetLetter);
        letter.className = 'btn secondary-btn letter';
        alphabet.appendChild(letter);
        letter.addEventListener('click', function() {
            checkIfIsInWord(letter.getAttribute("data-key"));
            letter.disabled = true;
        });
    };

    function addLevelsBtn(levels) {
        for(level in levels){
            let levelBtn = document.createElement('button');
            levelBtn.id = level;
            levelBtn.className = "btn level-btn";
            level === levelName && levelBtn.classList.add('secondary-btn');
            levelBtn.setAttribute('title', `Zmień poziom trudności na ${level}`);
            levelBtn.innerText = level;
            levelBox.appendChild(levelBtn);
            levelBtn.addEventListener('click', function() {
                const levelButtons = document.querySelectorAll('.level-btn');
                levelButtons.forEach((btn)=> btn.classList.remove('secondary-btn'));
                levelName = this.id;
                this.classList.add('secondary-btn');
                hangManImg.src = `./images/${levels[levelName].image}0.png`;
                const {words, image} = levels[levelName];
                genereteWord(words, image);
            });
        }
    };

    addLevelsBtn(levels);
    hangManImg.src = `./images/${levels[levelName].image}0.png`;
    generateDashesAmount(startWord);

    function checkIfIsInWord(literaAlfabetu) {
        const {image, errorLimit} = levels[levelName];
        if (randomWord.includes(literaAlfabetu)) {
            for (let i = 0; i <= randomWord.length; i++){
                if (randomWord[i] === literaAlfabetu){
                    wordToGuess[i] = literaAlfabetu;
                    lettersToGuess.children[i].innerText = literaAlfabetu;
                    if(!wordToGuess.includes('_')) {
                        wonsAmount++;
                        wonBox.innerHTML = `<strong>${wonsAmount}</strong> ${wonsAmount===1 ? 'raz' : 'razy'}`;
                        resultBox.style.display="block";
                        resultIcon.classList.remove("mdi-emoticon-sad-outline");
                        resultIcon.classList.add("mdi-trophy");
                        resultInfo.innerText="Wygrałeś!";
                    }
                }    
            }
        } else {
            wrongAnswersCounter++;
            hangManImg.src = `./images/${image}${wrongAnswersCounter}.png`;
            if (wrongAnswersCounter === errorLimit) {
                failsAmount++;
                failBox.innerHTML = `<strong>${failsAmount}</strong> ${failsAmount===1 ? 'raz' : 'razy'}`;
                resultBox.style.display="block";
                resultIcon.classList.remove("mdi-trophy");
                resultIcon.classList.add("mdi-emoticon-sad-outline");
                resultInfo.innerText=`Przegrałeś! Poprawne słowo to: ${randomWord}`;
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

    function genereteWord(words, image) {
        wordToGuess = [];
        wrongAnswersCounter = 0;
        const alphabetLetters = document.querySelectorAll(".letter");
        lettersToGuess.innerHTML = null;
        let randomWordIndex = Math.floor(Math.random() * (words.length));
        randomWord = words[randomWordIndex];
        hangManImg.src = `./images/${image}0.png`;
        generateDashesAmount(randomWord);
        alphabetLetters.forEach(letter => letter.disabled = false);
    };

    wordGenerateBtn.addEventListener('click', function() {
        const {words, image} = levels[levelName];
        genereteWord(words, image);
    });

    for(button of startGameBtns){
        const {words, image} = levels[levelName];
        button.addEventListener('click', function() {
            startGameBox.style.display='none';
            howToPlayBox.style.display='none'; 
            genereteWord(words, image);
        });   
    };

    for(button of howToPlayBtns){
        button.addEventListener('click', function() {
            startGameBox.style.display="none";
            howToPlayBox.style.display='block';
        });    
    };

    palyAgainBtn.addEventListener('click', function() {
        const {words, image} = levels[levelName];
        genereteWord(words, image);
        resultBox.style.display="none";
    });
}

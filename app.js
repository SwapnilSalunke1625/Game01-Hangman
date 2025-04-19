const wordList = [
    { word: "guitar", hint: "A musical instrument with strings." },
    { word: "oxygen", hint: "A colorless, odorless gas essential for life." },
    { word: "mountain", hint: "A large natural elevation of the Earth's surface." },
    { word: "painting", hint: "An art form using colors on a surface to create images or expression." },
    { word: "football", hint: "A popular sport played with a spherical ball." },
    { word: "chocolate", hint: "A sweet treat made from cocoa beans." },
    { word: "butterfly", hint: "An insect with colorful wings and a slender body." },
    { word: "history", hint: "The study of past events and human civilization." },
    { word: "pizza", hint: "A savory dish consisting of a round, flattened base with toppings." },
    { word: "camera", hint: "A device used to capture and record images or videos." }
];

const wordDisplay = document.querySelector(".word-display");
const hintText = document.querySelector(".hint-text b");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector("#hangman-img");
const bgMusic = document.querySelector("#bgMusic");

let currentWord, correctLetters = [], wrongGuessCount = 0, maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `hangman-0.png`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    generateWord();
};

const generateWord = () => {
    const random = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = random.word;
    hintText.innerText = random.hint;

    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");
};

const gameOver = (win) => {
    setTimeout(() => {
        const message = win
            ? `Congrats! You found the word "${currentWord.toUpperCase()}"`
            : `Game Over! The word was "${currentWord.toUpperCase()}".`;
        alert(message);
        stopBackgroundMusic(); // Stop the music when game ends
        resetGame();
    }, 300);
};

const startBackgroundMusic = () => {
    bgMusic.play(); // Start the music when the game starts
};

const stopBackgroundMusic = () => {
    bgMusic.pause(); // Stop the music when game ends
    bgMusic.currentTime = 0; // Reset the music to the beginning
};

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, i) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[i].innerText = letter;
                wordDisplay.querySelectorAll("li")[i].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `hangman-${wrongGuessCount}.png`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e =>
        initGame(e.target, String.fromCharCode(i))
    );
}

document.addEventListener("keydown", (e) => {
    if (e.key) {
        startBackgroundMusic(); // Start music when any key is pressed to begin the game
        resetGame();
    }
});

generateWord();

let playerName;
let minNumber;
let maxNumber;
let randomNum;
let attempts = 5;

function startGame() {
    playerName = document.getElementById("playerName").value;
    document.getElementById("outputPlayerName1").innerText = playerName;

    const minInput = document.getElementById("minNumber");
    const maxInput = document.getElementById("maxNumber");

    // Continue with the game setup
    document.getElementById("gameSection1").style.display = "block";
    document.getElementById("gameSection2").style.display = "none";

    document.getElementById("gameArea").style.display = "block";
    document.getElementById("nombreDelUsuario").style.display = "none";

    // Call a function to initialize number buttons in "gameSection2"
    initializeNumberButtons();
}
function initializeNumberButtons() {
    const numberButtonsContainer = document.getElementById("numberButtons");

    // Clear the existing buttons
    numberButtonsContainer.innerHTML = "";

    const min = parseInt(document.getElementById("minNumber").value);
    const max = parseInt(document.getElementById("maxNumber").value);

    for (let i = min; i <= max; i++) {
        const numberButton = document.createElement("button");
        numberButton.textContent = i;
        numberButton.classList.add("selectable-number");

        // Add a click event listener to each button
        numberButton.addEventListener("click", function () {
            highlightButton(this); // Pass the current button for highlighting
            checkGuess(i); // Pass the selected number for checking
        });

        numberButtonsContainer.appendChild(numberButton);
    }

    // Show the numberButtonsContainer after clearing and initializing
    numberButtonsContainer.style.display = "block";
}


function highlightButton(button) {
    // Удалить подсветку у всех кнопок
    /*   const allButtons = document.querySelectorAll(".selectable-number");
      allButtons.forEach((btn) => btn.classList.remove("selected")); */

    // Подсветить выбранную кнопку
    button.classList.add("selected");
}


function checkGuess(guess) {
    const feedback = document.getElementById("feedback2");

    if (guess === randomNum) {
        feedback.innerText = `¡Felicidades, ${playerName}! Has acertado el número.`;
    } else {
        attempts--;

        if (attempts > 0) {
            feedback.innerText = `Intento fallido. Te quedan ${attempts} intentos.`;
            provideHint(guess);
        } else {
            feedback.innerText = `¡Lo siento, ${playerName}! Has agotado todos tus intentos. El número era ${randomNum}.`;
        }
    }
}


function provideHint(guess) {
    const hint = document.getElementById("hint");

    if (guess < randomNum) {
        hint.innerText = `El número ${guess} es menor que el número secreto.`;
    } else {
        hint.innerText = `El número ${guess} es mayor que el número secreto.`;
    }
}


// Reset the hint when resetting the game
function resetGame() {
    attempts = 5;
    document.getElementById("minNumber").value = "";
    document.getElementById("maxNumber").value = "";
    document.getElementById("feedback2").innerText = "";
    document.getElementById("hint").innerText = "";

    // Скрыть "gameSection2" после сброса
    document.getElementById("gameSection2").style.display = "none";

    // Показать "gameSection1"
    document.getElementById("gameSection1").style.display = "block";
}


// Rest of your code...

function toggleContrast() {
    var body = document.body;
    body.classList.toggle('high-contrast');

    var container = document.querySelector('.container');
    if (container) {
        container.classList.toggle('high-contrast');
    }
}

let fontSize = 16;

function increaseFontSize() {
    fontSize += 2;
    updateFontSize();
}

function decreaseFontSize() {
    fontSize -= 2;
    updateFontSize();
}

function updateFontSize() {
    var nombreDelUsuario = document.getElementById('nombreDelUsuario');
    if (nombreDelUsuario) {
        nombreDelUsuario.style.fontSize = fontSize + 'px';
    }

    var gameArea = document.getElementById('gameArea');
    if (gameArea) {
        gameArea.style.fontSize = fontSize + 'px';
    }
}

function generateNumberRange() {
    minNumber = parseInt(document.getElementById("minNumber").value);
    maxNumber = parseInt(document.getElementById("maxNumber").value);

    // Validate input
    if (isNaN(minNumber) || isNaN(maxNumber) || minNumber < 1 || minNumber > 10 || maxNumber < 30 || maxNumber > 40) {
        alert("Por favor, ingresa números válidos. El rango para el primer número debe ser entre 1 y 10, y para el segundo entre 30 y 40.");
        return;
    }

    // Generate a random number within the specified range
    randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    // Display the selected number range in the paragraph with id "numberRange"
    document.getElementById("numberRange").innerText = `Número seleccionado entre ${minNumber} y ${maxNumber}: ${randomNum}`;

    // Hide gameSection1 and show gameSection2
    document.getElementById("gameSection1").style.display = "none";
    document.getElementById("gameSection2").style.display = "block";

    // Update the player name in gameSection2
    document.getElementById("outputPlayerName2").innerText = playerName;

    // Initialize number buttons in gameSection2
    initializeNumberButtons();
}
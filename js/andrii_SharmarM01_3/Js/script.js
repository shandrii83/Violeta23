let playerName;
let minNumber;
let maxNumber;
let randomNum;
let attempts = 5;
let minNumberConfirmed = false;
let maxNumberConfirmed = false;

function startGame() {
    playerName = document.getElementById("playerName").value;

    if (/[0-9]/.test(playerName) || playerName.length < 3) {
        document.getElementById("errorMessage").innerHTML = "<p style='color: red;'>Por favor, ingresa un nombre válido con al menos 3 letras y sin números.</p>";
        return;
    }

    document.getElementById("errorMessage").innerHTML = "";

    document.getElementById("outputPlayerName1").innerText = playerName;

    const minInput = document.getElementById("minNumber");
    const maxInput = document.getElementById("maxNumber");

    document.getElementById("gameSection1").style.display = "block";
    document.getElementById("gameSection2").style.display = "none";

    document.getElementById("gameArea").style.display = "block";
    document.getElementById("nombreDelUsuario").style.display = "none";

    initializeNumberButtons();
    document.getElementById("outputPlayerName2").innerText = playerName;
}

function confirmMinNumber() {
    minNumber = parseInt(document.getElementById("minNumber").value);

    if (isNaN(minNumber) || minNumber < 1 || minNumber > 10) {
        document.getElementById("errorMessage").innerHTML = "<p style='color: red;'>Por favor, ingresa un número válido entre 1 y 10.</p>";
        return;
    }

    document.getElementById("errorMessage").innerHTML = "";
    minNumberConfirmed = true;
    updateConfirmationButtons();
}

function confirmMaxNumber() {
    maxNumber = parseInt(document.getElementById("maxNumber").value);

    if (!minNumberConfirmed) {
        document.getElementById("errorMessage").innerHTML = "<p style='color: red;'>Por favor, confirma el número mínimo antes de ingresar el máximo.</p>";
        return;
    }

    if (isNaN(maxNumber) || maxNumber < 30 || maxNumber > 40) {
        document.getElementById("errorMessage").innerHTML = "<p style='color: red;'>Por favor, ingresa un número válido entre 30 y 40.</p>";
        return;
    }

    document.getElementById("errorMessage").innerHTML = "";
    maxNumberConfirmed = true;
    updateConfirmationButtons();
}


function updateConfirmationButtons() {
    const confirmMinButton = document.getElementById("confirmMinButton");
    const confirmMaxButton = document.getElementById("confirmMaxButton");
    const playButton = document.getElementById("playButton");

    if (!confirmMinButton || !confirmMaxButton || !playButton) {
        console.error("One or more buttons not found.");
        return;
    }

    confirmMinButton.disabled = minNumberConfirmed;
    confirmMaxButton.disabled = maxNumberConfirmed;

    if (minNumberConfirmed && maxNumberConfirmed) {
        playButton.disabled = false;
    }
}

function initializeNumberButtons() {
    const numberButtonsContainer = document.getElementById("numberButtons");

    numberButtonsContainer.innerHTML = "";

    const min = parseInt(document.getElementById("minNumber").value);
    const max = parseInt(document.getElementById("maxNumber").value);

    for (let i = min; i <= max; i++) {
        const numberButton = document.createElement("button");
        numberButton.textContent = i;
        numberButton.classList.add("selectable-number");

        numberButton.addEventListener("click", function () {
            highlightButton(this);
            checkGuess(i);
        });

        numberButtonsContainer.appendChild(numberButton);
    }

    numberButtonsContainer.style.display = "block";
}

function highlightButton(button) {
    button.classList.add("selected");
}

function checkGuess(guess) {
    const feedback = document.getElementById("feedback2");

    if (guess === randomNum) {
        feedback.innerHTML = `<span style="color: green;">¡Felicidades, ${playerName}! Has acertado el número. El número era ${randomNum}.</span>`;
    } else {
        attempts--;

        if (attempts > 0) {
            feedback.innerHTML = `<span style="color: red;">Intento fallido. Te quedan ${attempts} intentos. </span>`;
            provideHint(guess);
        } else {
            feedback.innerHTML = `<span style="color: red;">¡Lo siento, ${playerName}! Has agotado todos tus intentos. El número era ${randomNum}.</span>`;
        }
        document.getElementById("attemptCount").innerText = attempts;
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

function resetGame() {
    attempts = 5;
    minNumberConfirmed = false;
    maxNumberConfirmed = false;
    document.getElementById("minNumber").value = "";
    document.getElementById("maxNumber").value = "";
    document.getElementById("feedback2").innerText = "";
    document.getElementById("hint").innerText = "";

    document.getElementById("gameSection2").style.display = "none";
    document.getElementById("gameSection1").style.display = "block";
}

function toggleContrast() {
    var body = document.body;
    body.classList.toggle('high-contrast');

    var container = document.querySelector('.container');
    if (container) {
        container.classList.toggle('high-contrast');
    }

    var gameSection2 = document.getElementById('gameSection2');
    if (gameSection2) {
        gameSection2.classList.toggle('high-contrast');
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
    if (!minNumberConfirmed || !maxNumberConfirmed) {
        document.getElementById("errorMessage").innerHTML = "<p style='color: red;'>Por favor, confirma ambos números antes de jugar.</p>";
        return;
    }

    document.getElementById("errorMessage").innerHTML = "";

    randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    document.getElementById("gameSection1").style.display = "none";
    document.getElementById("gameSection2").style.display = "block";

    document.getElementById("outputPlayerName2").innerText = playerName;

    initializeNumberButtons();
    document.getElementById("minDisplay").innerText = minNumber;
    document.getElementById("maxDisplay").innerText = maxNumber;
    document.getElementById("attemptCount").innerText = attempts;
}

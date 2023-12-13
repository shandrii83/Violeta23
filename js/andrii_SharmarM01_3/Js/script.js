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
        generateNumberRange();
    }

    document.getElementById("errorMessage").innerHTML = "";

    document.getElementById("outputPlayerName1").innerText = playerName;

    const minInput = document.getElementById("minNumber");
    const maxInput = document.getElementById("maxNumberInput");

    minInput.value = "";
    maxInput.value = "";
    minNumberConfirmed = false;
    maxNumberConfirmed = false;
    updateConfirmationButtons();

    document.getElementById("gameSection1").style.display = "block";
    document.getElementById("gameSection2").style.display = "none";

    document.getElementById("gameArea").style.display = "block";
    document.getElementById("nombreDelUsuario").style.display = "none";

    setTimeout(initializeNumberButtons, 0);
    document.getElementById("outputPlayerName2").innerText = playerName;


    generateNumberRange();
}


function confirmMinNumber() {
    const minInput = document.getElementById("minNumber");
    const minErrorMessage = document.getElementById("confirmationMessage");

    minNumber = parseInt(minInput.value);

    if (isNaN(minNumber) || minNumber < 1 || minNumber > 10) {
        minErrorMessage.innerHTML = "<p style='color: red;'>Por favor, ingresa un número válido entre 1 y 10.</p>";
        return;
    }

    minErrorMessage.innerHTML = "";
    minNumberConfirmed = true;
    updateConfirmationButtons();
    minInput.disabled = true;
    document.getElementById("confirmationMessage").innerHTML = "<p style='color: green;'>Número mínimo confirmado: " + minNumber + "</p>";


    document.querySelector(".inputMax").style.display = "block";


}

function confirmMaxNumber() {
    const maxInput = document.getElementById("maxNumberInput");
    const maxErrorMessage = document.getElementById("confirmationMessageMax");

    maxNumber = parseInt(maxInput.value);

    if (isNaN(maxNumber) || maxNumber < 30 || maxNumber > 40) {
        maxErrorMessage.innerHTML = "<p style='color: red;'>Por favor, ingresa un número válido entre 30 y 40.</p>";
        return;
    }

    maxErrorMessage.innerHTML = "";
    maxNumberConfirmed = true;
    updateConfirmationButtons();
    maxInput.disabled = true;

    document.getElementById("confirmationMessageMax").innerHTML = "<p style='color: green;'>Número máximo confirmado: " + maxNumber + "</p>";


    document.getElementById("playButton").style.display = "block";
}

function updateConfirmationButtons() {
    const confirmMinButton = document.getElementById("confirmMinButton");
    const confirmMaxButton = document.getElementById("confirmMaxButton");
    const playButton = document.getElementById("playButton");

    document.getElementById("minNumber").disabled = minNumberConfirmed;
    document.getElementById("maxNumberInput").disabled = maxNumberConfirmed;

    if (minNumberConfirmed && maxNumberConfirmed) {
        playButton.style.display = "block";
        playButton.disabled = false;
        confirmMinButton.disabled = true;
        confirmMaxButton.disabled = true;
    } else {
        playButton.style.display = "none";
        playButton.disabled = true;
        confirmMinButton.disabled = false;
        confirmMaxButton.disabled = false;
    }
}

function initializeNumberButtons() {
    const minInput = document.getElementById("minNumber");
    const maxInput = document.getElementById("maxNumberInput");

    if (!minInput || !maxInput) {
        console.error("minNumber or maxNumberInput element not found.");
        return;
    }

    const numberButtonsContainer = document.getElementById("numberButtons");

    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);

    if (isNaN(min) || isNaN(max)) {
        console.error("Invalid or missing values for minNumber or maxNumber.");
        return;
    }

    numberButtonsContainer.innerHTML = "";

    for (let i = min; i <= max; i++) {
        const numberButton = document.createElement("button");
        numberButton.textContent = i;
        numberButton.classList.add("selectable-number");


        (function (value) {
            numberButton.addEventListener("click", function () {
                highlightButton(this);
                checkGuess(value);
            });
        })(i);

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

            // После превышения попыток, покажите кнопку "Jugar de Nuevo"
            document.getElementById("playAgainButton").style.display = "inline-block";
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

    // Clear input values
    document.getElementById("minNumber").value = "";
    document.getElementById("maxNumberInput").value = "";

    // Clear feedback and hint
    document.getElementById("feedback2").innerText = "";
    document.getElementById("hint").innerText = "";

    // Clear confirmation messages
    document.getElementById("confirmationMessage").innerHTML = "";
    document.getElementById("confirmationMessageMax").innerHTML = "";

    // Enable input fields after resetting the game
    document.getElementById("minNumber").disabled = false;
    document.getElementById("maxNumberInput").disabled = false;

    // Reset the confirmation status of min and max numbers
    minNumberConfirmed = false;
    maxNumberConfirmed = false;
    updateConfirmationButtons();

    // Show the necessary elements on reset
    document.querySelector(".inputMax").style.display = "block";
    document.getElementById("confirmMaxButton").style.display = "block";

    // Hide "Jugar de Nuevo" button
    document.getElementById("playAgainButton").style.display = "none";

    // Call the function to initialize the game again
    startGame();
}

function hideRestartButtons() {
    document.getElementById("playAgainButton").style.display = "none";
    document.getElementById("noButton").style.display = "none";
}

function endGame() {
    // Reset the game state
    attempts = 5;
    minNumberConfirmed = false;
    maxNumberConfirmed = false;

    // Clear input values
    document.getElementById("minNumber").value = "";
    document.getElementById("maxNumberInput").value = "";

    // Clear feedback and hint
    document.getElementById("feedback2").innerText = "";
    document.getElementById("hint").innerText = "";

    // Clear confirmation messages
    document.getElementById("confirmationMessage").innerHTML = "";
    document.getElementById("confirmationMessageMax").innerHTML = "";

    // Enable input fields
    document.getElementById("minNumber").disabled = false;
    document.getElementById("maxNumberInput").disabled = false;

    // Hide relevant elements
    var maxNumberInput = document.getElementById("maxNumberInput");
    if (maxNumberInput) {
        maxNumberInput.style.display = "none";
    }

    var confirmMaxButton = document.getElementById("confirmMaxButton");
    if (confirmMaxButton) {
        confirmMaxButton.style.display = "none";
    }

    var playButton = document.getElementById("playButton");
    if (playButton) {
        playButton.style.display = "none";
    }

    // Hide "Jugar de nuevo" button
    var playAgainButton = document.getElementById("playAgainButton");
    if (playAgainButton) {
        playAgainButton.style.display = "none";
    }

    // Show "No" button
    var noButton = document.getElementById("noButton");
    if (noButton) {
        noButton.style.display = "block";
    }

    // Display the initial section to enter the player's name
    document.getElementById("nombreDelUsuario").style.display = "block";
    document.getElementById("gameArea").style.display = "none";
    document.querySelector(".inputMax").style.display = "block";

    var maxNumberInput = document.getElementById("maxNumberInput");
    if (maxNumberInput) {
        maxNumberInput.style.display = "block";  // Display the max number input field
    }

    var confirmMaxButton = document.getElementById("confirmMaxButton");
    if (confirmMaxButton) {
        confirmMaxButton.style.display = "block";  // Display the confirm max button
    }


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




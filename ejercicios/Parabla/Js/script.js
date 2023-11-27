// Palabras y pistas
const palabras = [
    { palabra: "Mogadiscio", pista: "Capital de Somalia" },
    {
        palabra: "javascript",
        pista: "Lenguaje con el que se ha escrito este programa",
    },
    {
        palabra: "android",
        pista: "S.O. que lleva mi teléfono móvil",
    },
    {
        palabra: "manitou",
        pista: "Marca de tabaco que fumo",
    },
    {
        palabra: "kombucha",
        pista: "Té fermentado que esta rico que te mueres",
    },
    {
        palabra: "rosal",
        pista: "Planta que ta flores rojas,amarillas y más",
    },
    {
        palabra: "typescript",
        pista: "Lenguaje con el que no se ha escrito este programa",
    },
    {
        palabra: "mechero",
        pista: "Artilugio para encender la cocina",
    },
    {
        palabra: "python",
        pista: "Una lenguaje de programación que tiene como logo una serpiente",
    },
    {
        palabra: "penne",
        pista: "Macarrón alargado",
    },
    {
        palabra: "teclado",
        pista: "Sirve para escribir en un ordenador",
    },
    {
        palabra: "utabon",
        pista: "Desatasca narices",
    },
    {
        palabra: "ventilador",
        pista: "Mueve el aire y da vueltas",
    },
    {
        palabra: "php",
        pista: "Lenguaje de programación del lado del servidor",
    },
    {
        palabra: "silla",
        pista: "Pones tu culo sobre ella",
    },
    {
        palabra: "yestoestodoamigos",
        pista: "Página web de unos amigos",
    },
    {
        palabra: "twitter",
        pista: "Era una red social con un pájaro",
    },
    {
        palabra: "whatsapp",
        pista: "Envias mensajes instantaneos desde esta APP",
    },
    {
        palabra: "mogadiscio",
        pista: "Capital de Somalia",
    },
    {
        palabra: "electricidad",
        pista: "Su precio está por las nubes",
    }

];

// Seleccionar una palabra al azar
let palabraActual = palabras[Math.floor(Math.random() * palabras.length)].palabra.toUpperCase();
let intentosRestantes = 8;
let letrasAdivinadas = [];
let letrasIncorrectas = [];

// Inicialización
document.getElementById('word-display').innerText = mostrarPalabra();

// Función para mostrar la palabra
function mostrarPalabra() {
    let display = "";
    let letterBoxes = document.getElementById('letter-boxes');
    letterBoxes.innerHTML = ''; // Clear previous letter boxes

    let palabraInfo = palabras.find(item => item.palabra.toUpperCase() === palabraActual);

    for (let letra of palabraActual) {
        let isGuessed = letrasAdivinadas.includes(letra);
        if (isGuessed) {
            display += letra + " ";
        } else {
            display += "_ ";
        }
        // Add a letter box for the current letter if it is guessed
        if (isGuessed) {
            letterBoxes.innerHTML += `<div class="letter-box">${letra}</div>`;
        } else {
            letterBoxes.innerHTML += '<div class="letter-box"></div>';
        }
    }


    let hintDisplay = document.getElementById('hint-display');

    hintDisplay.innerHTML = ''; // Clear previous hint
    if (palabraInfo) {
        hintDisplay.innerHTML = `<br><small>${palabraInfo.pista}</small>`;
        hintDisplay.style.display = 'block';
    } else {
        hintDisplay.style.display = 'none';
    }

    return display.trim();
}


// Función para verificar la letra
function verificarLetra(letra) {
    if (palabraActual.includes(letra)) {
        letrasAdivinadas.push(letra);
    } else {
        letrasIncorrectas.push(letra);
        intentosRestantes--;

        // Mostramos letras incorrectas
        document.getElementById('wrong-letters').innerText = `Letras incorrectas: ${letrasIncorrectas.join(', ')}`;

        // Verificar si ha perdido
        if (intentosRestantes === 0) {
            alert("¡Has perdido! La palabra correcta es: " + palabraActual);
            reiniciarJuego();
        }
    }

    // Verificar si ha ganado
    if (letrasAdivinadas.length === palabraActual.length) {
        alert("¡Felicidades! ¡Has adivinado la palabra!");
        reiniciarJuego();
    }

    // Actualizar la visualización de la palabra
    document.getElementById('word-display').innerText = mostrarPalabra();

    // Mostrar intentos restantes
    document.getElementById('remaining-attempts').innerText = `Intentos restantes: ${intentosRestantes}`;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    letrasAdivinadas = [];
    letrasIncorrectas = [];
    intentosRestantes = 8;
    palabraActual = palabras[Math.floor(Math.random() * palabras.length)].palabra.toUpperCase();
    document.getElementById('word-display').innerText = mostrarPalabra();
    document.getElementById('wrong-letters').innerText = "";
    document.getElementById('remaining-attempts').innerText = `Intentos restantes: ${intentosRestantes}`;
}

// Modify the function to handle keyboard input
window.addEventListener('keydown', function (event) {
    const keyPressed = event.key.toUpperCase();
    // Check if the pressed key is a letter
    if (/^[A-Z]$/.test(keyPressed)) {
        verificarLetra(keyPressed);
    }
});

document.addEventListener("DOMContentLoaded", function () {

    var table = document.getElementById("infoTable");


    var datos = {
        "Valor máximo en JavaScript": Number.MAX_VALUE,
        "Valor mínimo en JavaScript": Number.MIN_VALUE,
        "Altura total de pantalla": window.screen.height,
        "Anchura total de pantalla": window.screen.width,
        "Altura de la página web": window.innerHeight,
        "Anchura de la página web": window.innerWidth,
        "URL de la página web": window.location.href,
        "Nombre de la página web con extensión": window.location.pathname.split("/").pop(),
        "Nombre de la página web sin extensión": window.location.pathname.split("/").pop().split(".")[0],
        "Valor aleatorio entre 0 y 200": Math.floor(Math.random() * 201),
        "Sistema operativo del ordenador": window.navigator.platform
    };


    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    var cell1 = headerRow.insertCell(0);
    var cell2 = headerRow.insertCell(1);
    cell1.innerHTML = " <div> Propiedad</div>";
    cell2.innerHTML = "<p>Valor obtenido con JS</p>";


    for (var key in datos) {
        if (datos.hasOwnProperty(key)) {
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = key;
            cell2.innerHTML = datos[key];
        }
    }
});


/* JavaScript para detectar si el navegador activa las cookies con una *ventana.*confirmar. En tal
caso
mostra un error en el código HTML que informa al usuario que romance en la web comporta aceptar el uso de
cookies.
Si no acepta has de redirigir-ho a una otra página */


// Función para mostrar el mensaje de confirmación
function mostrarConfirmacion() {
    var aceptaCookies = confirm("Para disfrutar de todas las funcionalidades del sitio web, por favor, acepta el uso de cookies.");

    // Si el usuario acepta las cookies, verifica si están habilitadas
    if (aceptaCookies) {
        verificarCookies();
    } else {
        // Si el usuario no acepta las cookies, redirige a otra página (puedes cambiar "otra_pagina.html" por la URL que desees)
        window.location.href = "otra_pagina.html";
    }
}

// Función para verificar si las cookies están habilitadas
function cookiesHabilitadas() {
    // Intenta establecer una cookie de prueba
    document.cookie = "testCookie=testValue";

    // Verificamos si la cookie se ha establecido correctamente
    var cookiesActivadas = document.cookie.indexOf("testCookie=testValue") !== -1;

    // Elimina la cookie de prueba
    document.cookie = "testCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return cookiesActivadas;

}

// Función para mostrar el mensaje de error y redirigir si es necesario
function verificarCookies() {
    if (!cookiesHabilitadas()) {
        // Las cookies no están habilitadas, muestra un mensaje de error
        alert("Para disfrutar de todas las funcionalidades del sitio web, por favor, habilite las cookies.");

        // Redirige a otra página (puedes cambiar "otra_pagina.html" por la URL que desees)
        window.location.href = "otra_pagina.html";
    }
}

/* 10. Pide mediante un “prompt” un título para la página web para pasar el valor introducido en mayúsculas y lo estableces como título de la página web. */


// Solicitar al usuario un título mediante un prompt
var userInput = prompt("Por favor, introduce un título para la página:");

// Convertir el título a mayúsculas
var uppercaseTitle = userInput.toUpperCase();

// Establecer el título de la página
document.title = uppercaseTitle;

// Agregar el título como encabezado en el cuerpo de la página
var barcelona = document.getElementById("barcelona");
barcelona.innerHTML += "<h1>"
    + uppercaseTitle + "</h1 > ";
/* document.getElementById.#barcelona.innerHTML += "<h1>" + uppercaseTitle + "</h1>"; */

/* 
11 Utiliza el objeto window open() de JavaScript para abrir una nueva ventana con la web “ventana.HTML”. Debe tener unas medidas aleatorias entre 300 y 500 de altura y anchura */

function Ventana() {

    var altura = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
    var anchura = Math.floor(Math.random() * (500 - 300 + 1)) + 300;


    window.open("ventana.html", "", "height=" + altura + ", width=" + anchura);
}

/* 12. Cuando la nueva ventana “ventana.HTML” se abra, programa desde el JavaScript “ventana.js” para que pida en un “prompt” una nueva URL que modifique la url de la ventana principal o padre por la dirección introducida. */


function abrirNuevaVentana() {

    var nuevaVentana = window.open('ventana.html', 'ventanaNombre', 'width=500,height=300');

    // Verificar si la ventana se abrió correctamente
    if (nuevaVentana) {
        // Pedir al usuario una nueva URL
        var nuevaURL = prompt('Introduce la nueva URL:', '');

        // Verificar si el usuario ingresó una URL
        if (nuevaURL !== null && nuevaURL !== '') {
            // Modificar la URL de la ventana principal o padre
            window.location.href = nuevaURL;


            nuevaVentana.location.href = nuevaURL;
        } else {

            alert('Debes introducir una URL válida.');
        }
    } else {

        alert('No se pudo abrir la nueva ventana. Asegúrate de que los bloqueadores de ventanas emergentes estén desactivados.');
    }
}

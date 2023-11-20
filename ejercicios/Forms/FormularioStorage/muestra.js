document.addEventListener('DOMContentLoaded', function () {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const userDataList = document.getElementById('userDataList');

    usuarios.forEach(function (usuario) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Email:</strong> ${usuario.email}<br>
            <strong>Asunto:</strong> ${usuario.asunto}<br>
            <strong>Contenido:</strong> ${usuario.contenido}<br>
            <strong>Mi Edad:</strong> ${usuario.miedad}<br>
            <strong>DNI:</strong> ${usuario.dni}<br>
            <strong>Acepto:</strong> ${usuario.acepto ? 'Sí' : 'No'}<br>
            <hr>
        `;
        userDataList.appendChild(listItem);
    });
});
document.addEventListener("DOMContentLoaded", function () {

    function displayUserData(userData) {
        const userDataModal = document.getElementById("userDataContainer");
        userDataModal.textContent = userData;

        const userDataList = document.getElementById("userDataList");
        const listItem = document.createElement("li");
        listItem.textContent = userData;
        userDataList.appendChild(listItem);
    }


    const savedUserData = localStorage.getItem("userData");

    if (savedUserData) {

        displayUserData(savedUserData);
    }


    const button = document.querySelector(".btn-primary");

    button.addEventListener("click", function () {

        const allUserData = Object.values(localStorage);


        for (const userData of allUserData) {
            displayUserData(userData);
        }
    });
});
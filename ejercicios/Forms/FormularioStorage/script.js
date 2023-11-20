const formulario = document.querySelector(`#formu`);

formulario.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const usuario = {
        email: formulario.email.value,
        asunto: formulario.asunto.value,
        contenido: formulario.contenido.value,
        miedad: formulario.miedad.value,
        dni: formulario.dni.value,
        acepto: formulario.acepto.checked,
    };

    let usuarios = JSON.parse(localStorage.getItem(`usuarios`)) || [];

    usuarios = [...usuarios, usuario];

    localStorage.setItem(`usuarios`, JSON.stringify(usuarios));

    window.location.href = "muestra.html";
});
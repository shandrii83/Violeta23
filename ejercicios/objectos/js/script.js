const usuario = {
    nombre: "Pepe",
    edad: 35,
    hijos: ['pepin', 'pepeta', 'pepet'],
    info: function () {
        return `Usuario: ${this.nombre}, Edad: ${this.edad}, Hijos: ${this.hijos}`;
    }
};

const producto = {
    nombre: "Portatil Acer MaxPro",
    precio: 100,
    stock: true,
};

const mInfo = document.querySelector('#mostra');
const mInfo2 = document.querySelector('#mostra2');
const mInfo3 = document.querySelector('#mostra3');
mInfo.textContent = usuario.info();

/* mInfo2.querySelector('#lista_productos').innerHTML = `<li>Nombre: ${producto.nombre}</li> <br> <li>Precio: ${producto.precio}</li> <br> <li>Stock: ${producto.stock}</li>`;

mInfo3.querySelector('#lista_usuarios').innerHTML = `<li>${usuario.info()}</li>`; */

console.log(Object.keys(usuario));
console.log(Object.keys(producto));
console.log(Object.values(usuario));
console.log(Object.values(producto));
console.log(Object.entries(usuario));
console.log(Object.entries(producto));

const mostra1 = document.querySelector("#mostra1");
mostra1.innerHTML = `KEYS: ${Object.keys(producto)} <br><br>VALUES: ${Object.values(producto)} <br><br> ARRAY ENTRIES: ${Object.entries(producto)} <br><br> KEYS: ${Object.keys(usuario)} <br><br>VALUES: ${Object.values(usuario)} <br><br> ARRAY ENTRIES: ${Object.entries(usuario)} <br><br>
OINFO: ${usuario.info()}`;

const listaProductos = document.querySelector(`#lista_productos`);
const productos = Object.entries(producto);
productos.forEach(elem => {
    const li = document.createElement("li");
    li.textContent = `${elem[0]}: ${elem[1]}`;
    listaProductos.appendChild(li);
});

const listaUsuarios = document.querySelector(`#lista_usuarios`);
const usuarios = Object.entries(usuario);
usuarios.forEach(elem => {
    const li = document.createElement("li");
    li.textContent = `${elem[0]}: ${elem[1]}`;
    listaUsuarios.appendChild(li);
});


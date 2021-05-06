const lista_mascotas = document.getElementById("lista_mascotas");
const nombre_mascota = document.getElementById("nombre");
const duenio_mascota = document.getElementById("duenio");
const tipo_mascota = document.getElementById("tipo");
const formulario_crear = document.getElementById("form");
const boton_guardar = document.getElementById("guardar");
const indice = document.getElementById("indice");

let mascotas = [
    {
        nombre: "Milanesa",
        duenio: "Maximiliano",
        tipo: "Gato"
    },
    {
        nombre: "Luli",
        duenio: "Nahiara",
        tipo: "Perro"
    }
];

function listarMascotas() {
    let htmlMascotas = mascotas.map((mascota, index) => 
    `<tr>
        <th scope="row">${index}</th>
        <td>${mascota.nombre}</td>
        <td>${mascota.duenio}</td>
        <td>${mascota.tipo}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-success editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`
    ).join("");
    lista_mascotas.innerHTML = htmlMascotas;
    Array.from(document.getElementsByClassName("editar")).forEach((boton, index) => boton.onclick = editar(index));
    Array.from(document.getElementsByClassName("eliminar")).forEach((boton, index) => boton.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        nombre: nombre_mascota.value,
        duenio: duenio_mascota.value,
        tipo: tipo_mascota.value 
    };
    const accion = boton_guardar.innerHTML;
    switch(accion) {
        case 'Editar':
            mascotas[indice.value] = datos;
            break;
        default:
            mascotas.push(datos);
            break;
    }
    listarMascotas();
    resetModal();
}

function editar(index) {
    return function cuandoCliqueo() {
        boton_guardar.innerHTML = 'Editar';
        const mascota = mascotas[index];
        nombre.value = mascota.nombre;
        tipo.value = mascota.tipo;
        duenio.value = mascota.duenio;
        indice.value = index;
    }
}

function resetModal() {
    nombre.value = "";
    tipo.value = "";
    duenio.value = "";
    indice.value = "";
    boton_guardar.innerHTML = 'Guardar';
}

function eliminar(index) {
    return function clickEnEliminar() {
        mascotas = mascotas.filter((mascota,indice) => indice !== index);
        listarMascotas();
    };
}

listarMascotas();

formulario_crear.onsubmit = enviarDatos;
boton_guardar.onclick = enviarDatos;




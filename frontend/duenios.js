const lista_duenios = document.getElementById("lista_duenios");
const dni = document.getElementById("dni");
const nombre_duenio = document.getElementById("nombre");
const apellido_duenio = document.getElementById("apellido");
const localidad_duenio = document.getElementById("localidad");
const formulario_crear = document.getElementById("form");
const boton_guardar = document.getElementById("guardar");
const indice = document.getElementById("indice");

let personas = [
    {
        dni: "01234",
        nombre: "Maximiliano",
        apellido: "Franco",
        localidad: "Merlo"
    }
];

function listarDuenios() {
    let htmlDuenios = personas.map((persona) => 
    `<tr>
        <th scope="row">${persona.dni}</th>
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.localidad}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-success editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`
    ).join("");
    lista_duenios.innerHTML = htmlDuenios;
    Array.from(document.getElementsByClassName("editar")).forEach((boton, index) => boton.onclick = editar(index));
    Array.from(document.getElementsByClassName("eliminar")).forEach((boton, index) => boton.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        dni: dni.value,
        nombre: nombre_duenio.value,
        apellido: apellido_duenio.value,
        localidad: localidad_duenio.value 
    };
    const accion = boton_guardar.innerHTML;
    switch(accion) {
        case 'Editar':
            personas[indice.value] = datos;
            break;
        default:
            personas.push(datos);
            break;
    }
    listarDuenios();
    resetModal();
}

function editar(index) {
    return function cuandoCliqueo() {
        boton_guardar.innerHTML = 'Editar';
        const persona = personas[index];
        dni.value = persona.dni;
        nombre_duenio.value = persona.nombre;
        apellido_duenio.value = persona.apellido;
        localidad_duenio.value = persona.localidad;
        indice.value = index;
    }
}

function resetModal() {
    dni.value = "";
    nombre_duenio.value = "";
    apellido_duenio.value = "";
    localidad_duenio.value = "";
    indice.value = "";
    boton_guardar.innerHTML = 'Guardar';
}

function eliminar(index) {
    return function clickEnEliminar() {
        personas = personas.filter((persona, indice) => indice !== index);
        listarDuenios();
    };
}

listarDuenios();

formulario_crear.onsubmit = enviarDatos;
boton_guardar.onclick = enviarDatos;




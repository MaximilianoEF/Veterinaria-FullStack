const lista_vets = document.getElementById("lista_vets");
const identificacion = document.getElementById("identificacion");
const nombre_vet = document.getElementById("nombre");
const apellido_vet = document.getElementById("apellido");
const pais_vet = document.getElementById("pais");
const formulario_crear = document.getElementById("form");
const boton_guardar = document.getElementById("guardar");
const indice = document.getElementById("indice");

let vets = [
    {
        id: "01234",
        nombre: "Maximiliano",
        apellido: "Franco",
        pais: "Argentina"
    }
];

function listarVets() {
    let htmlVets = vets.map((vet) => 
    `<tr>
        <th scope="row">${vet.id}</th>
        <td>${vet.nombre}</td>
        <td>${vet.apellido}</td>
        <td>${vet.pais}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-success editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`
    ).join("");
    lista_vets.innerHTML = htmlVets;
    Array.from(document.getElementsByClassName("editar")).forEach((boton, index) => boton.onclick = editar(index));
    Array.from(document.getElementsByClassName("eliminar")).forEach((boton, index) => boton.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        id: identificacion.value,
        nombre: nombre_vet.value,
        apellido: apellido_vet.value,
        pais: pais_vet.value 
    };
    const accion = boton_guardar.innerHTML;
    switch(accion) {
        case 'Editar':
            vets[indice.value] = datos;
            break;
        default:
            vets.push(datos);
            break;
    }
    listarVets();
    resetModal();
}

function editar(index) {
    return function cuandoCliqueo() {
        boton_guardar.innerHTML = 'Editar';
        const vet = vets[index];
        identificacion.value = vet.id;
        nombre_vet.value = vet.nombre;
        apellido_vet.value = vet.apellido;
        pais_vet.value = vet.pais;
        indice.value = index;
    }
}

function resetModal() {
    identificacion.value = "";
    nombre_vet.value = "";
    apellido_vet.value = "";
    pais_vet.value = "";
    indice.value = "";
    boton_guardar.innerHTML = 'Guardar';
}

function eliminar(index) {
    return function clickEnEliminar() {
        vets = vets.filter((vet, indice) => indice !== index);
        listarVets();
    };
}

listarVets();

formulario_crear.onsubmit = enviarDatos;
boton_guardar.onclick = enviarDatos;




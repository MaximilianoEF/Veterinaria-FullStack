const lista_consultas = document.getElementById("lista_consultas");
const mascota = document.getElementById("mascota");
const veterinario = document.getElementById("veterinario");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const formulario = document.getElementById("formulario");
const boton_guardar = document.getElementById("guardar");
const indice = document.getElementById("indice");
const url = "http://localhost:5000/";

let consultas = [];
let mascotas = [];
let veterinarios = [];

async function listarConsultas() {
    const entidad = "consultas";
    try {
        const respuesta = await fetch(`${url}${entidad}`);
        const consultasDelServer = await respuesta.json();
        if(Array.isArray(consultasDelServer)){
            consultas = consultasDelServer;
        }
        if(respuesta.ok){
            let htmlConsultas = consultas.map((consulta, indice) => 
            `<tr>
                <th scope="row">${indice}</th>
                <th scope="row">${consulta.mascota.nombre}</th>
                <th scope="row">${consulta.veterinario.nombre} ${consulta.veterinario.apellido}</th>
                <td>${consulta.fechaCreacion}</td>
                <td>${consulta.fechaEdicion}</td>
                <td>${consulta.historia}</td>
                <td>${consulta.diagnostico}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-success editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit"></i></button>
                    </div>
                </td>
            </tr>`
            ).join("");
            lista_consultas.innerHTML = htmlConsultas;
            Array.from(document.getElementsByClassName("editar")).forEach((boton, index) => boton.onclick = editar(index));
        }
    } catch(error) {
        console.log({error});
        var alertList = document.querySelectorAll('.alert')
        alertList.forEach((alert) => {
            alert.show();
        });
        
    }
}

listarConsultas();

async function listarMascotas() {
    const entidad = "mascotas";
    try {
        const respuesta = await fetch(`${url}${entidad}`);
        const mascotasDelServer = await respuesta.json();
        if(Array.isArray(mascotasDelServer)){
            mascotas = mascotasDelServer;
        }
        if(respuesta.ok){
            mascotas.forEach((_mascota, indice) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = _mascota.nombre;
                optionActual.value = indice;
                mascota.appendChild(optionActual);
            });
        }
    } catch(error) {
        console.log({error});
        var alertList = document.querySelectorAll('.alert')
        alertList.forEach((alert) => {
            alert.show();
        });
    }
}

listarMascotas();

async function listarVeterinarios() {
    const entidad = "veterinarios";
    try {
        const respuesta = await fetch(`${url}${entidad}`);
        const veterinariosDelServer = await respuesta.json();
        if(Array.isArray(veterinariosDelServer)){
            veterinarios = veterinariosDelServer;
        }
        if(respuesta.ok){
            veterinarios.forEach((_veterinario, indice) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = `${_veterinario.nombre} ${_veterinario.apellido}`;
                optionActual.value = indice;
                veterinario.appendChild(optionActual);
            });
        }
    } catch(error) {
        console.log({error});
        var alertList = document.querySelectorAll('.alert')
        alertList.forEach((alert) => {
            alert.show();
        });
    }
}

listarVeterinarios();

function editar(index) {
    return function cuandoCliqueo() {
        boton_guardar.innerHTML = 'Editar';
        const consulta = consultas[index];
        indice.value = index;
        mascota.value = consulta.mascota.id;
        veterinario.value = consulta.veterinario.id;
        historia.value = consulta.historia;
        diagnostico.value = consulta.diagnostico;
        $('#exampleModal').modal('toggle');
    }
}

async function enviarDatos(e) {
    const entidad = "consultas";
    e.preventDefault();
    try {
        const datos = {
            mascota: mascota.value,
            veterinario: veterinario.value,
            historia: historia.value,
            diagnostico: diagnostico.value,
            indice: indice.value 
        };
        if(validar(datos) === true){
            const accion = boton_guardar.innerHTML;
            let method = 'POST';
            let urlEnvio = `${url}${entidad}`;
            if(accion === 'Editar'){
                method = 'PUT';
                urlEnvio += `/${indice.value}`;
            }
            const respuesta = await fetch(urlEnvio, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            if(respuesta.ok){
                listarConsultas();
                resetModal();
            }
            return;
        }
        alert("Faltan Datos");
    } catch(error){
        console.log({error});
        var alertList = document.querySelectorAll('.alert')
        alertList.forEach((alert) => {
            alert.show();
        });
    }
}

function resetModal() {
    [indice, mascota, veterinario, historia, diagnostico].forEach((inputActual) => {
        inputActual.value = "";
        inputActual.classList.remove("is-invalid");
        inputActual.classList.remove("is-valid");
    });
    mascota.value = "Seleccione Mascota";
    veterinario.value = "Seleccione Veterinari@";
    boton_guardar.innerHTML = 'Guardar';
    $('#exampleModal').modal('toggle');
}

function validar(datos) {
    if(typeof datos !== 'object') return false;
    let respuesta = true;
    for(let llave in datos){
        if(datos[llave].length === 0  && llave !== 'indice') {
            document.getElementById(llave).classList.add("is-invalid");
            respuesta = false;
        }  else {
            document.getElementById(llave).classList.remove("is-invalid");
            document.getElementById(llave).classList.add("is-valid");
        }
    }
    return respuesta;
}

formulario.onsubmit = enviarDatos;
boton_guardar.onclick = enviarDatos;

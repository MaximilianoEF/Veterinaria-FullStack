const lista_mascotas = document.getElementById("lista_mascotas");
const nombre_mascota = document.getElementById("nombre");
const duenio_mascota = document.getElementById("duenio");
const tipo_mascota = document.getElementById("tipo");
const formulario_crear = document.getElementById("form");
const boton_guardar = document.getElementById("guardar");
const indice = document.getElementById("indice");
const url = "http://localhost:5000/mascotas";

let mascotas = [];

async function listarMascotas() {
    try{
        const respuesta = await fetch(url);
        const mascotasDelServer = await respuesta.json();
        if(Array.isArray(mascotasDelServer)){
            mascotas = mascotasDelServer;
        }
        if(mascotas.length > 0){
            const htmlMascotas = mascotas.map((mascota, index) => 
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
            return;
        }
        lista_mascotas.innerHTML = `
        <tr>
            <td colspan="5">No hay mascotas</td>
        </tr>`;
    } catch(error){
        throw error;
    }
}

async function enviarDatos(e) {
    e.preventDefault();
    
    try {
        const datos = {
            nombre: nombre_mascota.value,
            duenio: duenio_mascota.value,
            tipo: tipo_mascota.value 
        };
        //Si estamos creando
        let method = 'POST';
        let urlEnvio = url;
        const accion = boton_guardar.innerHTML;
        //Si estamos editando
        if(accion === 'Editar'){
            method = 'PUT';
            mascotas[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;
        }
        
        //Aca ya esta haciendo el envio de datos
        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });
    
        if(respuesta.ok){
            listarMascotas();
            resetModal();
        }
    } catch(error){
        throw error;
    }
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
    tipo.value = "Tipo Animal";
    duenio.value = "Dueño";
    indice.value = "";
    boton_guardar.innerHTML = 'Guardar';
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {
        try {
            const respuesta = await fetch(urlEnvio, {
                method: 'DELETE',
            });
        
            if(respuesta.ok){
                listarMascotas();
            }
        } catch(error) {
            throw error;
        }
    };
}

listarMascotas();

formulario_crear.onsubmit = enviarDatos;
boton_guardar.onclick = enviarDatos;




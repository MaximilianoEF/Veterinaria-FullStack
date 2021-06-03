const lista_duenios = document.getElementById("lista_duenios");
const dni = document.getElementById("dni");
const nombre_duenio = document.getElementById("nombre");
const apellido_duenio = document.getElementById("apellido");
const localidad_duenio = document.getElementById("localidad");
const formulario_crear = document.getElementById("form");
const boton_guardar = document.getElementById("guardar");
const indice = document.getElementById("indice");
const url = "http://localhost:5000/duenios";

let personas = [];

async function listarDuenios() {
    try{
        const respuesta = await fetch(url);
        const personasDelServer = await respuesta.json();
        if(Array.isArray(personasDelServer)){
            personas = personasDelServer;
        }
        if(personas.length > 0){
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
            return;
        }
        lista_duenios.innerHTML = `
            <tr>
                <td colspan="5">No hay Veterinari@s</td>
            </tr>`;
    } catch(error) {
        console.log(error);
        $(".alert").show;
    }
}

async function enviarDatos(e) {
    e.preventDefault();
    try {
        const datos = {
            dni: dni.value,
            nombre: nombre_duenio.value,
            apellido: apellido_duenio.value,
            localidad: localidad_duenio.value 
        };
        //Si estamos creando
        let method = 'POST';
        let urlEnvio = url;
        const accion = boton_guardar.innerHTML;
        //Si estamos editando
        if(accion === 'Editar'){
            method = 'PUT';
            personas[indice.value] = datos;
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
            listarDuenios();
            resetModal();
        }
    } catch(error){
        console.log(error);
        $(".alert").show;
    }
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
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {
        try {
            const respuesta = await fetch(urlEnvio, {
                method: 'DELETE',
            });
        
            if(respuesta.ok){
                listarDuenios();
            }
        } catch(error) {
            console.log(error);
            $(".alert").show;
        }
    };
}

listarDuenios();

formulario_crear.onsubmit = enviarDatos;
boton_guardar.onclick = enviarDatos;




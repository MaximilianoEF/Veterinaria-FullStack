const lista_vets = document.getElementById("lista_vets");
const identificacion = document.getElementById("identificacion");
const nombre_vet = document.getElementById("nombre");
const apellido_vet = document.getElementById("apellido");
const pais_vet = document.getElementById("pais");
const formulario_crear = document.getElementById("form");
const boton_guardar = document.getElementById("guardar");
const indice = document.getElementById("indice");
const url = "http://localhost:5000/veterinarios";

let vets = [];

async function listarVets() {
    try{
        const respuesta = await fetch(url);
        const veterinariasDelServer = await respuesta.json();
        if(Array.isArray(veterinariasDelServer)){
            vets = veterinariasDelServer;
        }
        if(vets.length > 0){
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
            return;
        }
        lista_vets.innerHTML = `
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
            id: identificacion.value,
            nombre: nombre_vet.value,
            apellido: apellido_vet.value,
            pais: pais_vet.value 
        };
        //Si estamos creando
        let method = 'POST';
        let urlEnvio = url;
        const accion = boton_guardar.innerHTML;
        //Si estamos editando
        if(accion === 'Editar'){
            method = 'PUT';
            vets[indice.value] = datos;
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
            listarVets();
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
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {
        try {
            const respuesta = await fetch(urlEnvio, {
                method: 'DELETE',
            });
        
            if(respuesta.ok){
                listarVets();
            }
        } catch(error) {
            console.log(error);
            $(".alert").show;
        }
    };
}

listarVets();

formulario_crear.onsubmit = enviarDatos;
boton_guardar.onclick = enviarDatos;




module.exports = function veterinarios(veterinarios) {
    return {
        get: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(veterinarios[data.indice]){
                    return callback(200, veterinarios[data.indice]);
                }
                return callback(404, {mensaje: `Veterinari@ con indice ${data.indice} no encontrado`});
            }
            callback(200, veterinarios);
        },
        post: (data, callback) => { //handlers
            veterinarios.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(veterinarios[data.indice]){
                    veterinarios[data.indice] = data.payload;
                    return callback(200, veterinarios[data.indice]);
                }
                return callback(404, {mensaje: `Veterinari@ con indice ${data.indice} no encontrado`});
            }
            callback(400, {mensaje: `Indice no enviado`});
        },
        delete: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(veterinarios[data.indice]){
                    veterinarios = veterinarios.filter((_veterinario, indice) => indice != data.indice);
                    return callback(204, {mensaje: `Elemento con indice ${data.indice} eliminado`});
                }
                return callback(404, {mensaje: `Veterinari@ con indice ${data.indice} no encontrado`});
            }
            callback(400, {mensaje: `Indice no enviado`});
        },
    }
}
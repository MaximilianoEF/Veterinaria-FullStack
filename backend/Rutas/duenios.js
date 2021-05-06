module.exports = function duenios(duenios) {
    return {
        get: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(duenios[data.indice]){
                    return callback(200, duenios[data.indice]);
                }
                return callback(404, {mensaje: `Dueño con indice ${data.indice} no encontrado`});
            }
            callback(200, duenios);
        },
        post: (data, callback) => { //handlers
            duenios.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(duenios[data.indice]){
                    duenios[data.indice] = data.payload;
                    return callback(200, duenios[data.indice]);
                }
                return callback(404, {mensaje: `Dueño con indice ${data.indice} no encontrado`});
            }
            callback(400, {mensaje: `Indice no enviado`});
        },
        delete: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(duenios[data.indice]){
                    duenios = duenios.filter((_veterinario, indice) => indice != data.indice);
                    return callback(204, {mensaje: `Elemento con indice ${data.indice} eliminado`});
                }
                return callback(404, {mensaje: `Dueño con indice ${data.indice} no encontrado`});
            }
            callback(400, {mensaje: `Indice no enviado`});
        },
    }
}
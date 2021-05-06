module.exports = function mascotas(mascotas) {
    return {
        get: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(mascotas[data.indice]){
                    return callback(200, mascotas[data.indice]);
                }
                return callback(404, {mensaje: `Mascota con indice ${data.indice} no encontrado`});
            }
            callback(200, mascotas);
        },
        post: (data, callback) => { //handlers
            mascotas.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(mascotas[data.indice]){
                    mascotas[data.indice] = data.payload;
                    return callback(200, mascotas[data.indice]);
                }
                return callback(404, {mensaje: `Mascota con indice ${data.indice} no encontrado`});
            }
            callback(400, {mensaje: `Indice no enviado`});
        },
        delete: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(mascotas[data.indice]){
                    mascotas = mascotas.filter((_mascota, indice) => indice != data.indice);
                    return callback(204, {mensaje: `Elemento con indice ${data.indice} eliminado`});
                }
                return callback(404, {mensaje: `Mascota con indice ${data.indice} no encontrado`});
            }
            callback(400, {mensaje: `Indice no enviado`});
        },
    }
}
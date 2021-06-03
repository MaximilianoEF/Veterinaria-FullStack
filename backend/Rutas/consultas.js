module.exports = function consultas({consultas, veterinarios, mascotas}) {
    return {
        get: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(consultas[data.indice]){
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, {mensaje: `Consulta con indice ${data.indice} no encontrado`});
            }
            const consultasConRelaciones = consultas.map((consulta) => ({
                ...consulta, 
                mascota: {...mascotas[consulta.mascota], id: consulta.mascota}, 
                veterinario: {...veterinarios[consulta.veterinario], id: consulta.veterinario},
            }));
            callback(200, consultasConRelaciones);
        },
        post: (data, callback) => { //handlers
            let nuevaConsulta = data.payload;
            nuevaConsulta.fechaCreacion = new Date();
            nuevaConsulta.fechaEdicion = null;
            consultas = [...consultas, nuevaConsulta];
            callback(201, nuevaConsulta);
        },
        put: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(consultas[data.indice]){
                    const { fechaCreacion } = consultas[data.indice];
                    consultas[data.indice] = { ...data.payload, fechaCreacion, fechaEdicion: new Date() };
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, {mensaje: `Consulta con indice ${data.indice} no encontrado`});
            }
            callback(400, {mensaje: `Indice no enviado`});
        },
        delete: (data, callback) => { //handlers
            if(typeof data.indice !== 'undefined'){
                if(consultas[data.indice]){
                    consultas = consultas.filter((_consulta, indice) => indice != data.indice);
                    return callback(204, {mensaje: `Elemento con indice ${data.indice} eliminado`});
                }
                return callback(404, {mensaje: `Consulta con indice ${data.indice} no encontrado`});
            }
            callback(400, {mensaje: `Indice no enviado`});
        },
    }
}
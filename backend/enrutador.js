const recursos = require('./recursos');
const mascotas = require('./Rutas/mascotas');
const veterinarios = require('./Rutas/veterinarios');
const duenios = require('./Rutas/duenios');
const consultas = require('./Rutas/consultas');

module.exports = {
    veterinarios: veterinarios(recursos.veterinarios),
    mascotas: mascotas(recursos.mascotas),
    duenios: duenios(recursos.duenios),
    consultas: consultas(recursos.consultas),
}
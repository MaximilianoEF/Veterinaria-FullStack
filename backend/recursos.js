module.exports = {
    mascotas: [
        {nombre: "Milanesa", duenio: "Maximiliano", tipo: "Gato"}, 
        {nombre: "Luli", duenio: "Nahiara", tipo: "Perro"}, 
        {nombre: "Scott", duenio: "Esteban", tipo: "Perro"}
    ],
    veterinarios: [
        {id:"12345", nombre: "Eduardo", apellido: "Suarez", pais: "Argentina"}, 
        {id:"34356", nombre: "Milena", apellido: "Rodriguez", pais: "Brasil"}, 
        {id:"37238", nombre: "Mario", apellido: "Calvo", pais: "Uruguay"}, 
    ],
    duenios: [
        {dni:"37238785", nombre: "Maximiliano", apellido: "Franco", localidad: "Merlo"}, 
        {dni:"42675452", nombre: "Nahiara", apellido: "Leites", localidad: "Padua"}, 
        {dni:"39285285", nombre: "Nahuel", apellido: "Jara", localidad: "Ituzaingo"}, 
    ],
    consultas: [
        {
            mascota: 0, 
            veterinario: 0,
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: 'Se presento con un cuadro de fiebre y comezon en la zona abdominal',
            diagnostico: 'Posible caso de dermatitis aguda', 
        },
        {
            mascota: 1, 
            veterinario: 2,
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: 'Se presento con una fractura expuesta en la pata inferior derecha con infeccion',
            diagnostico: 'Fractura de perone', 
        }
    ]
};
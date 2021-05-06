const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');

module.exports = (req, res) => {
    //1.obtener url desde el objeto request
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);
    //Transformo la url actual en un objeto
  
    //2.obtener la ruta
    const ruta = urlParseada.pathname;
    
    //3.quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');
    
    //3.1 obtener el metodo http
    const metodo = req.method.toLowerCase();

    //3.1.1 dar permisos de CORS escribiendo lo headeres
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader(
        "Access-Control-Request-Methods",
        "OPTIONS, GET, DELETE, POST, PUT"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, DELETE, POST, PUT"
    );

    //3.1.2 dar respuesta inmediata cuando el metodo sea option
    if(metodo === 'options'){
        res.writeHead(200);
        res.end();
        return;
    }
  
    //3.2 obtener las variables del query url
    const { query = {} } = urlParseada;
  
    //3.3 obtener los headers
    const { headers = {} } = req;
  
    //3.4 obtener payload, si es que lo hay
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    
    //3.4.1 ir acumulando los datos cuando el request reciba un payload
    req.on('data', (data) => {
      buffer += decoder.write(data);
    }); 
    
    //3.4.2 terminar de acumular datos y decirle al decoder que finalice
    req.on('end', () => {
      buffer += decoder.end();
  
      if(headers["content-type"] === "application/json"){
          buffer = JSON.parse(buffer);
      }
  
      //3.4.3 revisar si tiene subrutas
      if(rutaLimpia.indexOf("/") > -1){
          //separar rutas
          var [rutaPrincipal, indice] = rutaLimpia.split("/");
      }
  
      //3.5 ordenar los datos del request 
      const data = {
          indice,
          ruta: rutaPrincipal || rutaLimpia,
          query,
          metodo,
          headers,
          payload: buffer
      };
  
      console.log({ data });
  
      //3.6 elegir el manejador dependiendo la ruta y asignarle funcion que el enrutador tiene 
      let handler;
      if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
          handler = enrutador[data.ruta][metodo];
      } else {
          handler = enrutador.noEncontrado;
      };
  
      //4. ejecutar handler (manejador) para enviar la respuesta
      if(typeof handler === 'function') {
          handler(data, (status = 200, mensaje) => {
              const respuesta = JSON.stringify(mensaje);
              res.setHeader("Content-Type", "application/json");
              res.writeHead(status);
              // Linea donde realmente ya estamos respondiendo a la aplicacion cliente
              res.end(respuesta);
          });
      }
    }); 
    
  };
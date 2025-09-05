const conexion = wialon.core.Session.getInstance();

export const getGrupos = async (groups) => {
  const _groups = {};
  const promesas = groups.map(async (group) => {
    const name_group = group.getName();
    const objeto = {
        info: getInfoGroup(group),
        unidades: getUnitsGroup(group),
      };
      _groups[name_group] = objeto;
  });

  await Promise.all(promesas);
return _groups;
};


export const getInfoGroup = ( group ) =>{
    return {
        nameGroup: group.getName(),
        idGroup: group.getId(),
        icon: group.getIconUrl(32), 
        units: group.getUnits(),
    }
}

export const getUnitsGroup = ( group ) => {
  const unidades = {};
  
  const idUnits = group.getUnits();
  
  for (const element of idUnits) {
    const _unit = conexion.getItem(element);        
    const name = _unit.getName();
    const icon = _unit.getIconUrl(32);
    const last_message = _unit.getLastMessage();
      
      const unidad = {
      name,
      icon,
      last_message,
      root: _unit,
    };

    unidades[name] = unidad;
  }

  return unidades;
};



// const getMessagesbyId = async ( unit, sensores ) =>{
//     const id = unit.getId();
//     const name = unit.getName();
//     const unit_messages = await MessagesService.loadMessagesToday( id );
//     const { messages, count } = unit_messages;

//     // if( name == 'MTY-C 02' ){
//     //   console.log(messages);
//     //   console.log(sensores);
      
//     // }
    
//     let sensorsByMessages = getSensorsValueByMessages(unit, messages, sensores); 
//     // console.log( name );
//     // console.log(sensorsByMessages );
    
//     const datosProcesados = agruparTemperaturasPorSensorYHora(sensorsByMessages);
//     return datosProcesados;
// }

// function agruparTemperaturasPorSensorYHora(data) {
//   const resultado = {};

//   data.forEach(obj => {
//     const timestamp = Number(Object.keys(obj)[0]);
//     const lecturas = obj[timestamp];

//     // Convertir timestamp a hora redondeada (HH:00)
//     const fecha = new Date(timestamp * 1000); // asumiendo que el timestamp viene en segundos
//     const hora = `${fecha.getHours().toString().padStart(2, '0')}:00`;

//     lecturas.forEach(sensor => {
//       const nombre = sensor.nombre;
//       const valor = sensor.valor;

//       if (!resultado[nombre]) {
//         resultado[nombre] = {
//           tiempos: {},
//         };
//       }

//       if (!resultado[nombre].tiempos[hora]) {
//         resultado[nombre].tiempos[hora] = [];
//       }

//       resultado[nombre].tiempos[hora].push(valor);
//     });
//   });

//   // Promediar valores y transformar a array final
//   const resultadoFinal = {};
//   Object.entries(resultado).forEach(([nombre, datos]) => {
//     const tiempos = Object.keys(datos.tiempos).sort(); // ordenar por hora
//     const valores = tiempos.map(hora => {
//       const arr = datos.tiempos[hora];
//       const suma = arr.reduce((acc, val) => acc + val, 0);
//       return +(suma / arr.length).toFixed(2); // promedio con 2 decimales
//     });

//     resultadoFinal[nombre] = {
//       tiempos,
//       valores,
//     };
//   });

//   return resultadoFinal;
// }

// function agruparTemperaturasPorSensorYHora(data) {
//   const resultado = {};
//   if (!Array.isArray(data) || data.length === 0) return {};

//   // Encontrar el primer timestamp real
//   const primerObj = data.find(obj => obj && typeof obj === 'object' && Object.keys(obj).length > 0);
//   const primerTimestamp = Number(Object.keys(primerObj)[0]);
//   const primerFecha = new Date(primerTimestamp * 1000);

//   // Hora de inicio del primer bloque (redondeado hacia abajo a la hora)
//   primerFecha.setMinutes(0, 0, 0);
//   let inicioBloque = new Date(primerFecha);

//   // Calcular fecha actual local redondeada a la siguiente hora
//   const ahora = new Date();
//   ahora.setMinutes(0, 0, 0);

//   // Convertir datos a { timestamp, lecturas } y ordenarlos por tiempo
//   const datosOrdenados = data.map(obj => {
//     const ts = Number(Object.keys(obj)[0]);
//     return { timestamp: ts, lecturas: obj[ts] };
//   }).sort((a, b) => a.timestamp - b.timestamp);

//   while (inicioBloque <= ahora) {
//     const finBloque = new Date(inicioBloque);
//     finBloque.setHours(finBloque.getHours() + 1);

//     const inicioSeg = Math.floor(inicioBloque.getTime() / 1000);
//     const finSeg = Math.floor(finBloque.getTime() / 1000);

//     const lecturasEnBloque = datosOrdenados.filter(d =>
//       d.timestamp >= inicioSeg && d.timestamp < finSeg
//     );

//     lecturasEnBloque.forEach(({ lecturas }) => {
//       lecturas.forEach(sensor => {
//         const nombre = sensor.nombre;
//         const valor = sensor.valor;

//         if (!resultado[nombre]) resultado[nombre] = { tiempos: {}, orden: [] };

//         const etiquetaHora = `${inicioBloque.getHours().toString().padStart(2, '0')}:00`;

//         if (!resultado[nombre].tiempos[etiquetaHora]) {
//           resultado[nombre].tiempos[etiquetaHora] = [];
//           resultado[nombre].orden.push(etiquetaHora);
//         }

//         resultado[nombre].tiempos[etiquetaHora].push(valor);
//       });
//     });

//     inicioBloque.setHours(inicioBloque.getHours() + 1);
//   }

//   // Calcular promedios finales
//   const resultadoFinal = {};
//   Object.entries(resultado).forEach(([nombre, datos]) => {
//     const tiempos = datos.orden; // NO se invierte
//     const valores = tiempos.map(etiqueta => {
//       const arr = datos.tiempos[etiqueta];
//       const suma = arr.reduce((acc, val) => acc + val, 0);
//       return +(suma / arr.length).toFixed(2);
//     }).reverse(); // ✅ Solo se invierten los valores

//     resultadoFinal[nombre] = { tiempos, valores };
//   });

//   return resultadoFinal;
// }
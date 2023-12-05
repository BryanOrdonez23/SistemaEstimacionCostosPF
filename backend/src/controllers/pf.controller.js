import Proyect from '../models/proyect.model.js';
import Functions from '../models/funciones.model.js';
import TiposFunciones from '../models/tiposfunciones.model.js';

export const calcularPuntosDeFuncionsinAjuste = async (req, res) => {
  try {
    const { id } = req.params; // Cambiado de req.body a req.params

    // Buscar el proyecto por su ID
    const proyecto = await Proyect.findById(id);
    console.log(proyecto);

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    // Obtener todas las funciones asociadas al proyecto
    const userFunctions = await Functions.find({ _id: { $in: proyecto.funciones } });

    console.log(userFunctions);

    let puntosFuncionTotal = 0;

    // Realizar el cálculo para cada funcionalidad
    for (const userFunction of userFunctions) {
      // Consultar las ponderaciones según el tipo de funcionalidad
      const tipoFuncion = await TiposFunciones.findOne({ tipo: userFunction.tipo });

      // Realizar el cálculo de PF según la complejidad y ponderaciones
      let ponderacion = 0;
      switch (userFunction.complejidad) {
        case 'Alta':
          ponderacion = tipoFuncion.valorAlto;
          break;
        case 'Media':
          ponderacion = tipoFuncion.valorMedio;
          break;
        case 'Baja':
          ponderacion = tipoFuncion.valorBajo;
          break;
        // Puedes manejar otros casos según tu modelo de datos
      }

      // Añadir los puntos de función de la funcionalidad actual al total
      puntosFuncionTotal += userFunction.cantidad * ponderacion;
    }

    // Enviar la respuesta con los puntos de función calculados
    res.status(200).json({ puntosFuncionTotal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al calcular los Puntos de Función.' });
  }
};

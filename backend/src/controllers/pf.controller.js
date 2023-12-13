import Proyect from '../models/proyect.model.js';
import Functions from '../models/funciones.model.js';
import TiposFunciones from '../models/tiposfunciones.model.js';
import FunctionPoints from '../models/functionPoints.model.js';
import FactoresAjuste from '../models/factoresAjuste.model.js';

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
    actualizarFunctionPoints(id, puntosFuncionTotal);
    // Enviar la respuesta con los puntos de función calculados
    res.status(200).json({ puntosFuncionTotal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al calcular los Puntos de Función.' });
  }
};
 
//
const actualizarFunctionPoints = async (id, puntosFuncionTotal) => {
  try {
    const functionPoints = await FunctionPoints.findOne({ proyect: id });

    if (functionPoints) {
      // Si ya existe, actualiza los campos necesarios
      functionPoints.calculoSA = puntosFuncionTotal; // Ajusta según tus necesidades
      // Actualiza otros campos según sea necesario
      await functionPoints.save();
    } else {
      // Si no existe, puedes manejar este caso según tus necesidades
      console.error('Documento de FunctionPoints no encontrado para el proyecto con ID:');
    }
  } catch (error) {
    console.error('Error al actualizar FunctionPoints:', error);
    // Manejar el error según tus necesidades
  }
};


export const calcularPuntosDeFuncionconAjuste = async (req, res) => {

}

export const guardarFactoresAjuste = async (req, res) => {
  try {
    const { FA1, FA2, FA3, FA4, FA5, FA6, FA7, FA8, FA9, FA10, FA11, FA12, FA13, FA14 } = req.body;
    const newFactoresAjuste = new FactoresAjuste({
      FA1,
      FA2,
      FA3,
      FA4,
      FA5,
      FA6,
      FA7,
      FA8,
      FA9,
      FA10,
      FA11,
      FA12,
      FA13,
      FA14,
    });
    const factoresAjuste = await newFactoresAjuste.save();
    console.log(factoresAjuste);
    res.status(200).json({ factoresAjuste });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar los factores de ajuste.' });
  }
}

export const getFactoresAjuste = async (req, res) => {
  try {
    const factoresAjuste = await FactoresAjuste.find();
    res.status(200).json({ factoresAjuste });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los factores de ajuste.' });
  }
}


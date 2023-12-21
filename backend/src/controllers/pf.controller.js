import Proyect from '../models/proyect.model.js';
import Functions from '../models/funciones.model.js';
import TiposFunciones from '../models/tiposfunciones.model.js';
import FunctionPoints from '../models/functionPoints.model.js';
import FactoresAjuste from '../models/factoresAjuste.model.js';
import ValorFactoresAjuste from '../models/valorFactoresAjuste.model.js';

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

const actualizarPFCA = async (id, valorAjuste) => {
  try {
    const functionPoints = await FunctionPoints.findOne({ proyect: id });

    if (functionPoints) {
      // Si ya existe, actualiza los campos necesarios
      functionPoints.SumaFA = valorAjuste; // Ajusta según tus necesidades
      functionPoints.calculoCA = functionPoints.calculoSA *(0.65+ 0.01 * (valorAjuste)); // Ajusta según tus necesidades
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
}

export const sumaValorFactoresdeAjuste = async (req, res) => {
  try {
    const { id } = req.params;
    const valorFactoresAjuste = await ValorFactoresAjuste.findOne({ proyect:id });
    let sumaFA = 0;
    if (valorFactoresAjuste) {
      // Si ya existe, actualiza los campos necesarios
      sumaFA = valorFactoresAjuste.valorFA1 + valorFactoresAjuste.valorFA2 + valorFactoresAjuste.valorFA3 + valorFactoresAjuste.valorFA4 + valorFactoresAjuste.valorFA5 + valorFactoresAjuste.valorFA6 + valorFactoresAjuste.valorFA7 + valorFactoresAjuste.valorFA8 + valorFactoresAjuste.valorFA9 + valorFactoresAjuste.valorFA10 + valorFactoresAjuste.valorFA11 + valorFactoresAjuste.valorFA12 + valorFactoresAjuste.valorFA13 + valorFactoresAjuste.valorFA14;
      // Actualiza otros campos según sea necesario
      await valorFactoresAjuste.save();
    } else {
      // Si no existe, puedes manejar este caso según tus necesidades
      console.error('Documento de FunctionPoints no encontrado para el proyecto con ID:');
    }
    await actualizarPFCA(req.params.id, sumaFA);
    res.status(200).json({ sumaFA } );
  } catch (error) {
    console.error('Error al actualizar FunctionPoints:', error);
    // Manejar el error según tus necesidades
  }
}

export const guardarFactoresAjuste = async (req, res) => {
  try {
    const { FA1, FA2, FA3, FA4, FA5, FA6, FA7, FA8, FA9, FA10, FA11, FA12, FA13, FA14 } = req.body;
    const idproyecto = req.params.id;
    const newFactoresAjuste = new ValorFactoresAjuste({
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
      idproyecto,
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

export const getValorFactoresAjuste = async (req, res) => {
  try {
    const { id } = req.params;
    const valorFactoresAjuste = await ValorFactoresAjuste.find({ proyect: id });
    res.status(200).json({ valorFactoresAjuste });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los factores de ajuste.' });
  }
}
export const createValorFactoresAjuste = async (req, res) => {  
  try {
    const { FA1, FA2, FA3, FA4, FA5, FA6, FA7, FA8, FA9, FA10, FA11, FA12, FA13, FA14 } = req.body;

    const idproyecto = req.params.id;

    // Buscar si ya existe un registro para el proyecto
    const existingRegistro = await ValorFactoresAjuste.findOne({ proyect: idproyecto });

    if (existingRegistro) {
      // Ya existe un registro, actualiza los valores existentes
      existingRegistro.valorFA1 = parseInt(FA1, 10);
      existingRegistro.valorFA2 = parseInt(FA2, 10);
      existingRegistro.valorFA3 = parseInt(FA3, 10);
      existingRegistro.valorFA4 = parseInt(FA4, 10);
      existingRegistro.valorFA5 = parseInt(FA5, 10);
      existingRegistro.valorFA6 = parseInt(FA6, 10);
      existingRegistro.valorFA7 = parseInt(FA7, 10);
      existingRegistro.valorFA8 = parseInt(FA8, 10);
      existingRegistro.valorFA9 = parseInt(FA9, 10);
      existingRegistro.valorFA10 = parseInt(FA10, 10);
      existingRegistro.valorFA11 = parseInt(FA11, 10);
      existingRegistro.valorFA12 = parseInt(FA12, 10);
      existingRegistro.valorFA13 = parseInt(FA13, 10);
      existingRegistro.valorFA14 = parseInt(FA14, 10);

      const updatedRegistro = await existingRegistro.save();
      res.status(200).json({ valorFactoresAjuste: updatedRegistro });
    } else {
      // No existe un registro, crea uno nuevo
      const newValorFactoresAjuste = new ValorFactoresAjuste({
        valorFA1: parseInt(FA1, 10),
        valorFA2: parseInt(FA2, 10),
        valorFA3: parseInt(FA3, 10),
        valorFA4: parseInt(FA4, 10),
        valorFA5: parseInt(FA5, 10),
        valorFA6: parseInt(FA6, 10),
        valorFA7: parseInt(FA7, 10),
        valorFA8: parseInt(FA8, 10),
        valorFA9: parseInt(FA9, 10),
        valorFA10: parseInt(FA10, 10),
        valorFA11: parseInt(FA11, 10),
        valorFA12: parseInt(FA12, 10),
        valorFA13: parseInt(FA13, 10),
        valorFA14: parseInt(FA14, 10),
        proyect: idproyecto,
      });

      const valorFactoresAjuste = await newValorFactoresAjuste.save();
      res.status(200).json({ valorFactoresAjuste });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar o actualizar los factores de ajuste.' });
  }
};

export const getFunctionPoints = async (req, res) => {
  try {
    const functionPoints = await FunctionPoints.find({ proyect: req.params.id });
    res.status(200).json({ functionPoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los FunctionPoints.' });
  }
}





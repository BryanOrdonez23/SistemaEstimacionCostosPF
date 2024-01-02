import InvolucradosProyecto from "../models/involucradosProyecto.model.js";
import Proyect from "../models/proyect.model.js";
import FunctionPoints from "../models/functionPoints.model.js";

export const crearInvolucrado = async (req, res) => {
  try {
    const IDproyecto = req.params.id;
    const pf = await FunctionPoints.findOne({ proyect: IDproyecto });
    if (!pf) {
      return res
        .status(404)
        .json({ error: "Puntos de funcion, no encontrado" });
    }

    const newInovlucrado = new InvolucradosProyecto({
      nombre: req.body.nombre,
      rol: req.body.rol,
      sueldo: req.body.sueldo,
    });

    await newInovlucrado.save();
    pf.involucrados.push(newInovlucrado);
    await pf.save();
    res.status(200).json({ newInovlucrado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el involucrado" });
  }
};

export const getInvolucrados = async (req, res) => {
  try {
    const IDproyecto = req.params.id;
    const pf = await FunctionPoints.findOne({ proyect: IDproyecto });

    const involucradosArray = pf.involucrados;
    console.log(involucradosArray);
    if (!pf) {
      return res.status(404).json({ message: "pf  no encontrados." });
    }
    if (!involucradosArray || involucradosArray.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron involucraedos" });
    }

    const foundinvolucrados = await InvolucradosProyecto.find({
      _id: { $in: involucradosArray },
    });
    if (foundinvolucrados.length === 0) {
      return res
        .status(404)
        .json({
          message: "No se encontraron funciones con los IDs proporcionados.",
        });
    }

    // Retornar las funciones encontradas en la respuesta JSON
    res.json(foundinvolucrados);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error });
  }
};
//
export const getInvolucrado = async (req, res) => {
  try {
    const { id } = req.params;
    const involucrado = await InvolucradosProyecto.findById(id);
    if (!involucrado) {
      return res.status(404).json({ error: "Involucrado no encontrado" });
    }
    res.status(200).json(involucrado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el involucrado" });
  }
};

export const actualizarInvolucrado = async (req, res) => {
    try {
        const { id1, id2 } = req.params;
        const { nombre, rol, sueldo} = req.body;
    
        const pf = await FunctionPoints.findOne({proyect: id1});
    
        if (!pf) {
          return res.status(404).json({ message: 'pf no encontrado.' });
        }

        if (pf.involucrados.length === 0) {
          return res.status(404).json({ message: 'Pf no contiene involucrados.' });
        }
        const idEncontrado = pf.involucrados.some(id => id.equals(id2));
    
    
        if (!idEncontrado) {
          return res.status(404).json({ message: 'No se encontró el involucrado en el proyecto.' });
        }
    
        // Verificar si la función existe y pertenece al usuario
        const involucrado = await InvolucradosProyecto.findById(id2);
    
        if (!involucrado) {
          return res.status(404).json({ message: 'involucrado no encontrada.' });
        }
    
        const involucradoupdate = await InvolucradosProyecto.findByIdAndUpdate(id2, req.body, {
          new: true,
        });
        if (!involucradoupdate)
          return res.status(404).json({ message: "Involucrado no actualizado" });
        console.log(involucradoupdate);
        res.json(involucradoupdate);
    
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
      }
};

export const eliminarInvolucrado = async (req, res) => {
    try {
        const { id1, id2 } = req.params;
    
        // Verificar si el proyecto existe y pertenece al usuario
        const pf = await FunctionPoints.findOne({proyect: id1});
    
        if (!pf) {
          return res.status(404).json({ message: 'puntos de función no encontrado.' });
        }
       // console.log(project);
    
        // Verificar si la propiedad 'funciones' existe en el proyecto
        if (pf.involucrados.length === 0) {
          return res.status(404).json({ message: 'no existen involucrados' });
        }
        const idEncontrado = pf.involucrados.some(id => id.equals(id2));
    
        if (!idEncontrado) {
          return res.status(404).json({ message: 'No se encontró la función en el proyecto.' });
        }
    
        pf.involucrados = pf.involucrados.filter(id => !id.equals(req.params.id2));
    
        await pf.save();
        await InvolucradosProyecto.findByIdAndDelete(id2);
        res.status(201).json(pf.involucrados);
        
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
      }
};

export const sumatoriaCostosInvolucrados = async (req, res) => {
  try {
    const { id } = req.params;
    const pf = await FunctionPoints.findOne({ proyect: id });
    if (!pf) {
      return res.status(404).json({ error: "Puntos de funcion, no encontrado" });
    }
    const involucradosArray = pf.involucrados;
    if (!involucradosArray || involucradosArray.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron involucraedos" });
    }
    const foundinvolucrados = await InvolucradosProyecto.find({
      _id: { $in: involucradosArray },
    });
    if (foundinvolucrados.length === 0) {
      return res
        .status(404)
        .json({
          message: "No se encontraron funciones con los IDs proporcionados.",
        });
    }
    let sumatoria = 0;
    foundinvolucrados.forEach((involucrado) => {
      sumatoria += involucrado.sueldo;
    });
    res.status(200).json({ sumatoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el involucrado" });
  }
}


export const promedioSueldosInvolucrados = async (req, res) => {
  try {
    const { id } = req.params;
    const pf = await FunctionPoints.findOne({ proyect: id });
    
    if (!pf) {
      return res.status(404).json({ error: "Puntos de función no encontrado" });
    }

    const involucradosArray = pf.involucrados;

    if (!involucradosArray || involucradosArray.length === 0) {
      return res.status(404).json({ message: "No se encontraron involucrados" });
    }

    const foundInvolucrados = await InvolucradosProyecto.find({
      _id: { $in: involucradosArray },
    });

    if (foundInvolucrados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron involucrados con los IDs proporcionados.",
      });
    }

    let sumatoria = 0;

    foundInvolucrados.forEach((involucrado) => {
      sumatoria += involucrado.sueldo;
    });

    const promedio = sumatoria / foundInvolucrados.length;

    res.status(200).json({ promedio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el involucrado" });
  }
};

export const contarInvolucrados = async (req, res) => {
  try {
    const { id } = req.params;
    const pf = await FunctionPoints.findOne({ proyect: id });

    if (!pf) {
      return res.status(404).json({ error: "Puntos de función no encontrado" });
    }

    const involucradosArray = pf.involucrados;

    if (!involucradosArray || involucradosArray.length === 0) {
      return res.status(404).json({ message: "No se encontraron involucrados" });
    }

    const foundInvolucrados = await InvolucradosProyecto.find({
      _id: { $in: involucradosArray },
    });

    if (foundInvolucrados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron involucrados con los IDs proporcionados.",
      });
    }

    const numeroInvolucrados = foundInvolucrados.length;

    res.status(200).json({ numeroInvolucrados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el número de involucrados" });
  }
};

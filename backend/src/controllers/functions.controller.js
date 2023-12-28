import Proyect from "../models/proyect.model.js";
import Functions from "../models/funciones.model.js";

export const getFunctions = async (req, res) => {
  try {
    console.log(req.params.id);
    const proyects = await Proyect.find({
      status: true,
      _id: req.params.id,
    }).populate("user");
    const funcionesArray = proyects[0].funciones;
    console.log(funcionesArray);
    if (!proyects) {
      return res.status(404).json({ message: "Proyectos no encontrados." });
    }
    if (!funcionesArray || funcionesArray.length === 0) {
      return res.status(404).json({ message: "No se encontraron funciones para este proyecto." });
    }
    const foundFunctions = await Functions.find({
      _id: { $in: funcionesArray },
    });
    if (foundFunctions.length === 0) {
      return res.status(404).json({ message: "No se encontraron funciones con los IDs proporcionados." });
    }



    // Retornar las funciones encontradas en la respuesta JSON
    res.json(foundFunctions);

  } catch (error) {
    return res.status(404).json({ message: "Proyectos no encontrados." });
  }
};
export const createFunctions = async (req, res) => {
  try {
    const proyecto = await Proyect.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    //console.log(proyecto);

    const nuevaFuncion = new Functions({
      funcionalidad: req.body.funcionalidad,
      tipo: req.body.tipo,
      complejidad: req.body.complejidad,
      cantidad: req.body.cantidad,
    });
    await nuevaFuncion.save();
    proyecto.funciones.push(nuevaFuncion);
    await proyecto.save();
    res.status(201).json(nuevaFuncion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la función" });
  }
};
export const getFunction = async (req, res) => {
  try {
    const funcion = await Functions.findById(req.params.id);
    if (!funcion) {
      return res.status(404).json({ error: "Función no encontrada" });
    }
    res.json(funcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la función" });
  }

};
export const updateFunctions = async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    const { funcionalidad, tipo, complejidad, cantidad } = req.body;

    const project = await Proyect.findById(id1);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' });
    }
   // console.log(project);

    // Verificar si la propiedad 'funciones' existe en el proyecto
    if (project.funciones.length === 0) {
      return res.status(404).json({ message: 'El proyecto no contiene la propiedad funciones.' });
    }
    const idEncontrado = project.funciones.some(id => id.equals(id2));


    if (!idEncontrado) {
      return res.status(404).json({ message: 'No se encontró la función en el proyecto.' });
    }

    // Verificar si la función existe y pertenece al usuario
    const funcion = await Functions.findById(id2);

    if (!funcion) {
      return res.status(404).json({ message: 'Función no encontrada.' });
    }

    const functionnew = new Functions({ 
      funcionalidad : funcionalidad
      , tipo: tipo
      , complejidad: complejidad
      , cantidad: cantidad });

    //await functionnew.save();

    // Retornar la función actualizada en la respuesta JSON
    const functionupdate = await Functions.findByIdAndUpdate(id2, req.body, {
      new: true,
    });
    if (!functionupdate)
      return res.status(404).json({ message: "Funcion no encontrado." });
    console.log(functionupdate);
    res.json(functionupdate);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const deleteFunction = async (req, res) => {
  try {
    const { id1, id2 } = req.params;

    // Verificar si el proyecto existe y pertenece al usuario
    const project = await Proyect.findById(id1);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' });
    }
   // console.log(project);

    // Verificar si la propiedad 'funciones' existe en el proyecto
    if (project.funciones.length === 0) {
      return res.status(404).json({ message: 'El proyecto no contiene la propiedad funciones.' });
    }
    const idEncontrado = project.funciones.some(id => id.equals(id2));

    if (!idEncontrado) {
      return res.status(404).json({ message: 'No se encontró la función en el proyecto.' });
    }

    project.funciones = project.funciones.filter(id => !id.equals(req.params.id2));

    await project.save();
    await Functions.findByIdAndDelete(id2);
    res.status(201).json(project.funciones);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

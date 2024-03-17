import ProyectShares from "../models/proyecShrare.model.js";
import User from "../models/user.model.js";
import Proyect from "../models/proyect.model.js";

export const createProyectShared = async (req, res) => {
  try {
    const { keyShared } = req.body;
    if (await validarCodigo(keyShared, req.user.payload.id)) {
      const proyect = await Proyect.findOne({ keyShared: keyShared });

      const newProyect = new ProyectShares({
        permissions: "all",
        keyShared: keyShared,
        status: false,
        user: req.user.payload.id,
        proyect: proyect._id,
      });
      const proyectSaved = await newProyect.save();
      res.json(proyectSaved);
    } else {
      return res.status(404).json({ message: "Codigo no valido, ya fue ingresado o pertenece al mismo usuario." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProyectsShared = async (req, res) => {
  try {
    const proyects = await ProyectShares.find({
      user: req.user.payload.id,
      status: true
    }).populate("proyect").populate("user");
console.log(proyects);
    // Verificar el estado de cada proyecto
    const proyectosValidos = await Promise.all(
      proyects.map(async (proyectoShare) => {
        const estado = await validarEstado(proyectoShare.proyect.keyShared);
        return { ...proyectoShare.toObject(), estado };
      })
    );

    // Filtrar los proyectos válidos (estado=true)
    const proyectosFiltrados = proyectosValidos.filter((proyecto) => proyecto.estado);

    if (proyectosFiltrados.length > 0) {
      res.json(proyectosFiltrados);
    } else {
      return res.status(404).json({ message: "No hay proyectos válidos o habilitados" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los proyectos compartidos" });
  }
};

export const getSolicitudesProyectosShared = async (req, res) => {
  try {
    const { proyectId } = req.body;

    const proyects = await ProyectShares.find({
      proyect: proyectId,
      status : false
    }).populate("user");

    if (proyects.length > 0) {
      res.json(proyects);
    } else {
      return res.status(400).json({ message: "Este proyecto no ha sido compartido" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los proyectos compartidos" });
  }
}

const validarCodigo = async (key, userId) => {
  try {
    const proyect = await Proyect.findOne({ keyShared: key });
    const proyectShared = await ProyectShares.find({keyShared: key, user: userId});
    // Verificar si el proyecto existe y no pertenece al mismo usuario
    if (!proyect || proyect.user.toString() === userId || proyectShared.length > 0 ) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};


const validarEstado = async (key) => {
  try {
    const proyect = await Proyect.findOne({ keyShared: key });

    if (proyect && proyect.status) {
      return true; // Proyecto válido y habilitado
    } else {
      return false; // Proyecto no encontrado o deshabilitado
    }
  } catch (error) {
    console.error(error);
    return false; // Manejo del error
  }
};

export const deleteProyectShared = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id no encontrado" });
    const proyect = await ProyectShares.findByIdAndDelete(id);
    if (!proyect) return res.status(400).json({ message: "Proyecto no encontrado" });
    res.json(proyect);
  } catch (error) {
    console.error(error);
  }
};

export const getProyectsSharedByProyect = async (req, res) => {
  try {
    const { proyectId } = req.body;

    const proyects = await ProyectShares.find({
      proyect: proyectId,
      status: true
    }).populate("user");

    if (proyects.length > 0) {
      console.log(proyects);
      res.json(proyects);
    } else {
      return res.status(400).json({ message: "Este proyecto no ha sido compartido" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los proyectos compartidos" });
  }
}


export const updateStatusProyectShared = async (req, res) => {
  try {
    const { proyectId } = req.body; 
    const proyect = await ProyectShares.findByIdAndUpdate(proyectId, 
      {status: true},
      {new: true,
    });
    if (!proyect)
      return res.status(404).json({ message: "Proyecto compartido no encontrado." });
    res.json(proyect);
  } catch (error) {
    return res.status(404).json({ message: "Error no se pudo actualizar el proyecto compartido." });
  }
};
import Proyect from "../models/proyect.model.js";

export const getProyects = async (req, res) => {
  try {
    const proyects = await Proyect.find({
      user: req.user.payload.id,
      status: true,
    }).populate("user");
    res.json(proyects);
  } catch (error) {
    return res.status(404).json({ message: "Proyectos no encontrados." });
  }
};
export const createProyect = async (req, res) => {
  try {
    const { title, description, category, technology } = req.body;
    const newProyect = new Proyect({
      title,
      description,
      category,
      technology,
      status: true,
      user: req.user.payload.id,
    });
    const proyectSaved = await newProyect.save();
    res.json(proyectSaved);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el proyecto." });
  }
};
export const getProyect = async (req, res) => {
  try {
    const proyect = await Proyect.findById(req.params.id);
    if (!proyect)
      return res.status(404).json({ message: "Proyecto no encontrado." });
    res.json(proyect);
  } catch (error) {
    return res.status(404).json({ message: "Proyecto no encontrado." });
  }
};
export const updateProyect = async (req, res) => {
  try {
    const proyect = await Proyect.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!proyect)
      return res.status(404).json({ message: "Proyecto no encontrado." });
    res.json(proyect);
  } catch (error) {
    return res.status(404).json({ message: "Proyecto no encontrado." });
  }
};
//export const deleteProyect = async (req, res) => {
 // const proyect = await Proyect.findByIdAndDelete(req.params.id);
  //if (!proyect)
   // return res.status(404).json({ message: "Proyecto no encontrado." });
  //return res.sendStatus(204);
//};

export const deleteProyect = async (req, res) => {
  try {
    const proyect = await Proyect.findByIdAndUpdate(req.params.id, 
      {status: false},
      {new: true,
    });
    if (!proyect)
      return res.status(404).json({ message: "Proyecto no encontrado." });
    res.json(proyect);
  } catch (error) {
    return res.status(404).json({ message: "Proyecto no encontrado." });
  }
};
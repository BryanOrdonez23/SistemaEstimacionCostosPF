import Proyect from "../models/proyect.model.js";

export const getProyects = async (req, res) => {
  const proyects = await Proyect.find({
    user: req.user.payload.id
  }).populate('user')
  res.json(proyects);
};
export const createProyect = async (req, res) => {
  const { title, description, category } = req.body;
  const newProyect = new Proyect({
    title,
    description,
    category,
    user: req.user.payload.id
  });
  const proyectSaved = await newProyect.save();
  res.json(proyectSaved);
};
export const getProyect = async (req, res) => {
  const proyect = await Proyect.findById(req.params.id);
  if (!proyect)
    return res.status(404).json({ message: "Proyecto no encontrado." });
  res.json(proyect);
};
export const updateProyect = async (req, res) => {
  const proyect = await Proyect.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!proyect)
    return res.status(404).json({ message: "Proyecto no encontrado." });
  res.json(proyect);
};
export const deleteProyect = async (req, res) => {
  const proyect = await Proyect.findByIdAndDelete(req.params.id);
  if (!proyect)
    return res.status(404).json({ message: "Proyecto no encontrado." });
  return res.sendStatus(204);
};

import ProyectShares from '../models/proyecShrare.model.js';


export const createProyect = async (req, res) => {
    const { permissions } = req.body;
    const newProyect = new ProyectShares({
      permissions,
      user: req.user.payload.id,
      proyect: req.params.id
    });
    const proyectSaved = await newProyect.save();
    res.json(proyectSaved);
  };

  export const getProyects = async (req, res) => {
    const proyects = await ProyectShares.find({
      user: req.user.payload.id
    }).populate('user')
    res.json(proyects);
  };
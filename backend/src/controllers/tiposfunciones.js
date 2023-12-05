import TiposFunciones from "../models/tiposfunciones.model.js";

export const createTipoFuncion = async (req, res) => {
  try {
    const { tipo, valorAlto, valorMedio, valorBajo } = req.body;
    const newTipoFuncion = new TiposFunciones({
      tipo,
      valorAlto,
      valorMedio,
      valorBajo,
    });
    const tipoFuncionSaved = await newTipoFuncion.save();
    res.status(201).json(tipoFuncionSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getTipoFunciones = async (req, res) => {
  try {
    const tipoFunciones = await TiposFunciones.find();
    res.json(tipoFunciones);    
  } catch (error) {
    console.log(error);
  }
};

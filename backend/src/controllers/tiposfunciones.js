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

export const deleteTipoFuncion = async (req, res) => {
  try {
    const tipoFuncion = await TiposFunciones.findByIdAndDelete(req.params.id);
    res.json(tipoFuncion);
  } catch (error) {
    console.log(error);
  }
}

export const updateTipoFuncion = async (req, res) => {
  try {
    const { tipo, valorAlto, valorMedio, valorBajo } = req.body;
    const tipoFuncion = await TiposFunciones.findByIdAndUpdate(req.params.id, {
      tipo,
      valorAlto,
      valorMedio,
      valorBajo,
    });
    res.json(tipoFuncion);
  } catch (error) {
    console.log(error);
  }
}

export const getTipoFuncion = async (req, res) => {
  try {
    const tipoFuncion = await TiposFunciones.findById(req.params.id);
    res.json(tipoFuncion);
  } catch (error) {
    console.log(error);
  }
}
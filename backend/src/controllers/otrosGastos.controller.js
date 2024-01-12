import OtrosGastos from "../models/otrosGastos.model.js";

import FunctionPoints from "../models/functionPoints.model.js";

export const crearOtrosGastos = async (req, res) => {
  try {
    const IDproyecto = req.params.id;
    const pf = await FunctionPoints.findOne({ proyect: IDproyecto });
    if (!pf) {
      return res
        .status(404)
        .json({ error: "Puntos de funcion, no encontrado" });
    }

    const newotrosGastos = new OtrosGastos({
      descripcion: req.body.descripcion,
      costo: req.body.costo,
      observacion: req.body.observacion,
    });

    await newotrosGastos.save();
    pf.otrosGastos.push(newotrosGastos);
    await pf.save();
    res.status(200).json({ newotrosGastos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el involucrado" });
  }
};
export const getOtrosGastos = async (req, res) => {
  try {
    const IDproyecto = req.params.id;
    const pf = await FunctionPoints.findOne({ proyect: IDproyecto });

    const otrosGastosArray = pf.otrosGastos;
    console.log(otrosGastosArray);
    if (!pf) {
      return res.status(404).json({ message: "pf  no encontrados." });
    }
    if (!otrosGastosArray || otrosGastosArray.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron otros gastos" });
    }

    const foundotrosGastos = await OtrosGastos.find({
      _id: { $in: otrosGastosArray },
    });
    if (foundotrosGastos.length === 0) {
      return res
        .status(404).json({message: "No se encontraron otros gastos con los IDs proporcionados.",});
    }

    // Retornar las funciones encontradas en la respuesta JSON
    res.json(foundotrosGastos);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error });
  }
};
//
export const getOtroGasto = async (req, res) => {
    try {
        const { id } = req.params;
        const otrosGastos = await OtrosGastos.findById(id);
        res.status(200).json({ otrosGastos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los otrosGastos." });
    }
 };

export const actualizarOtrosGastos = async (req, res) => {
    try {
        const { id1, id2 } = req.params;

    
        const pf = await FunctionPoints.findOne({proyect: id1});
    
        if (!pf) {
          return res.status(404).json({ message: 'pf no encontrado.' });
        }

        if (pf.otrosGastos.length === 0) {
          return res.status(404).json({ message: 'Pf no contiene involucrados.' });
        }
        const idEncontrado = pf.otrosGastos.some(id => id.equals(id2));
    
    
        if (!idEncontrado) {
          return res.status(404).json({ message: 'No se encontró el otro gasto en el proyecto.' });
        }
    
        // Verificar si la función existe y pertenece al usuario
        const otrogasto = await OtrosGastos.findById(id2);
    
        if (!otrogasto) {
          return res.status(404).json({ message: 'otro gasto no encontrado.' });
        }
    
        const otroGastoupdate = await OtrosGastos.findByIdAndUpdate(id2, req.body, {
          new: true,
        });
        if (!otroGastoupdate)
          return res.status(404).json({ message: "Otro gasto no actualizado" });
        console.log(otroGastoupdate);
        res.json(otroGastoupdate);
    
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
      }
};

export const eliminarOtrosGastos = async (req, res) => {
    try {
        const { id1, id2 } = req.params;
    
        // Verificar si el proyecto existe y pertenece al usuario
        const pf = await FunctionPoints.findOne({proyect: id1});
    
        if (!pf) {
          return res.status(404).json({ message: 'puntos de función no encontrado.' });
        }
       // console.log(project);
    
        // Verificar si la propiedad 'funciones' existe en el proyecto
        if (pf.otrosGastos.length === 0) {
          return res.status(404).json({ message: 'no existen involucrados' });
        }
        const idEncontrado = pf.otrosGastos.some(id => id.equals(id2));
    
        if (!idEncontrado) {
          return res.status(404).json({ message: 'No se encontró la función en el proyecto.' });
        }
    
        pf.otrosGastos = pf.otrosGastos.filter(id => !id.equals(req.params.id2));
    
        await pf.save();
        await OtrosGastos.findByIdAndDelete(id2);
        res.status(201).json(pf.otrosGastos);
        
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
      }
};

export const sumatoriaCostosOtrosGastos = async (req, res) => {
    try {
      const IDproyecto = req.params.id;
      const pf = await FunctionPoints.findOne({ proyect: IDproyecto });
  
      const otrosGastosArray = pf.otrosGastos;
      console.log(otrosGastosArray);
      if (!pf) {
        return res.status(404).json({ message: "pf no encontrados." });
      }
      if (!otrosGastosArray || otrosGastosArray.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron otros gastos" });
      }
  
      const foundotrosGastos = await OtrosGastos.find({
        _id: { $in: otrosGastosArray },
      });
      if (foundotrosGastos.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron otros gastos con los IDs proporcionados." });
      }
  
      // Calcular la sumatoria de los valores del atributo "costo"
      const totalCosto = foundotrosGastos.reduce((acc, otroGasto) => acc + otroGasto.costo, 0);
  
      // Retornar las funciones encontradas y la sumatoria en la respuesta JSON
      res.json({ totalCosto });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error });
    }
  };



// funciones para calcular el presupuesto del poyecto


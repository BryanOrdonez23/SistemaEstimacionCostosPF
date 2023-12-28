import mongoose from "mongoose";

const functionPointsSchema = new mongoose.Schema({
  calculoSA: {
    type: Number,
    trim: true,
  },
  calculoCA: {
    type: Number,
    trim: true,
  },
  esfuerzo: {
    type: Number,
    trim: true,
  },
  SumaFA: {
    type: Number,
    trim: true,
  },
  horasPF: {
    type: Number,
    trim: true,
  },
  horasDia: {
    type: Number,
    trim: true,
  },
  diasTrabajados: {
    type: Number,
    trim: true,
  },
  diasEstimados: {
    type: Number,
    trim: true,
  },
  mesesEstimados: {
    type: Number,
    trim: true,
  },
  presupuesto:{
    type: Number,
    trim: true,
  },
  proyect: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyect",
    required: true,
  },
  involucrados: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "InvolucradosProyecto",
  },
  otrosGastos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "OtrosGastos",
  },
},{
    timestamps: true
})


export default mongoose.model("FunctionPoints", functionPointsSchema);

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
  SumaFA: {
    type: Number,
    trim: true,
  },
  horasPF: {
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

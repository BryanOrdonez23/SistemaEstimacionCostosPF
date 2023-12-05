import mongoose from "mongoose";

const functionPointsSchema = new mongoose.Schema({
  CalculoSA: {
    type: Number,
    trim: true,
  },
  CalculoCA: {
    type: Number,
    trim: true,
  },
  HorasPF: {
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

import mongoose from "mongoose";

const otrosGastosSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
    },
    costo:{
        type: Number,
        required: true,
    },
    observacion:{
        type: String,
    }
},{
    timestamps: true
})

export default mongoose.model("OtrosGastos", otrosGastosSchema);
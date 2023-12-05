import mongoose from "mongoose";

const tiposFuncionesSchema = new mongoose.Schema({

    tipo: {
        type: String,
        trim: true,
    },
    valorAlto: {
        type: Number,
        trim: true,
    },
    valorMedio: {
        type: Number,
        trim: true,
    },
    valorBajo: {
        type: Number,
        trim: true,
    },
});

export default mongoose.model("TiposFunciones", tiposFuncionesSchema);
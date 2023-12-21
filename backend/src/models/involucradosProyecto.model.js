import mongoose from "mongoose";

const involucradosProyectoSchema = new mongoose.Schema({      
    nombre: {
        type: String,
        required: true,
    },
    rol:{
        type: String,
        required: true,
    },
    sueldo:{
        type: Number,
        required: true,
    }
},{
    timestamps: true
})

export default mongoose.model("InvolucradosProyecto", involucradosProyectoSchema);
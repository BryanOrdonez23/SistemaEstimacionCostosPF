import mongoose from 'mongoose';

const funcionesSchema = new mongoose. Schema ({
    funcionalidad: {
        type: String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        trim: true
    },
    complejidad:{
        type: String,
        required: true,
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyect',
        required: true
    }
},{
    timestamps: true
})

export default mongoose.model('Funciones', funcionesSchema)
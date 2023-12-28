import mongoose from 'mongoose';

const proyectShareSchema = new mongoose. Schema ({
    permissions: {
        type: String,
        required: true,
        trim: true
    },
    keyShared:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    proyect:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyect',
        required: true
    }
},{
    timestamps: true
})


export default mongoose.model('ProyectShares', proyectShareSchema)
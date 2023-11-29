import mongoose from 'mongoose';

const proyectSchema = new mongoose. Schema ({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
    },
    technology:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    funciones: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Functions',
    }

},{
    timestamps: true
})


export default mongoose.model('Proyect', proyectSchema)
import mongoose from "mongoose";


const factoresAjusteSchema = mongoose.Schema({
    FA1: {
        type: String,
        required: true,
        trim: true,
    },
    FA2: {
        type: String,
        required: true,
        trim: true,
    },
    FA3: {
        type: String,
        required: true,
        trim: true,
    },
    FA4: {
        type: String,
        required: true,
        trim: true,
    },
    FA5: {
        type: String,
        required: true,
        trim: true,
    },
    FA6: {
        type: String,
        required: true,
        trim: true,
    },
    FA7: {
        type: String,
        required: true,
        trim: true,
    },
    FA8: {
        type: String,
        required: true,
        trim: true,
    },
    FA9: {
        type: String,
        required: true,
        trim: true,
    },
    FA10: {
        type: String,
        required: true,
        trim: true,
    },
    FA11: {
        type: String,
        required: true,
        trim: true,
    },
    FA12: {
        type: String,
        required: true,
        trim: true,
    },
    FA13: {
        type: String,
        required: true,
        trim: true,
    },
    FA14: {
        type: String,
        required: true,
        trim: true,
    },
});

export default mongoose.model('FactoresAjuste', factoresAjusteSchema);
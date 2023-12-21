import mongoose from "mongoose";

const valorFactoresAjusteSchema = mongoose.Schema(
  {
    valorFA1: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA2: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA3: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA4: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA5: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA6: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA7: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA8: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA9: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA10: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA11: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA12: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA13: {
      type: Number,
      required: true,
      trim: true,
    },
    valorFA14: {
      type: Number,
      required: true,
      trim: true,
    },
    proyect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proyect",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ValorFactoresAjuste", valorFactoresAjusteSchema);

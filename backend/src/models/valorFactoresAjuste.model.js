import mongoose from "mongoose";

const valorFactoresAjusteSchema = mongoose.Schema(
  {
    ValorFA1: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA2: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA3: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA4: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA5: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA6: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA7: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA8: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA9: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA10: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA11: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA12: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA13: {
      type: Number,
      required: true,
      trim: true,
    },
    ValorFA14: {
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

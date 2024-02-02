import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongo/swcostospf", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000, // 20 segundos
    });

    console.log(">>> DB is connected.!");
  } catch (error) {
    console.log(error);
  }
};

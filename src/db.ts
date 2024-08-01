import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(
      `[server]  Mongoose connected to: ${connection.connection.name}`,
    );
  } catch (error) {
    console.error("[server]  Mongoose error connecting:", error);
    process.exit(1);
  }
};

export default connectToDB;

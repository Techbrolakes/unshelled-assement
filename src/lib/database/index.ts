import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

export const connectToDatabase = async () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  const m = mongoose.connect(MONGODB_URI, { dbName: "unshelled-db" });

  await mongoose.connection.syncIndexes();
  console.log("Connected to Database", MONGODB_URI);
  return m;
};

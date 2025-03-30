import mongoose from "mongoose"

let isConnected = false

export const connectToDatabase = async () => {
  if (isConnected) return

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined")
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    console.log("MongoDB connected")
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }
}


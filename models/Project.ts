import mongoose, { Schema, models } from "mongoose"

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    tags: [String],
    urlRepo: {
      type: String,
      default: "",
    },
    urlDemo: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// Prevenir redefinición del modelo durante hot reloading
const Project = models.Project || mongoose.model("Project", projectSchema)
export default Project

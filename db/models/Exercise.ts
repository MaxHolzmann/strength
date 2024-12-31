import mongoose, { Schema, Model, Document } from "mongoose";

// add separate cardio based exercise model that does not require sets / reps, but rather duration.

// Define the interface for the Exercise document
interface IExercise extends Document {
  title?: string;
  muscle?: string;
  user?: mongoose.Types.ObjectId;
}

// Define the schema for the Exercise model
const exerciseSchema: Schema<IExercise> = new Schema({
  title: {
    type: String,
    required: false,
  },
  muscle: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

// Define the Exercise model
const Exercise: Model<IExercise> =
  mongoose.models.Exercise ||
  mongoose.model<IExercise>("Exercise", exerciseSchema);

// Export the Exercise model
export default Exercise;

import mongoose, { Schema, Model, Document } from "mongoose";

interface IWorkoutTemplate extends Document {
  title?: string;
  day?: string;
  exercises?: Array<any>;
  user?: mongoose.Types.ObjectId;
}

const workoutTemplateSchema: Schema<IWorkoutTemplate> = new Schema({
  title: {
    type: String,
    required: false,
  },
  day: {
    type: String,
    required: false,
  },
  exercises: {
    type: Array,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

const WorkoutTemplate: Model<IWorkoutTemplate> =
  mongoose.models.Exercise ||
  mongoose.model<IWorkoutTemplate>("WorkoutTemplate", workoutTemplateSchema);

export default WorkoutTemplate;

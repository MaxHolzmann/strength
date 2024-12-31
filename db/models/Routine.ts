import mongoose, { Schema, Model, Document } from "mongoose";

interface IRoutine extends Document {
  title?: string;
  split?: string;
  exercises?: Array<any>;
  user?: mongoose.Types.ObjectId;
}

const routineSchema: Schema<IRoutine> = new Schema({
  title: {
    type: String,
    required: false,
  },
  split: {
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

const Routine: Model<IRoutine> =
  mongoose.models.Exercise ||
  mongoose.model<IRoutine>("Routine", routineSchema);

export default Routine;

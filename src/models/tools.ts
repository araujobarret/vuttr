import { Document, model, Model, Schema } from 'mongoose';

interface Tool extends Document {
  id?: string;
  title: string;
  link: string;
  description: string;
  tags?: string[];
}

const toolSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 80,
  },
  link: {
    type: String,
    required: true,
    trim: true,
    minLength: 12,
    maxLength: 120,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 12,
    maxLength: 200,
  },
  tags: [
    {
      type: String,
      trim: true,
      minLength: 1,
      maxLength: 40,
    },
  ],
});

const ToolModel: Model<Tool> = model<Tool>('tool', toolSchema);

export { Tool, ToolModel };

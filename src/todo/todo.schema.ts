import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  task: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: false })
  isEditing: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

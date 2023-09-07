import { Injectable } from '@nestjs/common';

import { Todo, TodoDocument } from './todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private todosRepository: Model<TodoDocument>,
  ) {}

  async getAll() {
    return this.todosRepository.find();
  }

  async create(todo: Todo) {
    return this.todosRepository.create(todo);
  }

  async update(id: string, todo: Todo) {
    return this.todosRepository.updateOne({ _id: id }, todo);
  }

  async delete(id: string) {
    return this.todosRepository.deleteOne({ _id: id });
  }
}

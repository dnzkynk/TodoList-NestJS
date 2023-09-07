import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todo.service';
import { Todo } from './todo.schema';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAll() {
    const todos = await this.todosService.getAll();
    return { data: todos, status: HttpStatus.OK };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() todo: Todo) {
    const createdTodo = await this.todosService.create(todo);
    return { data: createdTodo, status: HttpStatus.CREATED };
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() todo: Todo) {
    const updatedTodo = await this.todosService.update(id, todo);
    return { data: updatedTodo, status: HttpStatus.OK };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const deleteResult = await this.todosService.delete(id);
    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return { status: HttpStatus.NO_CONTENT };
  }
}

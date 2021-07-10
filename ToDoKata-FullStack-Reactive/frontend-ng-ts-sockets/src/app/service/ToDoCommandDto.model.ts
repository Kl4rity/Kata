import {Todo} from "../model/todo.model";

export class ToDoCommandDto {
  type : ToDoCommandTypes;
  todo: Todo;

  constructor(commandType : ToDoCommandTypes, todo: Todo) {
    this.type = commandType;
    this.todo = todo;
  }
}

export enum ToDoCommandTypes {
  CREATE,
  DELETE
}

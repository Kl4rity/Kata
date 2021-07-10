import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Todo} from '../model/todo.model';
import {ToDoCommandDto, ToDoCommandTypes} from "./ToDoCommandDto.model";
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private socket : WebSocket;

  constructor() {
    this.socket = new WebSocket("http://localhost:8080/todolist");
  }

  public getTodoListObservable() : Observable<WebSocket> {
    return of(this.socket);
  }

  public removeTodo(todo: Todo) {
    this.socket.send(stringify(new ToDoCommandDto(ToDoCommandTypes.DELETE, todo)));
  }

  public createTodo(todo: Todo) {
    this.socket.send(stringify(new ToDoCommandDto(ToDoCommandTypes.CREATE, todo)));
  }
}

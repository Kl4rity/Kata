package com.example.application

import io.micronaut.websocket.WebSocketBroadcaster
import io.micronaut.websocket.annotation.OnMessage
import io.micronaut.websocket.annotation.OnOpen
import io.micronaut.websocket.annotation.ServerWebSocket
import io.reactivex.subjects.BehaviorSubject

@ServerWebSocket("/todolist")
class TodoListController(val broadcaster: WebSocketBroadcaster) {
    private val todoListBehaviorSubject = BehaviorSubject.createDefault(listOf<ToDoItem>())

    init {
        todoListBehaviorSubject.subscribe {
            broadcaster.broadcastAsync(it)
        }
    }

    @OnOpen
    fun onOpen() {
        broadcaster.broadcastAsync(todoListBehaviorSubject.value!!)
    }

    @OnMessage
    fun newTodo(command: ToDoItemCommand) {
        when (command.type) {
            ToDoItemCommandType.CREATE ->
                todoListBehaviorSubject.onNext(todoListBehaviorSubject.value!!.plus(command.item))
            ToDoItemCommandType.DELETE ->
                todoListBehaviorSubject.onNext(todoListBehaviorSubject.value!!.minus(command.item))
        }
    }
}

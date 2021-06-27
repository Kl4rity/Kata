package org.cstift.kata.application

data class ToDoItemCommand (
    val type : ToDoItemCommandType,
    val item : ToDoItem
)
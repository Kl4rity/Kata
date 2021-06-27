package com.example.application

data class ToDoItemCommand (
    val type : ToDoItemCommandType,
    val item : ToDoItem
)
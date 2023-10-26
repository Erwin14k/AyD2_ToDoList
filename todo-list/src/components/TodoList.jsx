import React, { useState } from "react";
import TodoForm from "./TodoForm.";
import Todo from "./Todo.";


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [nextTodoId, setNextTodoId] = useState(1);

  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    const newTodo = {
      id: nextTodoId,
      title: todo.title,
      description: todo.description,
      is_done: 0,
      showDescription: false,
      date_of_creation: new Date(),
      date_of_update: null,
    };

    setNextTodoId(nextTodoId + 1);
    setTodos([...todos, newTodo]);
  };

  const showDescription = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, showDescription: !todo.showDescription };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, { title, description }) => {
    if (!title || /^\s*$/.test(title)) {
      return;
    }

    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title,
          description,
          date_of_update: new Date(),
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const removeTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const completeTodo = (todoId, is_done) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, is_done: is_done === 1 ? 0 : 1 };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;

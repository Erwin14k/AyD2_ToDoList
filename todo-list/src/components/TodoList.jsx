import React, { useState } from "react";
import TodoForm from "./TodoForm.";
import Todo from "./Todo.";
import { useEffect } from "react";
import TodoSearch from "./TodoSearch";
import TodoFilter from "./TodoFilter";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [showPending, setShowPending] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showReminders, setShowReminders] = useState(false);


  const filteredTodos = todos.filter((todo) => {
    return (
      (showAll || (showPending && todo.is_done === 0) || (showCompleted && todo.is_done === 1)) &&
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  
  useEffect(() => {
    const todoList = window.localStorage.getItem("todoList");
    if (todoList) {
      const parsedList = JSON.parse(todoList);
      setTodos(parsedList);
    }
  }, []);

  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      title: todo.title,
      description: todo.description,
      is_done: 0,
      showDescription: false,
      date_of_creation: new Date(),
      date_of_update: null,
      reminder: new Date(todo.reminder),
    };
    
    console.log(JSON.stringify(todo));

    // setNextTodoId(nextTodoId + 1);
    const updatedTodos = [...todos, newTodo];
    window.localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
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

    window.localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const removeTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    window.localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const completeTodo = (todoId, is_done) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, is_done: is_done === 1 ? 0 : 1 };
      }
      return todo;
    });

    window.localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const sortByReminder = (todos) => {
    const validReminders = todos.filter((todo) => todo.reminder instanceof Date && !isNaN(todo.reminder.getTime()));
    console.log("todos: ", JSON.stringify(validReminders))
    return validReminders.sort((a, b) => a.reminder.getTime() - b.reminder.getTime());

    //console.log("todos: ", JSON.stringify(todos))
    //return todos
      //.filter((todo) => todo.reminder instanceof Date)
      
    //  .sort((a, b) => (a.reminder.getTime() - b.reminder.getTime()));
  };
  
  if (todos) {
    let filteredTodos = todos.filter((todo) => {
      return (
        (showAll ||
          (showPending && todo.is_done === 0) ||
          (showCompleted && todo.is_done === 1)  ||
          (showReminders)
        ) &&
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    console.log("show reminders: " + showReminders);
    if (showReminders) {
      console.log("filtrado");
      filteredTodos = sortByReminder(todos);
    }

    return (
      <>
        <h1>What's the Plan for Today?</h1>
        <TodoSearch setSearchTerm={setSearchTerm} />
        <TodoForm onSubmit={addTodo} />
        <TodoFilter
          showAll={showAll}
          showPending={showPending}
          showCompleted={showCompleted}
          showReminders={showReminders} // Agregar esta prop
          setShowAll={setShowAll}
          setShowPending={setShowPending}
          setShowCompleted={setShowCompleted}
          setShowReminders={setShowReminders} // Agregar esta prop
        />
        <Todo
          todos={filteredTodos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          showDescription={showDescription}
          showReminders={showReminders}
          setShowReminders={setShowReminders} // Agregar esta prop
        />
      </>
    );
  }
  
}

export default TodoList;

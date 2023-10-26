import React, { useState } from "react";
import TodoForm from "./TodoForm.";
import {
  RiCloseCircleLine,
  RiCheckboxCircleLine,
  RiArrowDownCircleLine,
} from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  showDescription,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  if (todos) {
    return todos.map((todo) => (
      <div
        className={todo.is_done === 1 ? "todo-row complete" : "todo-row"}
        key={todo.id}
      >
        <div className="description">
          <div
            onClick={() => completeTodo(todo.id, todo.is_done)}
            className="todo"
          >
            {todo.title}
          </div>
          <div className="icons">
            <RiCheckboxCircleLine
              onClick={() => completeTodo(todo.id, todo.is_done)}
              className="delete-icon"
            />
            <RiArrowDownCircleLine
              onClick={() => showDescription(todo.id)}
              className="delete-icon"
            />
            <RiCloseCircleLine
              onClick={() => removeTodo(todo.id)}
              className="delete-icon"
            />
            <TiEdit
              onClick={() =>
                setEdit({
                  id: todo.id,
                  value: todo.title,
                  description: todo.description
                })
              }
              className="edit-icon"
            />
          </div>
        </div>
        <div className="description">
          Creation Date: {new Date(todo.date_of_creation).toLocaleString()}
        </div>
        <div className="description">
          Last Update:{" "}
          {todo.date_of_update
            ? new Date(todo.date_of_update).toLocaleString()
            : "Not updated yet"}
        </div>
        {todo.showDescription && (
          <div className="description">Description: {todo.description}</div>
        )}
      </div>
    ));
  }

  return null;
};

export default Todo;
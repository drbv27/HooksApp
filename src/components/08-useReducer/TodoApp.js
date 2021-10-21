import React, { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";
import "./styles.css";
import { useForm } from "../../hooks/useForm";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
  /*   return [
    {
      id: new Date().getTime(),
      descr: "Aprender React",
      done: false,
    },
  ]; */
};
export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);
  const [{ description }, handleInputChange, reset] = useForm({
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (todoId) => {
    const action = {
      type: "delete",
      payload: todoId,
    };
    dispatch(action);
  };

  /* console.log(description); */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim().length <= 1) {
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      descr: description,
      done: false,
    };
    const action = {
      type: "add",
      payload: newTodo,
    };
    dispatch(action);
    reset();
  };
  return (
    <div>
      <h1>TodoApp ({todos.length})</h1>
      <hr />
      <div className="row">
        <div className="col-7">
          <ul className="list-group list-group-flush">
            {todos.map((todo, i) => (
              <li key={todo.id} className="list-group-item">
                <p className="text-center">
                  {i + 1}. {todo.descr}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(todo.id)}
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-5">
          <h4>Agregar TODO</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="d-grid gap-2">
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Aprender..."
                autoComplete="off"
                value={description}
                onChange={handleInputChange}
              />
              <button type="submit" className="btn btn-outline-primary mt-1">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

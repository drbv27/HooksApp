import React, { useReducer } from "react";
import { todoReducer } from "./todoReducer";
import "./styles.css";

const initialState = [
  {
    id: new Date().getTime(),
    descr: "Aprender React",
    done: false,
  },
];

export const TodoApp = () => {
  const [todos] = useReducer(todoReducer, initialState);
  console.log(todos);
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
                <button className="btn btn-danger">Borrar</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-5">
          <h4>Agregar TODO</h4>
          <hr />
          <form>
            <div className="d-grid gap-2">
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Aprender..."
                autoComplete="off"
              />
              <button className="btn btn-outline-primary mt-1">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

import React, { useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { useCounter } from "../../hooks/useCounter";
import { useFetch } from "../../hooks/useFetch";
import "./layout.css";

export const Layout = () => {
  const { counter, increment } = useCounter(1);

  const { data } = useFetch(
    `https://www.breakingbadapi.com/api/quotes/${counter}`
  );
  const { quote } = !!data && data[0];

  const pTag = useRef();
  const [boxSize, setBoxSize] = useState({});

  useLayoutEffect(() => {
    setBoxSize(pTag.current.getBoundingClientRect());
  }, [quote]);
  /* console.log(state); */
  return (
    <div>
      <h1>Layout Effect</h1>
      <hr />

      <blockquote className="blockquote text-end">
        <p className="mb-2" ref={pTag}>
          {quote}
        </p>
      </blockquote>
      <pre>{JSON.stringify(boxSize, null, 3)}</pre>
      <button className="btn btn-primary" onClick={increment}>
        Next Quote
      </button>
    </div>
  );
};

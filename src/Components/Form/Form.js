import React from "react";

const Form = (props) => {

  return (

    <div className="form">
    <form onSubmit={props.submitted}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="22"
        fill="currentColor"
        class="bi bi-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      </svg>
      <input
        type="text"
        className={`form-control ${props.themeInput}`}
        value={props.input}
        placeholder="Create a new todo"
        onChange={props.changeInput}
        style={{ background: `${props.inputColor}` }}
      />
    </form>
  </div>
    

  );
};

export default Form;
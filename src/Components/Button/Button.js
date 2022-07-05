import React, { Fragment } from "react";

const Button = (props) => {

  return (

    <Fragment>
      <div className="Btn">
        <div>
          <strong>{props.resultat}</strong> tasks left
        </div>
        <div className="Btn-element-2">
          <button onClick={props.showAll}>All</button>
          <button onClick={props.showActive}>Active</button>
          <button onClick={props.showCompleted}>Completed</button>
        </div>
        <div onClick={props.clearAllCompleted}>
          <button>Clear Completed</button>
        </div>
      </div>
      <div className="Btn-element-3">
        <button onClick={props.showAll}>All</button>
        <button onClick={props.showActive}>Active</button>
        <button onClick={props.showCompleted}>Completed</button>
      </div>
    </Fragment>

  );
};

export default Button;
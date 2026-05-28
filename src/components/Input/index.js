import React from "react";
import "./Styles.css";

function Input({ label, state, setState, placeholder,type }) {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        value={state}
        type={type}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
      />
    </div>
  );
}

export default Input;

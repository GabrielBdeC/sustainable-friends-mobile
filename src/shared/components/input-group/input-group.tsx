import React, { FC } from "react";
import "./input-group.css";

const InputGroup: FC = ({ children }) => {
  return <div className="input-group">{children}</div>
}

export default InputGroup;
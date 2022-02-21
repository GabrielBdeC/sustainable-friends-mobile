import { ChangeEventHandler, FC } from "react";
import "./input.css";

interface IProps {
  type: string,
  placeholder: string,
  id: string,
  onChange?: ChangeEventHandler
}

const Input: FC<IProps> = (props: IProps): JSX.Element => {
  return <input type={props.type} placeholder={props.placeholder} id={props.id} className="input"></input>
}

export default Input;
import { FC, MouseEventHandler, ReactNode } from "react";
import "./button.css";

const style: string = "btn--primary--solid";

interface IPropsButton {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonSize?: "btn--little" | "btn--medium" | "btn--wide" | "btn--large" | "btn--square" | "btn--square2" | "btn--circle" | undefined;
  children: ReactNode
}

const Button: FC<IPropsButton> = (props: IPropsButton): JSX.Element => {
  return (
    <button
      className={`btn ${style} ${props.buttonSize ? props.buttonSize : "btn--little"}`}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      { props.children }
    </button>
  );
};

export default Button;
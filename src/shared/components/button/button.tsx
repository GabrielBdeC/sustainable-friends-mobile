import React, { FC } from "react";

interface IProps {
  type: "button" | "submit" | "reset" | undefined;
}

const Button: FC<IProps> = (props: IProps, { children }): JSX.Element => {
  return <button className="button" type={props.type}>{children}</button>;
};

export default Button;

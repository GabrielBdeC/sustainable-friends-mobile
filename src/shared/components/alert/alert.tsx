import { FC, ReactNode } from "react";
import "./alert.css";



interface IPropsAlert {
  alertSize?: "alert--size" | undefined;
  alertStyle?:  "alert--error-solid" | "alert--primary--solid" | undefined;
  children: ReactNode
}

const Alert: FC<IPropsAlert> = (props: IPropsAlert): JSX.Element => {
  return (
    <div
      className={`alert 
      ${props.alertStyle ? props.alertStyle : "alert--primary--solid"} 
      ${props.alertSize ? props.alertSize : "alert--size"}`}
    >
      { props.children }
    </div>
  );
};

export default Alert;
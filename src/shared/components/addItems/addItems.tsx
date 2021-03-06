import { FC, ReactNode } from "react";
import "./addItems.css";

interface IPropsAdd {
    addSize: "add--itens--size" | undefined;
    addStyle: "alert--primary--solid" | undefined;
    children: ReactNode
}

export const AddItems: FC<IPropsAdd> = (props: IPropsAdd): JSX.Element => {
    return (
        <div className={`alert 
            ${props.addStyle} 
            ${props.addSize}`}
        >
            {props.children}
        </div>
    );
};
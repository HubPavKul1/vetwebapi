import { MouseEventHandler } from "react";



export interface IButtonProps {
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    title: string;
}
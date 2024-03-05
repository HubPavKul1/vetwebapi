import { MouseEventHandler } from "react";



interface IButtonProps {
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    name: string;
}



export function Button ({className, disabled, onClick, name}: IButtonProps) {
    return (
        <button 
        className={className}
        disabled={disabled}
        onClick={onClick}
        >{name}
        </button>
    )
}
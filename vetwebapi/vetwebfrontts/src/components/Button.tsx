import { IButtonProps } from "../interfaces/ButtonInterface"



export function Button ({className, disabled, onClick, title}: IButtonProps) {
    return (
        <button 
        className={className}
        disabled={disabled}
        onClick={onClick}
        >{title}
        </button>
    )
}
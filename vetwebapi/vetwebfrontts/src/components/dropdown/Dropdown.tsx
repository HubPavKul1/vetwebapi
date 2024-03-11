import "./Dropdown.css"


interface DropdownProps {
    title: string,
    active: boolean;
    setActive: CallableFunction;
    children?: React.ReactElement | React.ReactNode;
}

export function Dropdown({active, setActive, children, title}: DropdownProps) {
    return (
        <li className="my-dropdown">
             <a onClick={() => setActive(!active)}>{title}</a>
            <ul className={active ? "content-active": "content"}>
                {children}
            </ul>
        </li>
    )
}
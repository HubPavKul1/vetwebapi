import "./Dropdown.css"


interface DropdownProps {
    title: string,
    active: boolean;
    setActive: CallableFunction;
    children?: React.ReactElement | React.ReactNode;
}

export function Dropdown({active, setActive, children, title}: DropdownProps) {
    return (
        <li className="dropdown">
             <a className="link" onClick={() => setActive(!active)}>{title}</a>
            <div className={active ? "content-active": "content"}>
                {children}
            </div>
        </li>
    )
}
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
            <a href="" className="link" onClick={() => setActive(true)}>{title}</a>
            <ul className={ active ? "dropdown-menu.active" : "dropdown-menu" }>
                <li>Content</li>
                {children}
            </ul>
        </li>
    )
}
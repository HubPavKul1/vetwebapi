// import "./Dropdown.css"
import { NavDropdown } from "react-bootstrap";


interface DropdownProps {
    title: string,
    id?: string,
    // active: boolean;
    // setActive: CallableFunction;
    children?: React.ReactElement | React.ReactNode;
}

export function DropdownWrapper({children, title}: DropdownProps) {
    return (
        <NavDropdown title={title} id="basic-nav-dropdown">
              {children}
        </NavDropdown>
    )
}
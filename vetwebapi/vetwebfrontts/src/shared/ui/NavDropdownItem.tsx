import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

interface NavDropdownItemProps {
  url: string;
  title: string;
}

export function NavDropdownItem({ url, title }: NavDropdownItemProps) {
  return (
    <NavDropdown.Item as={Link} to={url} className="navLink">
      {title}
    </NavDropdown.Item>
  );
}

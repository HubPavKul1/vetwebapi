import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavLinkProps {
  url: string;
  title: string;
}

export function NavLink({ url, title }: NavLinkProps) {
  return (
    <Nav.Link className="navLink" as={Link} id="RouterNavLink" to={url}>
      {title}
    </Nav.Link>
  );
}

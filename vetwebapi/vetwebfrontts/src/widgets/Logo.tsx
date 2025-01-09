import vetLogo from "/Logo.svg";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LogoLink() {
  return (
    <div className="mr-auto">
      <Navbar.Brand>
        <Link to="/">
          <img
            src={vetLogo}
            height="200"
            width="200"
            className="rounded-full overflow-hidden hover:scale-105 transition-transform"
            alt="Logo"
          />
        </Link>
      </Navbar.Brand>
    </div>
  );
}

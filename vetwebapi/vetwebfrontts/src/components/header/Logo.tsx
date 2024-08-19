import vetLogo from "/vetLogo.jpg";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LogoLink() {
  return (
    <div className="mr-auto">
      <Navbar.Brand>
        <Link to="/">
          <img
            src={vetLogo}
            height="50"
            width="70"
            className="rounded-full overflow-hidden hover:scale-105 transition-transform"
            alt="Logo"
          />
        </Link>
      </Navbar.Brand>
    </div>
  );
}

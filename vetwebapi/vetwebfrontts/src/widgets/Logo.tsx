import vetLogo from "/logoPng.png";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LogoLink() {
  return (
    <div className="mr-auto">
      <Navbar.Brand>
        <Link to="/">
          <img
            src={vetLogo}
            height="100"
            width="100"
            className="overflow-hidden hover:scale-105 transition-transform"
            alt="Logo"
          />
        </Link>
      </Navbar.Brand>
    </div>
  );
}

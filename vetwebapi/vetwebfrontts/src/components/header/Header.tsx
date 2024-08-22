import { Container } from "react-bootstrap";
import { LogoLink } from "./Logo";

import { NavList } from "./NavList";
import { CustomButton } from "../CustomButton";

export function Header() {
  return (
    <>
      <header className="px-0 py-6 border-b bg-slate-100 bg-opacity-50">
        <Container className="flex items-center ">
          <LogoLink />
          <NavList />
          <CustomButton
            className="text-sm btn-nav btn-transform"
            title="Войти"
          />
        </Container>
      </header>
    </>
  );
}

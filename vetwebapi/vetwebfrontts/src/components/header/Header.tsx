import { Container } from "react-bootstrap";
import { LogoLink } from "./logo/Logo";

import { NavList } from "./navList/NavList";
import { CustomButton } from "../CustomButton";

export function Header() {
  return (
    <>
      <header className="px-0 py-9 border-b-2 border-black bg-white">
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

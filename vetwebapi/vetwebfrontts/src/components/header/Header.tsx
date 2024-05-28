import { Container } from "react-bootstrap";
import { LogoLink } from "./logo/Logo";

import styles from "./Header.module.scss";

import { NavList } from "./navList/NavList";
import { CustomButton } from "../CustomButton";

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <Container className={styles.wrap}>
          <LogoLink />
          <NavList />

          <CustomButton className="btn-nav" title="Войти" />
        </Container>
      </header>
    </>
  );
}

import { FooterWrapper } from "shared/index";
import { NavList } from "widgets/NavList";
import { LogoLink } from "./Logo";

export function Footer() {
  return (
    <FooterWrapper>
      <LogoLink />
      <NavList />
    </FooterWrapper>
  );
}

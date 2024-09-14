import { LogoLink } from "./Logo";
import { NavList } from "./NavList";
import { CustomButton, HeaderWrapper } from "shared/index";

export function Header() {
  return (
    <>
      <HeaderWrapper>
        <LogoLink />
        <NavList />
        <CustomButton className="text-sm btn-nav btn-transform" title="Войти" />
      </HeaderWrapper>
    </>
  );
}

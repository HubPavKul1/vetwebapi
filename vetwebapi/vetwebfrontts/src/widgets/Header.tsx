import { useLogout } from "shared/hooks/useLogout";
import { LogoLink } from "./Logo";
import { NavList } from "./NavList";
import { CustomButton, HeaderWrapper } from "shared/index";

export function Header() {
  const { mutate } = useLogout();
  const onClick = () => {
    mutate();
  };
  return (
    <>
      <HeaderWrapper>
        <LogoLink />
        <NavList />
        <CustomButton
          className="text-sm btn-nav btn-transform"
          title="Выйти"
          onClick={onClick}
        />
      </HeaderWrapper>
    </>
  );
}

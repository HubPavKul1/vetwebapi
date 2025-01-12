import { useLogout } from "shared/hooks/useLogout";
import { LogoLink } from "./Logo";
import { NavList } from "./NavList";
import { HeaderWrapper } from "shared/index";
import { GiExitDoor } from "react-icons/gi";

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
        <GiExitDoor
          size={40}
          className="cursor-pointer text-indigo-400 hover:text-indigo-600 transition-colors ease-in-out"
          onClick={onClick}
        />
      </HeaderWrapper>
    </>
  );
}

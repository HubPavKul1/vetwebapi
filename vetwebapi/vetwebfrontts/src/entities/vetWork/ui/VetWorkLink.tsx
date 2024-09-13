import { DropdownWrapper } from "shared/ui/DropdownWrapper";
import { vetWorkNavDropdownItems } from "./vetWorkNavDropdownItems";
import { NavDropdownItem } from "shared/index";

export function VetWorkLink() {
  return (
    <li className="navLink">
      <DropdownWrapper title="Работа" id="basic-nav-dropdown">
        {vetWorkNavDropdownItems.map((item) => (
          <NavDropdownItem key={item.id} url={item.url} title={item.title} />
        ))}
      </DropdownWrapper>
    </li>
  );
}

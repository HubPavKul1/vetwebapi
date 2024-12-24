import { DropdownWrapper } from "shared/ui/DropdownWrapper";
import { companiesLink, DropdownItem, NavDropdownItem } from "shared/index";
import { companiesDropDownItems } from "./companiesDropDownItems";
import { NavDropdown } from "react-bootstrap";

export function CompaniesLink() {
  return (
    <li className="navLink">
      <DropdownWrapper title="Предприятия" id="basic-nav-dropdown">
        <NavDropdownItem title="Все" url={companiesLink} />
        {companiesDropDownItems.map((item) => (
          <DropdownItem key={item.id} title={item.title} />
        ))}
      </DropdownWrapper>
    </li>
  );
}

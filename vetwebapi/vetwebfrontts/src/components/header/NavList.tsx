import { HomeLink } from "./navLink/HomeLink";
import { CompaniesLink } from "./navLink/CompaniesLink";
import { DrugsLink } from "./navLink/DrugsLink";
import { VetWorkLink } from "./navLink/VetWorkLink";
import { AdminLink } from "./navLink/AdminLink";
import { VetsLink } from "./navLink/VetsLink";
import { LabsLink } from "./navLink/LabsLink";

export function NavList() {
  return (
    <>
      <nav className="mr-12">
        <ul className="flex m-0 p-0 list-none">
          <HomeLink />
          <CompaniesLink />
          <VetsLink />
          <LabsLink />
          <DrugsLink />
          <VetWorkLink />
          <AdminLink />
        </ul>
      </nav>
    </>
  );
}

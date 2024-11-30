import { CompaniesLink } from "entities/company";
import { DrugsLink } from "entities/drug";
import { HomeLink } from "entities/home";
import { LabsLink } from "entities/lab";
import { VetsLink } from "entities/vetclinic";
import { VetWorkLink } from "entities/vetWork";

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
        </ul>
      </nav>
    </>
  );
}

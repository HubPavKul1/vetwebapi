import { CompaniesLink } from "entities/company";
import { DrugsLink } from "entities/drug/intex";
import { HomeLink } from "entities/home";
import { LabsLink } from "entities/lab";
import { AdminLink } from "entities/user";
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
          <AdminLink />
        </ul>
      </nav>
    </>
  );
}

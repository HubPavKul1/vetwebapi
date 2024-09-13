import { AdminLink, CompaniesLink, DrugsLink, HomeLink, LabsLink, VetsLink } from "entities/index";
import { VetWorkLink } from "entities/vetWork/ui/VetWorkLink";


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

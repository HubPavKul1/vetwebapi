import {
  AdminLink,
  CompaniesLink,
  DrugsLink,
  HomeLink,
  LabsLink,
  VetsLink,
  VetWorkLink,
} from "entities/index";

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

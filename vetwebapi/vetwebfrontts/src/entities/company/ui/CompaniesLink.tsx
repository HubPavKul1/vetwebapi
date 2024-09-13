import { NavLink } from "shared/index";
import { companiesLink } from "shared/urls/companyUrls";

export function CompaniesLink() {
  return <NavLink url={companiesLink} title="Предприятия" />;
}

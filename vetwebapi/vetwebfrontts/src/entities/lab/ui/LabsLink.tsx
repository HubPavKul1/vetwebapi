import { labsLink } from "shared/urls/companyUrls";
import { NavLink } from "shared/index";

export function LabsLink() {
  return <NavLink url={labsLink} title="Лаборатории" />;
}

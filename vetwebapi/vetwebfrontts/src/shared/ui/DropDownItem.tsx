import useCompaniesFilter from "features/company/stores/useCompaniesFilter";
import { NavDropdown } from "react-bootstrap";

interface DropdownItemProps {
  title: string;
}

export function DropdownItem({ title }: DropdownItemProps) {
  const setAnimalGroup = useCompaniesFilter((state) => state.setAnimalGroup);

  return (
    <NavDropdown.Item onClick={() => setAnimalGroup(title)}>{title}</NavDropdown.Item>
  );
}

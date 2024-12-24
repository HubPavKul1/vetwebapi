import useCompaniesFilter from "features/company/stores/useCompaniesFilter";
import { NavDropdown } from "react-bootstrap";

interface DropdownItemProps {
  title: string;
}

export function DropdownItem({ title }: DropdownItemProps) {
  //   const setAnimalGroup = useCompaniesFilter((state) =>
  //     state.setAnimalGroup(title)
  //   );

  return (
    <NavDropdown.Item onClick={() => console.log(title)}>
      {title}
    </NavDropdown.Item>
  );
}

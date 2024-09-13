import { NavDropdown } from "react-bootstrap";

import { catalogDrugsExpiredUrl } from "shared/urls/drugUrls";
import { AppService } from "services/app.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DropdownWrapper, NavDropdownItem } from "shared/index";
import { drugNavDropdownItems } from "./drugNavDropdownItems";

export function DrugsLink() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["deleteExpired"],
    mutationFn: () => AppService.getAll(catalogDrugsExpiredUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drugCatalog"] }),
        alert("Препараты успешно удалены!");
    },
  });

  const delExpired = () => {
    mutate();
  };
  return (
    <>
      {" "}
      <li className="navLink">
        <DropdownWrapper title="Биопрепараты" id="basic-nav-dropdown">
          {drugNavDropdownItems.map((item) => (
            <NavDropdownItem key={item.id} url={item.url} title={item.title} />
          ))}
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={delExpired}
            className="text-red-700 font-bold hover:text-red-500 transition-colors"
          >
            <span>Удалить просроченные препараты</span>
          </NavDropdown.Item>
        </DropdownWrapper>
      </li>
    </>
  );
}

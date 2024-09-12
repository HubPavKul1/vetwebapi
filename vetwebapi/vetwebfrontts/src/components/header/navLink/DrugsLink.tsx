import { Link } from "react-router-dom";
import { DropdownWrapper } from "shared/ui/DropdownWrapper";

import { NavDropdown } from "react-bootstrap";
import styles from "./NavLink.module.scss";
import {
  catalogDrugsExpiredUrl,
  drugCatalogLink,
  drugReceiptsLink,
  drugReportsLink,
  drugsLink,
} from "urls/drugUrls";
import { AppService } from "services/app.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      <li className={styles.navLink}>
        <DropdownWrapper title="Биопрепараты" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} id="RouterNavLink" to={drugReceiptsLink}>
            Поступление
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} id="RouterNavLink" to={drugsLink}>
            Справочник препаратов
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} id="RouterNavLink" to={drugCatalogLink}>
            Каталог препаратов
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} id="RouterNavLink" to={drugReportsLink}>
            Отчеты
          </NavDropdown.Item>
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

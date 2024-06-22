import { Link } from "react-router-dom"
import { DropdownWrapper } from "../../dropdown/Dropdown"

import { NavDropdown } from "react-bootstrap"
import styles from "./NavLink.module.scss"



export function DrugsLink() {


    return (
<>      <li className={styles.navLink}>
            <DropdownWrapper title="Биопрепараты" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} id="RouterNavLink" to="/drugs/receipts">Поступление</NavDropdown.Item>
                <NavDropdown.Item as={Link} id="RouterNavLink" to="/drugs">
                    Справочник препаратов
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} id="RouterNavLink" to="/drugs/catalog">
                    Каталог препаратов
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} id="RouterNavLink" to="/drugs/reports">Отчеты</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
            </DropdownWrapper>

        </li>
        
</>
        
  
    )
}
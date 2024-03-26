import { Link } from "react-router-dom"
import { DropdownWrapper } from "../../dropdown/Dropdown"

import { NavDropdown } from "react-bootstrap"
import styles from "./NavLink.module.css"


export function VetWorkLink() {

    return (
            <li className={styles.navLink}>
                <DropdownWrapper title="Работа" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/">Вакцинация</NavDropdown.Item>
                    <NavDropdown.Item>Диагностика</NavDropdown.Item>
                    <NavDropdown.Item>Обработка</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Отчеты</NavDropdown.Item>
                </DropdownWrapper>
            </li>
        
  
    )
}
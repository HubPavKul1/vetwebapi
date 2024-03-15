import { Link } from "react-router-dom"
import { DropdownWrapper } from "../dropdown/Dropdown"

import { NavDropdown } from "react-bootstrap"


export function VetWorkLink() {

    return (

        <DropdownWrapper title="Работа" id="basic-nav-dropdown">
              <NavDropdown.Item><Link to="/">Вакцинация</Link></NavDropdown.Item>
              <NavDropdown.Item>Диагностика</NavDropdown.Item>
              <NavDropdown.Item>Обработка</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Отчеты</NavDropdown.Item>
            </DropdownWrapper>
  
    )
}
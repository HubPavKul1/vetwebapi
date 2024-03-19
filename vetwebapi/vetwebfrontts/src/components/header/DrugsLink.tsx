import { Link } from "react-router-dom"
import { DropdownWrapper } from "../dropdown/Dropdown"

import { NavDropdown } from "react-bootstrap"



export function DrugsLink() {


    return (
<>
        <DropdownWrapper title="Биопрепараты" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} id="RouterNavLink" to="/drugs">Поступление</NavDropdown.Item>
          <NavDropdown.Item>
              Препараты на складе
          </NavDropdown.Item>
          <NavDropdown.Item >Отчеты</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">
              Separated link
          </NavDropdown.Item>
        </DropdownWrapper>
</>
        
  
    )
}
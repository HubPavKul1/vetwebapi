import { Link } from "react-router-dom"
import { DropdownWrapper } from "../dropdown/Dropdown"
import { useState } from "react"
import { NavDropdown } from "react-bootstrap"


export function DrugsLink() {
    // const[active, setActive] = useState(false)

    return (

        <DropdownWrapper title="Биопрепараты" id="basic-nav-dropdown">
              <NavDropdown.Item><Link to="/drugs">Поступление</Link></NavDropdown.Item>
              <NavDropdown.Item>
              Препараты на складе
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Отчеты</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </DropdownWrapper>
  
    )
}
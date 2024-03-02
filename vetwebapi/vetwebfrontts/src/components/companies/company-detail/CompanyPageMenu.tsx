import { AddAddress } from "../address/AddAddress"
import { AddEmployee } from "../employee/AddEmployee"
import { AddAnimal } from "../animal/AddAnimal"

export function CompanyPageMenu() {
    return(
        <aside className="sidebar">
          <div className="side">
            <h2>Меню</h2>
            <ul className="list">
              <AddAddress />
              <AddEmployee />
              <AddAnimal />
            </ul>
          </div>
        </aside>
    )
}
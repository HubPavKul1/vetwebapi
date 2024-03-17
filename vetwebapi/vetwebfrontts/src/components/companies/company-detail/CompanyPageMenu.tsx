import { AddAddress } from "../address/AddAddress"
import { AddEmployee } from "../employee/AddEmployee"
import { AddAnimal } from "../animal/AddAnimal"

export interface CompanyPageProps {
  compId?: number;
}

export function CompanyPageMenu({compId}: CompanyPageProps) {
    return(
        <aside className="sidebar">
          <div className="side">
            <h2>Меню</h2>
            <ul className="list">
              <AddAddress compId={compId}/>
              <AddEmployee compId={compId}/>
              <AddAnimal compId={compId}/>
            </ul>
          </div>
        </aside>
    )
}
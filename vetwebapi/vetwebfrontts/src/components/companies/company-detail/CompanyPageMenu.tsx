import { AddAddress } from "../address/AddAddress"
import { AddEmployee } from "../employee/AddEmployee"
import { AddAnimal } from "../animal/AddAnimal"

export interface CompanyPageProps {
  compId?: number;
}

export function CompanyPageMenu({compId}: CompanyPageProps) {
    return(
          <div className="company-page-menu flex">
            <h2 className="company-page-menu-title">Меню</h2>
            <ul className="company-page-menu-items flex">
              <AddAddress compId={compId}/>
              <AddEmployee compId={compId}/>
              <AddAnimal compId={compId}/>
            </ul>
          </div>
    )
}
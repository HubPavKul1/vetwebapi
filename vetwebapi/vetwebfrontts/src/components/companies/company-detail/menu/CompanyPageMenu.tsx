import { AddAddress } from "../../address/AddAddress";
import { AddEmployee } from "../../employee/AddEmployee";
import { AddAnimal } from "../../animal/AddAnimal";

import styles from "./CompanyPageMenu.module.scss";

export interface CompanyPageProps {
  compId?: number;
}

export function CompanyPageMenu({compId}: CompanyPageProps) {
    return(
      <div className={styles.companyMenuWrap}>
        <div className={styles.companyPageMenu}>
            <h2>Меню</h2>
            <ul>
              <AddAddress compId={compId}/>
              <AddEmployee compId={compId}/>
              <AddAnimal compId={compId}/>
            </ul>
          </div>
      </div>
          
    )
}
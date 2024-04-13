import { AddAddress } from "../../address/AddAddress";
import { AddEmployee } from "../../employee/AddEmployee";
import { AddAnimal } from "../../animal/AddAnimal";

import styles from "./CompanyPageMenu.module.scss";
import { useParams } from "react-router-dom";

export interface CompanyPageProps {
  compId?: number;
}

export function CompanyPageMenu() {

  const id = useParams();

  if (!id) return;

  const compId = Number(id)

  

  return(
      <div className={styles.companyMenuWrap}>
        <div className={styles.companyPageMenu}>
            <h2>Меню</h2>
            <ul>
              <AddAddress compId={compId}/>
              <AddEmployee />
              <AddAnimal compId={compId}/>
            </ul>
          </div>
      </div>
          
    )
}
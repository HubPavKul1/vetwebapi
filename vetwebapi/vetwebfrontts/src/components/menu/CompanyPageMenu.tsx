import { AddAddress } from "../companies/address/AddAddress";
import { AddEmployee } from "../companies/employee/AddEmployee";
import { AddAnimal } from "../companies/animal/AddAnimal";

import styles from "./CompanyPageMenu.module.scss";



export function CompanyPageMenu() {


  return(
      <div className={styles.companyMenuWrap}>
        <div className={styles.companyPageMenu}>
            <h2>Меню</h2>
            <ul>
              <AddAddress />
              <AddEmployee />
              <AddAnimal />
            </ul>
          </div>
      </div>
          
    )
}
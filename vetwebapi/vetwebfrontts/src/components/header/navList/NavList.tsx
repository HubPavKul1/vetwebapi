import { HomeLink } from "../navLink/HomeLink";
import { CompaniesLink } from "../navLink/CompaniesLink";
import { DrugsLink } from "../navLink/DrugsLink";
import { VetWorkLink } from "../navLink/VetWorkLink";
import { AdminLink } from "../navLink/AdminLink";
import styles from "./NavList.module.scss"
import { VetsLink } from "../navLink/VetsLink";
import { LabsLink } from "../navLink/LabsLink";



export function NavList() {

    return (
        <>
                <nav className={styles.nav}>
                    <ul className={styles.navList}> 
                        <HomeLink />
                        <CompaniesLink />
                        <VetsLink />
                        <LabsLink />
                        <DrugsLink />  
                        <VetWorkLink />
                        <AdminLink/>
                    </ul>
                </nav> 
         
        </>

    )
}
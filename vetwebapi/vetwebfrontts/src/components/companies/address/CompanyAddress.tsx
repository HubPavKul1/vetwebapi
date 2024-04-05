import { Container } from "react-bootstrap";
import { IAddress } from "../../../interfaces/AddressInterfaces";

import styles from "./Address.module.scss"

interface CompanyAddressProps {
    address: IAddress;
}


export function CompanyAddress({address}: CompanyAddressProps) {
    return (
        
            <Container className={styles.addressWrap}>
                <span className={styles.addressItem}>г. {address.city}</span>
                <span className={styles.addressItem}>{address.street}</span>
                <span className={styles.addressItem}>{address.house_number}</span>
                <span className={styles.addressItem}>тел 1: {address.phone_number1}</span>
                {
                    address.phone_number2 ? 
                    <span className={styles.addressItem}>тел 2: {address.phone_number2}</span>: ""
                }
                
            </Container>

    )
}
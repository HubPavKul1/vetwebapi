import { Container } from "react-bootstrap";

import styles from "./Catalog.module.css"


interface CatalogProps {
    children: React.ReactElement | React.ReactNode;
}

export function Catalog({children}: CatalogProps) {
    return (
      
        <Container className={styles.catalogWrap} >
            {children}       
        </Container>
    
    )
}

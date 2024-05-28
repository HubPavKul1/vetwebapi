import { Container } from "react-bootstrap";

import styles from "./Catalog.module.scss"


interface CatalogProps {
    title: string;
    children: React.ReactElement | React.ReactNode;
}

export function Catalog({title, children}: CatalogProps) {
    return (
      
        <Container className={styles.catalogWrap} >
            <h1>{title}</h1>
            {children}       
        </Container>
    
    )
}

import { Container, Row } from "react-bootstrap";
import { CardEmpty } from "../CardEmpty";
import { CatalogItem } from "../catalogItem/CatalogItem";

import styles from "./Catalog.module.css"


interface CatalogProps {
    children: React.ReactElement | React.ReactNode;
    items?: any[];
}

export function Catalog({children, items}: CatalogProps) {
    return (
      
        <Container className={styles.catalogWrap} >
            {children}

            <Row className="company-items list-reset">
                {items?.map(item=>(<CatalogItem key={item.id} item={item}/>))}        

            </Row>
                
        </Container>
    
    )
}

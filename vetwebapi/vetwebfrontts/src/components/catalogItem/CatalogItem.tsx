import { ICardProps } from "../../interfaces/CardProps";

import styles from "./CatalogItem.module.css"
import { Col, Container } from "react-bootstrap";



export function CatalogItem({...props}: ICardProps) {
    return (
       
            <Col >
                <Container className={styles.catalogItem}>
                    {props.imgSrc ? 
                        <img 
                            className={styles.cardImage} 
                            src={props.imgSrc}
                            alt={props.cardTitle}
                    />: <img
                            className={styles.cardImage} 
                            src="/farm.jpg"
                            alt={props.cardTitle}
                    />
                    }
                    <div className={styles.card}>
                        <h5 className={styles.cardTitle}>{props.cardTitle}</h5>
                        {
                            props.cardText ? 
                            <p className={styles.cardText}>{props.cardText}</p>: ""
                        }
                        
                    </div>
                </Container>
                
            </Col>
        
    )
}

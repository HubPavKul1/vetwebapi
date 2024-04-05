import { ICardProps } from "../../interfaces/CardProps";
import { Link } from "react-router-dom"

import styles from "./CatalogItem.module.scss"
import { Col, Container } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";



export function CatalogItem({...props}: ICardProps) {
    let url = "";
    props.url ? url = props.url : url = "/";
    return (
       
            <Col >
            <Link to={url}>
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
            </Link>
                    <div className={styles.deleteItem}>
                        <BsFillTrash3Fill className="delete-icon" onClick={props.onClick}/>
                    </div>
                
            </Col>
        
    )
}

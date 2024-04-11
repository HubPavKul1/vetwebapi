import { ICardProps } from "../../interfaces/CardProps";
import { Link } from "react-router-dom";

import styles from "./CatalogItem.module.scss";
import { Col, Container } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FileUpload } from "../fileUpload/FileUpload";



export function CatalogItem({...props}: ICardProps) {

    let url = "";
    props.url ? url = props.url : url = "/";
    return (
       
            <Col >
            
                <Container className={styles.catalogItem}>
                
                    {props.imgSrc ? 
                    <Link to={url}>
                        <img 
                            className={styles.cardImage} 
                            src={props.imgSrc}
                            alt={props.cardTitle}/> 
                    </Link>: 
                    <><div className={styles.cardImageEmpty}>
                        <FileUpload />
                    </div>
                        
                    </>
                        
                    }
                
                    <div className={styles.card}>
                    <Link to={url}>
                        <h5 className={styles.cardTitle}>{props.cardTitle}</h5>
                    </Link>
                        {
                            props.cardText ? 
                            <p className={styles.cardText}>{props.cardText}</p>: ""
                        }
                        
                    </div>
                    <div className={styles.deleteItem}>
                        <BsFillTrash3Fill className="delete-icon" onClick={props.onClick}/>
                    </div>
                   
                </Container>
           
                    
                
            </Col>
        
    )
}

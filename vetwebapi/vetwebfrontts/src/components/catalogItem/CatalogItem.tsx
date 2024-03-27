import { ICardProps } from "../../interfaces/CardProps";

import styles from "./CatalogItem.module.css"
import { Col } from "react-bootstrap";

interface CatalogItemProps extends ICardProps {
    item: any;
    children: React.ReactElement | React.ReactNode;
}

export function CatalogItem({item, children, ...props}: CatalogItemProps) {
    return (
       
            <Col md={4} className={styles.catalogItem}>
                <img 
                    className={styles.cardImage} 
                    src={props.imgSrc}
                    alt={props.imgAlt}
                />
                <div className={styles.card}>
                    <h5 className={styles.cardTitle}>{props.cardTitle}</h5>
                    {
                        props.cardText ? 
                        <p className={styles.cardText}>{props.cardText}</p>: ""
                    }
                    
                </div>
            </Col>
      
        
        // <Link to={props.url} >
        // <Card> 
        //     <Card.Img className="company-card-image"
        //                 variant="top"
        //                 src={farmImg}
        //                 alt="Farm"
        //             />
            
           
        //     <Card.Body>
        //         <Card.Title className="company-card-title">
        //             {company.full_name}
        //         </Card.Title>
        //         <Card.Text className="company-card-text">
        //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati porro doloribus, nihil unde maxime, fugit distinctio fugiat inventore quos pariatur quibusdam suscipit facilis
        //         </Card.Text>
        //     </Card.Body> 
        //     <Card.Footer>

        //     </Card.Footer>   
        // </Card>
        // </Link>
        
    )
}

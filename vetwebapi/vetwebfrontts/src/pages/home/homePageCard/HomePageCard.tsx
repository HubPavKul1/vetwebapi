import { Card, Col } from "react-bootstrap";
import { ICardProps } from "../../../interfaces/CardProps";

import styles from "./HomePageCard.module.scss"


interface HomePageCardProps {
    item: ICardProps
}

export function HomePageCard({item}: HomePageCardProps) {
  return (
            <Col>
                <a href={item.url}>
                    <Card className={styles.card}>
                        <Card.Img variant="top"
                            src={item.imgSrc}
                            alt={item.imgAlt}
                            className={styles.cardImage}
                        />
                                            
                        <Card.Body>
                            <Card.Title>
                                <h5 className={styles.cardTitle}>{item.cardTitle}</h5>
                            </Card.Title>
                            <Card.Text className={styles.cardText}>
                                {item.cardText}
                            </Card.Text>
                        </Card.Body>
                            {
                                item.hasContacts && 
                                <Card.Footer>
                                    <span className={styles.cardFooterItem}>{item.address}</span><br />
                                    <span className={styles.cardFooterItem}>{item.phone}</span> <br />
                                    <span className={styles.cardFooterItem}>{item.phone2}</span>
                                </Card.Footer>
                            }
                                    
                    </Card>
                </a>
            </Col>
  )
}

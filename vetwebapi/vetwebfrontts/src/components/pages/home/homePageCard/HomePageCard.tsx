import { Card } from "react-bootstrap";
import { ICardProps } from "../../../../interfaces/CardProps";

import styles from "./HomePageCard.module.css"


interface HomePageCardProps {
    item: ICardProps
}

export function HomePageCard({item}: HomePageCardProps) {
  return (
            <li className={styles.cardItem}>
                <a href={item.url}>
                    <Card className={styles.card} border="secondary">
                        <Card.Img variant="top"
                            src={item.imgSrc}
                            alt={item.imgAlt}
                            className={styles.cardImage}
                        />
                                            
                        <Card.Body>
                            <Card.Title className={styles.cardTitle}>
                                <h5>{item.cardTitle}</h5>
                            </Card.Title>
                            <Card.Text className={styles.cardText}>
                                {item.cardText}
                            </Card.Text>
                        </Card.Body>
                            {
                                item.hasContacts ? 
                                <Card.Footer>
                                    <span className={styles.cardFooterItem}>{item.address}</span><br />
                                    <span className={styles.cardFooterItem}>{item.phone}</span> <br />
                                    <span className={styles.cardFooterItem}>{item.phone2}</span>
                                </Card.Footer>: ""
                            }
                                    
                    </Card>
                </a>
            </li>
  )
}

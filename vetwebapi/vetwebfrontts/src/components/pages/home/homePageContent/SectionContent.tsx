import { Container, Row, Col } from "react-bootstrap";
import { contentData } from "../../../data/HomeContent";
import { HomePageCard } from "../homePageCard/HomePageCard";

import styles from "./SectionContent.module.scss"


export function SectionContent() {

    return (  

        <Container>
            <h2 className={styles.sectionTitle}>Полезная информация</h2>
            <ul className={styles.cardsList}>
                {contentData.map(item => (
                    <HomePageCard key={item.id} item={item}/>                  
                ))}
           </ul>
        </Container>     
    )
}

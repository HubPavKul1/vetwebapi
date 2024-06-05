import { Container, Row } from "react-bootstrap";
import { contentData } from "../../../components/data/HomeContent";
import { HomePageCard } from "../homePageCard/HomePageCard";

import styles from "./SectionContent.module.scss"


export function SectionContent() {

    return (  

        <Container>
            <h2 className="text-center text-3xl mb-10">Полезная информация</h2>
            <Row xs={2} md={4} lg={4}>
                {contentData.map(item => (
                    <HomePageCard key={item.id} item={item}/>                  
                ))}
            </Row>   
        </Container>     
    )
}

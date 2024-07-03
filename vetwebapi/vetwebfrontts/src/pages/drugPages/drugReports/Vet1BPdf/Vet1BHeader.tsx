import { Container, Row, Col } from "react-bootstrap";


import { AppService } from "../../../../app.service";



interface VetB1PDFHeaderProps {
    dateEnd: string
}



export function VetB1PDFHeader({dateEnd}: VetB1PDFHeaderProps) {
   
    const endDate = AppService.convertDateString(dateEnd)
    

    return (
        <Container >
            <Row >
                <Col sm={1}></Col>
                <Col><h5>Информация о расходовании продукции на противоэпизоотические мероприятия, оплачиваемые за счет федерального бюджета по г. Иваново</h5></Col>
                <Col sm={1}></Col>
            </Row>
            <Row>
                <Col sm={5}></Col>
                <Col sm={2}>за {endDate.quarter} квартал {endDate.year} г.</Col>
                <Col sm={5}></Col>
            </Row>
           
        </Container>
    )
}
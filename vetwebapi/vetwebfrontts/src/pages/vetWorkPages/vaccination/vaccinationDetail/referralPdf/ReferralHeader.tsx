import { Container, Row, Col } from "react-bootstrap";


import { AppService } from "../../../../../app.service";
import { IVetWorkSchema } from "../../../../../interfaces/VetWorkInterfaces";


interface ReferralPDFHeaderProps {
    data: IVetWorkSchema;
}



export function ReferralPDFHeader({data}: ReferralPDFHeaderProps) {
    const date = AppService.convertDateString(data.vetwork_date)
    

    return (
        <Container >
            <Row>
                <Col sm={4}></Col>
                <Col>
                        <p> Приложение № 6 к Порядку учета, хранения,
                            использования и списания лекарственных средств и
                            препаратов для ветеринарного применения,
                            поступающих за счет средств федерального и
                            областного бюджетов, бюджетными
                            государственными учреждениями ветеринарии
                            Ивановской области
                        </p>
                        
                </Col>
            </Row>
            <Row >
                <Col sm={4}></Col>
                <Col><h5>Акт № {data.id}</h5></Col>
                <Col sm={4}></Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col >о проведении вакцинации животных против</Col>
                <Col sm={4}>{data.diseases}</Col>
            </Row>
            <Row >
                <Col sm={2}></Col>
                <Col >от</Col>
                <Col sm={4}>{date.fullDate}</Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col >населенный пункт</Col>
                <Col sm={4} >{data.companies ? data.companies[0].address?.city : "г. Иваново"}</Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col >хозяйство</Col>
                <Col sm={4}>частный сектор и организации г. Иваново</Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col >район</Col>
                <Col sm={4} >{data.companies ? data.companies[0].address?.district : ""}</Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col >область</Col>
                <Col sm={4} >Ивановская обл.</Col>
            </Row>   
        </Container>
    )
}
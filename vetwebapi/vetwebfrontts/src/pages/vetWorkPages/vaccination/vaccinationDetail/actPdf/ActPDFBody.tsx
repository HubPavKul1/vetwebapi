import { Container, Row, Col } from "react-bootstrap";


import { AppService } from "../../../../../app.service";
import { IVetWorkSchema } from "../../../../../interfaces/VetWorkInterfaces";

import styles from "./ActPDF.module.scss"



interface ActPDFBodyProps {
    data: IVetWorkSchema;
}



export function ActPDFBody({data}: ActPDFBodyProps) {
    const productionDate = data.drug && AppService.convertDateString(data.drug?.production_date).shortDate
    const expirationDate = data.drug && AppService.convertDateString(data.drug?.expiration_date).shortDate

    const doctor1 = `${data.doctors[0].position} ${data.clinic} ${data.doctors[0].fullname}`
    const doctor2 = `${data.doctors[1].position} ${data.clinic} ${data.doctors[1].fullname}`
    const companyDoctor = data.companies && `${data.companies[0].employee?.position} ${data.companies[0].short_name} ${data.companies[0].employee?.fullname}`
    const animals = new Set(data.animals?.map(animal => animal.animal_group.toLowerCase() + ", "));
    const diseases = new Set(data.diseases?.map(disease => disease.toLowerCase() + ", "));
    let dosage = 0;
    data.animals?.map(animal => animal.dosage ? dosage += animal.dosage: 0);

    return (
        <Container className={styles.pdfBody}>
            <Row>
                <Col sm={3}>Мы, нижеподписавшиеся</Col>
                <Col>
                      {doctor1}, {doctor2}  
                        
                </Col>
            </Row>
            <Row>
                <Col sm={3}>в присутствии</Col>
                <Col>
                      {companyDoctor} 
                        
                </Col>
            </Row>
            <Row>
                <Col sm={3}></Col>
                <Col>
                      (указать должность, Ф.И.О. представителя хозяйства, фермы)
                        
                </Col>
            </Row>
            <Row>
                <Col sm={3}>провели вакцинацию</Col>
                <Col sm={3}>{animals}</Col>
                <Col>против</Col>
                <Col sm={3}>{diseases}</Col>
                <Col>{data.animals?.length}</Col>
                <Col>голов</Col>
            </Row>
            <Row>
                <Col sm={3}></Col>
                <Col sm={3}>(вид животных)</Col>
                <Col></Col>
                <Col sm={3}>(название заболевания)</Col>
                <Col>(количество)</Col>
                <Col></Col>
            </Row>
            <Row>
                <Col sm={3}>применяли препарат</Col>
                <Col>{data.drug?.name}</Col>
            </Row>
            <Row>
                <Col>серия №</Col>
                <Col>{data.drug?.batch}</Col>
                <Col>контроль №</Col>
                <Col>{data.drug?.control}</Col>
                <Col>изготовлен</Col>
                <Col>{productionDate}</Col>
                <Col>годен до</Col>
                <Col>{expirationDate}</Col>
            </Row>
            <Row>
                <Col>изготовитель</Col>
                <Col sm={4}>{data.drug?.drug_manufacturer}</Col>
                <Col>применялась путем</Col>
                <Col>{data.drug?.administration_method}</Col>
                <Col>введения в область</Col>    
            </Row>
            <Row>
                <Col>{data.drug?.place_of_administration}</Col>
                <Col>в дозе</Col>
                <Col sm={6}>{data.drug?.drug_dosage}</Col> 
            </Row>
            <Row>
                <Col>место инъекции дезинфицировали</Col>
                <Col sm={8}>70% этиловым спиртом</Col>
            </Row>
            <Row>
                <Col></Col>
                <Col sm={8}>(согласно инструкции по применению вакцины)</Col>
            </Row>
            <Row>
                <Col>Для проведения обработки израсходовано:</Col>
            </Row>
            <Row>
                <Col sm={3}>1. Препарата</Col>
                <Col sm={6}>{data.drug?.name}</Col>
                <Col>{dosage / 1000}</Col>
                <Col>тыс. доз</Col>
            </Row>
            <Row>
                <Col sm={3}>2. 70% этилового спирта</Col>
                <Col sm={3}></Col>
                <Col>мл</Col>
            </Row>
            <Row>
                <Col sm={3}>3. Вата гигроскопическая</Col>
                <Col sm={3}>{data.animals?.length}</Col>
                <Col>г</Col>
            </Row>
            <Row>
                <Col sm={3}>4. Шприцы одноразовые</Col>
                <Col sm={3}>{data.animals?.length}</Col>
                <Col>штук</Col>
            </Row>
            <Row>
                <Col sm={5}>Остаток разведенной вакцины в количестве</Col>
                <Col>{data.animals?.length}</Col>
                <Col>тыс.доз</Col>
                <Col></Col>
                <Col sm={3}>ампул/флаконов, шприцы</Col>
            </Row>
            <Row>
                <Col sm={3}>обезврежены методом</Col>
                <Col>{data.drug?.disposal_method}</Col>
            </Row>
            <Row>
                <Col sm={6}>Опись на обработанных прилагается.</Col> 
            </Row>
            <Row>
                <Col sm={3}>Подписи:</Col> 
            </Row>
            {data.doctors.map(doctor => 

                <Row>
                    <Col sm={3}></Col> 
                    <Col sm={2}></Col>
                    <Col sm={4}>{doctor.fullname}</Col> 
                </Row>
            )}
            <Row>
                <Col sm={3}></Col> 
                <Col sm={2}></Col>
                <Col sm={4}>{data.companies && data.companies[0].employee?.fullname}</Col> 
            </Row>
            
            
            
        </Container>
    )
}
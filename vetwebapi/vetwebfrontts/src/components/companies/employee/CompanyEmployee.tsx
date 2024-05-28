import { Col, Row } from "react-bootstrap";
import { IEmployee } from "../../../interfaces/EmployeeInterfaces";


interface CompanyEmployeeProps {
    employee: IEmployee;
}


export function CompanyEmployee({employee}: CompanyEmployeeProps) {
    return(
        
            <Row key={employee.id}>
                <Col>{employee.position}</Col>
                <Col>{employee.lastname}</Col>
                <Col>{employee.firstname}</Col>
                <Col>{employee.patronymic}</Col>
            </Row>
        )                

}
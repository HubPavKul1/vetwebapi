import { Col, Container, Row } from "react-bootstrap";
import { IEmployee } from "../../../interfaces/EmployeeInterfaces";

import styles from "./PageDetailEmployees.module.scss";
import { CompanyEmployee } from "../../companies/employee/CompanyEmployee";

interface PageDetailEmployeesProps {
  employees: IEmployee[];
}

export function PageDetailEmployees({ employees }: PageDetailEmployeesProps) {
  return (
    <Container className={styles.companyEmployee}>
      <h5>Работники</h5>
      <Row className={styles.tableHead}>
        <Col>Должность</Col>
        <Col>Фамилия</Col>
        <Col>Имя</Col>
        <Col>Отчество</Col>
      </Row>

      {employees.map((empoloyee) => (
        <CompanyEmployee key={empoloyee.id} employee={empoloyee} />
      ))}
    </Container>
  );
}

import { IEmployee } from "../../../interfaces/EmployeeInterfaces";


interface CompanyEmployeesProps {
    employees: IEmployee[];
}


export function CompanyEmployees({employees}: CompanyEmployeesProps) {
    return(

        employees.map(employee => (
            <tr key={employee.id}>
                <td>{employee.position}</td>
                <td>{employee.lastname}</td>
                <td>{employee.firstname}</td>
                <td>{employee.patronymic}</td>
            </tr>
        ))
    )
    

                       

}
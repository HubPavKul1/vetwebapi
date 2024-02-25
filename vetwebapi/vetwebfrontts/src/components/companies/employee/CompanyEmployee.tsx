import { IEmployee } from "../../../interfaces/EmployeeInterfaces";


interface CompanyEmployeeProps {
    employee: IEmployee;
}


export function CompanyEmployee({employee}: CompanyEmployeeProps) {
    return(
        
            <tr key={employee.id}>
                <td>{employee.position}</td>
                <td>{employee.lastname}</td>
                <td>{employee.firstname}</td>
                <td>{employee.patronymic}</td>
            </tr>
        )
    
    

                       

}
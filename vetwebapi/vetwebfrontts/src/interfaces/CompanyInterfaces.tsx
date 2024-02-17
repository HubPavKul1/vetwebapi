import IAddress from './AddressInterfaces';
import IEmployee from './EmployeeInterfaces';
import IAnimal from './AnimalInterfaces';



export default interface ICompany {
    id: number;
    full_name: string;
    short_name: string;
}



export default interface ICompanies {
    companies?: ICompany[];
}


export default interface ICompanyCreate extends Omit<ICompany, "id"> {

}

export default interface ICompanyDetail extends ICompany {
    address?: IAddress;
    employees?: IEmployee[];
    animals?: IAnimal[];
}

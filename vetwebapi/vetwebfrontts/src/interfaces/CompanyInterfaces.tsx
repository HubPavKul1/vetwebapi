import { IAddress } from './AddressInterfaces';
import { IEmployee } from './EmployeeInterfaces';
import { IAnimal } from './AnimalInterfaces';



export interface ICompany {
    id: number;
    full_name: string;
    short_name: string;
}



export interface ICompanies {
    companies: ICompany[];
}


export interface ICompanyCreate extends Omit<ICompany, "id"> {

}

export interface ICompanyDetail extends ICompany {
    address?: IAddress;
    employees?: IEmployee[];
    animals?: IAnimal[];
}

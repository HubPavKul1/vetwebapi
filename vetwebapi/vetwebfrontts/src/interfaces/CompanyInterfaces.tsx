import { IAddress } from './AddressInterfaces';
import { IEmployee } from './EmployeeInterfaces';
import { IAnimal } from './AnimalInterfaces';



export interface ICompany {
    id: number;
    full_name: string;
    short_name: string;
    is_vet?: boolean;
}

export interface ICompanyCard extends ICompany {
    address?: IAddress;
    employee?: IEmployee;
}



export interface ICompanies {
    companies: ICompanyCard[];
}


export interface ICompanyCreate extends Omit<ICompany, "id"> {

}

export interface ICompanyDetail extends ICompany {
    address?: IAddress;
    employees?: IEmployee[];
    animals?: IAnimal[];
}

export default interface ICompany {
    id: number;
    full_name: string;
    short_name: string;
}


export default interface ICompanyCreate extends Omit<ICompany, "id" > {

}


import axios from "axios";
import { IAddress } from "./interfaces/AddressInterfaces";
import { IEmployee } from "./interfaces/EmployeeInterfaces";
import { ICompanyCard } from "./interfaces/CompanyInterfaces";
import { IAnimalInVetwork } from "./interfaces/VetWorkInterfaces";


export const AppService = {

    async getAll(url: string) {
        return (await axios.get(url)); 
    },

    async get(url: string) {
        return (await axios.get(url)).data; 
    },

    async createItem(url: string, data: object) {
        await axios.post<object>(url, data)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    },

    async createReport(url: string, data: object) {
        return await axios.post<object>(url, data)
        .then(response => response.data)
        .catch(err => console.log(err))
    },

    async deleteItem(url: string) {
        await axios.delete(url)
      },

    async uploadFile(url: string, file: FormData) {
        await axios.post(url, file)

        .then(response => console.log(response))
        .catch(err => console.log(err))
    },

    convertDateString(date: string) {
        const dateObj: Date = new Date(date);
        const month: string = dateObj.toLocaleString('default', { month: 'long' });
        const year: number = dateObj.getFullYear()
        const day: number = dateObj.getDate()
        const quarter: number = Math.floor((dateObj.getMonth() + 3) / 3)
        const fullDate: string = `${day} ${month} ${year}`
        const shortDate: string = dateObj.toLocaleDateString()

        return ({day, month, year, quarter, fullDate, shortDate})
    },

    addressString(data: IAddress) {
        return `${data.city}, ${data.street}, ${data.house_number}`
    },

    employeeString(employee: IEmployee, company: ICompanyCard) {
        return `${employee.position} ${company.short_name} ${employee.fullname}`
    },

    doctorString(doctor: IEmployee, clinic: string) {
        return `${doctor.position} ${clinic} ${doctor.fullname}`
    },

    vetWorkAnimalsString(animals: IAnimalInVetwork[]) {
        return new Set(animals.map(animal => animal.animal_group.toLowerCase() + ", "));
    },

    diseasesString(diseases: string[]) {
        return new Set(diseases.map(disease => disease.toLowerCase() + ", "));
    }

}
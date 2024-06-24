import axios from "axios";


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
        const fullDate: string = `${day} ${month} ${year}`
        const shortDate: string = dateObj.toLocaleDateString()

        return ({day, month, year, fullDate, shortDate})
    },
}
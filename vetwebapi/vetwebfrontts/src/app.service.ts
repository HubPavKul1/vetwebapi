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

    async deleteItem(url: string) {
        await axios.delete(url)
      },

    async uploadFile(url: string, file: FormData) {
        await axios.post(url, file)

        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
}
import axios from "axios"
import { IDrugMovements,  IDrugMovementCreate } from "../../interfaces/DrugInterfaces"




export const DrugService = {

    async getDrugMovements() {
      return await axios.get<IDrugMovements>("/api/drugs/1")
    },


    // async getById(id?: string) {
    //   const response = await axios.get<ICompanyDetail>(`/api/companies/${id}`)
    //   return response.data
    // },
  
    async createReceipt(data: IDrugMovementCreate) {
      // const headers = { "Content-Type": "application/json" }
      await axios.post<IDrugMovementCreate>("/api/drugs/1", data)
        .then(response => console.log(response))
        .catch(err => console.log(err))
  
    },


}
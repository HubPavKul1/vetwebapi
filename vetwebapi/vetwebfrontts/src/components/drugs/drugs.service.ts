import axios from "axios"
import { IDrugMovements,  IDrugMovementCreate, IDrugs, IDrugCreate, IBudgets, IDrugManufacturers, IAccountingUnits } from "../../interfaces/DrugInterfaces"
import { IDiseases } from "../../interfaces/VetWorkInterfaces"




export const DrugService = {

    async getDrugMovements() {
      return await axios.get<IDrugMovements>("/api/drugs/receipts")
    },

    async getDrugs() {
      return await axios.get<IDrugs>("/api/drugs")
    },

    async deleteDrug(id?: string) {
      await axios.delete(`/api/drugs/${id}`)
    },

    async getDiseases() {
      return await axios.get<IDiseases>("/api/vet_work/diseases")
    },

    async getBudgets() {
      return await axios.get<IBudgets>("/api/drugs/budgets")
    },

    async getDrugManufacturers() {
      return await axios.get<IDrugManufacturers>("/api/drugs/drug_manufacturers")
    },

    async getAccountingUnits() {
      return await axios.get<IAccountingUnits>("/api/drugs/accounting_units")
    },


    async createDrug(data: IDrugCreate) {
      // const headers = { "Content-Type": "application/json" }
      await axios.post<IDrugCreate>("/api/drugs", data)
        .then(response => console.log(response))
        .catch(err => console.log(err))
  
    },




    // async getById(id?: string) {
    //   const response = await axios.get<ICompanyDetail>(`/api/companies/${id}`)
    //   return response.data
    // },
  
    async createReceipt(data: IDrugMovementCreate) {
      // const headers = { "Content-Type": "application/json" }
      await axios.post<IDrugMovementCreate>("/api/drugs/receipts", data)
        .then(response => console.log(response))
        .catch(err => console.log(err))
  
    },


}
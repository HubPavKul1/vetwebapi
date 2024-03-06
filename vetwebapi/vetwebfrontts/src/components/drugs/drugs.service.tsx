import axios from "axios"
import { IDrugMovements } from "../../interfaces/DrugInterfaces"




export const DrugService = {

    async getDrugMovements() {
      return await axios.get<IDrugMovements>("/api/drugs")
    },


}
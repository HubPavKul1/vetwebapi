import axios from "axios"


export const CompanyService = {
    async getAll() {
      const response = await axios.get("http://localhost:8000/api/companies")
      return response.data.companies
    },

    async getById(id) {
        const response = await axios.get(`http://localhost:8000/api/companies/${id}`)
        console.log("респонз:", response)
        return response.data
      },


}
import axios from "axios"


export const CompanyService = {
    async getAll() {
    const response = await axios.get("/api/companies")
      return response.data.companies
    },

    async getById(id) {
        const response = await axios.get(`/api/companies/${id}`)
        return response.data
      },
}




import axios from "axios"


export const CompanyService = {
    async getAll() {
      const response = await axios.get("/api/companies/")
      return response.data.companies
    },

    async getById(id) {
      const response = await axios.get(`/api/companies/${id}`)
      return response.data
    },

    async createCompany(full_name, short_name) {
      const headers = { "Content-Type": "application/json" }
      await axios.post("/api/companies/", { "full_name": full_name, "short_name": short_name }, headers)
      .then(response => console.log(response))
      .catch(err => console.log(err))

    }
}

export const AddressService = {
    async getRegions() {
      const response = await axios.get("/api/companies/regions")
      // console.log(response.data.regions)
      return response.data.regions
  },

    async getDistricts() {
      const response = await axios.get("/api/companies/districts")
      return response.data.districts
  },

    async getCities() {
      const response = await axios.get("/api/companies/cities")
      return response.data.cities
  },

    async getStreets() {
      const response = await axios.get("/api/companies/streets")
      return response.data.streets
  },


    async createAddress(id, data) {
      const headers = { "Content-Type": "application/json" }
      await axios.post(`/api/companies/${id}/address`, data, headers)
      .then(response => console.log(response))
      .catch(err => console.log(err))

  }
}



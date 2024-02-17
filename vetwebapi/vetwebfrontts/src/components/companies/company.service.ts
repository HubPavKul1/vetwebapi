import axios from "axios"
import AddressIn from "../../interfaces/CompanyInterfaces"
import ICompany from "../../interfaces/CompanyInterfaces"
import ICompanyCreate from "../../interfaces/CompanyInterfaces"
import ICompanies from "../../interfaces/CompanyInterfaces"



export const CompanyService = {

    

    async getAll() {
      const response = await axios.get<ICompanies>("/api/companies/")
      console.log("response_comp: ", response)
      return response.data.companies
    },

    async getById(id: string) {
      const response = await axios.get<ICompany>(`/api/companies/${id}`)
      return response.data
    },

    async createCompany(full_name: string, short_name: string) {
      // const headers = { "Content-Type": "application/json" }
      await axios.post<ICompanyCreate>("/api/companies/", { full_name, short_name })
      .then(response => console.log(response))
      .catch(err => console.log(err))

    }
}

export const AddressService = {
    async getRegions() {
      const response = await axios.get("/api/companies/regions")
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

    async getCityStreets(id: string) {
      const response = await axios.get(`/api/companies/cities/${id}/streets`)
      return response.data.streets
  },

    async getDistrictCities(id: string) {
      const response = await axios.get(`/api/companies/districts/${id}/cities`)
      return response.data.cities
  },

    async getRegionDistricts(id: string) {
      const response = await axios.get(`/api/companies/regions/${id}/districts`)
      return response.data.districts
  },


    async createAddress(id: string, data: AddressIn) {
      // const headers = { "Content-Type": "application/json" }
      await axios.post(`/api/companies/${id}/address`, data)
      .then(response => console.log(response))
      .catch(err => console.log(err))

  }
}



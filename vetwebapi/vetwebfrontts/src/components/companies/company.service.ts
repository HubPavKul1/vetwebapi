import axios from "axios"
import AddressIn from "../../interfaces/CompanyInterfaces"
import ICompanyDetail from "../../interfaces/CompanyInterfaces"
import ICompanyCreate from "../../interfaces/CompanyInterfaces"
import ICompanies from "../../interfaces/CompanyInterfaces"
import IAddressIn from "../../interfaces/AddressInterfaces"


export const CompanyService = {


  async getAll() {
    return await axios.get<ICompanies>("/api/companies/")
  },

  async getById(id: string) {
    const response = await axios.get<ICompanyDetail>(`/api/companies/${id}`)
    return response.data
  },

  async createCompany(data: ICompanyCreate) {
    // const headers = { "Content-Type": "application/json" }
    await axios.post<ICompanyCreate>("/api/companies/", data)
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
    await axios.post<IAddressIn>(`/api/companies/${id}/address`, data)
      .then(response => console.log(response))
      .catch(err => console.log(err))

  }
}



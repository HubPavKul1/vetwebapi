import axios from "axios"
import { ICompanyDetail, ICompanyCreate, ICompanies } from "../../interfaces/CompanyInterfaces"
import { IAddressIn, ICities, IRegions, IDistricts, IStreets } from "../../interfaces/AddressInterfaces"



export const CompanyService = {


  async getAll() {
    return await axios.get<ICompanies>("/api/companies/")
  },

  async getById(id?: string) {
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
    return await axios.get<IRegions>("/api/companies/regions")
  },

  async getDistricts() {
    return await axios.get<IDistricts>("/api/companies/districts")
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
    return await axios.get<IStreets>(`/api/companies/cities/${id}/streets`)
  },

  async getDistrictCities(id: string) {
    const response = await axios.get<ICities>(`/api/companies/districts/${id}/cities`)
    return response.data.cities
  },

  async getRegionDistricts(id: string) {
    return await axios.get<IDistricts>(`/api/companies/regions/${id}/districts`)
  },


  async createAddress(data: IAddressIn, id: string) {
    // const headers = { "Content-Type": "application/json" }
    await axios.post<IAddressIn>(`/api/companies/${id}/address`, data)
      .then(response => console.log(response))
      .catch(err => console.log(err))

  }
}



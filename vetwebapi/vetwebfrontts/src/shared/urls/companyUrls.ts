import { baseUrl } from "./baseUrl";

export const companiesUrl = baseUrl + "/api/companies/";
export const filteredCompaniesUrl = (animalGroupId?: number) => {
  return companiesUrl + `?animal_group_id=${animalGroupId}`;
};
export const companiesAllUrl = companiesUrl + "all";
export const companyDetailUrl = (id?: number) => {
  return companiesUrl + `${id}/`;
};
export const labsUrl = companiesUrl + "labs";
export const vetsUrl = companiesUrl + "vets";

// company links
export const companiesLink = "/companies/";
export const companyLink = (id?: number) => {
  return companiesLink + `${id}`;
};
export const vetsLink = companiesLink + "vets";
export const labsLink = companiesLink + "labs";

// Company Address

export const regionsUrl = companiesUrl + "regions";
export const districtsUrl = (regionId: string) => {
  return regionsUrl + `/${regionId}/districts`;
};
export const citiesUrl = (districtId: string) => {
  return companiesUrl + `districts/${districtId}/cities`;
};
export const streetsUrl = (cityId: string) => {
  return companiesUrl + `cities/${cityId}/streets`;
};

export const addressUrl = (companyId?: string) => {
  return companiesUrl + `${companyId}/address`;
};

// Company Animals

export const typesOfFeedingUrl = companiesUrl + "types_of_feeding";
export const animalGroupsAllUrl = companiesUrl + "animal_groups";
export const animalGroupsUrl = (typeOfFeedingId: string) => {
  return companiesUrl + `${typeOfFeedingId}/animal_groups`;
};
export const speciesUrl = (animalGroupId: string) => {
  return companiesUrl + `${animalGroupId}/species`;
};
export const gendersUrl = (speciesId: string) => {
  return companiesUrl + `${speciesId}/genders`;
};
export const usageTypesUrls = companiesUrl + "usage_types";
export const uploadAnimalsUrl = (companyId: number) => {
  return companyDetailUrl(companyId) + "animals/upload";
};

export const companyAnimalsUrl = (companyId: number) => {
  return companyDetailUrl(companyId) + "animals";
};
export const companyAnimalUrl = (companyId: number, animalId?: number) => {
  return companyAnimalsUrl(companyId) + `/${animalId}`;
};

// Company employee
export const companyEmployeesUrl = (companyId: number) => {
  return companyDetailUrl(companyId) + "employees";
};

export const positionsUrl = companiesUrl + "positions";
export const companyEmployeeDetailUrl = (
  companyId: number,
  employeeId?: number
) => {
  return companyEmployeesUrl(companyId) + `/${employeeId}`;
};

export const doctorsUrl = companiesUrl + "doctors";

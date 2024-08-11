// Companies
export const companiesUrl = "/api/companies/";
export const companyDetailUrl = (id?: number) => {
  return `/api/companies/${id}`;
};
export const labsUrl = companiesUrl + "labs";
export const vetsUrl = companiesUrl + "vets";
export const companyLink = (id?: number) => {
  return `/companies/${id}`;
};

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
  return companyDetailUrl(companyId) + "/animals/upload";
};

export const companyAnimalsUrl = (companyId: number) => {
  return companyDetailUrl(companyId) + "/animals";
};
export const companyAnimalUrl = (companyId: number, animalId?: number) => {
  return companyAnimalsUrl(companyId) + `/${animalId}`;
};

// Company employee
export const companyEmployeesUrl = (companyId: number) => {
  return companyDetailUrl(companyId) + "/employees";
};

export const positionsUrl = companiesUrl + "positions";
export const companyEmployeeDetailUrl = (
  companyId: number,
  employeeId?: number
) => {
  return companyEmployeesUrl(companyId) + `/${employeeId}`;
};

// Drugs
export const drugsUrl = "/api/drugs";
export const drugDetailUrl = (id?: number) => {
  return `/api/drugs/${id}`;
};

export const drugLink = (id?: number) => {
  return `/drugs/${id}`;
};

export const drugFileUploadUrl = (id?: number) => {
  return drugDetailUrl(id) + "/upload/";
};

export const drugImageUrl = (id?: number) => {
  return drugDetailUrl(id) + "/image";
};

export const drugInstructionUrl = (id?: number) => {
  return drugDetailUrl(id) + "/instruction";
};

export const drugNamesUrl = drugsUrl + "/drug_names";

// catalog drugs
export const catalogDrugsUrl = drugsUrl + "/catalog";

// drug receipts
export const drugReceiptsUrl = drugsUrl + "/receipts";
export const drugReceiptDetailUrl = (receiptId?: number) => {
  return drugReceiptsUrl + `/${receiptId}`;
};
export const drugReceiptsLink = (receiptId?: number) => {
  return `/drugs/receipts/${receiptId}`;
};

// create drug selects urls
export const placesOfAdministrationUrl = drugsUrl + "/places_of_administration";
export const drugManufacturersUrl = drugsUrl + "/drug_manufacturers";
export const dosagesUrl = drugsUrl + "/dosages";
export const disposalMethodsUrl = drugsUrl + "/disposal_methods";
export const budgetsUrl = drugsUrl + "/budgets";
export const administrationMethodsUrl = drugsUrl + "/administration_methods";
export const accountingUnitsUrl = drugsUrl + "/accounting_units";

// vetWork urls

const vetWorkBaseUrl = "/api/vetwork";

export const diseasesUrl = vetWorkBaseUrl + "/diseases";

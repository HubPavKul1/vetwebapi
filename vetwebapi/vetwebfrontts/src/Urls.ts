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

export const doctorsUrl = companiesUrl + "doctors";

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
export const catalogDrugDetailUrl = (drugId?: number) => {
  return catalogDrugsUrl + `/${drugId}`;
};
export const catalogDrugLink = (drugId?: number) => {
  return `/drugs/catalog/${drugId}`;
};

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
export const vetWorkDetailUrl = (vetWorkId?: number) => {
  return vetWorkBaseUrl + `/${vetWorkId}`;
};
export const vetWorkLink = (vetWorkId?: number) => {
  return `/vetwork/${vetWorkId}`;
};

// vetwork company
export const vetWorkCompanyUrl = (vetWorkId?: number) => {
  return vetWorkDetailUrl(vetWorkId) + "/company";
};

// vetwork animals

export const vetWorkAnimalsUrl = (vetWorkId?: number) => {
  return vetWorkDetailUrl(vetWorkId) + "/animals/";
};

export const vetWorkAnimalDetailUrl = (
  vetWorkId?: number,
  animalId?: number
) => {
  return vetWorkAnimalsUrl(vetWorkId) + `${animalId}`;
};

// vetwork form selects
export const diagnosticMethodsUrl = vetWorkBaseUrl + "/diagnostic_methods";
export const biomaterialsUrl = vetWorkBaseUrl + "/biomaterials";
export const biomaterialPackagesUrl = vetWorkBaseUrl + "/biomaterial_packages";
export const biomaterialFixationsUrl =
  vetWorkBaseUrl + "/biomaterial_fixations";

// vetwork drug
export const vetWorkDrugUrl = (vetWorkId?: number) => {
  return vetWorkDetailUrl(vetWorkId) + "/drug";
};

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

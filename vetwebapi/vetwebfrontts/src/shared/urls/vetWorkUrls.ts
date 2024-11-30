import { baseUrl } from "./baseUrl";

const vetWorkBaseUrl = baseUrl + "/api/vetwork";

export const diseasesUrl = vetWorkBaseUrl + "/diseases";
export const vetWorkDetailUrl = (vetWorkId?: number) => {
  return vetWorkBaseUrl + `/${vetWorkId}/`;
};

export const diagnosticsUrl = vetWorkBaseUrl + "/diagnostics";
export const vaccinationsUrl = vetWorkBaseUrl + "/vaccinations";

// vetwork links
export const vaccinationsLink = "/vetwork/vaccinations";
export const diagnosticsLink = "/vetwork/diagnostics";
export const vetWorkLink = (vetWorkId?: number) => {
  return `/vetwork/${vetWorkId}`;
};
export const vetWorkReportsLink = "/vetwork/reports";

// vetwork company
export const vetWorkCompanyUrl = (vetWorkId?: number) => {
  return vetWorkDetailUrl(vetWorkId) + "company";
};

export const vetWorkCompanyDetailUrl = (
  vetWorkId?: number,
  companyId?: number
) => {
  return vetWorkCompanyUrl(vetWorkId) + `/${companyId}`;
};

// vetwork animals

export const vetWorkAnimalsUrl = (vetWorkId?: number) => {
  return vetWorkDetailUrl(vetWorkId) + "animals";
};

export const vetWorkAnimalDetailUrl = (
  vetWorkId?: number,
  animalId?: number
) => {
  return vetWorkAnimalsUrl(vetWorkId) + `/${animalId}`;
};

// vetwork form selects
export const diagnosticMethodsUrl = vetWorkBaseUrl + "/diagnostic_methods";
export const biomaterialsUrl = vetWorkBaseUrl + "/biomaterials";
export const biomaterialPackagesUrl = vetWorkBaseUrl + "/biomaterial_packages";
export const biomaterialFixationsUrl =
  vetWorkBaseUrl + "/biomaterial_fixations";

// vetwork drug
export const vetWorkDrugUrl = (vetWorkId?: number) => {
  return vetWorkDetailUrl(vetWorkId) + "drug";
};

// vetwork reports
export const diagnosticsReportUrl = vetWorkBaseUrl + "/reports/diagnostics";
export const vaccinationsReportUrl = vetWorkBaseUrl + "/reports/vaccinations";

// vetwork files
export const vetWorkFileUploadUrl = (vetWorkId?: number) => {
  return vetWorkDetailUrl(vetWorkId) + "upload";
};

export const vetWorkFileUrl = (vetWorkId?: number) => {
  return vetWorkDetailUrl(vetWorkId) + "file";
};

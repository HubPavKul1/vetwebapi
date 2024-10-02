export const drugsUrl = "/api/drugs";
export const drugDetailUrl = (id?: number) => {
  return `/api/drugs/${id}`;
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

// drugs links
export const drugsLink = "/drugs";
export const drugLink = (id?: number) => {
  return drugsLink + `/${id}`;
};
export const drugCatalogLink = drugsLink + "/catalog";
export const drugReceiptsLink = drugsLink + "/receipts";
export const drugReceiptLink = (receiptId?: number) => {
  return `/drugs/receipts/${receiptId}`;
};
export const drugReportsLink = drugsLink + "/reports";

// catalog drugs
export const catalogDrugsUrl = drugsUrl + "/catalog";
export const catalogDrugDetailUrl = (drugId?: number) => {
  return catalogDrugsUrl + `/${drugId}`;
};
export const catalogDrugLink = (drugId?: number) => {
  return `/drugs/catalog/${drugId}`;
};

export const catalogDrugReceiptsUrl = (drugId?: number) => {
  return catalogDrugDetailUrl(drugId) + "/receipts";
};

export const catalogDrugSpentUrl = (drugId?: number) => {
  return catalogDrugDetailUrl(drugId) + "/spent";
};

export const catalogDrugsExpiredUrl = catalogDrugsUrl + "/overdue";

// drug receipts
export const drugReceiptsUrl = drugsUrl + "/receipts";
export const drugReceiptDetailUrl = (receiptId?: number) => {
  return drugReceiptsUrl + `/${receiptId}`;
};

// create drug selects urls
export const placesOfAdministrationUrl = drugsUrl + "/places_of_administration";
export const drugManufacturersUrl = drugsUrl + "/drug_manufacturers";
export const dosagesUrl = drugsUrl + "/dosages";
export const disposalMethodsUrl = drugsUrl + "/disposal_methods";
export const budgetsUrl = drugsUrl + "/budgets";
export const administrationMethodsUrl = drugsUrl + "/administration_methods";
export const accountingUnitsUrl = drugsUrl + "/accounting_units";

// drug reports
export const drugReportsUrl = drugsUrl + "/reports/drugs_movement";
export const Vet1BReportUrl = drugsUrl + "/reports/1vet_B";
export const drugRestUrl = (id?: number) => {
  return drugReportsUrl + `/${id}`;
};

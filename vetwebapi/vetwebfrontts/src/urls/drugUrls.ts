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

// drug reports
export const drugReportsUrl = drugsUrl + "/reports/drug_movement";
export const Vet1BReportUrl = drugsUrl + "/reports/1Vet_B";

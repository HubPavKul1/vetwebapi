import {
  drugCatalogLink,
  drugReceiptsLink,
  drugReportsLink,
  drugsLink,
} from "shared/index";

export const drugNavDropdownItems = [
  {
    id: 1,
    url: drugReceiptsLink,
    title: "Поступление",
  },
  {
    id: 2,
    url: drugsLink,
    title: "Справочник препаратов",
  },
  {
    id: 3,
    url: drugCatalogLink,
    title: "Каталог препаратов",
  },
  {
    id: 4,
    url: drugReportsLink,
    title: "Отчеты",
  },
];

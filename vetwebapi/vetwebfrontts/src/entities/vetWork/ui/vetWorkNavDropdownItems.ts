import {
  diagnosticsLink,
  treatmentsLink,
  vaccinationsLink,
  vetWorkReportsLink,
} from "shared/index";

export const vetWorkNavDropdownItems = [
  {
    id: 1,
    url: vaccinationsLink,
    title: "Вакцинация",
  },
  {
    id: 2,
    url: diagnosticsLink,
    title: "Диагностика",
  },
  {
    id: 3,
    url: treatmentsLink,
    title: "Обработка",
  },
  {
    id: 4,
    url: vetWorkReportsLink,
    title: "Отчеты",
  },
];

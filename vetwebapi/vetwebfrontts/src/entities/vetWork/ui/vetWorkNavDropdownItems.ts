import { diagnosticsLink, vaccinationsLink, vetWorkReportsLink } from "shared/index";


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
    url: vaccinationsLink,
    title: "Обработка",
  },
  {
    id: 4,
    url: vetWorkReportsLink,
    title: "Отчеты",
  },
];

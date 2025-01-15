import { companiesLink, labsLink, vetsLink } from "shared/urls/companyUrls";
import {
  drugCatalogLink,
  drugReceiptsLink,
  drugReportsLink,
  drugsLink,
} from "shared/urls/drugUrls";
import {
  diagnosticsLink,
  vaccinationsLink,
  vetWorkReportsLink,
} from "shared/urls/vetWorkUrls";

export interface ICarouselItem {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  url: string;
}

export const carouselItems: ICarouselItem[] = [
  {
    id: 1,
    imgSrc: "/animalsForSlider.png",
    imgAlt: "Animals",
    title: "Владельцы Животных",
    description: "Информация о хозяйствах и регистрация владельцев животных",
    url: companiesLink,
  },

  {
    id: 2,
    imgSrc: "/gosvet.jpg",
    imgAlt: "Clinics",
    title: "Ветеринарные клиники",
    description: "Информация о ветеринарных клиниках",
    url: vetsLink,
  },

  {
    id: 3,
    imgSrc: "/diagnBg.png",
    imgAlt: "Labs",
    title: "Ветеринарные лаборатории",
    description: "Информация о ветеринарных лабораториях",
    url: labsLink,
  },

  {
    id: 4,
    imgSrc: "/vaccinesBg.png",
    imgAlt: "Drugs",
    title: "Справочник биопрепаратов",
    description: "Информация о биопрепаратах",
    url: drugsLink,
  },

  {
    id: 5,
    imgSrc: "/vaccinesBg.png",
    imgAlt: "DrugsCatalog",
    title: "Каталог препаратов",
    description: "Информация об имеющихся биопрепаратах",
    url: drugCatalogLink,
  },

  {
    id: 6,
    imgSrc: "/vaccinesBg.png",
    imgAlt: "DrugReceipts",
    title: "Поступление биопрепаратов",
    description: "Информация о поступлении биопрепаратов",
    url: drugReceiptsLink,
  },

  {
    id: 7,
    imgSrc: "/vaccinesBg.png",
    imgAlt: "DrugReports",
    title: "Отчеты по биопрепаратам",
    description: "Отчеты по биопрепаратам",
    url: drugReportsLink,
  },

  {
    id: 8,
    imgSrc: "/vaccination.png",
    imgAlt: "Vaccinations",
    title: "Вакцинации",
    description: "Информация о проведенных вакцинациях",
    url: vaccinationsLink,
  },

  {
    id: 9,
    imgSrc: "/diagnBg.png",
    imgAlt: "Diagnostics",
    title: "Диагностические исследования",
    description: "Информация о проведенных диагностических исследованиях",
    url: diagnosticsLink,
  },

  {
    id: 10,
    imgSrc: "/vaccination.png",
    imgAlt: "VetWorkReports",
    title: "Отчеты по ветеринарным мероприятиям",
    description: "Отчеты о проведенных ветеринарных мероприятиях",
    url: vetWorkReportsLink,
  },
];

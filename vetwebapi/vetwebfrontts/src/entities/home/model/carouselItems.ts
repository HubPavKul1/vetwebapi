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
    imgSrc: "/animalsBg.jpg",
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
    imgSrc: "/diagnostic.jpg",
    imgAlt: "Labs",
    title: "Ветеринарные лаборатории",
    description: "Информация о ветеринарных лабораториях",
    url: labsLink,
  },

  {
    id: 4,
    imgSrc: "/drugsBg.jpg",
    imgAlt: "Drugs",
    title: "Справочник биопрепаратов",
    description: "Информация о биопрепаратах",
    url: drugsLink,
  },

  {
    id: 5,
    imgSrc: "/drugsBg.jpg",
    imgAlt: "DrugsCatalog",
    title: "Каталог препаратов",
    description: "Информация об имеющихся биопрепаратах",
    url: drugCatalogLink,
  },

  {
    id: 6,
    imgSrc: "/drugsBg.jpg",
    imgAlt: "DrugReceipts",
    title: "Поступление биопрепаратов",
    description: "Информация о поступлении биопрепаратов",
    url: drugReceiptsLink,
  },

  {
    id: 7,
    imgSrc: "/drugsBg.jpg",
    imgAlt: "DrugReports",
    title: "Отчеты по биопрепаратам",
    description: "Отчеты по биопрепаратам",
    url: drugReportsLink,
  },

  {
    id: 8,
    imgSrc: "/vetworkBg.jpg",
    imgAlt: "Vaccinations",
    title: "Вакцинации",
    description: "Информация о проведенных вакцинациях",
    url: vaccinationsLink,
  },

  {
    id: 9,
    imgSrc: "/diagnostic.jpg",
    imgAlt: "Diagnostics",
    title: "Диагностические исследования",
    description: "Информация о проведенных диагностических исследованиях",
    url: diagnosticsLink,
  },

  {
    id: 10,
    imgSrc: "/vetworkBg.jpg",
    imgAlt: "VetWorkReports",
    title: "Отчеты по ветеринарным мероприятиям",
    description: "Отчеты о проведенных ветеринарных мероприятиях",
    url: vetWorkReportsLink,
  },
];
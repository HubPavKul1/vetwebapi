import { ICardProps } from "shared/model/CardProps";

export const contentData: ICardProps[] = [
  {
    id: 1,
    imgSrc: "/vetis.png",
    imgAlt: "Mercury",
    cardTitle: "Ветис",
    url: "https://mercury.vetrf.ru/",
    cardText: `Автоматизированная информационная система «Меркурий» предназначена для электронной сертификации...`,
    hasContacts: false,
  },

  {
    id: 2,
    imgSrc: "/rosselhoz.png",
    imgAlt: "Rosselhosnadzor",
    cardTitle: "Россельхознадзор",
    url: "https://fsvps.gov.ru/?ysclid=lttv13bemt557845175",
    cardText:
      "Федеральная служба по ветеринарному и фитосанитарному надзору официальный сайт.",
    phone: "+7 (4932) 93-95-97",
    phone2: "+7 (4932) 93-98-60",
    address: "ул. Молодых Рабочих, д. 1",
    hasContacts: true,
  },

  {
    id: 3,
    imgSrc: "/gosvet.png",
    imgAlt: "OblVetSluzba",
    cardTitle: "Служба ветеринарии Ивановской области",
    url: "https://vet.ivanovoobl.ru/?ysclid=lttvj80rs1450329653",
    cardText: "Служба ветеринарии Ивановской области официальный сайт.",
    phone: "+7 (4932) 32-36-08",
    phone2: "+7 (4932) 32-36-38",
    address: "ул. Суворова, д. 44",
    hasContacts: true,
  },

  {
    id: 4,
    imgSrc: "/spbvet.png",
    imgAlt: "SpbVet",
    cardTitle: "Ветеринарный Петербург",
    url: "https://spbvet.info/",
    cardText:
      "Журнал ветеринарных врачей о ветеринарных врачах для ветеринарных врачей и студентов вузов.",
    hasContacts: false,
  },
];

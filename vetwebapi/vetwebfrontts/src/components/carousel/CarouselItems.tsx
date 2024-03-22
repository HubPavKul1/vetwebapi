
interface ICarouselItem {
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
        imgSrc: "/animalsBg1.jpg",
        imgAlt: "Animals",
        title: "Владельцы Животных",
        description: "Информация о хозяйствах и регистрация владельцев животных",
        url: "/companies/"
    },

    {
        id: 2,
        imgSrc: "/drugsBg1.jpg",
        imgAlt: "Drugs",
        title: "Биопрепараты",
        description: "Информация о поступлении биопрепаратов, их учет и отчетность",
        url: "/drugs"
    },

    {
        id: 3,
        imgSrc: "/vetworkBg1.jpg",
        imgAlt: "VetWork",
        title: "Противоэпизоотическая работа",
        description: "Информация о противоэпизоотических мероприятиях, их учет и отчетность",
        url: "/"
    },

]
import { MouseEventHandler } from "react";

export interface ICardProps {
    id: number;
    imgSrc?: string;
    imgAlt?: string;
    cardTitle: string;
    cardText: string;
    url: string;
    fileUploadUrl?: string;
    buttonVariant?: string;
    onClick?: MouseEventHandler;
    children?: React.ReactElement | React.ReactNode;
    employee: string;
    hasContacts?: boolean;
    phone?: string;
    address?: string;
    invQueryName: string;
    phone2?: string;
}
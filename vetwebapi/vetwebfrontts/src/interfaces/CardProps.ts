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
    hasContacts?: boolean;
    phone?: string;
    address?: string;
    queryKey: string;
    phone2?: string;
}
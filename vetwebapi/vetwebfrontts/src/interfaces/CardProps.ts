import { MouseEventHandler } from "react";

export interface ICardProps {
    id?: number;
    imgSrc?: string;
    imgAlt?: string;
    cardTitle?: string;
    cardText?: string;
    phone?: string;
    phone2?: string;
    email?: string;
    url?: string;
    fileUploadUrl?: string;
    buttonVariant?: string;
    address?: string;
    employee?: string;
    hasContacts?: boolean;
    hasFile?: boolean;
    onClick?: MouseEventHandler;
    children?: React.ReactElement | React.ReactNode;
    uploadFile?: React.ReactElement | React.ReactNode;
    fileSrc?: string;
}
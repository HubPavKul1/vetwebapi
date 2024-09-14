export interface ICardProps {
    id: number;
    imgSrc?: string;
    imgAlt?: string;
    cardTitle: string;
    url: string;
    delUrl?: string;
    fileUploadUrl?: string;
    buttonVariant?: string;
    children?: React.ReactElement | React.ReactNode;
    invQueryName?: string;
    hasFileUploader?: boolean;
    accept?: string;
    mutationName?: string;
    iconSrc?: string;
    hasContacts?: boolean;
    cardText?: string;
    address?: string;
    phone?: string;
    phone2?: string;
    
}
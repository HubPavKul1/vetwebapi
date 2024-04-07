export interface IDiseaseIn {
    name: string;
}

export interface IDiseaseOut extends IDiseaseIn {
    id: number;
}

export interface IDiseases {
    diseases?: IDiseaseOut[];
}


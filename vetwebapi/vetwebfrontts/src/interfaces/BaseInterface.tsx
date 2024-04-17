export interface IBase {
    id: number;
    name: string;
}


export interface IQueryData {
    data?: IBase[];
    isLoading: boolean;
}


export interface ISelectData {
    data: IBase[];
}
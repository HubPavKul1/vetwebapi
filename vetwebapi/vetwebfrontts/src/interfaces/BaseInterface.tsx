export interface IBase {
    id: number;
    name: string;
}


export interface IQueryData {
    data?: IBase[];
    isLoading: boolean;
    error?: Error | null;
    
}


export interface ISelectData {
    data: IBase[];
}

export interface IDateRange {
    date_start: string;
    date_end: string
}
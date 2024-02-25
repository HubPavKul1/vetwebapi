import { IBase } from "./BaseInterface";


interface IEmployeeBase {
    lastname: string;
    firstname: string;
    patronymic: string;

}


export interface IEmployee extends IEmployeeBase {
    id: number;
    position: string;
    fullname: string;

}

export interface IEmployeeCreate extends IEmployeeBase {
    position_id: number;
}


export interface IPosition extends IBase {}

export interface IPositions {
    positions?: IPosition[];
}
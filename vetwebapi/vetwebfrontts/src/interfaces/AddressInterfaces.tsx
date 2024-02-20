
export interface IAddressIn {
    street_id: number;
    house_number: string;
    phone_number1: string;
    phone_number2: string | null;
}


export interface IAddress {
    id: number;
    district: string;
    city: string;
    street: string;
    house_number: string;
    phone_number1: string;
    phone_number2: string | null;
}

interface IBase {
    id: number;
    name: string;
}

export interface IRegion extends IBase {

}

export interface IRegions {
    regions?: IRegion[]
}


export interface IDistrict extends IBase {

}

export interface IDistricts {
    districts?: IDistrict[]
}

export interface ICity extends IBase {

}

export interface ICities {
    cities?: ICity[]
}

export interface IStreet extends IBase {

}

export interface IStreets {
    streets?: IStreet[]
}





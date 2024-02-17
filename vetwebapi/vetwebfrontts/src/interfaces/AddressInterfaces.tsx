
export default interface IAddressIn {
    street_id: number;
    house_number: string;
    phone_number1: string;
    phone_number2: string | null;
}


export default interface IAddress {
    id: number;
    district: string;
    city: string;
    street: string;
    house_number: string;
    phone_number1: string;
    phone_number2: string | null;
}




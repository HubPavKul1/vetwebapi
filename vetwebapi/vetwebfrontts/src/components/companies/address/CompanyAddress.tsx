import { IAddress } from "../../../interfaces/AddressInterfaces";

interface CompanyAddressProps {
    address: IAddress;
}

export function CompanyAddress({address}: CompanyAddressProps) {
    return (
        
            <div>
                <span>{address.city}</span>
                <span>{address.street}</span>
                <span>{address.house_number}</span>
                <span>тел 1: {address.phone_number1}</span>
                <span>тел 2: {address.phone_number2}</span>
            </div>

    )
}
import { IAddress } from "../../../interfaces/AddressInterfaces";

interface CompanyAddressProps {
    address: IAddress;
}

export function CompanyAddress({address}: CompanyAddressProps) {
    return (
        
            <div className="container address-wrap flex">
                <span className="address-item">г. {address.city}</span>
                <span className="address-item">{address.street}</span>
                <span className="address-item">{address.house_number}</span>
                <span className="address-item">тел 1: {address.phone_number1}</span>
                {
                    address.phone_number2 ? 
                    <span className="address-item">тел 2: {address.phone_number2}</span>: ""
                }
                
            </div>

    )
}
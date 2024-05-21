

import { useParams } from "react-router-dom"
import { AddDrugForm } from "../drugs/drugMovements/AddDrugForm"
import { MenuItem } from "../menuItem/MenuItem"



export function AddDrugToVetWork() {
    const {id} = useParams();
  
    return (
            <MenuItem title="Добавить препарат">
                <AddDrugForm url={`/api/vetwork/${id}/drug`} queryKey="vaccination"/>         
            </MenuItem>
    )
}
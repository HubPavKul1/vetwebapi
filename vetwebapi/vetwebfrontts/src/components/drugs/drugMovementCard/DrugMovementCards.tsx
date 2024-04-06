import { DrugMovementCard } from "./DrugMovementCard";
import { IDrugMovements } from "../../../interfaces/DrugInterfaces";


export function DrugMovementCards({drugMovements}: IDrugMovements ) {
    
    return (
       <>
            {drugMovements.map(drugMovement =>(
               <DrugMovementCard key={drugMovement.id} drugMovement={drugMovement} />               
           ))} 
       </>
                   
    )
}
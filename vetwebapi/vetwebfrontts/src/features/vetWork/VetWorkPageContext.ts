import { createContext } from "react";
import { IVetWorkPageContext } from "./models/interfaces";

export const VetWorkPageContext = createContext<IVetWorkPageContext | null>(
  null
);

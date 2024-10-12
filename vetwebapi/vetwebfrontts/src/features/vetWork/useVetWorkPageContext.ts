import { useContext } from "react";
import { VetWorkPageContext } from "./VetWorkPageContext";

export const useVetWorkPageContext = () => {
  const vetWorkContext = useContext(VetWorkPageContext);
  if (!vetWorkContext)
    throw new Error(
      "useVetWorkPageContext must be used within a VetWorkPageContextProvider"
    );

  return vetWorkContext;
};

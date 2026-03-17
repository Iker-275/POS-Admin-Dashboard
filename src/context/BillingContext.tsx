import { createContext,useState } from "react";
import { Billing } from "../types/BillingType";

export const BillingContext = createContext<any>(null);

export function BillingProvider({children}:any){

 const [billings,setBillings] = useState<Billing[]>([])

 return(

  <BillingContext.Provider value={{billings,setBillings}}>
    {children}
  </BillingContext.Provider>

 )

}
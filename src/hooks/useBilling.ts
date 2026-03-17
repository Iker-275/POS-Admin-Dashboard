
import { useEffect,useState } from "react";
import { billingService } from "../api/BillingApi";

export function useBilling(id?:string){

 const [billing,setBilling] = useState<any>(null)

 const fetchBilling = async()=>{

  if(!id) return;

  const res = await billingService.getBilling(id)

  setBilling(res.data)

 }

 useEffect(()=>{

  fetchBilling()

 },[id])

 return{

  billing,
  refresh:fetchBilling

 }

}
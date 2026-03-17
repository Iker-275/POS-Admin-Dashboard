import { useEffect,useState } from "react";
import { billingService } from "../api/BillingApi";

export function useBillingActions(){

 const reverse = async(id:string,payload:any)=>{

  return billingService.reverseBilling(id,payload)

 }

 const adjust = async(id:string,payload:any)=>{

  return billingService.adjustBilling(id,payload)

 }

 return{

  reverse,
  adjust

 }

}
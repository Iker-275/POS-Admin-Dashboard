export interface Discount {
  type: "percentage" | "fixed";
  value: number;
}

export interface Rate {
  _id: string;

  pricingPerUnit: number;
  currency: string;

  discount: Discount;

  effectiveFrom: string;
  effectiveTo: string | null;

  deletedAt: string | null;

  createdAt: string;
  updatedAt: string;

  __v: number;
}

export interface CreateRatePayload {
  pricingPerUnit: number;
  currency: string;
  discount: Discount;
}
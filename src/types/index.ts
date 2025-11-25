export interface MerchantStats {
  totalMerchants: number;
  activeMerchants: number;
  inactiveMerchants: number;
}

export interface PaymentStats {
  totalAmount: number;
  totalCount: number;
  successRate: number;
  todayAmount: number;
  todayCount: number;
}

export interface Payment {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}

export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
}

export interface MerchantsDetail {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

export type TabType = "dashboard" | "payments" | "merchants";

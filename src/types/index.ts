export interface StorsStats {
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
  mchtName: string;
  amount: number;
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
  registeredAt: string;
}

export type TabType = "dashboard" | "payments" | "merchants";

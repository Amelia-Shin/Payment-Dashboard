import SummaryBanner from "./SummaryBanner";

import type {
  MerchantStats,
  PaymentStats,
  Merchant,
  Payment,
} from "../../types";

interface DashboardViewProps {
  merchantStats: MerchantStats;
  paymentStats: PaymentStats;
  merchants: Merchant[];
  payments: Payment[];
}

export default function DashboardView({
  merchantStats,
  paymentStats,
}: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <SummaryBanner
        paymentStats={paymentStats}
        merchantStats={merchantStats}
      />
    </div>
  );
}

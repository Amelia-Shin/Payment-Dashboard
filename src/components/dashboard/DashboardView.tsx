import SummaryBanner from "./SummaryBanner";
import MetricsCards from "./MetricsCards";
import PaymentMethodStats from "./PaymentMethodStats";
import MerchantStatus from "./MerchanStatus";

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
  payments,
  merchants,
}: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <SummaryBanner
        paymentStats={paymentStats}
        merchantStats={merchantStats}
      />

      <MetricsCards paymentStats={paymentStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentMethodStats payments={payments} />
        <MerchantStatus merchants={merchants} />
      </div>
    </div>
  );
}

import { useState } from "react";
import PaymentFilters from "./PaymentFilters";
import PaymentTable from "./PaymentTable";
import type { Payment, PaymentStats, Merchant } from "../../types";

interface PaymentsViewProps {
  payments: Payment[];
  paymentStats: PaymentStats;
  merchants: Merchant[];
}

export default function PaymentsView({
  payments,
  paymentStats,
  merchants,
}: PaymentsViewProps) {
  const [dateRange, setDateRange] = useState("today");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [payTypeFilter, setPayTypeFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 필터링된 결제 내역
  const filteredPayments = payments.filter((payment) => {
    // 상태 필터
    if (statusFilter !== "all" && payment.status !== statusFilter) return false;

    // 결제 수단 필터
    if (payTypeFilter !== "all" && payment.payType !== payTypeFilter)
      return false;

    // 검색어 필터
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        payment.paymentCode.toLowerCase().includes(searchLower) ||
        payment.mchtCode.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <PaymentFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        payTypeFilter={payTypeFilter}
        setPayTypeFilter={setPayTypeFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        paymentStats={paymentStats}
      />

      <PaymentTable payments={filteredPayments} merchants={merchants} />
    </div>
  );
}

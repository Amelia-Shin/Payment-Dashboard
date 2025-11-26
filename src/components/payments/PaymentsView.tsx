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
  merchants,
}: PaymentsViewProps) {
  const [dateRange, setDateRange] = useState("today");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [payTypeFilter, setPayTypeFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 날짜 필터링 헬퍼 함수
  const isWithinDateRange = (paymentDate: string): boolean => {
    const paymentTime = new Date(paymentDate).getTime();
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();

    switch (dateRange) {
      case "today":
        return paymentTime >= today;
      case "week":
        const weekAgo = today - 7 * 24 * 60 * 60 * 1000;
        return paymentTime >= weekAgo;
      case "month":
        const monthAgo = today - 30 * 24 * 60 * 60 * 1000;
        return paymentTime >= monthAgo;
      case "custom":
        // 직접 설정 모드에서 날짜가 하나라도 입력되지 않았으면 필터링 안 함
        if (!startDate && !endDate) return false;

        const paymentDateOnly = new Date(paymentDate);
        paymentDateOnly.setHours(0, 0, 0, 0);
        const paymentDateTimestamp = paymentDateOnly.getTime();

        if (startDate && !endDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          return paymentDateTimestamp >= start.getTime();
        }

        if (!startDate && endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          return paymentDateTimestamp <= end.getTime();
        }

        // 둘 다 있는 경우
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        return (
          paymentDateTimestamp >= start.getTime() &&
          paymentDateTimestamp <= end.getTime()
        );
      default:
        return true;
    }
  };

  // 필터링된 결제 내역
  const filteredPayments = payments.filter((payment) => {
    // 날짜 필터
    if (!isWithinDateRange(payment.paymentAt)) return false;

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

  // 필터링된 통계 계산
  const filteredStats: PaymentStats = {
    totalCount: filteredPayments.length,
    totalAmount: filteredPayments
      .filter((p) => p.status === "SUCCESS")
      .reduce((sum, p) => sum + Number(p.amount), 0),
    successRate:
      filteredPayments.length > 0
        ? (filteredPayments.filter((p) => p.status === "SUCCESS").length /
            filteredPayments.length) *
          100
        : 0,
    todayCount: filteredPayments.length,
    todayAmount: filteredPayments
      .filter((p) => p.status === "SUCCESS")
      .reduce((sum, p) => sum + Number(p.amount), 0),
  };

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
        paymentStats={filteredStats}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <PaymentTable payments={filteredPayments} merchants={merchants} />
    </div>
  );
}

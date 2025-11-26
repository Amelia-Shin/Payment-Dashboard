import { useState, useEffect } from "react";
import Header from "./layout/Header";
import Navigation from "./layout/Navigation";
import DashboardView from "./dashboard/DashboardView";
import PaymentsView from "./payments/PaymentsView";

import type {
  TabType,
  Merchant,
  Payment,
  MerchantStats,
  PaymentStats,
} from "../types";

import { getMerchantsList, getPaymentsList } from "../services/api";

const PaymentDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  // 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [merchantsData, paymentsData] = await Promise.all([
          getMerchantsList(),
          getPaymentsList(),
        ]);

        setMerchants(merchantsData);
        setPayments(paymentsData);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 가맹점 통계 계산
  const merchantStats: MerchantStats = {
    totalMerchants: merchants.length,
    activeMerchants: merchants.filter((m) => m.status === "ACTIVE").length,
    inactiveMerchants: merchants.filter((m) => m.status === "INACTIVE").length,
  };

  // 결제 통계 계산
  const paymentStats: PaymentStats = (() => {
    const successPayments = payments.filter((p) => p.status === "SUCCESS");
    const totalAmount = successPayments.reduce(
      (sum, p) => Number(sum + p.amount),
      0
    );
    const successRate =
      payments.length > 0
        ? ((successPayments.length / payments.length) * 100).toFixed(1)
        : "0";

    return {
      totalAmount: totalAmount,
      totalCount: payments.length,
      successRate: parseFloat(successRate),
      todayAmount: totalAmount,
      todayCount: payments.length,
    };
  })();

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <DashboardView
            merchantStats={merchantStats}
            paymentStats={paymentStats}
            merchants={merchants}
            payments={payments}
            onViewAllTransactions={() => setActiveTab("payments")}
            onViewAllMerchants={() => setActiveTab("merchants")}
          />
        )}
        {activeTab === "payments" && (
          <PaymentsView
            payments={payments}
            paymentStats={paymentStats}
            merchants={merchants}
          />
        )}
      </main>
    </div>
  );
};

export default PaymentDashboard;

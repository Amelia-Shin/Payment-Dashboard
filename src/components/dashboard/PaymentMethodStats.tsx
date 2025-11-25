import type { Payment } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface PaymentMethodStatsProps {
  payments: Payment[];
}

export default function PaymentMethodStats({
  payments,
}: PaymentMethodStatsProps) {
  // 결제 수단별 통계 계산
  const stats = payments.reduce((acc, payment) => {
    if (payment.status === "SUCCESS") {
      if (!acc[payment.payType]) {
        acc[payment.payType] = { count: 0, amount: 0 };
      }
      acc[payment.payType].count += 1;
      acc[payment.payType].amount += Number(payment.amount);
    }
    return acc;
  }, {} as Record<string, { count: number; amount: number }>);

  const totalAmount = Object.values(stats).reduce(
    (sum, s) => sum + s.amount,
    0
  );

  const paymentTypes = [
    { type: "ONLINE", name: "온라인", color: "bg-blue-500", icon: "🌐" },
    { type: "DEVICE", name: "단말기", color: "bg-green-500", icon: "💳" },
    { type: "MOBILE", name: "모바일", color: "bg-purple-500", icon: "📱" },
    { type: "VACT", name: "가상계좌", color: "bg-orange-500", icon: "🏦" }, // ✨ 추가
    { type: "BILLING", name: "정기결제", color: "bg-pink-500", icon: "🔄" }, // ✨ 추가
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          결제 수단별 현황
        </h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          실시간
        </span>
      </div>
      <div className="space-y-5">
        {paymentTypes.map((item) => {
          const stat = stats[item.type] || { count: 0, amount: 0 };
          const percentage =
            totalAmount > 0
              ? ((stat.amount / totalAmount) * 100).toFixed(1)
              : "0";

          return (
            <div
              key={item.type}
              className="border-b border-gray-100 pb-4 last:border-0"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(stat.amount)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    {stat.count}건
                  </p>
                  <p className="text-xs text-gray-500">{percentage}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

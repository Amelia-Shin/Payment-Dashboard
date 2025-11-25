import { TrendingUp, TrendingDown } from "lucide-react";
import type { MerchantStats, PaymentStats } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface SummaryBannerProps {
  paymentStats: PaymentStats;
  merchantStats: MerchantStats;
}

export default function SummaryBanner({
  paymentStats,
  merchantStats,
}: SummaryBannerProps) {
  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 오늘 총 거래액 */}
        <div>
          <p className="text-blue-100 text-sm mb-2">오늘 총 거래액</p>
          <p className="text-4xl font-bold mb-1">
            {formatCurrency(paymentStats.todayAmount)}
          </p>
          <div className="flex items-center text-green-300 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            {paymentStats.todayCount}건 처리 완료
          </div>
        </div>

        {/* 결제 성공률 */}
        <div>
          <p className="text-blue-100 text-sm mb-2">결제 성공률</p>
          <p className="text-4xl font-bold mb-1">{paymentStats.successRate}%</p>
          <div className="w-full bg-blue-700 rounded-full h-2 mt-3">
            <div
              className="bg-green-400 h-2 rounded-full transition-all"
              style={{ width: `${paymentStats.successRate}%` }}
            />
          </div>
        </div>

        {/* 실패 거래 */}
        <div>
          <p className="text-blue-100 text-sm mb-2">실패 거래</p>
          <p className="text-4xl font-bold mb-1">
            {Math.round(
              paymentStats.todayCount * (1 - paymentStats.successRate / 100)
            )}
            건
          </p>
          <div className="flex items-center text-red-300 text-sm">
            <TrendingDown className="w-4 h-4 mr-1" />
            {formatCurrency(
              Math.round(
                paymentStats.todayAmount * (1 - paymentStats.successRate / 100)
              )
            )}{" "}
            손실
          </div>
        </div>

        {/* 활성 가맹점 */}
        <div>
          <p className="text-blue-100 text-sm mb-2">활성 가맹점</p>
          <p className="text-4xl font-bold mb-1">
            {merchantStats.activeMerchants}개
          </p>
          <p className="text-blue-100 text-sm mt-1">
            전체 {merchantStats.totalMerchants}개 중
          </p>
        </div>
      </div>
    </div>
  );
}

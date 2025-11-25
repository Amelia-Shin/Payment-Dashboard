// src/components/dashboard/MetricsCards.tsx

import {
  DollarSign,
  Calendar,
  BarChart3,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import type { PaymentStats } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface MetricsCardsProps {
  paymentStats: PaymentStats;
}

export default function MetricsCards({ paymentStats }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 평균 거래액 */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">AVG</p>
            <p className="text-sm text-green-600 font-semibold flex items-center justify-end">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.2%
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-1">
          {formatCurrency(
            Math.round(paymentStats.todayAmount / paymentStats.todayCount)
          )}
        </p>
        <p className="text-sm text-gray-500">평균 거래 금액</p>
      </div>

      {/* 정산 대기 금액 */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-orange-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">PENDING</p>
            <p className="text-sm text-orange-600 font-semibold">
              {Math.round(
                (paymentStats.todayCount * paymentStats.successRate) / 100
              )}
              건
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-1">
          {formatCurrency(
            Math.round(
              (paymentStats.todayAmount * paymentStats.successRate) / 100
            )
          )}
        </p>
        <p className="text-sm text-gray-500">정산 대기 금액</p>
      </div>

      {/* 수수료 수익 */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">FEE</p>
            <p className="text-sm text-green-600 font-semibold">2.5%</p>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-1">
          {formatCurrency(Math.round(paymentStats.todayAmount * 0.025))}
        </p>
        <p className="text-sm text-gray-500">예상 수수료 수익</p>
      </div>

      {/* 누적 거래액 */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <CreditCard className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">TOTAL</p>
            <p className="text-sm text-gray-600 font-semibold">
              {paymentStats.totalCount}건
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-1">
          {formatCurrency(paymentStats.totalAmount)}
        </p>
        <p className="text-sm text-gray-500">누적 거래액</p>
      </div>
    </div>
  );
}

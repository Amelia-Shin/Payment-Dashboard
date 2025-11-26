import { CreditCard, ChevronRight } from "lucide-react";
import type { Payment, Merchant } from "../../types";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusText,
  getPayTypeText,
} from "../../utils/formatters";

interface RecentTransactionsProps {
  payments: Payment[];
  merchants: Merchant[];
  onViewAll?: () => void;
}

export default function RecentTransactions({
  payments,
  merchants,
  onViewAll,
}: RecentTransactionsProps) {
  // 가맹점 코드로 가맹점명 찾기
  const getMerchantName = (mchtCode: string): string => {
    const merchant = merchants.find((m) => m.mchtCode === mchtCode);
    return merchant?.mchtName || mchtCode;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">최근 거래</h3>
            <p className="text-sm text-gray-500 mt-1">최근 거래 내역</p>
          </div>
          <button
            onClick={onViewAll}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            전체 보기
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {payments.slice(0, 5).map((payment) => (
            <div
              key={payment.paymentCode}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`p-3 rounded-lg ${
                    payment.status === "SUCCESS" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <CreditCard
                    className={`w-5 h-5 ${
                      payment.status === "SUCCESS"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {getMerchantName(payment.mchtCode)}
                    </p>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mt-1">
                    <p className="text-xs text-gray-500">
                      {payment.paymentCode}
                    </p>
                    <span className="text-gray-300">•</span>
                    <p className="text-xs text-gray-500">
                      {getPayTypeText(payment.payType)}
                    </p>
                    <span className="text-gray-300">•</span>
                    <p className="text-xs text-gray-500">
                      {formatDate(payment.paymentAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(Number(payment.amount), payment.currency)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

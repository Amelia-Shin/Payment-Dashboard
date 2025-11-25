// src/components/dashboard/MerchantStatus.tsx

import { Users, ChevronRight } from "lucide-react";
import type { Merchant } from "../../types";
import { getStatusColor, getStatusText } from "../../utils/formatters";

interface MerchantStatusProps {
  merchants: Merchant[];
}

export default function MerchantStatus({ merchants }: MerchantStatusProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">가맹점 현황</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
          전체보기
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="space-y-4">
        {merchants.slice(0, 5).map((merchant) => (
          <div
            key={merchant.mchtCode}
            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  merchant.status === "ACTIVE" ? "bg-green-100" : "bg-gray-200"
                }`}
              >
                <Users
                  className={`w-5 h-5 ${
                    merchant.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {merchant.mchtName}
                </p>
                <p className="text-xs text-gray-500">{merchant.mchtCode}</p>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                merchant.status
              )}`}
            >
              {getStatusText(merchant.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

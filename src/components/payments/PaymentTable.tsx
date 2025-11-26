import type { Payment, Merchant } from "../../types";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusText,
  getPayTypeText,
} from "../../utils/formatters";

interface PaymentTableProps {
  payments: Payment[];
  merchants: Merchant[];
}

export default function PaymentTable({
  payments,
  merchants,
}: PaymentTableProps) {
  // 가맹점 코드로 가맹점명 찾기
  const getMerchantName = (mchtCode: string): string => {
    const merchant = merchants.find((m) => m.mchtCode === mchtCode);
    return merchant?.mchtName || mchtCode;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                결제코드
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                가맹점
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                거래금액
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                수수료
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                결제수단
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                결제상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                정산상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                결제일시
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => {
              const fee = Math.round(Number(payment.amount) * 0.025); // 2.5% 수수료
              const settlementStatus =
                payment.status === "SUCCESS" ? "정산대기" : "-";

              return (
                <tr key={payment.paymentCode} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.paymentCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {getMerchantName(payment.mchtCode)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.mchtCode}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(Number(payment.amount), payment.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payment.status === "SUCCESS"
                      ? formatCurrency(fee, payment.currency)
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getPayTypeText(payment.payType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {getStatusText(payment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {settlementStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(payment.paymentAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">조회된 거래 내역이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

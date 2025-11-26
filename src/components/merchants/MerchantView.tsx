import { useState } from "react";
import { Users, Search, DollarSign, BarChart3 } from "lucide-react";
import type { Merchant, Payment, MerchantStats } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface MerchantsViewProps {
  merchants: Merchant[];
  payments: Payment[];
  merchantStats: MerchantStats;
  merchantStatusCodes: Array<{ code: string; description: string }>;
}

export default function MerchantsView({
  merchants,
  payments,
  merchantStats,
  merchantStatusCodes,
}: MerchantsViewProps) {
  const [merchantType, setMerchantType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 상태별 가맹점 필터링
  const filteredMerchants = merchants.filter((m) => {
    // 상태 필터
    if (merchantType !== "all" && m.status !== merchantType) {
      return false;
    }

    // 검색어 필터
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        m.mchtName.toLowerCase().includes(searchLower) ||
        m.mchtCode.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // 상태별 카운트 계산 (동적)
  const statusCounts = merchantStatusCodes.reduce((acc, status) => {
    acc[status.code] = merchants.filter((m) => m.status === status.code).length;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 변환 (API 기반)
  const getStatusKorean = (status: string): string => {
    const found = merchantStatusCodes.find((s) => s.code === status);
    return found ? found.description : status;
  };

  // 상태별 색상 (동적으로 생성 - ACTIVE를 기본 스타일로)
  const getStatusColorCustom = (status: string): string => {
    if (status === "ACTIVE") return "bg-green-100 text-green-800";
    if (status === "READY") return "bg-yellow-100 text-yellow-800";
    if (status === "INACTIVE") return "bg-gray-100 text-gray-800";
    if (status === "CLOSED") return "bg-red-100 text-red-800";
    return "bg-blue-100 text-blue-800"; // 기본값
  };

  // 카드 헤더 배경색
  const getHeaderBgColor = (status: string): string => {
    if (status === "ACTIVE")
      return "bg-gradient-to-br from-blue-50 to-blue-100";
    if (status === "READY")
      return "bg-gradient-to-br from-yellow-50 to-yellow-100";
    if (status === "INACTIVE")
      return "bg-gradient-to-br from-gray-50 to-gray-100";
    if (status === "CLOSED") return "bg-gradient-to-br from-red-50 to-red-100";
    return "bg-gradient-to-br from-blue-50 to-blue-100";
  };

  // 카드 아이콘 색상
  const getIconColor = (status: string): string => {
    if (status === "ACTIVE") return "bg-white text-blue-600 shadow-sm";
    if (status === "READY") return "bg-white text-yellow-600 shadow-sm";
    if (status === "INACTIVE") return "bg-gray-200 text-gray-400";
    if (status === "CLOSED") return "bg-white text-red-600 shadow-sm";
    return "bg-white text-blue-600 shadow-sm";
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">가맹점 관리</h2>

        {/* 검색 */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="가맹점명 또는 가맹점코드를 검색하세요"
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  // Enter 키로도 검색 가능
                }
              }}
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 검색 결과 표시 */}
        {searchTerm && (
          <div className="mb-4 text-sm text-gray-600">
            "<span className="font-semibold text-gray-900">{searchTerm}</span>"
            검색 결과: {filteredMerchants.length}개
          </div>
        )}

        {/* 필터 탭 - API 기반 동적 생성 */}
        <div className="flex items-center gap-4 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setMerchantType("all")}
            className={`px-4 py-3 font-medium transition-colors relative whitespace-nowrap ${
              merchantType === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            전체 ({merchantStats.totalMerchants})
          </button>
          {merchantStatusCodes.map((status) => (
            <button
              key={status.code}
              onClick={() => setMerchantType(status.code)}
              className={`px-4 py-3 font-medium transition-colors relative whitespace-nowrap ${
                merchantType === status.code
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {status.description} ({statusCounts[status.code] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* 가맹점 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMerchants.map((merchant) => {
          const merchantPayments = payments.filter(
            (p) => p.mchtCode === merchant.mchtCode
          );
          const transactionCount = merchantPayments.length;
          const successCount = merchantPayments.filter(
            (p) => p.status === "SUCCESS"
          ).length;
          const transactionAmount = merchantPayments.reduce(
            (sum, p) => sum + (p.status === "SUCCESS" ? Number(p.amount) : 0),
            0
          );
          const successRate =
            transactionCount > 0
              ? ((successCount / transactionCount) * 100).toFixed(1)
              : "0";

          return (
            <div
              key={merchant.mchtCode}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden cursor-pointer group"
            >
              {/* 카드 헤더 */}
              <div className={`p-6 ${getHeaderBgColor(merchant.status)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold ${getIconColor(
                      merchant.status
                    )}`}
                  >
                    {merchant.mchtName.substring(0, 2)}
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColorCustom(
                      merchant.status
                    )}`}
                  >
                    {getStatusKorean(merchant.status)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {merchant.mchtName}
                </h3>
                <p className="text-sm text-gray-600 font-mono">
                  {merchant.mchtCode}
                </p>
              </div>

              {/* 카드 바디 */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* 업종 */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">업종</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {merchant.bizType}
                    </span>
                  </div>

                  {/* 거래 건수 */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">거래 건수</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {transactionCount > 0 ? `${transactionCount}건` : "0건"}
                    </span>
                  </div>

                  {/* 거래 금액 */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">거래 금액</span>
                    <span className="text-sm font-bold text-blue-600">
                      {transactionAmount > 0
                        ? formatCurrency(transactionAmount)
                        : "₩0"}
                    </span>
                  </div>

                  {/* 결제 성공률 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">결제 성공률</span>
                    <span
                      className={`text-sm font-semibold ${
                        parseFloat(successRate) >= 90
                          ? "text-green-600"
                          : parseFloat(successRate) >= 70
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {successRate}%
                    </span>
                  </div>
                </div>

                {/* 상세보기 버튼 */}
                <button className="w-full mt-6 px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium group-hover:border-blue-500">
                  상세보기
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 가맹점이 없는 경우 */}
      {filteredMerchants.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 border border-gray-200 text-center">
          <div className="text-gray-400 mb-4">
            <Users className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-gray-600 text-lg mb-2">
            {merchantType === "all"
              ? "등록된 가맹점이 없습니다"
              : `${getStatusKorean(merchantType)} 상태의 가맹점이 없습니다`}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            새로운 가맹점을 등록하여 서비스를 시작하세요
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center">
            <Users className="w-5 h-5 mr-2" />
            가맹점 등록하기
          </button>
        </div>
      )}

      {/* 통계 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">총 가맹점</p>
              <p className="text-3xl font-bold text-gray-900">
                {merchantStats.totalMerchants}개
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {merchantStatusCodes.map((status, index) => (
                  <span key={status.code}>
                    {status.description} {statusCounts[status.code] || 0}
                    {index < merchantStatusCodes.length - 1 ? " / " : ""}
                  </span>
                ))}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">총 거래액</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(
                  payments.reduce(
                    (sum, p) =>
                      sum + (p.status === "SUCCESS" ? Number(p.amount) : 0),
                    0
                  )
                )}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {payments.length}건 처리 완료
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">평균 성공률</p>
              <p className="text-3xl font-bold text-gray-900">
                {payments.length > 0
                  ? (
                      (payments.filter((p) => p.status === "SUCCESS").length /
                        payments.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </p>
              <p className="text-xs text-gray-500 mt-2">전체 가맹점 평균</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

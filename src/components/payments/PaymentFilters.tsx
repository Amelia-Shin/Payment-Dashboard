import { Calendar, Filter, Search, X } from "lucide-react";
import type { PaymentStats } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface PaymentFiltersProps {
  dateRange: string;
  setDateRange: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  payTypeFilter: string;
  setPayTypeFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  paymentStats: PaymentStats;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  paymentStatusCodes: Array<{ code: string; description: string }>;
  paymentTypeCodes: Array<{ type: string; description: string }>;
}

export default function PaymentFilters({
  dateRange,
  setDateRange,
  statusFilter,
  setStatusFilter,
  payTypeFilter,
  setPayTypeFilter,
  searchTerm,
  setSearchTerm,
  paymentStats,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  paymentStatusCodes,
  paymentTypeCodes,
}: PaymentFiltersProps) {
  // 필터 초기화
  const handleReset = () => {
    setDateRange("today");
    setStatusFilter("all");
    setPayTypeFilter("all");
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  // 활성화된 필터 개수
  const activeFiltersCount =
    (dateRange !== "today" ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (payTypeFilter !== "all" ? 1 : 0) +
    (searchTerm ? 1 : 0);

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">필터</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleReset}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            초기화
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* 기간 선택 */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기간 선택
          </label>
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="today">오늘</option>
              <option value="week">최근 7일</option>
              <option value="month">최근 30일</option>
              <option value="custom">직접 설정</option>
            </select>
            <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* 결제 상태 */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            결제 상태
          </label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">전체</option>
              {paymentStatusCodes.map((status) => (
                <option key={status.code} value={status.code}>
                  {status.description}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* 결제 수단 */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            결제 수단
          </label>
          <div className="relative">
            <select
              value={payTypeFilter}
              onChange={(e) => setPayTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">전체</option>
              {paymentTypeCodes.map((type) => (
                <option key={type.type} value={type.type}>
                  {type.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 검색 */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            검색
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="결제코드, 가맹점코드로 검색"
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 직접 설정 날짜 선택 */}
      {dateRange === "custom" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시작일
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              종료일
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* 통계 요약  */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          총{" "}
          <span className="font-semibold text-gray-900">
            {paymentStats.totalCount}건
          </span>
          의 거래 내역
          <span className="mx-2">|</span>
          총액{" "}
          <span className="font-semibold text-gray-900">
            {formatCurrency(paymentStats.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}

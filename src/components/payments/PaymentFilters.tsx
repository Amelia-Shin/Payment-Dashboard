import { Calendar, Filter, Search } from "lucide-react";
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
}: PaymentFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="SUCCESS">성공</option>
              <option value="FAILED">실패</option>
              <option value="PENDING">대기</option>
              <option value="CANCELLED">취소</option>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="ONLINE">온라인</option>
              <option value="DEVICE">단말기</option>
              <option value="MOBILE">모바일</option>
              <option value="VACT">가상계좌</option>
              <option value="BILLING">정기결제</option>
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
              placeholder="결제코드, 가맹점명, 가맹점코드로 검색"
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* 통계 요약 + 엑셀 다운로드 */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
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

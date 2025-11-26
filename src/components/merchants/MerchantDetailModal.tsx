import { useEffect, useState } from "react";
import {
  X,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
} from "lucide-react";
import type { MerchantsDetail } from "../../types";

import { formatDate } from "../../utils/formatters";
import { getMerchantDetails } from "../../services/api";

interface MerchantDetailModalProps {
  mchtCode: string;
  onClose: () => void;
}

export default function MerchantDetailModal({
  mchtCode,
  onClose,
}: MerchantDetailModalProps) {
  const [merchant, setMerchant] = useState<MerchantsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMerchantDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMerchantDetails(mchtCode);

        const mchtInfo = data.find((m) => m.mchtCode === mchtCode);

        if (mchtInfo) {
          setMerchant(mchtInfo);
        } else {
          setError(`가맹점 코드 ${mchtCode}를 찾을 수 없습니다.`);
        }
      } catch (err) {
        console.error("가맹점 상세 정보 로딩 실패:", err);
        setError("가맹점 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMerchantDetail();
  }, [mchtCode]);

  // 상태 텍스트 변환
  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      READY: "대기",
      ACTIVE: "활성",
      INACTIVE: "중지",
      CLOSED: "폐기",
    };
    return statusMap[status] || status;
  };

  // 상태 색상
  const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      READY: "bg-yellow-100 text-yellow-800",
      ACTIVE: "bg-green-100 text-green-800",
      INACTIVE: "bg-gray-100 text-gray-800",
      CLOSED: "bg-red-100 text-red-800",
    };
    return colorMap[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">가맹점 상세 정보</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 바디 */}
        <div className="p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">가맹점 정보를 불러오는 중...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-red-600 text-5xl mb-4">⚠️</div>
              <p className="text-gray-900 text-lg font-semibold mb-2">
                오류 발생
              </p>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                닫기
              </button>
            </div>
          )}

          {!loading && !error && merchant && (
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl font-bold text-blue-600 shadow-sm">
                      {merchant.mchtName.substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {merchant.mchtName}
                      </h3>
                      <p className="text-sm text-gray-600 font-mono">
                        {merchant.mchtCode}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                      merchant.status
                    )}`}
                  >
                    {getStatusText(merchant.status)}
                  </span>
                </div>
              </div>

              {/* 상세 정보 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 업종 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">업종</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 ml-13">
                    {merchant.bizType}
                  </p>
                </div>

                {/* 사업자번호 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">사업자번호</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 ml-13 font-mono">
                    {merchant.bizNo}
                  </p>
                </div>

                {/* 전화번호 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">전화번호</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 ml-13">
                    {merchant.phone}
                  </p>
                </div>

                {/* 이메일 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">이메일</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 ml-13 break-all">
                    {merchant.email}
                  </p>
                </div>
              </div>

              {/* 주소 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">주소</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 ml-13">
                  {merchant.address}
                </p>
              </div>

              {/* 등록/수정 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">등록일</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 ml-13">
                    {formatDate(merchant.registeredAt)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-sm text-gray-600">최종 수정일</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 ml-13">
                    {formatDate(merchant.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 푸터 */}
        {!loading && !error && merchant && (
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
            >
              닫기
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">
              수정하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

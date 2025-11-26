// 통화 포맷팅
export const formatCurrency = (
  amount: number,
  currency: string = "KRW"
): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// 날짜 포맷팅
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// 상태 뱃지 색상
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "SUCCESS":
    case "ACTIVE":
      return "bg-green-100 text-green-800";
    case "FAILED":
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "INACTIVE":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

// 상태 텍스트 한글화
export const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    SUCCESS: "성공",
    FAILED: "실패",
    CANCELLED: "취소",
    PENDING: "대기",
    ACTIVE: "활성",
    INACTIVE: "비활성",
  };
  return statusMap[status] || status;
};

// 결제 수단 텍스트 한글화
export const getPayTypeText = (payType: string): string => {
  const payTypeMap: Record<string, string> = {
    ONLINE: "온라인",
    DEVICE: "단말기",
    MOBILE: "모바일",
    VACT: "가상계좌",
    BILLING: "정기결제",
  };
  return payTypeMap[payType] || payType;
};

import type { Merchant, Payment } from "../types";

const API_BASE_URL = "https://recruit.paysbypays.com/api/v1";

// API 응답 타입
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// 공통 API 호출 함수
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result: ApiResponse<T> = await response.json();
    return result.data;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}

// 가맹점 목록 조회
export async function getMerchantsList(): Promise<Merchant[]> {
  return fetchApi<Merchant[]>("/merchants/list");
}

// 가맹점 상세 조회
export async function getMerchantDetails(
  mchtCode?: string
): Promise<Merchant[]> {
  const endpoint = mchtCode
    ? `/merchants/details?mchtCode=${mchtCode}`
    : "/merchants/details";
  return fetchApi<Merchant[]>(endpoint);
}

// 거래 내역 조회 (최신순)
export async function getPaymentsList(): Promise<Payment[]> {
  return (await fetchApi<Payment[]>("/payments/list")).reverse();
}

// 결제 상태 코드 조회
export async function getPaymentStatusAll(): Promise<
  Array<{ code: string; description: string }>
> {
  return fetchApi<Array<{ code: string; description: string }>>(
    "/common/payment-status/all"
  );
}

// 결제 수단 코드 조회
export async function getPaymentTypeAll(): Promise<
  Array<{ type: string; description: string }>
> {
  return fetchApi<Array<{ type: string; description: string }>>(
    "/common/paymemt-type/all"
  );
}

// 가맹점 상태 코드 조회
export async function getMerchantStatusAll(): Promise<
  Array<{ code: string; description: string }>
> {
  return fetchApi<Array<{ code: string; description: string }>>(
    "/common/mcht-status/all"
  );
}

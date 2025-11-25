import type { TabType } from "../../types";

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => onTabChange("dashboard")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "dashboard"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            대시보드
          </button>
          <button
            onClick={() => onTabChange("payments")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "payments"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            거래 내역
          </button>
          <button
            onClick={() => onTabChange("merchants")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "merchants"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            가맹점 관리
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;

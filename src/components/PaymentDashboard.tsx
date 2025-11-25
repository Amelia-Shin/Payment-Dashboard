// src/components/PaymentDashboard.tsx

import { useState } from "react";
import Header from "./layout/Header";
import Navigation from "./layout/Navigation";
import type { TabType } from "../types";

export const PaymentDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default PaymentDashboard;

'use client';

import React from 'react';
import PosCounter from '../../pos/counter/page';

export default function AdminCounterPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-white font-serif">كاونتر البيع السريع (الإدارة)</h1>
        <p className="text-xs text-gray-400">إجراء المبيعات المباشرة كمدير وتوثيق الفواتير باسم حساب الإدارة الحالي.</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <PosCounter saleSource="ADMIN_COUNTER" />
      </div>
    </div>
  );
}

import React, { Suspense } from 'react';
import OrderSuccess from '../../views/storefront/OrderSuccess';

export const metadata = {
  title: 'DAHAB PERFUMES | Order Confirmed',
  description: 'Thank you for choosing DAHAB PERFUMES. Confirm your order via WhatsApp for quick delivery details.',
  robots: 'noindex, nofollow',
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-28 text-sm font-light text-zinc-500">Loading invoice data...</div>}>
      <OrderSuccess />
    </Suspense>
  );
}

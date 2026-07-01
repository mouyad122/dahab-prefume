import React from 'react';
import Checkout from '../../views/storefront/Checkout';

export const metadata = {
  title: 'DAHAB PERFUMES | Guest Checkout',
  description: 'Complete your guest checkout details to confirm your order.',
  robots: 'noindex, nofollow',
};

export default function CheckoutPage() {
  return <Checkout />;
}

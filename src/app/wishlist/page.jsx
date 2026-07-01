import React from 'react';
import Wishlist from '../../views/storefront/Wishlist';

export const metadata = {
  title: 'DAHAB PERFUMES | Saved Fragrances',
  description: 'View your wishlist of saved niche perfumes and luxury hair mists.',
  robots: 'noindex, nofollow',
};

export default function WishlistPage() {
  return <Wishlist />;
}

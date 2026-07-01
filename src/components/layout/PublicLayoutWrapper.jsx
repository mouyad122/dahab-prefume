'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CartDrawer from '../cart/CartDrawer';
import CartHydrator from '../cart/CartHydrator';

export default function PublicLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname && pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <CartHydrator />
      <Header />
      <main className="flex-grow transition-all duration-300">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
    </>
  );
}

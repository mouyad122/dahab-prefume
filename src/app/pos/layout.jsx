import React from 'react';
import PosLayoutClient from './PosLayoutClient';

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      nocache: true,
    },
  },
};

export default function PosLayout({ children }) {
  return <PosLayoutClient>{children}</PosLayoutClient>;
}

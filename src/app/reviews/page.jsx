import React from 'react';
import StaticPages from '../../views/storefront/StaticPages';
import ReviewsPreview from '../../components/home/ReviewsPreview';

export const metadata = {
  title: 'Customer Reviews | DAHAB PERFUMES',
  description: 'Read real customer experiences with DAHAB PERFUMES in Jordan. Verified feedback on our scent longevity, sillage performance, and service.',
  alternates: {
    canonical: '/reviews',
  },
  openGraph: {
    title: 'Customer Reviews | DAHAB PERFUMES',
    description: 'Read real client testimonials about scent performance and longevity of DAHAB PERFUMES.',
    url: 'https://dahabperfume.com/reviews',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Reviews | DAHAB PERFUMES',
    description: 'Read real client testimonials about scent performance and longevity of DAHAB PERFUMES.',
  }
};

export default function ReviewsPage() {
  return (
    <div className="w-full flex flex-col">
      <StaticPages />
      <ReviewsPreview isSubPage={true} />
    </div>
  );
}

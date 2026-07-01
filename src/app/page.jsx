import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TrustStrip from '../components/home/TrustStrip';
import FeaturedCollections from '../components/home/FeaturedCollections';
import FeaturedProductSection from '../components/home/FeaturedProductSection';
import HairMistsPreview from '../components/home/HairMistsPreview';
import MiddleEasternPreview from '../components/home/MiddleEasternPreview';
import WhyDahabSection from '../components/home/WhyDahabSection';
import ReviewsPreview from '../components/home/ReviewsPreview';
import StoreCTA from '../components/home/StoreCTA';
import FinalCTA from '../components/home/FinalCTA';

import JSONLD from '../components/layout/JSONLD';

export const metadata = {
  title: 'DAHAB PERFUMES | Luxury Perfumes in Amman',
  description: 'Discover DAHAB PERFUMES in Amman, a luxury fragrance boutique offering hand-blended perfumes, hair mists, and Middle Eastern scents with lasting performance.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DAHAB PERFUMES | Luxury Perfumes in Amman',
    description: 'Let your scent spread your influence. Discover our hand-blended luxury niche fragrances, hair mists, and oud scents.',
    url: 'https://dahabperfume.com',
    siteName: 'DAHAB PERFUMES',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <JSONLD type="organization" />
      <JSONLD type="local-business" />
      <HeroSection />
      <TrustStrip />
      <FeaturedCollections />
      <FeaturedProductSection />
      <HairMistsPreview />
      <MiddleEasternPreview />
      <WhyDahabSection />
      <ReviewsPreview />
      <StoreCTA />
      <FinalCTA />
    </div>
  );
}

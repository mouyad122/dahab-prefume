'use client';

import { useEffect } from 'react';
import { useCartStore } from '../../stores/useCartStore';

/**
 * CartHydrator — mounts once on the client and hydrates the Zustand cart/wishlist
 * from localStorage. This prevents SSR/client hydration mismatch because the
 * store initialises with empty arrays on the server.
 */
export default function CartHydrator() {
  const hydrate = useCartStore(state => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null; // renders nothing
}

import { useEffect } from 'react';

const GIFT_COLLECTION_URL = 'https://collshp.com/dboraalves936884?share_channel_code=1&view=storefront';

export default function GiftList() {
  useEffect(() => {
    window.location.replace(GIFT_COLLECTION_URL);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 text-center font-inter text-ink">
      <p>Redirecionando para a lista de presentes...</p>
    </main>
  );
}

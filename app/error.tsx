'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div>
      <p>Algo salió mal, prueba refrescando la pagina</p>
    </div>
  );
}

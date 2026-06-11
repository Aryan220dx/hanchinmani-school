"use client";

import { useState } from "react";
import { SCHOOL_INFO } from "@/lib/schoolInfo";

export function MapEmbed() {
  const [interactive, setInteractive] = useState(false);

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-white/15 bg-white/10 md:h-[26rem]">
      {!interactive ? (
        <button
          type="button"
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 md:hidden"
          onClick={() => setInteractive(true)}
        >
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-glass">
            Tap to interact with map
          </span>
        </button>
      ) : null}
      <iframe
        src={SCHOOL_INFO.address.embedSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Hanchinmani School Location"
      />
    </div>
  );
}

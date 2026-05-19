"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { galleryImages } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function GalleryTeaser() {
  const [index, setIndex] = useState(-1);
  const images = galleryImages.slice(0, 5);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-padded">
        <SectionHeader eyebrow="Our World" title="Campus in View" description="Real institutional imagery from the school archive, presented with a calmer and more cinematic rhythm." />
        <div className="mt-14 grid gap-4 md:grid-cols-4 md:grid-rows-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              onClick={() => setIndex(i)}
              className={`focus-ring group relative min-h-[220px] overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              aria-label={`Open ${image.alt}`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-70 transition group-hover:opacity-40" />
            </button>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/gallery" variant="outline">View Full Gallery</Button>
        </div>
      </div>
      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} slides={images.map((image) => ({ src: image.src, alt: image.alt }))} />
    </section>
  );
}

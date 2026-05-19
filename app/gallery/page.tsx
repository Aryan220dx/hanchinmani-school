"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { galleryImages } from "@/lib/data/site";

export default function GalleryPage() {
  const [index, setIndex] = useState(-1);

  return (
    <section className="bg-surface pb-24 pt-36">
      <div className="container-padded">
        <SectionHeader eyebrow="Our World" title="Gallery" description="A masonry-style visual archive using real school imagery available from the legacy site." />
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, i) => (
            <button className="focus-ring group relative mb-5 block w-full overflow-hidden rounded-2xl bg-white shadow-glass" key={image.src} onClick={() => setIndex(i)}>
              <Image src={image.src} alt={image.alt} width={900} height={650} className="h-auto w-full transition duration-700 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </div>
      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} slides={galleryImages.map((image) => ({ src: image.src, alt: image.alt }))} />
    </section>
  );
}

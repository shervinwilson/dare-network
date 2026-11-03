import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { safeSanityImageUrl } from "@/sanity/lib/media";
import type { PortableTextBlock } from "@/sanity/lib/types";

function safeLink(value: string | undefined) {
  if (!value || value.startsWith("//")) return null;
  if (value.startsWith("/") || value.startsWith("#")) return value;

  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol)
      ? value
      : null;
  } catch {
    return null;
  }
}

const components: PortableTextComponents<PortableTextBlock> = {
  types: {
    image: ({ value }) => {
      const src = safeSanityImageUrl(value.url);
      if (!src) return null;

      return (
        <figure className="rich-image">
          <Image
            src={src}
            alt={value.alt ?? ""}
            width={1600}
            height={1000}
            sizes="(max-width: 760px) 100vw, 760px"
          />
          {value.alt && <figcaption>{value.alt}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = safeLink(value?.href);
      return href ? (
        <a href={href} rel={href.startsWith("http") ? "noreferrer" : undefined}>
          {children}
        </a>
      ) : (
        <>{children}</>
      );
    },
  },
};

export default function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}

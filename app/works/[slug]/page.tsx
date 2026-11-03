import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RichText from "@/sanity/components/RichText";
import { getCaseStudy } from "@/sanity/lib/content";
import { isSanityConfigured } from "@/sanity/lib/client";
import { safeSanityImageUrl } from "@/sanity/lib/media";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) return { title: "Selected Work | Dare Network" };

  return {
    title: `${caseStudy.client}: ${caseStudy.title} | Dare Network`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!isSanityConfigured) {
    return (
      <main className="content-page content-notice">
        <h1>Sanity is not connected yet.</h1>
        <p>Set NEXT_PUBLIC_SANITY_PROJECT_ID in the repository root .env.local to load case studies.</p>
      </main>
    );
  }
  if (!caseStudy) notFound();

  const imageUrl = safeSanityImageUrl(caseStudy.imageUrl);

  return (
    <main className="content-page content-article">
      <Link className="content-back" href="/works">← All work</Link>
      <header className="article-header">
        <p className="content-eyebrow">{caseStudy.client} / {caseStudy.industry}</p>
        <h1>{caseStudy.title}</h1>
        <p className="article-excerpt">{caseStudy.summary}</p>
      </header>
      {imageUrl && (
        <div className="article-image">
          <Image src={imageUrl} alt={caseStudy.imageAlt ?? ""} fill sizes="(max-width: 1100px) 100vw, 1100px" priority />
        </div>
      )}
      <section className="case-results" aria-label="Results">
        {caseStudy.results.map((result) => (
          <div className="case-result" key={result._key}>
            <strong>{result.value}</strong>
            <span>{result.label}</span>
          </div>
        ))}
      </section>
      <section className="case-detail-section">
        <h2>The challenge</h2>
        <RichText value={caseStudy.challenge} />
      </section>
      <section className="case-detail-section">
        <h2>The approach</h2>
        <RichText value={caseStudy.approach} />
      </section>
    </main>
  );
}

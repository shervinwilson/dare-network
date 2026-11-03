import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RichText from "@/sanity/components/RichText";
import { getPost } from "@/sanity/lib/content";
import { isSanityConfigured } from "@/sanity/lib/client";
import { safeSanityImageUrl } from "@/sanity/lib/media";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? ""
    : new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(parsedDate);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog | Dare Network" };

  return {
    title: `${post.title} | Dare Network`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!isSanityConfigured) {
    return (
      <main className="content-page content-notice">
        <h1>Sanity is not connected yet.</h1>
        <p>Set NEXT_PUBLIC_SANITY_PROJECT_ID in the repository root .env.local to load blog content.</p>
      </main>
    );
  }
  if (!post) notFound();

  const imageUrl = safeSanityImageUrl(post.imageUrl);

  return (
    <main className="content-page content-article">
      <Link className="content-back" href="/blog">← All articles</Link>
      <header className="article-header">
        <p className="content-eyebrow">
          {[post.category, formatDate(post.publishedAt)].filter(Boolean).join(" · ")}
        </p>
        <h1>{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>
        {post.author && <p className="content-author">By {post.author}</p>}
      </header>
      {imageUrl && (
        <div className="article-image">
          <Image src={imageUrl} alt={post.imageAlt ?? ""} fill sizes="(max-width: 1100px) 100vw, 1100px" priority />
        </div>
      )}
      <article className="rich-content">
        <RichText value={post.body} />
      </article>
    </main>
  );
}

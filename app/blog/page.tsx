import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/sanity/lib/content";
import { isSanityConfigured } from "@/sanity/lib/client";
import { safeSanityImageUrl } from "@/sanity/lib/media";

export const metadata: Metadata = {
  title: "Blog | Dare Network",
  description: "Ideas and practical advice on commerce, B2B growth, and lead generation.",
};

function formatDate(date: string) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? ""
    : new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(parsedDate);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="content-page">
      <section className="content-hero">
        <p className="content-eyebrow">Dare Network / Ideas</p>
        <h1>Thinking about growth<span>.</span></h1>
        <p>Practical ideas on commerce, demand generation, and building better growth systems.</p>
      </section>

      {!isSanityConfigured ? (
        <p className="content-empty">
          Connect Sanity by setting NEXT_PUBLIC_SANITY_PROJECT_ID in the repository root .env.local.
        </p>
      ) : posts?.length ? (
        <section className="content-grid" aria-label="Blog posts">
          {posts.map((post) => {
            const imageUrl = safeSanityImageUrl(post.imageUrl);
            const postHref = `/blog/${encodeURIComponent(post.slug)}`;

            return (
              <article className="content-card" key={post._id}>
                <Link href={postHref} className="content-card-image">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                  ) : (
                    <span>Dare Network</span>
                  )}
                </Link>
                <div className="content-card-body">
                  <p className="content-meta">
                    {[post.category, formatDate(post.publishedAt)].filter(Boolean).join(" · ")}
                  </p>
                  <h2><Link href={postHref}>{post.title}</Link></h2>
                  <p>{post.excerpt}</p>
                  {post.author && <p className="content-author">By {post.author}</p>}
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <p className="content-empty">No published blog posts yet. Publish a post in Sanity Studio to see it here.</p>
      )}
    </main>
  );
}

import { defineQuery } from "next-sanity";

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]
    | order(publishedAt desc) {
      _id,
      "title": coalesce(title, ""),
      "slug": coalesce(slug.current, ""),
      "client": coalesce(client, ""),
      "businessUnit": coalesce(businessUnit, "commerce"),
      "industry": coalesce(industry, ""),
      "summary": coalesce(summary, ""),
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      "resultHeadline": coalesce(resultHeadline, ""),
      "constraint": coalesce(constraint, ""),
      "capabilities": coalesce(capabilities, []),
      "results": coalesce(results, []),
      "challenge": coalesce(challenge[]{
        ...,
        _type == "image" => { "url": asset->url }
      }, []),
      "approach": coalesce(approach[]{
        ...,
        _type == "image" => { "url": asset->url }
      }, []),
      "publishedAt": coalesce(publishedAt, "")
    }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title, ""),
    "slug": coalesce(slug.current, ""),
    "client": coalesce(client, ""),
    "businessUnit": coalesce(businessUnit, "commerce"),
    "industry": coalesce(industry, ""),
    "summary": coalesce(summary, ""),
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "resultHeadline": coalesce(resultHeadline, ""),
    "constraint": coalesce(constraint, ""),
    "capabilities": coalesce(capabilities, []),
    "results": coalesce(results, []),
    "challenge": coalesce(challenge[]{
      ...,
      _type == "image" => { "url": asset->url }
    }, []),
    "approach": coalesce(approach[]{
      ...,
      _type == "image" => { "url": asset->url }
    }, []),
    "publishedAt": coalesce(publishedAt, "")
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc) {
      _id,
      "title": coalesce(title, ""),
      "slug": coalesce(slug.current, ""),
      "excerpt": coalesce(excerpt, ""),
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      "author": author->name,
      "category": category->title,
      "publishedAt": coalesce(publishedAt, "")
    }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title, ""),
    "slug": coalesce(slug.current, ""),
    "excerpt": coalesce(excerpt, ""),
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "author": author->name,
    "category": category->title,
    "publishedAt": coalesce(publishedAt, ""),
    "body": coalesce(body[]{
      ...,
      _type == "image" => { "url": asset->url }
    }, [])
  }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]{"slug": slug.current}
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{"slug": slug.current}
`);

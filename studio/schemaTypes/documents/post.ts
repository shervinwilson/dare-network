import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  orderings: [
    {
      title: "Most recently published",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (rule) => rule.required() }),
    defineField({
      name: "body",
      title: "Article",
      type: "portableText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "author.name", media: "mainImage" },
  },
});

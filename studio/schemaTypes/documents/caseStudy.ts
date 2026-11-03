import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
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
    defineField({ name: "client", title: "Client / brand", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "businessUnit",
      title: "Business unit",
      type: "string",
      options: {
        list: [
          { title: "Dare Commerce", value: "commerce" },
          { title: "Dare B2B", value: "b2b" },
          { title: "Lead Generation", value: "lead-generation" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "industry", title: "Industry", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "summary",
      title: "Summary",
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
      name: "resultHeadline",
      title: "Result headline",
      type: "string",
      description: "A short result shown prominently on the Works card.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "constraint",
      title: "Growth constraint",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Performance", value: "performance" },
          { title: "SEO", value: "seo" },
          { title: "Creative", value: "creative" },
          { title: "CRO", value: "cro" },
          { title: "Web", value: "web" },
          { title: "Retention", value: "retention" },
          { title: "CRM", value: "crm" },
        ],
      },
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({ name: "challenge", title: "Challenge", type: "portableText" }),
    defineField({ name: "approach", title: "Approach", type: "portableText" }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "mainImage" },
  },
});

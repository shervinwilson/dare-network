import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alternative text", type: "string" }],
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});

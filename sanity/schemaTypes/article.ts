import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 4, validation: (rule) => rule.required().min(80) }),
    defineField({ name: "category", title: "Category", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "Published at", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "readingMinutes", title: "Reading time (minutes)", type: "number", validation: (rule) => rule.required().min(1) }),
    defineField({ name: "featured", title: "Featured article", type: "boolean", initialValue: false }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [defineArrayMember({
        type: "object",
        name: "articleSection",
        fields: [
          defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "id", title: "Section anchor", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text", rows: 5 }], validation: (rule) => rule.required().min(1) }),
        ],
        preview: { select: { title: "heading" } },
      })],
    }),
  ],
  orderings: [{ title: "Published date, new", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category" } },
});

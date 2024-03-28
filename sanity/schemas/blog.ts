import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'blogcategory',
      title: 'Blog Category',
      type: 'string',
      options: {
        list: [
          { title: 'Comestic', value: 'comestic' },
          { title: 'Supplement', value: 'supplement' },
          { title: 'Book', value: 'book' },
          { title: 'Jewelry', value: 'jewelry' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'introparagraph',
      title: 'Introduction Paragraph',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainparagraph',
      title: 'Main Paragraph',
      type: 'blockContent',
    }),
    defineField({
      name: 'conclusionparagraph',
      title: 'Conclusion Paragraph',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'herotext',
      title: 'Hero Text',
      type: 'string',
    }),
    defineField({
      name: 'heroimage',
      title: 'Hero Image',
      type: 'image',
    }),
    defineField({
      name: 'introheading',
      title: 'Intro Heading',
      type: 'string',
    }),
    defineField({
      name: 'introcontent',
      title: 'Intro Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'introimages',
      title: 'Intro Images',
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
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],
  preview: {
    select: {
      title: 'herotext',
    },
  },
});

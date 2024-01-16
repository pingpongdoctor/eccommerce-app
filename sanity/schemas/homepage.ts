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
  ],
  preview: {
    select: {
      title: 'herotext',
    },
  },
});

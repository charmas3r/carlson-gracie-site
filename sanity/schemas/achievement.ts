import { defineField, defineType } from 'sanity';

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    defineField({
      name: 'studentName',
      title: 'Student Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Competition', value: 'competition' },
          { title: 'Promotion', value: 'promotion' },
          { title: 'Spotlight', value: 'spotlight' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Achievement Title',
      type: 'string',
      description: 'e.g., IBJJF San Diego Open Champion, Promoted to Purple Belt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured achievements appear prominently on the homepage',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (Oldest First)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'studentName',
      category: 'category',
      media: 'photos.0',
    },
    prepare({ title, subtitle, category, media }) {
      const categoryEmoji =
        category === 'competition' ? '🏆' : category === 'promotion' ? '⭐' : '🎯';
      return {
        title: `${categoryEmoji} ${title}`,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});

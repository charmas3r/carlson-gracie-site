import { defineType, defineField } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Featured Review',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      description: 'Name of the reviewer (e.g., "Sarah M.")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Star rating (1-5)',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      description: 'The review content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'date',
      description: 'When the review was posted',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Yelp', value: 'yelp' },
        ],
      },
      initialValue: 'google',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Show this review on the homepage carousel',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'text',
      rating: 'rating',
    },
    prepare({ title, subtitle, rating }) {
      return {
        title: `${title} - ${'★'.repeat(rating || 5)}`,
        subtitle: subtitle?.substring(0, 60) + '...',
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});

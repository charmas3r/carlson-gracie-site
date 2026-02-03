import { defineField, defineType } from 'sanity';

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., Head Instructor, Kids Program Director, Competition Coach',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'belt',
      title: 'Belt Rank',
      type: 'string',
      description: 'e.g., 4th Degree Black Belt, Black Belt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of achievements (one per line)',
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Areas of expertise (e.g., Guard Passing, Leg Locks)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active Instructor',
      type: 'boolean',
      description: 'Uncheck to hide from website',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
});

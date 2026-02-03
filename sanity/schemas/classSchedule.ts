import { defineField, defineType } from 'sanity';

export const classSchedule = defineType({
  name: 'classSchedule',
  title: 'Class Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'className',
      title: 'Class Name',
      type: 'string',
      description: 'e.g., Morning BJJ, Fundamentals, Kids BJJ',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dayOfWeek',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'Monday' },
          { title: 'Tuesday', value: 'Tuesday' },
          { title: 'Wednesday', value: 'Wednesday' },
          { title: 'Thursday', value: 'Thursday' },
          { title: 'Friday', value: 'Friday' },
          { title: 'Saturday', value: 'Saturday' },
          { title: 'Sunday', value: 'Sunday' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Start Time',
      type: 'string',
      description: 'e.g., 6:00 AM, 7:30 PM',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 60 min, 90 min',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level/Audience',
      type: 'string',
      options: {
        list: [
          { title: 'All Levels', value: 'All Levels' },
          { title: 'Advanced', value: 'Advanced' },
          { title: 'Ages 4-6 (Novice)', value: 'Ages 4-6' },
          { title: 'Ages 7-11 (Intermediate)', value: 'Ages 7-11' },
          { title: 'Ages 12-Teens (Advanced)', value: 'Ages 12-Teens' },
          { title: 'Private', value: 'Private' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
      description: 'Optional: Assign an instructor to this class',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional class description',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide from schedule',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Day and Time',
      name: 'dayTimeAsc',
      by: [
        { field: 'dayOfWeek', direction: 'asc' },
        { field: 'time', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'className',
      day: 'dayOfWeek',
      time: 'time',
      level: 'level',
    },
    prepare({ title, day, time, level }) {
      return {
        title: title,
        subtitle: `${day} ${time} - ${level}`,
      };
    },
  },
});

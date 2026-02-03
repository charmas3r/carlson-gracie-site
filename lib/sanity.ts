import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// TypeScript types for Sanity data
export interface SanityInstructor {
  _id: string;
  name: string;
  title: string;
  belt: string;
  image?: SanityImageSource;
  bio: string;
  achievements?: string[];
  specialties?: string[];
  order: number;
  isActive: boolean;
}

export interface SanityClassSchedule {
  _id: string;
  className: string;
  dayOfWeek: string;
  time: string;
  duration: string;
  level: string;
  instructor?: {
    _id: string;
    name: string;
  };
  description?: string;
  isActive: boolean;
}

export interface SanityAchievement {
  _id: string;
  studentName: string;
  category: 'competition' | 'promotion' | 'spotlight';
  title: string;
  date: string;
  description: string;
  photos?: SanityImageSource[];
  featured: boolean;
}

export interface SanityReview {
  _id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'google' | 'facebook' | 'yelp';
  featured: boolean;
  order: number;
}

// GROQ Queries
export const queries = {
  // Get all active instructors ordered by display order
  instructors: `*[_type == "instructor" && isActive == true] | order(order asc) {
    _id,
    name,
    title,
    belt,
    image,
    bio,
    achievements,
    specialties,
    order,
    isActive
  }`,

  // Get all active classes grouped by day
  schedule: `*[_type == "classSchedule" && isActive == true] | order(time asc) {
    _id,
    className,
    dayOfWeek,
    time,
    duration,
    level,
    instructor->{_id, name},
    description,
    isActive
  }`,

  // Get all achievements ordered by date (newest first)
  achievements: `*[_type == "achievement"] | order(date desc) {
    _id,
    studentName,
    category,
    title,
    date,
    description,
    photos,
    featured
  }`,

  // Get featured achievements for homepage preview
  featuredAchievements: `*[_type == "achievement" && featured == true] | order(date desc)[0...3] {
    _id,
    studentName,
    category,
    title,
    date,
    description,
    photos,
    featured
  }`,

  // Get featured reviews for homepage
  featuredReviews: `*[_type == "review" && featured == true] | order(order asc, date desc) {
    _id,
    author,
    rating,
    text,
    date,
    source,
    featured,
    order
  }`,

  // Get kids classes (filter by kids age levels)
  kidsSchedule: `*[_type == "classSchedule" && isActive == true && level in ["Ages 4-6", "Ages 7-11", "Ages 12-Teens"]] | order(level asc, time asc) {
    _id,
    className,
    dayOfWeek,
    time,
    duration,
    level,
    instructor->{_id, name},
    description,
    isActive
  }`,
};

// Fetch functions with caching support for Next.js
export async function getInstructors(): Promise<SanityInstructor[]> {
  return sanityClient.fetch(queries.instructors, {}, { next: { revalidate: 60 } });
}

export async function getSchedule(): Promise<SanityClassSchedule[]> {
  return sanityClient.fetch(queries.schedule, {}, { next: { revalidate: 60 } });
}

export async function getAchievements(): Promise<SanityAchievement[]> {
  return sanityClient.fetch(queries.achievements, {}, { next: { revalidate: 60 } });
}

export async function getFeaturedAchievements(): Promise<SanityAchievement[]> {
  return sanityClient.fetch(queries.featuredAchievements, {}, { next: { revalidate: 60 } });
}

export async function getFeaturedReviews(): Promise<SanityReview[]> {
  return sanityClient.fetch(queries.featuredReviews, {}, { next: { revalidate: 60 } });
}

export async function getKidsSchedule(): Promise<SanityClassSchedule[]> {
  return sanityClient.fetch(queries.kidsSchedule, {}, { next: { revalidate: 60 } });
}

// Helper to group schedule by day
export function groupScheduleByDay(
  schedule: SanityClassSchedule[]
): Record<string, SanityClassSchedule[]> {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const grouped: Record<string, SanityClassSchedule[]> = {};

  days.forEach((day) => {
    grouped[day] = schedule.filter((item) => item.dayOfWeek === day);
  });

  return grouped;
}

// Helper to group kids schedule by age level
export interface KidsAgeGroup {
  id: string;
  title: string;
  ages: string;
  level: string;
  duration: string;
  scheduleDays: string;
  description: string;
  highlights: string[];
  color: string;
}

export function groupKidsScheduleByLevel(schedule: SanityClassSchedule[]): KidsAgeGroup[] {
  const levelConfig: Record<string, Omit<KidsAgeGroup, 'scheduleDays' | 'duration'>> = {
    'Ages 4-6': {
      id: 'little-champions',
      title: 'Little Champions (Novice)',
      ages: '4-6 years',
      level: 'Ages 4-6',
      description:
        'Introduction to BJJ through fun games and activities. Focus on motor skills, listening, and basic movements.',
      highlights: [
        'Game-based learning',
        'Basic coordination drills',
        'Teamwork activities',
        'Positive reinforcement',
      ],
      color: 'bg-green-500',
    },
    'Ages 7-11': {
      id: 'kids',
      title: 'Kids BJJ (Intermediate)',
      ages: '7-11 years',
      level: 'Ages 7-11',
      description:
        'Structured classes with technique drilling, belt progression, and supervised sparring. Building discipline and confidence.',
      highlights: [
        'Belt rank progression',
        'Technical drilling',
        'Light sparring',
        'Self-defense skills',
      ],
      color: 'bg-blue-500',
    },
    'Ages 12-Teens': {
      id: 'teens',
      title: 'Teen Program (Advanced)',
      ages: '12-15 years',
      level: 'Ages 12-Teens',
      description:
        'Advanced training preparing teens for adult classes. Competition opportunities and leadership development.',
      highlights: [
        'Advanced techniques',
        'Competition training',
        'Mentorship program',
        'Leadership skills',
      ],
      color: 'bg-purple-500',
    },
  };

  const levels = ['Ages 4-6', 'Ages 7-11', 'Ages 12-Teens'];
  const result: KidsAgeGroup[] = [];

  levels.forEach((level) => {
    const classesForLevel = schedule.filter((c) => c.level === level);
    if (classesForLevel.length === 0) {
      // Use default config even if no classes
      const config = levelConfig[level];
      result.push({
        ...config,
        duration: level === 'Ages 4-6' ? '30 min' : level === 'Ages 7-11' ? '45 min' : '60 min',
        scheduleDays: 'Check schedule for times',
      });
      return;
    }

    // Get unique days and format schedule
    const days = [...new Set(classesForLevel.map((c) => c.dayOfWeek))];
    const dayAbbreviations: Record<string, string> = {
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
      Sunday: 'Sun',
    };
    const abbreviatedDays = days.map((d) => dayAbbreviations[d] || d);

    // Get the typical time (use the first class time as reference)
    const firstClass = classesForLevel[0];
    const scheduleDays = `${abbreviatedDays.join(', ')} - ${firstClass.time}`;

    const config = levelConfig[level];
    result.push({
      ...config,
      duration: firstClass.duration,
      scheduleDays,
    });
  });

  return result;
}

// Helper to derive schedule time slots for local SEO pages
export interface ScheduleTimeSlot {
  time: string;
  schedule: string;
  description: string;
}

export function getScheduleTimeSlots(schedule: SanityClassSchedule[]): ScheduleTimeSlot[] {
  // Helper to parse time to minutes
  function timeToMinutes(time: string): number {
    const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return 0;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  // Filter for weekday adult classes only
  const weekdayAdultClasses = schedule.filter(
    (c) =>
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(c.dayOfWeek) &&
      ['All Levels', 'Advanced'].includes(c.level)
  );

  // Find earliest morning class (before 10 AM)
  const morningClasses = weekdayAdultClasses.filter((c) => timeToMinutes(c.time) < 600);
  const earliestMorning = morningClasses.length > 0
    ? morningClasses.reduce((a, b) => (timeToMinutes(a.time) < timeToMinutes(b.time) ? a : b))
    : null;

  // Find lunch classes (10 AM - 2 PM)
  const lunchClasses = weekdayAdultClasses.filter(
    (c) => timeToMinutes(c.time) >= 600 && timeToMinutes(c.time) < 840
  );
  const lunchClass = lunchClasses.length > 0 ? lunchClasses[0] : null;

  // Find evening classes (after 5 PM)
  const eveningClasses = weekdayAdultClasses.filter((c) => timeToMinutes(c.time) >= 1020);
  const earliestEvening = eveningClasses.length > 0
    ? eveningClasses.reduce((a, b) => (timeToMinutes(a.time) < timeToMinutes(b.time) ? a : b))
    : null;
  const latestEvening = eveningClasses.length > 0
    ? eveningClasses.reduce((a, b) => (timeToMinutes(a.time) > timeToMinutes(b.time) ? a : b))
    : null;

  const slots: ScheduleTimeSlot[] = [];

  if (earliestMorning) {
    slots.push({
      time: 'Early Bird',
      schedule: `${earliestMorning.time} - ${earliestMorning.duration}`,
      description: 'Train before work. Perfect for early risers.',
    });
  } else {
    slots.push({
      time: 'Morning',
      schedule: '9:00 AM',
      description: 'Start your day with training.',
    });
  }

  if (lunchClass) {
    slots.push({
      time: 'Lunch Hour',
      schedule: `${lunchClass.time} - ${lunchClass.duration}`,
      description: 'Midday training for local professionals.',
    });
  }

  if (earliestEvening && latestEvening) {
    // Calculate end time from latest evening class
    const latestMinutes = timeToMinutes(latestEvening.time);
    const durationMinutes = parseInt(latestEvening.duration) || 60;
    const endMinutes = latestMinutes + durationMinutes;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const endPeriod = endHours >= 12 ? 'PM' : 'AM';
    const displayHours = endHours > 12 ? endHours - 12 : endHours;
    const endTime = `${displayHours}:${endMins.toString().padStart(2, '0')} ${endPeriod}`;

    slots.push({
      time: 'Evening',
      schedule: `${earliestEvening.time} - ${endTime}`,
      description: 'Multiple classes after work hours.',
    });
  } else {
    slots.push({
      time: 'Evening',
      schedule: '6:00 PM - 9:00 PM',
      description: 'Multiple classes after work hours.',
    });
  }

  return slots;
}

// Helper to get Saturday classes for North County page
export interface SaturdayClassInfo {
  kidsTime: string;
  kidsDescription: string;
  adultsTime: string;
  adultsDescription: string;
}

export function getSaturdaySchedule(schedule: SanityClassSchedule[]): SaturdayClassInfo {
  const saturdayClasses = schedule.filter((c) => c.dayOfWeek === 'Saturday');

  // Find kids classes on Saturday
  const kidsClasses = saturdayClasses.filter((c) =>
    ['Ages 4-6', 'Ages 7-11', 'Ages 12-Teens'].includes(c.level)
  );

  // Find adult classes on Saturday
  const adultClasses = saturdayClasses.filter((c) =>
    ['All Levels', 'Advanced'].includes(c.level)
  );

  // Get earliest kids class time or fallback
  const kidsTime = kidsClasses.length > 0
    ? kidsClasses[0].time
    : '9:00 AM';

  // Get adult class time or fallback
  const adultsTime = adultClasses.length > 0
    ? `${adultClasses[0].time}`
    : '10:00 AM';

  return {
    kidsTime,
    kidsDescription: 'All ages welcome. Perfect for families with school-age children.',
    adultsTime,
    adultsDescription: 'Parents train while kids attend the earlier session.',
  };
}

// Helper to derive business hours from schedule
export interface BusinessHours {
  days: string;
  time: string;
}

export function getBusinessHours(schedule: SanityClassSchedule[]): BusinessHours[] {
  // Helper to parse time to minutes
  function timeToMinutes(time: string): number {
    const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return 0;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  // Helper to format minutes to time string
  function minutesToTime(mins: number): string {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  const dayGroups: Record<string, { earliest: number; latest: number }> = {};

  schedule.forEach((c) => {
    const day = c.dayOfWeek;
    const startMins = timeToMinutes(c.time);
    const durationMins = parseInt(c.duration) || 60;
    const endMins = startMins + durationMins;

    if (!dayGroups[day]) {
      dayGroups[day] = { earliest: startMins, latest: endMins };
    } else {
      dayGroups[day].earliest = Math.min(dayGroups[day].earliest, startMins);
      dayGroups[day].latest = Math.max(dayGroups[day].latest, endMins);
    }
  });

  // Get weekday hours (Mon-Fri)
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekdayTimes = weekdays
    .filter((d) => dayGroups[d])
    .map((d) => dayGroups[d]);

  const result: BusinessHours[] = [];

  if (weekdayTimes.length > 0) {
    const avgEarliest = Math.min(...weekdayTimes.map((t) => t.earliest));
    const avgLatest = Math.max(...weekdayTimes.map((t) => t.latest));
    result.push({
      days: 'Monday - Friday',
      time: `${minutesToTime(avgEarliest)} - ${minutesToTime(avgLatest)}`,
    });
  } else {
    result.push({ days: 'Monday - Friday', time: '6:00 AM - 9:00 PM' });
  }

  // Saturday
  if (dayGroups['Saturday']) {
    result.push({
      days: 'Saturday',
      time: `${minutesToTime(dayGroups['Saturday'].earliest)} - ${minutesToTime(dayGroups['Saturday'].latest)}`,
    });
  } else {
    result.push({ days: 'Saturday', time: '9:00 AM - 12:00 PM' });
  }

  // Sunday
  if (dayGroups['Sunday']) {
    result.push({
      days: 'Sunday',
      time: `${minutesToTime(dayGroups['Sunday'].earliest)} - ${minutesToTime(dayGroups['Sunday'].latest)}`,
    });
  } else {
    result.push({ days: 'Sunday', time: 'Closed' });
  }

  return result;
}

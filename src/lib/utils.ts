import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateDuration(startDate: string, endDate?: string | null) {
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : dayjs();
  const diff = dayjs.duration(end.diff(start));

  const years = diff.years();
  const months = diff.months();

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);

  return parts.join(' ') || '1 mo';
}

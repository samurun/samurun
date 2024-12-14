import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateString(
  dateString: string,
  format: 'full' | 'long' | 'medium' | 'short' = 'medium'
): string {
  const date = new Date(dateString);

  // Ensure valid date
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('th-TH', {
    timeZone: 'asia/bangkok',
    dateStyle: format,
  }).format(date);
}

export function getRelativeTime(dateString: string): string {
  // Parse date in local time zone
  const date = new Date(dateString);
  const now = new Date();

  // Ensure valid date
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

export function calculateDuration(
  startDateString: string,
  endDateString: string
): string {
  const startYear = new Date(startDateString).getFullYear();
  const startMonth = new Date(startDateString).getMonth();
  const endYear = new Date(endDateString).getFullYear();
  const endMonth = new Date(endDateString).getMonth();
  // คำนวณจำนวนเดือนทั้งหมดระหว่าง start และ end
  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

  // คำนวณจำนวนปีและเดือน
  const years = Math.floor(totalMonths / 12);

  const months = totalMonths % 12;

  // ตรวจสอบเงื่อนไขตามที่กำหนด
  if (years > 0) {
    return years === 1
      ? '1 yr'
      : `${years} yrs` +
          (months > 0 ? ` ${months === 1 ? '1 mo' : `${months} mos`}` : '');
  } else {
    return months === 1 ? '1 mo' : `${months} mos`;
  }
}

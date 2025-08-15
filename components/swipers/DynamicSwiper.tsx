import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for Swiper components to prevent SSR issues
export const DynamicTopSwiper = dynamic(
  () => import('./TopSwiper'),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
  }
) as any;

export const DynamicBlogSwiper = dynamic(
  () => import('./BlogSwiper').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
  }
) as any;

export const DynamicTestimonySwiper = dynamic(
  () => import('./TestimonySwiper'),
  { 
    ssr: false,
    loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-lg" />
  }
) as any;

export const DynamicCourseSchedule = dynamic(
  () => import('../shedule/CourseSchedule'),
  { 
    ssr: false,
    loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />
  }
) as any;
import { useState, useEffect } from 'react';

export interface Program {
  program: string;
  faculty: string;
  duration: string;
  language: string;
  tuition_fee_year: string;
  description: string;
  requirements: {
    UNT_minimum?: number;
    UNT_subjects?: string[];
    profile_subject?: string;
    IELTS_minimum?: number | string;
    [key: string]: any;
  };
}

export interface University {
  id: string;
  name: string;
  city: string;
  founded?: number;
  ranking_kz?: number;
  official_website?: string;
  tuition_range?: string;
  images?: string[];
  tour_video?: string;
  about?: {
    mission?: string;
    history?: string;
    leadership?: string;
    achievements?: string[];
  };
  programs?: Program[];
  admission_and_enrollment?: any;
  international_cooperation?: any;
  comparison?: {
    city?: string;
    ielts_required?: string;
    program_count?: number;
    strengths?: string[];
  };
}

// Load all JSON files from the data directory
const modules = import.meta.glob('../data/universities/*.json', { eager: true });

const universities: University[] = Object.values(modules).map((mod: any) => mod.university);

export function useUniversities() {
  return universities;
}

export function useUniversity(id: string) {
  return universities.find((u) => u.id === id);
}

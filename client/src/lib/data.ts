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
  tuition?: string;
  images?: string[];
  logo?: string;
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
  campus_life?: {
    student_population?: number;
    international_students?: number;
    campus_size_hectares?: number;
    libraries?: number;
    sports_facilities?: string[];
    clubs_societies?: string[];
    accommodation?: any;
  };
  scholarships_and_financial_aid?: any;
  accreditations?: string[];
}

// Load all JSON files from the data directory
const modules = import.meta.glob('../data/universities/*.json', { eager: true });

const universities: University[] = Object.values(modules)
  .map((mod: any) => {
    try {
      const uni = mod.university;
      if (!uni) {
        console.warn('Missing university object in module');
        return null;
      }
      if (!uni.id || !uni.name) {
        console.warn('Invalid university: missing id or name', uni);
        return null;
      }
      return uni;
    } catch (error) {
      console.error('Error loading university module:', error);
      return null;
    }
  })
  .filter((u): u is University => !!u);

console.log(`Loaded ${universities.length} universities`);

export function useUniversities() {
  return universities;
}

export function useUniversity(id: string) {
  return universities.find((u) => u.id === id);
}

import { ObjectId } from 'mongodb';

export interface Project {
  _id?: ObjectId;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  imageUrl: string;
  galleryImages: string[];
  technologies: {
    en: string[];
    ar: string[];
  };
  features: {
    en: string[];
    ar: string[];
  };
  challenges: {
    en: string[];
    ar: string[];
  };
  solutions: {
    en: string[];
    ar: string[];
  };
  results: {
    en: string[];
    ar: string[];
  };
  client: {
    en: string;
    ar: string;
  };
  location: {
    en: string;
    ar: string;
  };
  duration: {
    en: string;
    ar: string;
  };
  budget: {
    en: string;
    ar: string;
  };
  category: string; // Category ID
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectCategory {
  _id?: ObjectId;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  slug: string;
  order: number;
  isActive: boolean;
}




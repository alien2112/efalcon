export interface Service {
  _id?: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  imageUrl: string;
  features: {
    en: string[];
    ar: string[];
  };
  content: {
    en: string;
    ar: string;
  };
  detailedContent: {
    en: string;
    ar: string;
  };
  // Optional URL to a downloadable PDF document related to the service
  pdfUrl?: string;
  galleryImages: string[];
  benefits: {
    en: string[];
    ar: string[];
  };
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ServiceCategory {
  _id?: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

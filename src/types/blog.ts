export interface BlogPost {
  _id?: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  imageUrl: string;
  featuredImage?: string;
  readTime: number; // in minutes
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  seo: {
    metaTitle?: {
      en: string;
      ar: string;
    };
    metaDescription?: {
      en: string;
      ar: string;
    };
    keywords?: string[];
    canonicalUrl?: string;
  };
  internalLinks?: {
    title: string;
    url: string;
    description?: string;
  }[];
  viewCount: number;
  likeCount: number;
  shareCount: number;
}

export interface BlogCategory {
  _id?: string;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  description?: {
    en: string;
    ar: string;
  };
  color: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogComment {
  _id?: string;
  postId: string;
  author: {
    name: string;
    email: string;
    website?: string;
  };
  content: string;
  isApproved: boolean;
  parentId?: string; // for replies
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogAnalytics {
  _id?: string;
  postId: string;
  date: Date;
  views: number;
  uniqueViews: number;
  timeOnPage: number;
  bounceRate: number;
  socialShares: {
    facebook: number;
    twitter: number;
    linkedin: number;
    whatsapp: number;
  };
}




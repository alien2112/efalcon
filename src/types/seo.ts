export interface SEOSettings {
  _id?: string;
  page: string; // 'home', 'about', 'services', 'work', 'blog', 'contact'
  metaTitle: {
    en: string;
    ar: string;
  };
  metaDescription: {
    en: string;
    ar: string;
  };
  keywords: string[];
  canonicalUrl?: string;
  ogTitle?: {
    en: string;
    ar: string;
  };
  ogDescription?: {
    en: string;
    ar: string;
  };
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: {
    en: string;
    ar: string;
  };
  twitterDescription?: {
    en: string;
    ar: string;
  };
  twitterImage?: string;
  structuredData?: {
    organization?: any;
    website?: any;
    breadcrumb?: any;
    article?: any;
    service?: any;
    product?: any;
  };
  robots?: {
    index: boolean;
    follow: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SEOAnalytics {
  _id?: string;
  page: string;
  date: Date;
  impressions: number;
  clicks: number;
  ctr: number; // click-through rate
  position: number; // average position
  queries: Array<{
    query: string;
    impressions: number;
    clicks: number;
    position: number;
  }>;
}

export interface SitemapEntry {
  url: string;
  lastmod: Date;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number; // 0.0 to 1.0
  images?: Array<{
    loc: string;
    caption?: string;
    title?: string;
  }>;
}




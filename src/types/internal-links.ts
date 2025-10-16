export interface InternalLink {
  _id?: string;
  sourcePage: string; // Page where the link appears
  sourceElement: string; // Element ID or selector where the link is placed
  targetPage: string; // Page the link points to
  targetElement?: string; // Specific element on target page (for anchor links)
  linkText: {
    en: string;
    ar: string;
  };
  linkUrl: string; // The actual URL
  linkType: 'internal' | 'external' | 'anchor'; // Type of link
  position: {
    x: number;
    y: number;
  }; // Position on the page (for visual management)
  isActive: boolean;
  priority: number; // For link ordering
  description?: {
    en: string;
    ar: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LinkCategory {
  _id?: string;
  name: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
  color: string; // Hex color for visual organization
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LinkAnalytics {
  _id?: string;
  linkId: string; // Reference to InternalLink
  clickCount: number;
  lastClicked?: Date;
  userAgents: string[]; // Track different user agents
  referrers: string[]; // Track where clicks came from
  createdAt?: Date;
  updatedAt?: Date;
}





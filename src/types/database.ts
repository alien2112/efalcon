export interface AdminUser {
  _id?: string;
  username: string;
  password: string; // hashed
  email: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface VisionImage {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  position: 'left' | 'right'; // which box in the vision section
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceImage {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number; // for slider ordering
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkImage {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number; // for grid ordering (1-4)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

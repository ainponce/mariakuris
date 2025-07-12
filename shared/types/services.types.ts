import { LucideIcon } from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  services: string[];
  category?: 'legal' | 'corporate' | 'financial' | 'compliance';
}

export interface ServiceCategory {
  id: string;
  nameKey: string;
  services: Service[];
}

export type ServiceSort = 'alphabetical' | 'category' | 'priority';

export interface ServiceFilters {
  category?: string;
  search?: string;
  sort?: ServiceSort;
} 
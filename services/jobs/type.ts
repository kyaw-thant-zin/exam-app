export interface JobResponse {
  data: JobResult;
}

export interface JobResult {
  current_page: number;
  data: JobList[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface JobList {
  id: string;
  title: string;
  company_name: string;
  location_id: string;
  description: string;
  salary: string;
  careers_type_id: string;
  industry_id: string;
  experience_level: string;
  visa_support: number;
  created_by: string;
  created_at: string;
  location: Location;
  career_type: CareerType;
  industry: Industry;
  experience: Experience;
}

export interface JobDetailResponse {
  status?: string;
  data: JobList;
}
export interface Location {
  id: string;
  name: string;
  region_id: string;
  region: Region;
}

export interface Region {
  id: string;
  name: string;
  created_at: any;
  updated_at: any;
}

export interface CareerType {
  id: string;
  type: string;
  careers_categroy_name: string;
}

export interface Industry {
  id: string;
  type: string;
  careers_categroy_name: string;
}

export interface Experience {
  id: string;
  type: string;
  careers_categroy_name: string;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

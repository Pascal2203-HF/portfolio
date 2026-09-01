export interface Profile {
  id?: number;
  full_name: string;
  title: string;
  short_bio: string;
  about_text: string;
  photo_url: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  facebook: string;
}

export interface Skill {
  id?: number;
  name: string;
  category: string;
  level: number;
}

export interface Service {
  id?: number;
  title: string;
  description: string;
  icon: string;
}

export interface Education {
  id?: number;
  school: string;
  degree: string;
  start_year: string;
  end_year: string;
  description: string;
}

export interface Experience {
  id?: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Project {
  id?: number;
  title: string;
  short_description: string;
  full_description: string;
  technologies: string;
  cover_image: string;
  gallery_images: string;
  video_url: string;
  role: string;
  realization_date: string;
  demo_url: string;
  github_url: string;
  download_url: string;
  download_count?: number;
  published: boolean;
}

export interface Certification {
  id?: number;
  title: string;
  organization: string;
  date_obtained: string;
  certificate_url: string;
  image_url: string;
}

export interface GalleryItem {
  id?: number;
  title: string;
  media_type: string;
  url: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface Stats {
  total_visits: number;
  total_projects: number;
  total_downloads: number;
  unread_messages: number;
}

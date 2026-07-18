import { Routes } from '@angular/router';
import { authGuard } from './core/services/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'skills', loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent) },
  { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  { path: 'education', loadComponent: () => import('./pages/education/education.component').then(m => m.EducationComponent) },
  { path: 'experience', loadComponent: () => import('./pages/experience/experience.component').then(m => m.ExperienceComponent) },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'projects/:id', loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent) },
  { path: 'certifications', loadComponent: () => import('./pages/certifications/certifications.component').then(m => m.CertificationsComponent) },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'admin/login', loadComponent: () => import('./admin/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  { path: '**', redirectTo: '' },
];

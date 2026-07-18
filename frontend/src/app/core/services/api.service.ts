import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-base';
import {
  Profile, Skill, Service, Education, Experience, Project, Certification, GalleryItem, ContactMessage, Stats,
} from '../models/models';

/** Service CRUD générique réutilisable pour chaque ressource REST */
class ResourceService<T> {
  constructor(protected http: HttpClient, protected endpoint: string) {}

  list(): Observable<T[]> {
    return this.http.get<T[]>(`${API_BASE_URL}${this.endpoint}/`);
  }
  get(id: number): Observable<T> {
    return this.http.get<T>(`${API_BASE_URL}${this.endpoint}/${id}`);
  }
  create(payload: T): Observable<T> {
    return this.http.post<T>(`${API_BASE_URL}${this.endpoint}/`, payload);
  }
  update(id: number, payload: T): Observable<T> {
    return this.http.put<T>(`${API_BASE_URL}${this.endpoint}/${id}`, payload);
  }
  delete(id: number): Observable<unknown> {
    return this.http.delete(`${API_BASE_URL}${this.endpoint}/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class SkillService extends ResourceService<Skill> {
  constructor(http: HttpClient) { super(http, '/api/skills'); }
}

@Injectable({ providedIn: 'root' })
export class ServiceItemService extends ResourceService<Service> {
  constructor(http: HttpClient) { super(http, '/api/services'); }
}

@Injectable({ providedIn: 'root' })
export class EducationService extends ResourceService<Education> {
  constructor(http: HttpClient) { super(http, '/api/education'); }
}

@Injectable({ providedIn: 'root' })
export class ExperienceService extends ResourceService<Experience> {
  constructor(http: HttpClient) { super(http, '/api/experience'); }
}

@Injectable({ providedIn: 'root' })
export class ProjectService extends ResourceService<Project> {
  constructor(http: HttpClient) { super(http, '/api/projects'); }

  listAllForAdmin(): Observable<Project[]> {
    return this.http.get<Project[]>(`${API_BASE_URL}/api/projects/admin/all`);
  }
  registerDownload(id: number): Observable<unknown> {
    return this.http.post(`${API_BASE_URL}/api/projects/${id}/download`, {});
  }
}

@Injectable({ providedIn: 'root' })
export class CertificationService extends ResourceService<Certification> {
  constructor(http: HttpClient) { super(http, '/api/certifications'); }
}

@Injectable({ providedIn: 'root' })
export class GalleryService extends ResourceService<GalleryItem> {
  constructor(http: HttpClient) { super(http, '/api/gallery'); }
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}
  get(): Observable<Profile> {
    return this.http.get<Profile>(`${API_BASE_URL}/api/profile/`);
  }
  update(payload: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${API_BASE_URL}/api/profile/`, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}
  send(payload: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(`${API_BASE_URL}/api/contact/`, payload);
  }
  list(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${API_BASE_URL}/api/contact/`);
  }
  markRead(id: number): Observable<unknown> {
    return this.http.put(`${API_BASE_URL}/api/contact/${id}/read`, {});
  }
  delete(id: number): Observable<unknown> {
    return this.http.delete(`${API_BASE_URL}/api/contact/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class StatsService {
  constructor(private http: HttpClient) {}
  recordVisit(page: string): Observable<unknown> {
    return this.http.post(`${API_BASE_URL}/api/stats/visit?page=${encodeURIComponent(page)}`, {});
  }
  get(): Observable<Stats> {
    return this.http.get<Stats>(`${API_BASE_URL}/api/stats/`);
  }
}

@Injectable({ providedIn: 'root' })
export class UploadService {
  constructor(private http: HttpClient) {}
  upload(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${API_BASE_URL}/api/upload/`, formData);
  }
}

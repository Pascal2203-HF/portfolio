import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { certifications, education, experience, gallery, profile, projects, services, skills } from '../portfolio.data';
import { Certification, ContactMessage, Education, Experience, GalleryItem, Profile, Project, Service, Skill, Stats } from '../models/models';

const storagePrefix = 'pascal-portfolio-';
const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value));

function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(storagePrefix + key) || '') as T; } catch { return copy(fallback); }
}
function save<T>(key: string, value: T): void { localStorage.setItem(storagePrefix + key, JSON.stringify(value)); }

class StaticResourceService<T extends { id?: number }> {
  protected items: T[];
  constructor(private key: string, fallback: T[]) { this.items = load(key, fallback); }
  list(): Observable<T[]> { return of(copy(this.items)); }
  get(id: number): Observable<T> { return of(copy(this.items.find((item) => item.id === id)!)); }
  create(payload: T): Observable<T> { const item = { ...copy(payload), id: Date.now() }; this.items.push(item); save(this.key, this.items); return of(item); }
  update(id: number, payload: T): Observable<T> { const index = this.items.findIndex((item) => item.id === id); this.items[index] = { ...copy(payload), id }; save(this.key, this.items); return of(this.items[index]); }
  delete(id: number): Observable<void> { this.items = this.items.filter((item) => item.id !== id); save(this.key, this.items); return of(void 0); }
}

@Injectable({ providedIn: 'root' }) export class SkillService extends StaticResourceService<Skill> { constructor() { super('skills', skills); } }
@Injectable({ providedIn: 'root' }) export class ServiceItemService extends StaticResourceService<Service> { constructor() { super('services', services); } }
@Injectable({ providedIn: 'root' }) export class EducationService extends StaticResourceService<Education> { constructor() { super('education', education); } }
@Injectable({ providedIn: 'root' }) export class ExperienceService extends StaticResourceService<Experience> { constructor() { super('experience', experience); } }
@Injectable({ providedIn: 'root' }) export class CertificationService extends StaticResourceService<Certification> { constructor() { super('certifications', certifications); } }
@Injectable({ providedIn: 'root' }) export class GalleryService extends StaticResourceService<GalleryItem> { constructor() { super('gallery', gallery); } }
@Injectable({ providedIn: 'root' }) export class ProjectService extends StaticResourceService<Project> { constructor() { super('projects', projects); } listAllForAdmin(): Observable<Project[]> { return this.list(); } registerDownload(_id: number): Observable<void> { return of(void 0); } }

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private item = load('profile', profile);
  get(): Observable<Profile> { return of(copy(this.item)); }
  update(payload: Profile): Observable<Profile> { this.item = copy(payload); save('profile', this.item); return of(copy(this.item)); }
}
@Injectable({ providedIn: 'root' }) export class ContactService { send(payload: ContactMessage): Observable<ContactMessage> { return of({ ...payload, id: Date.now(), created_at: new Date().toISOString() }); } list(): Observable<ContactMessage[]> { return of([]); } markRead(_id: number): Observable<void> { return of(void 0); } delete(_id: number): Observable<void> { return of(void 0); } }
@Injectable({ providedIn: 'root' }) export class StatsService { recordVisit(_page: string): Observable<void> { return of(void 0); } get(): Observable<Stats> { return of({ total_visits: 0, total_projects: projects.length, total_downloads: 0, unread_messages: 0 }); } }
@Injectable({ providedIn: 'root' }) export class UploadService { upload(_file: File): Observable<{ url: string }> { return of({ url: '' }); } }

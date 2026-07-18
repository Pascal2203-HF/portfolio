import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import {
  ProfileService, SkillService, ServiceItemService, EducationService, ExperienceService,
  ProjectService, CertificationService, GalleryService, ContactService, StatsService, UploadService,
} from '../../core/services/api.service';
import {
  Profile, Skill, Service, Education, Experience, Project, Certification, GalleryItem, ContactMessage, Stats,
} from '../../core/models/models';

type Tab = 'stats' | 'profile' | 'projects' | 'skills' | 'services' | 'education' | 'experience' | 'certifications' | 'gallery' | 'messages';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  tab: Tab = 'stats';

  stats: Stats | null = null;
  profile: Profile = this.emptyProfile();

  projects: Project[] = [];
  editingProject: Project = this.emptyProject();
  editingProjectId: number | null = null;

  skills: Skill[] = [];
  editingSkill: Skill = { name: '', category: 'Autre', level: 70 };
  editingSkillId: number | null = null;

  services: Service[] = [];
  editingService: Service = { title: '', description: '', icon: 'bi-code-slash' };
  editingServiceId: number | null = null;

  educations: Education[] = [];
  editingEducation: Education = { school: '', degree: '', start_year: '', end_year: '', description: '' };
  editingEducationId: number | null = null;

  experiences: Experience[] = [];
  editingExperience: Experience = { company: '', role: '', start_date: '', end_date: '', description: '' };
  editingExperienceId: number | null = null;

  certifications: Certification[] = [];
  editingCertification: Certification = { title: '', organization: '', date_obtained: '', certificate_url: '', image_url: '' };
  editingCertificationId: number | null = null;

  galleryItems: GalleryItem[] = [];
  editingGallery: GalleryItem = { title: '', media_type: 'image', url: '' };
  editingGalleryId: number | null = null;

  messages: ContactMessage[] = [];

  uploading = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private profileService: ProfileService,
    private skillService: SkillService,
    private serviceItemService: ServiceItemService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private projectService: ProjectService,
    private certificationService: CertificationService,
    private galleryService: GalleryService,
    private contactService: ContactService,
    private statsService: StatsService,
    private uploadService: UploadService,
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }

  setTab(t: Tab): void {
    this.tab = t;
  }

  loadAll(): void {
    this.statsService.get().subscribe({ next: (s) => (this.stats = s), error: () => {} });
    this.profileService.get().subscribe({ next: (p) => (this.profile = p), error: () => {} });
    this.projectService.listAllForAdmin().subscribe({ next: (p) => (this.projects = p), error: () => {} });
    this.skillService.list().subscribe({ next: (s) => (this.skills = s), error: () => {} });
    this.serviceItemService.list().subscribe({ next: (s) => (this.services = s), error: () => {} });
    this.educationService.list().subscribe({ next: (e) => (this.educations = e), error: () => {} });
    this.experienceService.list().subscribe({ next: (e) => (this.experiences = e), error: () => {} });
    this.certificationService.list().subscribe({ next: (c) => (this.certifications = c), error: () => {} });
    this.galleryService.list().subscribe({ next: (g) => (this.galleryItems = g), error: () => {} });
    this.contactService.list().subscribe({ next: (m) => (this.messages = m), error: () => {} });
  }

  // ---------- Profile ----------
  emptyProfile(): Profile {
    return { full_name: '', title: '', short_bio: '', about_text: '', photo_url: '', email: '', phone: '', location: '', github: '', linkedin: '', facebook: '' };
  }
  saveProfile(): void {
    this.profileService.update(this.profile).subscribe({ next: (p) => (this.profile = p) });
  }

  // ---------- Generic upload helper ----------
  onFileSelected(event: Event, target: 'profile' | 'project-cover' | 'project-gallery' | 'project-video' | 'cert' | 'gallery'): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.uploading = true;
    this.uploadService.upload(file).subscribe({
      next: (res) => {
        this.uploading = false;
        input.value = '';
        if (target === 'profile') this.profile.photo_url = res.url;
        if (target === 'project-cover') this.editingProject.cover_image = res.url;
        if (target === 'project-gallery') {
          this.editingProject.gallery_images = this.editingProject.gallery_images
            ? `${this.editingProject.gallery_images},${res.url}` : res.url;
        }
        if (target === 'project-video') this.editingProject.video_url = res.url;
        if (target === 'cert') this.editingCertification.image_url = res.url;
        if (target === 'gallery') this.editingGallery.url = res.url;
      },
      error: () => (this.uploading = false),
    });
  }

  // ---------- Gallery images of a project (preview + remove) ----------
  projectGalleryList(): string[] {
    return (this.editingProject.gallery_images || '').split(',').map((g) => g.trim()).filter(Boolean);
  }
  removeProjectGalleryImage(url: string): void {
    this.editingProject.gallery_images = this.projectGalleryList().filter((g) => g !== url).join(',');
  }
  removeProjectVideo(): void {
    this.editingProject.video_url = '';
  }
  removeProjectCover(): void {
    this.editingProject.cover_image = '';
  }
  imgUrl(url: string): string {
    return url && url.startsWith('http') ? url : `http://localhost:8000${url}`;
  }
  isVideoFile(url: string): boolean {
    return /\.(mp4|webm|ogg|mov)$/i.test(url || '');
  }

  // ---------- Projects ----------
  emptyProject(): Project {
    return {
      title: '', short_description: '', full_description: '', technologies: '', cover_image: '',
      gallery_images: '', video_url: '', role: '', realization_date: '', demo_url: '', github_url: '',
      download_url: '', published: true,
    };
  }
  editProject(p: Project): void {
    this.editingProject = { ...p };
    this.editingProjectId = p.id ?? null;
  }
  newProject(): void {
    this.editingProject = this.emptyProject();
    this.editingProjectId = null;
  }
  saveProject(): void {
    const obs = this.editingProjectId
      ? this.projectService.update(this.editingProjectId, this.editingProject)
      : this.projectService.create(this.editingProject);
    obs.subscribe({
      next: () => {
        this.newProject();
        this.projectService.listAllForAdmin().subscribe({ next: (p) => (this.projects = p) });
      },
    });
  }
  deleteProject(id?: number): void {
    if (!id || !confirm('Supprimer ce projet ?')) return;
    this.projectService.delete(id).subscribe({ next: () => (this.projects = this.projects.filter((p) => p.id !== id)) });
  }

  // ---------- Skills ----------
  editSkill(s: Skill): void { this.editingSkill = { ...s }; this.editingSkillId = s.id ?? null; }
  newSkill(): void { this.editingSkill = { name: '', category: 'Autre', level: 70 }; this.editingSkillId = null; }
  saveSkill(): void {
    const obs = this.editingSkillId ? this.skillService.update(this.editingSkillId, this.editingSkill) : this.skillService.create(this.editingSkill);
    obs.subscribe({ next: () => { this.newSkill(); this.skillService.list().subscribe({ next: (s) => (this.skills = s) }); } });
  }
  deleteSkill(id?: number): void {
    if (!id || !confirm('Supprimer cette compétence ?')) return;
    this.skillService.delete(id).subscribe({ next: () => (this.skills = this.skills.filter((s) => s.id !== id)) });
  }

  // ---------- Services ----------
  editService(s: Service): void { this.editingService = { ...s }; this.editingServiceId = s.id ?? null; }
  newService(): void { this.editingService = { title: '', description: '', icon: 'bi-code-slash' }; this.editingServiceId = null; }
  saveService(): void {
    const obs = this.editingServiceId ? this.serviceItemService.update(this.editingServiceId, this.editingService) : this.serviceItemService.create(this.editingService);
    obs.subscribe({ next: () => { this.newService(); this.serviceItemService.list().subscribe({ next: (s) => (this.services = s) }); } });
  }
  deleteService(id?: number): void {
    if (!id || !confirm('Supprimer ce service ?')) return;
    this.serviceItemService.delete(id).subscribe({ next: () => (this.services = this.services.filter((s) => s.id !== id)) });
  }

  // ---------- Education ----------
  editEducation(e: Education): void { this.editingEducation = { ...e }; this.editingEducationId = e.id ?? null; }
  newEducation(): void { this.editingEducation = { school: '', degree: '', start_year: '', end_year: '', description: '' }; this.editingEducationId = null; }
  saveEducation(): void {
    const obs = this.editingEducationId ? this.educationService.update(this.editingEducationId, this.editingEducation) : this.educationService.create(this.editingEducation);
    obs.subscribe({ next: () => { this.newEducation(); this.educationService.list().subscribe({ next: (e) => (this.educations = e) }); } });
  }
  deleteEducation(id?: number): void {
    if (!id || !confirm('Supprimer cette formation ?')) return;
    this.educationService.delete(id).subscribe({ next: () => (this.educations = this.educations.filter((e) => e.id !== id)) });
  }

  // ---------- Experience ----------
  editExperience(e: Experience): void { this.editingExperience = { ...e }; this.editingExperienceId = e.id ?? null; }
  newExperience(): void { this.editingExperience = { company: '', role: '', start_date: '', end_date: '', description: '' }; this.editingExperienceId = null; }
  saveExperience(): void {
    const obs = this.editingExperienceId ? this.experienceService.update(this.editingExperienceId, this.editingExperience) : this.experienceService.create(this.editingExperience);
    obs.subscribe({ next: () => { this.newExperience(); this.experienceService.list().subscribe({ next: (e) => (this.experiences = e) }); } });
  }
  deleteExperience(id?: number): void {
    if (!id || !confirm('Supprimer cette expérience ?')) return;
    this.experienceService.delete(id).subscribe({ next: () => (this.experiences = this.experiences.filter((e) => e.id !== id)) });
  }

  // ---------- Certifications ----------
  editCertification(c: Certification): void { this.editingCertification = { ...c }; this.editingCertificationId = c.id ?? null; }
  newCertification(): void { this.editingCertification = { title: '', organization: '', date_obtained: '', certificate_url: '', image_url: '' }; this.editingCertificationId = null; }
  saveCertification(): void {
    const obs = this.editingCertificationId ? this.certificationService.update(this.editingCertificationId, this.editingCertification) : this.certificationService.create(this.editingCertification);
    obs.subscribe({ next: () => { this.newCertification(); this.certificationService.list().subscribe({ next: (c) => (this.certifications = c) }); } });
  }
  deleteCertification(id?: number): void {
    if (!id || !confirm('Supprimer cette certification ?')) return;
    this.certificationService.delete(id).subscribe({ next: () => (this.certifications = this.certifications.filter((c) => c.id !== id)) });
  }

  // ---------- Gallery ----------
  editGallery(g: GalleryItem): void { this.editingGallery = { ...g }; this.editingGalleryId = g.id ?? null; }
  newGallery(): void { this.editingGallery = { title: '', media_type: 'image', url: '' }; this.editingGalleryId = null; }
  saveGallery(): void {
    const obs = this.editingGalleryId ? this.galleryService.update(this.editingGalleryId, this.editingGallery) : this.galleryService.create(this.editingGallery);
    obs.subscribe({ next: () => { this.newGallery(); this.galleryService.list().subscribe({ next: (g) => (this.galleryItems = g) }); } });
  }
  deleteGallery(id?: number): void {
    if (!id || !confirm('Supprimer ce média ?')) return;
    this.galleryService.delete(id).subscribe({ next: () => (this.galleryItems = this.galleryItems.filter((g) => g.id !== id)) });
  }

  // ---------- Messages ----------
  markRead(m: ContactMessage): void {
    if (!m.id) return;
    this.contactService.markRead(m.id).subscribe({ next: () => (m.is_read = true) });
  }
  deleteMessage(id?: number): void {
    if (!id || !confirm('Supprimer ce message ?')) return;
    this.contactService.delete(id).subscribe({ next: () => (this.messages = this.messages.filter((m) => m.id !== id)) });
  }
}

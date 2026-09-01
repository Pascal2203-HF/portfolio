import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, ProfileService } from '../../core/services/api.service';
import { Profile } from '../../core/models/models';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow mb-2">Discutons</p>
        <h2 class="section-title">Contact</h2>
        <div class="row g-4">
          <div class="col-lg-5" appReveal>
            <p class="opacity-75">N'hésitez pas à me contacter pour toute opportunité, question ou collaboration.</p>
            <p class="mb-1"><i class="bi bi-envelope me-2 text-accent"></i>{{ profile?.email }}</p>
            <p class="mb-1"><i class="bi bi-telephone me-2 text-accent"></i>{{ profile?.phone }}</p>
            <p class="mb-1"><i class="bi bi-geo-alt me-2 text-accent"></i>{{ profile?.location }}</p>
          </div>
          <div class="col-lg-7" appReveal [revealDelay]="120">
            <form [formGroup]="form" (ngSubmit)="submit()" class="app-card p-4">
              <div class="mb-3">
                <label class="form-label">Nom</label>
                <input class="form-control" formControlName="name">
                <div class="text-danger small" *ngIf="form.get('name')?.touched && form.get('name')?.invalid">Le nom est requis.</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input class="form-control" type="email" formControlName="email">
                <div class="text-danger small" *ngIf="form.get('email')?.touched && form.get('email')?.invalid">Email invalide.</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Sujet</label>
                <input class="form-control" formControlName="subject">
              </div>
              <div class="mb-3">
                <label class="form-label">Message</label>
                <textarea class="form-control" rows="5" formControlName="message"></textarea>
                <div class="text-danger small" *ngIf="form.get('message')?.touched && form.get('message')?.invalid">Le message est requis.</div>
              </div>
              <button class="btn btn-accent" [disabled]="form.invalid || sending">
                {{ sending ? 'Envoi en cours...' : 'Envoyer le message' }}
              </button>
              <p class="text-success mt-3" *ngIf="success">Message envoyé avec succès, merci !</p>
              <p class="text-danger mt-3" *ngIf="errorMsg">{{ errorMsg }}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private profileService = inject(ProfileService);

  profile: Profile | null = null;
  sending = false;
  success = false;
  errorMsg = '';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required],
  });

  ngOnInit(): void {
    this.profileService.get().subscribe({ next: (p) => (this.profile = p), error: () => {} });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.sending = true;
    this.success = false;
    this.errorMsg = '';
    this.contactService.send(this.form.value as any).subscribe({
      next: () => {
        this.sending = false;
        this.success = true;
        this.form.reset();
      },
      error: () => {
        this.sending = false;
        this.errorMsg = "Une erreur est survenue lors de l'envoi. Veuillez réessayer.";
      },
    });
  }
}

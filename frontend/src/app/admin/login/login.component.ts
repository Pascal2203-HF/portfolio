import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="section">
      <div class="container" style="max-width: 420px;">
        <h2 class="section-title">Connexion administrateur</h2>
        <form [formGroup]="form" (ngSubmit)="submit()" class="app-card p-4">
          <div class="mb-3">
            <label class="form-label">Nom d'utilisateur</label>
            <input class="form-control" formControlName="username">
          </div>
          <div class="mb-3">
            <label class="form-label">Mot de passe</label>
            <input class="form-control" type="password" formControlName="password">
          </div>
          <button class="btn btn-accent w-100" [disabled]="form.invalid || loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
          <p class="text-danger small mt-3" *ngIf="errorMsg">{{ errorMsg }}</p>
        </form>
      </div>
    </section>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  errorMsg = '';
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMsg = '';
    const { username, password } = this.form.value;
    this.auth.login(username!, password!).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Nom d\'utilisateur ou mot de passe incorrect.';
      },
    });
  }
}

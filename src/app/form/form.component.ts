import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface ApiUser {
  id: number;
  name: string;
  lastname: string,
  email: string,
  password: string
}

interface User {
  id: number;
  name: string;
  lastname: string,
  email: string,
  password: string
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  private readonly API_URL = 'http://localhost:8090';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: false
  };

  isLoginMode = signal<boolean>(true);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  showPassword = false;
  
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {}

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  toggleMode() {
    this.isLoginMode.update(mode => !mode);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private handleError(error: any) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.status === 0) {
      errorMessage = 'Impossible de se connecter au serveur. Veuillez vérifier que le serveur est en cours d\'exécution.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }
    
    this.errorMessage.set(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  async onSubmit() {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      if (this.isLoginMode()) {
        await this.handleLogin();
      } else {
        await this.handleRegister();
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  public async handleLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage.set('Veuillez remplir tous les champs correctement');
      return;
    }

    try {
      const loginCredentials = this.loginForm.value;
      const response: any = await this.http.post(
        `${this.API_URL}/login`,
        loginCredentials,
        this.httpOptions
      ).toPromise();

      if (response.error) {
        this.errorMessage.set(response.error);
        return;
      }

      this.successMessage.set(response.message || 'Connexion réussie !');
      this.authService.setUser(response.user);
      const form = document.querySelector(".form-container");
      if (form) {
        form.classList.remove("active");
      }
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      if (error.error?.error) {
        this.errorMessage.set(error.error.error);
      } else {
        this.errorMessage.set('Une erreur est survenue lors de la connexion');
      }
      throw error;
    }
  }

  public async handleRegister() {
    if (this.registerForm.invalid) {
      this.errorMessage.set('Veuillez remplir tous les champs correctement');
      return;
    }

    try {
      const { confirmPassword, ...userData } = this.registerForm.value;
      const response: any = await this.http.post(
        `${this.API_URL}/register`,
        userData,
        this.httpOptions
      ).toPromise();

      if (response.error) {
        this.errorMessage.set(response.error);
        return;
      }

      this.successMessage.set(response.message || 'Inscription réussie ! Vous pouvez maintenant vous connecter.');
      this.isLoginMode.set(true);
      this.registerForm.reset();
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);
      if (error.error?.error) {
        this.errorMessage.set(error.error.error);
      } else {
        this.errorMessage.set('Une erreur est survenue lors de l\'inscription');
      }
      throw error;
    }
  }

  resetForm() {
    if (this.isLoginMode()) {
      this.loginForm.reset();
    } else {
      this.registerForm.reset();
    }
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  showForm() {
    console.log('État actuel du formulaire:', this.loginForm);
  }
}

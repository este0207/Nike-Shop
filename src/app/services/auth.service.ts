import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor() {
    // Vérifier si un utilisateur est déjà stocké
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser.next(JSON.parse(storedUser));
    }
  }

  setUser(user: User | null) {
    this.currentUser.next(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  logout() {
    this.setUser(null);
  }
} 
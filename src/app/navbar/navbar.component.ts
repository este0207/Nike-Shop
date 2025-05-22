import { Component, OnInit, OnDestroy } from '@angular/core';
import { LinksComponent } from "../links/links.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LinksComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isFormVisible = false;
  currentUser: any = null;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showForm() {
    if (!this.currentUser) {
      const form = document.querySelector(".form-container");
      if (form) {
        form.classList.toggle("active");
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}

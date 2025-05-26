import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-like-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like-btn.component.html',
  styleUrl: './like-btn.component.css'
})
export class LikeBtnComponent {
  isLiked: boolean = false;

  addLike() {
    this.isLiked = !this.isLiked;
  }
}

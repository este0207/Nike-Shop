import { Component, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeBtnComponent } from "../like-btn/like-btn.component";
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, LikeBtnComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  title = input("")
  price = input("")
  cardbg = input("")  
  productId = input<number>(0)

  product = signal<Product | null>(null)

  ngOnInit() {
    this.loadProduct();
  }

  private loadProduct() {
    this.product.set({
      id: this.productId(),
      name: this.title(),
      price: parseFloat(this.price().replace('€', '')),
      imageUrl: this.cardbg()
    });
  }
}

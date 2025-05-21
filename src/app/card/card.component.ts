import { Component, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  title = input("")
  price = input("")
  cardbg = input("")

  product = signal<Product | null>(null)

  ngOnInit() {
    this.loadProduct();
  }

  private loadProduct() {
    // Pour l'instant, on utilise des données statiques
    // Plus tard, on pourra charger depuis l'API
    this.product.set({
      id: 1,
      name: this.title(),
      price: parseFloat(this.price().replace('€', '')),
      imageUrl: this.cardbg()
    });
  }
}

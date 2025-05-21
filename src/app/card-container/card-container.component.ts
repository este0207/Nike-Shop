import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

// Interface pour les données reçues de l'API
interface ApiProduct {
  id: number;
  name: string;
  price: number;
  img: string;  // Le nom exact de la propriété dans l'API
}

// Interface pour notre composant
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-card-container',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-container.component.html',
  styleUrl: './card-container.component.css'
})
export class CardContainerComponent implements OnInit {
  products = signal<Product[]>([]);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    fetch("http://localhost:8090/products")
      .then(res => res.json())
      .then((apiProducts: ApiProduct[]) => {
        console.log('Données reçues de l\'API:', apiProducts);
        
        // Transformer les données de l'API vers notre format
        const formattedProducts = apiProducts.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: `url('/${product.img}')` 
        }));
        
        console.log('Produits formatés:', formattedProducts);
        this.products.set(formattedProducts);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des produits:', error);
      });
  }
}

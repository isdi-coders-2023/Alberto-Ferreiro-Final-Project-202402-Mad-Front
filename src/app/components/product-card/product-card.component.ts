import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PricebuttonComponent } from '../pricebutton/pricebutton.component';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, PricebuttonComponent, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() card!: Product;
  getPriceClass(name: string): string {
    switch (name) {
      case 'Terceros Ampliado':
        return 'ter';
      case 'Todo Riesgo':
        return 'tr';
      case 'Ampliada Moto':
        return 'am';
      case 'Básica Moto':
        return 'bm';
      default:
        return 'ter';
    }
  }
}

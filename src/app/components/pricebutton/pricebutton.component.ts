import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricebutton',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pricebutton.component.html',
  styleUrl: './pricebutton.component.css',
})
export class PricebuttonComponent {
  @Input() card!: Product;
  constructor(private router: Router) {}
  goToPrice() {
    if (this.card) {
      this.router.navigate(['/create-policy', this.card.name]);
    }
  }
  handleKeydownPrice(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.goToPrice();
    }
  }

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

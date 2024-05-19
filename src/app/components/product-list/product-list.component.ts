import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productData: Product[] = [
    {
      bottomPrice: 199,
      policyType: 'auto',
      name: 'Terceros Ampliado',
      coverage: 'Terceros + Incendio + Lunas',
      payment: '',
      assistance: 'Asistencia en viaje nacional',
    },
    {
      bottomPrice: 350,
      policyType: 'auto',
      name: 'Todo Riesgo',
      coverage: 'Franquicia: 90€',
      payment: 'Elige pago anual, semestral o mensual',
      assistance: 'Asistencia europea',
    },
    {
      bottomPrice: 150,
      policyType: 'moto',
      name: 'Ampliada Moto',
      coverage: 'Segundo conductor incluido',
      payment: '',
      assistance: 'Asistencia nacional',
    },
    {
      bottomPrice: 90,
      policyType: 'moto',
      name: 'Básica Moto',
      coverage: 'Incluye seguro por robo',
      payment: '',
      assistance: 'Asistencia urbana',
    },
  ];
}

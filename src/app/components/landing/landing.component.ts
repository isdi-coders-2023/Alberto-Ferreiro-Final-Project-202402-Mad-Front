import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  imports: [RouterLink, ProductListComponent],
})
export default class LandingComponent {}

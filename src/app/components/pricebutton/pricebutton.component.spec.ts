import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PricebuttonComponent } from './pricebutton.component';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';

describe('PricebuttonComponent', () => {
  let component: PricebuttonComponent;
  let fixture: ComponentFixture<PricebuttonComponent>;
  let router: Router;

  const mockProduct: Product = {
    bottomPrice: 199,
    policyType: 'auto',
    name: 'Terceros Ampliado',
    coverage: 'Terceros + Incendio + Lunas',
    payment: '',
    assistance: 'Asistencia en viaje nacional',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PricebuttonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PricebuttonComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.card = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct class based on card name', () => {
    const compiled = fixture.nativeElement;
    const priceButton = compiled.querySelector('.priceButton');
    expect(priceButton.classList).toContain('ter');

    component.card.name = 'Todo Riesgo';
    fixture.detectChanges();
    expect(priceButton.classList).toContain('tr');
  });

  it('should navigate to create policy page when button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const priceButton = fixture.nativeElement.querySelector('.priceButton');
    priceButton.click();
    expect(navigateSpy).toHaveBeenCalledWith([
      '/create-policy',
      mockProduct.name,
    ]);
  });

  it('should navigate to create policy page when Enter key is pressed', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const priceButton = fixture.nativeElement.querySelector('.priceButton');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    priceButton.dispatchEvent(event);
    expect(navigateSpy).toHaveBeenCalledWith([
      '/create-policy',
      mockProduct.name,
    ]);
  });
});

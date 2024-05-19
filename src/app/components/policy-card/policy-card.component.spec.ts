import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PolicyCardComponent } from './policy-card.component';
import { Policy } from '../../models/policy.model';
import { Router } from '@angular/router';

describe('PolicyCardComponent', () => {
  let component: PolicyCardComponent;
  let fixture: ComponentFixture<PolicyCardComponent>;
  let router: Router;

  const mockPolicy: Policy = {
    id: 'policy123',
    userId: 'user123',
    carMake: 'Toyota',
    carModel: 'Corolla',
    carAge: 5,
    plateNumber: 'ABC123',
    policyType: 'auto',
    policyNumber: 1,
    claims: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PolicyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.policy = mockPolicy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the policy information', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.policy-number').textContent).toContain(
      `Nº de póliza: ${mockPolicy.policyNumber}`
    );
    expect(compiled.querySelector('h2').textContent).toContain(
      `${mockPolicy.carMake} ${mockPolicy.carModel}`
    );
    expect(compiled.querySelector('.plate').textContent).toContain(
      `Matrícula: ${mockPolicy.plateNumber}`
    );
    expect(compiled.querySelector('.car-age').textContent).toContain(
      `Antigüedad del vehículo: ${mockPolicy.carAge} años`
    );
    expect(compiled.querySelector('.claims').textContent).toContain(
      `Siniestros: ${mockPolicy.claims.length}`
    );
  });

  it('should apply the correct class based on policy type', () => {
    const compiled = fixture.nativeElement;
    component.policy.policyType = 'auto';
    fixture.detectChanges();
    expect(compiled.querySelector('.policy-number').classList).toContain(
      'auto'
    );
    expect(compiled.querySelector('.view-button').classList).toContain('auto');

    component.policy.policyType = 'moto';
    fixture.detectChanges();

    expect(compiled.querySelector('.policy-number').classList).toContain(
      'moto'
    );
    expect(compiled.querySelector('.view-button').classList).toContain('moto');
  });

  it('should apply the correct icon based on policy type', () => {
    const compiled = fixture.nativeElement;
    component.policy.policyType = 'auto';
    fixture.detectChanges();
    expect(compiled.querySelector('.icon img').src).toContain('car-icon.svg');

    component.policy.policyType = 'moto';
    fixture.detectChanges();
    expect(compiled.querySelector('.icon img').src).toContain(
      'motorbike-icon.svg'
    );
  });

  it('should navigate to update-policy route when viewPolicy is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.viewPolicy();
    expect(navigateSpy).toHaveBeenCalledWith(['/update-policy', mockPolicy.id]);
  });
});

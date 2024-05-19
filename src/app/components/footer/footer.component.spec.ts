import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the icons', () => {
    const aenor = fixture.debugElement.query(By.css('.aenor-logo'));
    expect(aenor).toBeTruthy();
    const atc = fixture.debugElement.query(By.css('.atc-logo'));
    expect(atc).toBeTruthy();
  });
  it('should render 6 links', () => {
    const compiled = fixture.debugElement.nativeElement;
    const privacy = compiled.querySelector(
      'a[href="https://es.wikipedia.org/wiki/Ley_Org%C3%A1nica_de_Protecci%C3%B3n_de_Datos_de_Car%C3%A1cter_Personal_(Espa%C3%B1a)"]'
    );
    const configure = compiled.querySelector(
      'a[href="https://github.com/alce65"]'
    );
    const csr = compiled.querySelector(
      'a[href="https://en.wikipedia.org/wiki/Corporate_social_responsibility"]'
    );
    const accessibility = compiled.querySelector(
      'a[href="https://www.w3.org/WAI/fundamentals/accessibility-intro/"]'
    );
    const stockholder = compiled.querySelector(
      'a[href="https://traduccionjuridica.es/diferencia-shareholder-stockholder/"]'
    );
    const complaints = compiled.querySelector(
      'a[href="https://traduccionjuridica.es/diferencia-shareholder-stockholder/"]'
    );
    expect(privacy).toBeTruthy();
    expect(configure).toBeTruthy();
    expect(csr).toBeTruthy();
    expect(accessibility).toBeTruthy();
    expect(stockholder).toBeTruthy();
    expect(complaints).toBeTruthy();
  });
});

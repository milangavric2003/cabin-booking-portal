import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeKorisnikaComponent } from './azuriranje-korisnika.component';

describe('AzuriranjeKorisnikaComponent', () => {
  let component: AzuriranjeKorisnikaComponent;
  let fixture: ComponentFixture<AzuriranjeKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AzuriranjeKorisnikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzuriranjeKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

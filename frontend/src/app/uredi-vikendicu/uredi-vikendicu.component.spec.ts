import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediVikendicuComponent } from './uredi-vikendicu.component';

describe('UrediVikendicuComponent', () => {
  let component: UrediVikendicuComponent;
  let fixture: ComponentFixture<UrediVikendicuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrediVikendicuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrediVikendicuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

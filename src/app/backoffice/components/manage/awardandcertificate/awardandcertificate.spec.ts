import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Awardandcertificate } from './awardandcertificate';

describe('Awardandcertificate', () => {
  let component: Awardandcertificate;
  let fixture: ComponentFixture<Awardandcertificate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Awardandcertificate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Awardandcertificate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

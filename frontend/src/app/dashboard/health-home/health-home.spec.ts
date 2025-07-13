import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthHome } from './health-home'; // ✅ matches the exported name

describe('HealthHome', () => {
  let component: HealthHome;
  let fixture: ComponentFixture<HealthHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthHome] // since it's standalone
    }).compileComponents();

    fixture = TestBed.createComponent(HealthHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

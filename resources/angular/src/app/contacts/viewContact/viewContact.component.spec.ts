import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewContactComponent } from './viewContact.component';

describe('viewContactComponent', () => {
  let component: ViewContactComponent;
  let fixture: ComponentFixture<ViewContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

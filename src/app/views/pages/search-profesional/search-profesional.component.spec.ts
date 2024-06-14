import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProfesionalComponent } from './search-profesional.component';

describe('SearchProfesionalComponent', () => {
  let component: SearchProfesionalComponent;
  let fixture: ComponentFixture<SearchProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProfesionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

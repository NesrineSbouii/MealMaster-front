import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalryComponent } from './image-galry.component';

describe('ImageGalryComponent', () => {
  let component: ImageGalryComponent;
  let fixture: ComponentFixture<ImageGalryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageGalryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageGalryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

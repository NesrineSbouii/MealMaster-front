import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImagePopUpComponent } from './upload-image-pop-up.component';

describe('UploadImagePopUpComponent', () => {
  let component: UploadImagePopUpComponent;
  let fixture: ComponentFixture<UploadImagePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImagePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImagePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

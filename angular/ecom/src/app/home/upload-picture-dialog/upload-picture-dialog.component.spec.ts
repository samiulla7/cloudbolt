import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPictureDialogComponent } from './upload-picture-dialog.component';

describe('UploadPictureDialogComponent', () => {
  let component: UploadPictureDialogComponent;
  let fixture: ComponentFixture<UploadPictureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPictureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPictureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

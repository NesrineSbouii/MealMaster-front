import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../service/images.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UploadImagePopUpComponent } from './upload-image-pop-up/upload-image-pop-up.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { UpdateImageComponent } from './update-image/update-image.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imageSrc: any;
  fileToUpload!: File;
  defaulmodal: NgbModalRef | undefined;
  @ViewChild('search') searchInput?: ElementRef;
  defaultConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-xm',
  };
  imageList$$: BehaviorSubject<any[]> = this.imageService.imageList$$;
  isLoading: boolean = true;
  constructor(
    private imageService: ImageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.imageService.getAllImage().subscribe(
      (images) => {
        this.imageList$$.next(images);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching images:', error);
        this.isLoading = false;
      }
    );

    this.imageList$$.asObservable().subscribe(() => {
      this.modalService.dismissAll();
    });
  }
  performImageSearch() {
    this.isLoading = true;
    const query = this.searchInput?.nativeElement.value;
    this.imageService.searchImages(query).subscribe((results) => {
      this.imageList$$.next(
        results.map((image) => ({
          ...image,
          data: `data:image/jpeg;base64,${image.image_data}`,
        }))
      );
      this.isLoading = false;
    });
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.uploadImage();
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  uploadImage() {
    this.imageService.setFileToUpload(this.fileToUpload);
    this.imageService.uploadImageFromLocal(this.fileToUpload);
  }
  openUploadImage() {
    const dialog = this.modalService.open(
      UploadImagePopUpComponent,
      this.defaultConfig
    );
  }
  public get images$(): Observable<any[]> {
    return this.imageList$$.asObservable();
  }
  openModal(image: any) {
    const dialog = this.modalService.open(
      UpdateImageComponent,
      this.defaultConfig
    );
    dialog.componentInstance.image = image;
  }

  deleteopenModal(image: any) {
    const dialog = this.modalService.open(DeleteComponent, this.defaultConfig);
    dialog.componentInstance.image = image;
  }
}

import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/images.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UploadImagePopUpComponent } from './upload-image-pop-up/upload-image-pop-up.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imageSrc: any;
  fileToUpload!: File;
  defaulmodal: NgbModalRef | undefined;
  defaultConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-xm',
  };
  imageList: any[] = [];
  constructor(
    private imageService: ImageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.imageService.getAllImage().subscribe((images) => {
      this.imageList = images;
      //console.log(this.imageList);
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
    this.imageService.uploadImage();
  }
  openUploadImage() {
    this.modalService.open(UploadImagePopUpComponent, this.defaultConfig);
  }
}

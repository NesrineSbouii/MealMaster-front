import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/images.service';

@Component({
  selector: 'app-upload-image-pop-up',
  templateUrl: './upload-image-pop-up.component.html',
  styleUrls: ['./upload-image-pop-up.component.scss'],
})
export class UploadImagePopUpComponent implements OnInit {
  imageSrc: any;
  fileToUpload!: File;
  isGaleryTabSelected: boolean = false;
  constructor(
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  onGaleryTabClicked(): void {
    this.isGaleryTabSelected = !this.isGaleryTabSelected;
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
}

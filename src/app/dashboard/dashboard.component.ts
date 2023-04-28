import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/images.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  imageSrc: any;
  fileToUpload!: File ;

  constructor(private imageService :ImageService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload) {
      const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
      this.uploadImage()
    };
    reader.readAsDataURL(this.fileToUpload);
    }
  }
  
  uploadImage() {
    this.imageService.setFileToUpload(this.fileToUpload)
    this.imageService.uploadImage()
  }
}

import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/service/images.service';

@Component({
  selector: 'app-image-galry',
  templateUrl: './image-galry.component.html',
  styleUrls: ['./image-galry.component.scss'],
})
export class ImageGalryComponent implements OnInit {
  images: any[] = []; // Replace 'any[]' with the correct type of your images
  isLoading: boolean = true;
  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.imageService.GetImageFromGalery().subscribe(
      (images) => {
        this.images = images.map((image) => ({ ...image, selected: false }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching images:', error);
        this.isLoading = false;
      }
    );
    console.log(this.images);
  }
  // Function to deselect all images
  deselectAllImages() {
    this.images.forEach((image) => (image.selected = false));
  }

  validate() {
    this.images.map((img) => {
      if (img.selected == true) {
        let image = { name: img.name, data: img.data };
        this.imageService.uploadImageFromGalery(image);
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

 fileToUpload!: File;

  constructor(private http: HttpClient) { }

  public setFileToUpload(file: File): void {
    this.fileToUpload = file;
  }

  public uploadImage(): void {
    if (!this.fileToUpload) {
      return;
    }

    const endpoint = environment.baseUrl +'/upload/';
    const formData = new FormData();
    formData.append('image', this.fileToUpload, this.fileToUpload.name);

    this.http.post(endpoint, formData).subscribe(
      (response) => {
        console.log('Image upload successful');
      },
      (error) => {
        console.error('Image upload failed', error);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  fileToUpload!: File;

  constructor(private http: HttpClient) {}

  public setFileToUpload(file: File): void {
    this.fileToUpload = file;
  }

  public uploadImage(): void {
    if (!this.fileToUpload) {
      return;
    }

    const endpoint = environment.baseUrl + '/image-tags/';
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
  public GetImageFromGalery(): Observable<any[]> {
    const endpoint = environment.baseUrl + '/get_blobs/';

    return this.http.get<any>(endpoint).pipe(
      map((response) => {
        return response.images.map((image: { data: any }) => ({
          ...image,
          data: `data:image/jpeg;base64,${image.data}`,
        }));
      })
    );
  }
  // public uploadImageFromGalery(image: {
  //   name: string;
  //   data: string;
  // }): Observable<any[]> {
  //   const endpoint = environment.baseUrl + '/image-tags/';
  //   // const formData = new FormData();
  //   // formData.append('source', 'azure');
  //   // formData.append(
  //   //   'selected_image',
  //   //   this.base64ToFile(image.data, image.name)
  //   // );

  //   return this.http
  //     .post<any>(endpoint, {
  //       source: 'azure',
  //       selected_image: this.base64ToFile(image.data, image.name),
  //     })
  //     .pipe(
  //       map((response) => {
  //         return response.images;
  //       })
  //     );
  // }

  public uploadImageFromGalery(image: { name: string; data: string }) {
    const endpoint = environment.baseUrl + '/image-tags/';
    const requestBody = {
      source: 'azure',
      selected_image: image,
    };
    console.log(requestBody.selected_image);

    this.http.post(endpoint, requestBody).subscribe(
      (response) => {
        // Handle the response here if needed
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

  public getAllImage(): Observable<any[]> {
    const endpoint = environment.baseUrl + '/images_list/';
    return this.http.get<any>(endpoint).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }
}

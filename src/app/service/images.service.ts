import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  fileToUpload!: File;

  imageList$$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  public setFileToUpload(file: File): void {
    this.fileToUpload = file;
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

  public uploadImageFromGalery(image: { name: string; data: string }) {
    const endpoint = environment.baseUrl + '/image-tags/';
    const formData = new FormData();
    formData.append('source', 'azure');
    formData.append('selected_image', this.b64toBlob(image.data));

    this.http.post(endpoint, formData).subscribe(
      (response: any) => {
        // Handle the response here if needed
        this.imageList$$.next([
          ...this.imageList$$.value,
          { ...response, data: `data:image/jpeg;base64,${response.data}` },
        ]);
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

  public uploadImageFromLocal(image: File) {
    const endpoint = environment.baseUrl + '/image-tags/';
    const formData = new FormData();
    formData.append('source', 'local');
    formData.append('image', image);

    this.http.post(endpoint, formData).subscribe(
      (response: any) => {
        this.imageList$$.next([
          ...this.imageList$$.value,
          { ...response, data: `data:image/jpeg;base64,${response.data}` },
        ]);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

  public getAllImage(): Observable<any[]> {
    const endpoint = environment.baseUrl + '/images_list';
    return this.http.get<any>(endpoint).pipe(
      map((response) => {
        return response.map((image: { image_data: any }) => ({
          ...image,
          data: `data:image/jpeg;base64,${image.image_data}`,
        }));
      })
    );
  }

  b64toBlob(
    b64Data: string,
    contentType: string = '',
    sliceSize: number = 512
  ) {
    const byteCharacters = window.atob(
      b64Data.replace('data:image/jpeg;base64,', '')
    );
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  searchImages(query: string) {
    const endpoint = environment.baseUrl + '/image-search/';
    return this.http.get<any[]>(`${endpoint}?query=${query}`);
  }
}

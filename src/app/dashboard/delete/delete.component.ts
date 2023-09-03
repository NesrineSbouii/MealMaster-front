import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { ImageService } from 'src/app/service/images.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  @Input() image: any;
  constructor(
    private modalService: NgbModal,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {}

  hideModal() {
    this.modalService.dismissAll();
  }

  confirmAction() {
    this.imageService
      .deleteImage(this.image.id)
      .pipe(take(1))
      .subscribe((value) => {
        this.imageService.imageList$$.next(
          this.imageService.imageList$$.value.filter(
            (value) => value.id !== this.image.id
          )
        );
        this.modalService.dismissAll();
      });
  }
}

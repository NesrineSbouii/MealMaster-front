import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/service/images.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.scss'],
})
export class UpdateImageComponent implements OnInit {
  @Input() image: any;
  updateForm: FormGroup | undefined;
  constructor(private fb: FormBuilder, private imageService: ImageService) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      description: [this.image.description, Validators.required],
      tagToAdd: [''],
      tagToDelete: [''],
    });
  }
  get description(): string {
    return this.updateForm?.get('description')?.value;
  }
  get tagToAdd(): string[] {
    return this.updateForm?.get('tagToAdd')?.value;
  }
  get tagToDelete(): string[] {
    return this.updateForm?.get('tagToDelete')?.value;
  }

  mettreAJourImage() {
    if (this.updateForm?.valid) {
      const imageUpdate = {
        add_tags: this.tagToAdd ? [this.tagToAdd] : [],
        remove_tags: this.tagToDelete ? [this.tagToDelete] : [],
        description: this.description,
      };
      this.imageService.updateImage(this.image.id, imageUpdate);
    }
  }
}

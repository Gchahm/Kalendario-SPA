import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'shared-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent {

  @Input() id: number;
  @Input() url: string;
  @Output() photoChange = new EventEmitter<ImageSnippet>();

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      const selectedFile = new ImageSnippet(event.target.result, file, this.id);
      this.photoChange.emit(selectedFile);
    });

    reader.readAsDataURL(file);
  }
}


export class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File, public id: number) {
  }
}

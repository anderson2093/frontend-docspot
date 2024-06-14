import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {

  @Output() public fileOut:EventEmitter<File | null> = new EventEmitter();

  public selectedImage: string | ArrayBuffer | null = null;
  public oneFile:boolean = true;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if(this.selectedImage) return; 
    event.stopPropagation();
    console.log('Drag over event');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if(this.selectedImage) return; 
    event.stopPropagation();
    console.log('Drop event');
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      console.log('Files dropped: ', event.dataTransfer.files);
      if(event.dataTransfer.files.length != 1){
        this.oneFile = false;
      } else {
        this.oneFile = true;
        this.handleFile(event.dataTransfer.files[0]);
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log("input: ",input);
    console.log("input-files: ",input.files);
    if (input.files && input.files.length > 0) {
      this.oneFile = true;
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    this.fileOut.emit(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  cancelImageSelection(event: MouseEvent, fileInput: HTMLInputElement):void {
    event.stopPropagation();
    this.selectedImage = null;
    fileInput.value = '';
    this.oneFile = true;
    this.fileOut.emit(null);
  }
}

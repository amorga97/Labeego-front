import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropzone]',
})
export class DropzoneDirective {
  @Output() dropped = new EventEmitter<File>();
  @Output() hover = new EventEmitter<boolean>();

  @HostListener('drop', ['$event'])
  onDrop($event: any) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hover.emit(true);
  }

  @HostListener('dragover', ['$event'])
  onDragover($event: any) {
    $event.preventDefault();
    this.hover.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragleave($event: any) {
    $event.preventDefault();
    this.hover.emit(false);
  }
}

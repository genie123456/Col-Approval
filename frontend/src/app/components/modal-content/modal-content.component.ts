import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html'
})
export class ModalContentComponent {
  @Input() message: string = '';
}

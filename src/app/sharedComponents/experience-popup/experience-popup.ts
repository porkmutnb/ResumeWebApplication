import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperinceMe } from '../../sharedServiced/bean-shared';

@Component({
  selector: 'app-experience-popup',
  imports: [CommonModule, FormsModule],
  templateUrl: './experience-popup.html',
  styleUrl: './experience-popup.css',
})
export class ExperiencePopup {
  @Input() selectedExperience: ExperinceMe | null = null;
  @Input() isOpen = false;
  @Input() isEditMode = false;
  @Output() closePopup = new EventEmitter<void>();

  onClose(): void {
    this.closePopup.emit();
  }
}

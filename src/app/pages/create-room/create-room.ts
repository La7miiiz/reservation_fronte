import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../../shared/side-nav/side-nav';
import { RoomsService } from '../../core/services/rooms';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SideNavComponent],
  templateUrl: './create-room.html',
  styleUrls: ['./create-room.css'],
})
export class CreateRoomComponent {
  roomForm;
  success = false;

  constructor(private fb: FormBuilder, private roomsService: RoomsService) {
    this.roomForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      capacite: ['', [Validators.required, Validators.min(1)]],
      disponible: [true]
    });
  }

  submitRoom() {
    if (this.roomForm.valid) {
      this.roomsService.createRoom(this.roomForm.value).subscribe(() => {
        this.success = true;
        this.roomForm.reset({ disponible: true });
        setTimeout(() => (this.success = false), 3000);
      });
    }
  }
}

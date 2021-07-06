import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-detail",
  styleUrls: ["passenger-detail.component.scss"],
  template: `
    <section>
      <span class="status" [class.checked-in]="detail.isCheckedIn"></span>
      <div *ngIf="isEditing">
        <input
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name
        />
      </div>
      <div *ngIf="!isEditing">
        {{ detail.fullname }}
      </div>
      <div class="date">
        Check-in date:
        {{
          detail.isCheckedIn
            ? (detail.checkInDate | date: "yMMMd")
            : "Haven't checked-in yet"
        }}
      </div>
      <button (click)="toggleEdit()">{{ isEditing ? "Done" : "Edit" }}</button>
      <button (click)="onRemove()">Remove</button>
    </section>
  `,
})
export class PassengerDetailComponent {
  @Input()
  detail: Passenger;

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  isEditing: boolean = false;
  constructor() {}
  onNameChange(value: string) {
    this.detail.fullname = value;
  }
  toggleEdit() {
    if (this.isEditing) this.edit.emit(this.detail);
    this.isEditing = !this.isEditing;
  }
  onRemove = () => this.remove.emit(this.detail);
}

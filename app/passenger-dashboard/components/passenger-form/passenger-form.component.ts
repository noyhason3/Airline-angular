import { Component, Input } from "@angular/core";
import { Baggage } from "../../models/baggage.interface";
import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-form",
  styleUrls: ["passenger-form.component.scss"],
  template: `
    <form #form="ngForm" novalidate>
      {{ detail | json }}
      <div>
        Passenger name:
        <input type="text" name="fullname" [ngModel]="detail?.fullname" />
      </div>
      <div>
        Passenger id:
        <input type="number" name="id" [ngModel]="detail?.id" />
      </div>

      <div>
        <!-- <label>
          <input
            type="checkbox"
            name="isCheckedIn"
            [ngModel]="detail?.isCheckedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
        </label> -->
        <label for="">
          <input
            type="radio"
            [value]="true"
            name="isCheckedIn"
            [ngModel]="detail?.isCheckedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
          Yes
        </label>
        <label for="">
          <input
            type="radio"
            [value]="false"
            name="isCheckedIn"
            [ngModel]="detail?.isCheckedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
          No
        </label>
      </div>

      <div *ngIf="form.value.isCheckedIn">
        Checked-in date:
        <input
          type="number"
          name="checkInDate"
          [ngModel]="detail?.checkInDate"
        />
      </div>

      <div>
        Luggage:
        <select name="baggage" [ngModel]="detail?.baggage">
          <option *ngFor="let item of baggage" [ngValue]="item.key">
            <!-- [value]="item.key" -->
            <!-- [selected]="item.key === detail?.baggage" -->
            {{ item.value }}
          </option>
        </select>
      </div>

      {{ form.value | json }}
    </form>
  `,
})
export class PassengerFormComponent {
  @Input()
  detail: Passenger;
  //   @Input()
  baggage: Baggage[] = [
    {
      key: "none",
      value: "No baggage",
    },
    {
      key: "hand-only",
      value: "Hand baggage",
    },
    {
      key: "hold-only",
      value: "Hold baggage",
    },
    {
      key: "hand-hold",
      value: "Hand and hold baggage",
    },
  ];
  toggleCheckIn = (isCheckedIn: boolean) => {
    if (isCheckedIn) {
      this.detail.checkInDate = Date.now();
      this.detail.isCheckedIn = isCheckedIn;
    }
  };
}

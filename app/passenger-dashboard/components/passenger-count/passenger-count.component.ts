import { Component, Input } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-count",
  template: `
    <section>
      <div>Total passengers: {{ checkedInCount() }} / {{ items?.length }}</div>
    </section>
  `,
})
export class PassengerCountComponent {
  @Input()
  items: Passenger[];
  checkedInCount = (): number => {
    if (!this.items) return;
    return this.items.filter((passenger: Passenger) => passenger.isCheckedIn)
      .length;
  };
  constructor() {}
}

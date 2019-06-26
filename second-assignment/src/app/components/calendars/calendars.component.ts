import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.scss']
})
export class CalendarsComponent implements OnInit {

     @Input() title: string;
     @Input() name;
     @Output() dataChange: EventEmitter<any> = new EventEmitter();
     value: any[] = [];

    constructor() {}

    ngOnInit() {

    }

    selectDay($event) {
        console.log('event : ' + $event);
        this.value = [];
        this.value.push(this.name, $event);
        this.dataChange.emit(this.value);
    }
}

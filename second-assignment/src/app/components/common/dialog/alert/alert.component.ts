import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    title: string;
    msg;


    constructor(
        private  bsModalRef: BsModalRef,
    ) {}

    ngOnInit() {
        console.log(this.msg.cutOffDate);
    }

    modalClose() {
        this.bsModalRef.hide();
    }
}

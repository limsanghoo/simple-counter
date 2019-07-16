import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CommentComponent } from '../common/dialog/comment/comment.component';
import { AlertComponent } from '../common/dialog/alert/alert.component';
import { DataService } from '../../services/data.service';
import { take } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CalendarsComponent } from '../calendars/calendars.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    @BlockUI() blockUI: NgBlockUI;
    mainForm: FormGroup;
    value;
    states;
    reason: any[] = [];
    selectedState;

    constructor(private formBuilder: FormBuilder,
                private modalService: BsModalService,
                private dataService: DataService,
                private calendar: CalendarsComponent,
                private bsModalRef: BsModalRef) {

    }

    get accessibility() {
        return this.mainForm.get('accessibility');
    }

    get state() {
        return this.mainForm.get('state');
    }

    get cutOffDate() {
        return this.mainForm.get('cutOffDate');
    }

    ngOnInit() {
        this.mainForm = this.formBuilder.group( {
            cutOffDate : [''],
            executeOnDate : [''],
            accessibility : [''],
            state : ['', Validators.required],
            returnReason : [''],
        });
        /* BlockUI 시작 및 Data.json 로드 */
        this.blockUI.start();
        setTimeout( () => {
        this.dataService.getJSON().then(res => {
            this.states = res.lookup.filter(obj => obj.CATEGORY == "COMMON");
        }).catch(error => {
           console.log("===error===", error);
        }).finally(() => {
            this.blockUI.stop();
        });
        }, 1000);
        /* 초기값으로 state 창 disable 설정 및 state value change 구독 */
        this.state.disable();
        this.state.valueChanges.subscribe(selectedStateName => {
            console.log(selectedStateName);
            this.selectedState = this.states.filter(state => state.NAME == selectedStateName)[0];
        });
        /* Accessibility 해지 시 다시 select 으로 변경 */
        this.accessibility.valueChanges.subscribe( changeAccessibility => {
            console.log(changeAccessibility);
             if (changeAccessibility == false) {
                 // this.selectedState = '';
                 this.state.patchValue("");
             }
        });
    }

    onDateChange(value) {
         this.value = value;
        console.log( 'main1 : ' + value[0]);
        console.log( 'main2 : ' + value[1]);
         const name = value[0];
         console.log('name : ' + name);
            if (name == 'component1') {
                console.log('진입확인 : ' + value );
                this.mainForm.get('cutOffDate').patchValue(value[1]);
            } else if (name == 'component2') {
                this.mainForm.get('executeOnDate').patchValue(value[1]);
            }
    }

    showReturnReason() {
        console.log("진입확인");
        const initialState = {
            returnMessage: this.mainForm.get('returnReason'),
        };
        this.bsModalRef = this.modalService.show(CommentComponent, {animated: true, keyboard: true, ignoreBackdropClick: true, initialState, class: 'modal-dialog-centered'});
        this.bsModalRef.content.$returnReason
            .pipe(
                take(1)
            )
            .subscribe(res => {
            if (res) {
                this.mainForm.get('returnReason').patchValue(res);
            }
        });
    }

    showFormValue() {
            const initialState = {
                    title: 'Alert Modal',
                    msg: this.mainForm.getRawValue()
            };
        this.bsModalRef = this.modalService.show(AlertComponent, {initialState, animated: true, keyboard: true, ignoreBackdropClick: true, class: "modal-dialog-centered"});
    }
    /* Accessibility 값에 따라 select 창 상태 변경 */
    checkStatus() {
        console.log("checkStatus 진입확인");
        console.log("value 값 :" + this.accessibility.value);
        if (this.mainForm.get('accessibility').value == true) {
             this.state.disable();
        } else if ( this.accessibility.value == false ) {
             this.state.enable();
        }
    }

    onSubmit() {
        console.log("SUBMIT");
        console.log(this.mainForm.value);
    }

    resetValue() {
        this.state.patchValue("");
        this.state.disable();
        this.accessibility.patchValue(false);
        this.mainForm.get('returnReason').patchValue('');
        this.mainForm.get('executeOnDate').patchValue('');
        this.mainForm.get('cutOffDate').patchValue('');
        this.calendar.childDate = "";
    }
}

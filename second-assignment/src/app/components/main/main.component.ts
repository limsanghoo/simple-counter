import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CommentComponent } from '../common/dialog/comment/comment.component';
import { AlertComponent } from '../common/dialog/alert/alert.component';
import { CommunicationService } from '../../services/communication.service';
import { DataService } from '../../services/data.service';
import { take } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
                private communicationService: CommunicationService,
                private dataService: DataService,
                private bsModalRef: BsModalRef) {

    }

    ngOnInit() {
        this.mainForm = this.formBuilder.group( {
            cutOffDate : [''],
            executeOnDate : [''],
            accessibility : [''],
            state : ['', Validators.required],
            returnReason : [''],
        });

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

        this.state.disable();
        this.state.valueChanges.subscribe(selectedStateName => {
            console.log(selectedStateName);
/*            this.dataService.getJSON().then( res => {
                this.stateValue = res.lookup.filter(obj => obj.NAME == stateValue);
                console.log(this.stateValue);
            }).catch( err => {
                console.log("error", err);
            });*/
            // 이미 로드한 data.json이 states에 들어있으므로 또다시 dateService를 이용해서 필터링 할 이유가 없음.
            this.selectedState = this.states.filter(state => state.NAME == selectedStateName)[0];
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
        this.bsModalRef = this.modalService.show(AlertComponent, {initialState, animated: true, keyboard: true, ignoreBackdropClick: true, class: "modal-dialog-centered modal-lg"});
    }

    checkStatus() {
        console.log("checkStatus 진입확인");
        console.log("value 값 :" + this.accessibility.value);
        if (this.mainForm.get('accessibility').value == true) {
             this.mainForm.get('state').disable();
        } else if ( this.accessibility.value == false ) {
             this.state.enable();
        }
    }

    onSubmit() {
        console.log("SUBMIT");
        console.log(this.mainForm.value);
    }

    resetValue() {
        this.mainForm.reset();
        this.mainForm.get('returnReason').patchValue('');
    }

    get accessibility() {
        return this.mainForm.get('accessibility');
    }

    get state() {
        return this.mainForm.get('state');
    }
}

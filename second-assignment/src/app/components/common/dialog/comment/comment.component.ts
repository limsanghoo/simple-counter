import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  modalForm: FormGroup;
  $returnReason: Subject<string> = new Subject();
  returnMessage;


  constructor(
      private bsModalRef: BsModalRef,
      private fb: FormBuilder
              ) { }

  ngOnInit() {
      this.modalForm = this.fb.group({
          reason: ['', Validators.required]
      });
       console.log(this.returnMessage.value);
      if (this.returnMessage != null) {
          this.modalForm.get('reason').patchValue(this.returnMessage.value);
      }
  }

  onSubmit() {

  }

  sendReason() {
      console.log(this.modalForm.get('reason').value);
      this.$returnReason.next(this.modalForm.get('reason').value);
      this.bsModalRef.hide();

  }

  modalClose() {
      this.bsModalRef.hide();
  }
}

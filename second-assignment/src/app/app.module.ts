import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { MainComponent} from './components/main/main.component';
import { CommentComponent} from './components/common/dialog/comment/comment.component';
import { AlertComponent } from './components/common/dialog/alert/alert.component';
import { CalendarsComponent } from './components/calendars/calendars.component';
import { BlockComponent } from './components/common/block-ui/block/block.component';

import { BsModalService } from 'ngx-bootstrap';
import { DataService } from './services/data.service';



@NgModule({
      declarations: [
          AppComponent,
          MainComponent,
          CommentComponent,
          AlertComponent,
          CalendarsComponent,
          BlockComponent
          ],
      imports: [
          BrowserModule,
          ReactiveFormsModule,
          BsDatepickerModule.forRoot(),
          FormsModule,
          ModalModule.forRoot(),
          HttpClientModule,
          BlockUIModule.forRoot({
              template: BlockComponent
          })
          ],
      providers: [
          CalendarsComponent,
          MainComponent,
          BsModalService,
          DataService,
          BsModalRef
          ],
      bootstrap: [
          AppComponent
      ],
      entryComponents: [
          CommentComponent,
          AlertComponent,
          BlockComponent
      ]
})
export class AppModule { }

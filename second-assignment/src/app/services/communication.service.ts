import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

    private subject = new Subject<any>();

    constructor() { }

    sendReason(reason: string) {
        console.log("service 진입 확인");
        this.subject.next(reason);
    }

    getReason(): Observable<any> {
        return this.subject.asObservable();
    }

    clearReason() {
        this.subject.next();
    }

}

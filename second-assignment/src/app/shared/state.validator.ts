import { AbstractControl } from '@angular/forms';

export function checkStateValidator(control: AbstractControl): {[key: string]: boolean} | null {

    const status = control.value;

    if (status == false) {
        console.log("진입확인");
        return {'flag': false};
    } else if ( status == true) {
        console.log("true 진입 확인");
        return { 'flag': true};
    }
}

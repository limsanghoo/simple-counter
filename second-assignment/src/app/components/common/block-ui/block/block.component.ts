import {Component} from '@angular/core';

@Component({
    selector: 'app-block',
    template: `
            <div>
                <img src="../../../../assets/images/spinner.gif" aria-hidden="true" alt="spinner center">
            </div>
            `,
    styleUrls: ['./block.component.scss']
})
export class BlockComponent {

  constructor() { }
}

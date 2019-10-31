import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
    selector: 'app-reponses',
    templateUrl: './reponses.component.html',
    styleUrls: ['./reponses.component.scss']
})
export class ReponsesComponent {
    @Input()
    public reponses: Message[] = [];
    @Input()
    public action: any;
    @Output()
    public actionChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    setAction(action: any) {
        this.action = action;
        this.actionChange.next(this.action);
    }

    changeEvent() {
        return this.actionChange.asObservable();
    }
}
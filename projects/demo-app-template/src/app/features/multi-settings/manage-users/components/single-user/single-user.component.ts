import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { IRegularUser } from '@demo-app/features/multi-settings/models/regular-user.model';

@Component({
    selector: 'single-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <li (click)="emitUser(singleUser)">
        {{ singleUser?.name}} - {{ singleUser?.lastName}}
    </li>
    `
})
export class SingleUserComponent {
    constructor() {}

    @Input()
    singleUser:IRegularUser | undefined;

    @Output()
    userClicked:EventEmitter<IRegularUser> = new EventEmitter();

    emitUser(user:IRegularUser | undefined){
        user && this.userClicked.emit(user);
    }
}
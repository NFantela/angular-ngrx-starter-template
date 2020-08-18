import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { IRegularUser } from '../../../models/regular-user.model';
import { selectFilteredUsers, selectSettingsUsersLoading } from '../../../multi-settings-store/selectors/users/users.selectors';
import { actionLoadUsers, actionDeleteUserSuccess } from '../../../multi-settings-store/actions/users/users.actions';
import { SendAnalytics } from '@demo-app/shared/decorators/analytics.decorator';
import { MultiSettingsState } from '@demo-app/features/multi-settings/multi-settings-store/multi-settings.state';

@Component({
    selector: 'manage-users',
    template: `
        <div>
            Manage users here
            <h3 *ngIf="usersLoading$" >Users loading</h3>
            <p demo-badge>Demo badge demo</p>
            <ul>
                <li *ngFor="let user of filteredUsers$ | async" (click)="handleDeleteUser(user)">
                    {{ user.name}} - {{ user.lastName}}
                </li>
            </ul>
        </div>
    `
})
export class ManageUsersComponent implements OnInit {
    
    constructor(
        private _store: Store<MultiSettingsState>,
    ) {}
    
    filteredUsers$:Observable<IRegularUser[]> = EMPTY;
    usersLoading$: Observable<boolean> = EMPTY;

    ngOnInit(){
        this._store.dispatch(actionLoadUsers());

        this.filteredUsers$ = this._store.pipe(select(selectFilteredUsers));
        this.usersLoading$ = this._store.pipe(select(selectSettingsUsersLoading));
    }

    @SendAnalytics('delete-user-btn', 'deleting user with click')
    handleDeleteUser(user:IRegularUser){
        // we just shortcut to delete user success directly normaly del user action is first then service etc..
        this._store.dispatch(actionDeleteUserSuccess({user}));
    }
}
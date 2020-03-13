import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRegularUser } from '../../../models/regular-user.model';
import { selectFilteredUsers, selectSettingsUsersLoading } from '../../../multi-settings-store/selectors/users/users.selectors';
import { actionLoadUsers, actionDeleteUserSuccess } from '../../../multi-settings-store/actions/users/users.actions';

@Component({
    selector: 'manage-users',
    template: `
        <div>
            Manage users here
            <h3 *ngIf="usersLoading$">Users loading</h3>
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
        private _store: Store,
    ) {}
    
    filteredUsers$:Observable<IRegularUser[]>;
    usersLoading$: Observable<boolean>;

    ngOnInit(){
        this._store.dispatch(actionLoadUsers());

        this.filteredUsers$ = this._store.pipe(select(selectFilteredUsers));
        this.usersLoading$ = this._store.pipe(select(selectSettingsUsersLoading));
    }

    handleDeleteUser(user:IRegularUser){
        // we just shortcut to delete user success directly normaly del user action is first then service etc..
        this._store.dispatch(actionDeleteUserSuccess({user}));
    }
}
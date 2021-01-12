import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, EMPTY, of } from 'rxjs';
import { IRegularUser } from '../../../models/regular-user.model';
import { selectFilteredUsers, selectSettingsUsersLoading } from '../../../multi-settings-store/selectors/users/users.selectors';
import { actionLoadUsers, actionDeleteUserSuccess } from '../../../multi-settings-store/actions/users/users.actions';
import { SendAnalytics } from '@demo-app/shared/decorators/analytics.decorator';
import { MultiSettingsState } from '@demo-app/features/multi-settings/multi-settings-store/multi-settings.state';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '@ng-web-apis/common';
import { typedFromEvent } from '@demo-app/shared/utils/type_utils';
import { CustomUnsubscribeService } from '@demo-app/shared/services/unsubscribe.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'manage-users',
    template: `
        <div>
            Manage users here
            <loader-comp 
                [showLoader]="usersLoading$ | async" 
                [textContent]="loadingMsg">

                <p demo-badge>Demo badge demo</p>
                <p>Lazy loaded svg dino icon example</p>
                <lazy-icon name="dino-crying"></lazy-icon>
                <ul>
                    <li *ngFor="let user of filteredUsers$ | async" (click)="handleDeleteUser(user)">
                        {{ user.name}} - {{ user.lastName}}
                    </li>
                </ul>

            </loader-comp>
            <ng-template #loadingMsg><h3>Loading users...</h3></ng-template>
        </div>
    `,
    providers:[CustomUnsubscribeService]
})
export class ManageUsersComponent implements OnInit {
    
    constructor(
        private _store: Store<MultiSettingsState>,
        @Inject(DOCUMENT) document: Document,
        @Inject(WINDOW) window: Window,
        { nativeElement }: ElementRef<HTMLElement>,
        private _unsubService:CustomUnsubscribeService
    ) {

      // event is MouseEvent, currentTarget is Window
      typedFromEvent(window, "click").pipe(takeUntil(this._unsubService)).subscribe(console.log);
      // event is ClipboardEvent, currentTarget is Document
      typedFromEvent(document, "copy").pipe(takeUntil(this._unsubService)).subscribe(console.log);
      
    }
    
    filteredUsers$:Observable<IRegularUser[]> = EMPTY;
    usersLoading$: Observable<boolean> = of(false);

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
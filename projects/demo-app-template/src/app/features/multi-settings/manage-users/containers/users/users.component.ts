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
import { ExtendedSortable, MatSortAndPaginationOutput } from '@demo-app/shared/modules/material-server-sort-pagination/material-server-sort-pagination.directive';

@Component({
    selector: 'manage-users',
    template: `
        <div>
            Manage users here
            <loader-comp 
                [showLoader]="usersLoading$ | async" 
                textContent="Loading data">

                <p demo-badge>Demo badge demo</p>
                <p>Lazy loaded svg dino icon example</p>
                <lazy-icon name="dino-crying"></lazy-icon>
                <ul>
                    <single-user 
                        *ngFor="let user of filteredUsers$ | async" 
                        [singleUser]="user"
                        (userClicked)="handleDeleteUser($event)">
                    </single-user>
                </ul>

            <textarea (resizeWatcher) = "listenResizeObs($event)"></textarea>

            </loader-comp>
            <ng-template #loadingMsg><h3>Loading users...</h3></ng-template>
        </div>

        <div>
        <h3>Autofocus directive test</h3>
            <input type="text" setAutoFocus />
        </div>

        <div (matServerSortAndPagination)="handleSortAndPagination($event)" [startSortDirection]="startSortDefault">
            <h2>Mat table with pagination and sorting</h2>
            <table mat-table [dataSource]="(filteredUsers$ | async) || []" class="mat-elevation-z8" matSort>

                    <ng-container matColumnDef="name">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
                        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
                    </ng-container>

                    <ng-container matColumnDef="lastName">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header> LName </th>
                        <td mat-cell *matCellDef="let element"> {{element.lastName}} </td>
                    </ng-container>

                    <ng-container matColumnDef="email">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>  Email</th>
                        <td mat-cell *matCellDef="let element"> {{element.email}} </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
            <mat-paginator [pageSize]="5" [pageSizeOptions]="[1, 5, 25, 100]" [length]="10"></mat-paginator>        
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

    readonly displayedColumns: ReadonlyArray<string> = ['name', 'lastName', 'email'];
    readonly startSortDefault:ExtendedSortable<IRegularUser> = {  id: 'lastName', start:  'desc', disableClear: false }

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

    testStringUppercase(someStr:string):string{
        if(typeof someStr === 'string'){
            return someStr.toLocaleUpperCase();
        }
        return someStr;
    }

    listenResizeObs(e: any){
        console.log(e);
    }

    handleSortAndPagination(ev:MatSortAndPaginationOutput<IRegularUser>){
        console.log("mat server sort and pagination", ev)
    }
}
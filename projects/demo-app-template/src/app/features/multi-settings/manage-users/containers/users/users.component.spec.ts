import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ManageUsersComponent} from './users.component';
import { SingleUserComponent } from '../../components/single-user/single-user.component';

 import { DebugElement } from '@angular/core';
 import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IUsersState } from "@demo-app/features/multi-settings/multi-settings-store/reducers/users/users.reducer";
import { selectFilteredUsers } from "@demo-app/features/multi-settings/multi-settings-store/selectors/users/users.selectors";
/** TESTING CONTAINER COMPONENT with async provider **/
// if you have child components import them too
// if yoou have additional angular modules import them too e.g. reactive forms

describe('ManageUsersComponent', () => {

    // set up module and component
    let component: ManageUsersComponent;
    let fixture: ComponentFixture<ManageUsersComponent>;
    let store: MockStore;

     const initialState: IUsersState = {
        users: [
            {userId: 'axaca12-asdaas', name: "John", lastName: "Doe", email: "john@doe.mail", isActive:true},
            {userId: 'aCCca13-asdaas', name: "Anita", lastName: "Goe", email: "anita@goe.mail", isActive:false},
        ],
        usersFilter: 'ALL',
        loading: false
      };
      

    let el:DebugElement; // used for dom nodes interaction and templates testing

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[SingleUserComponent, ManageUsersComponent],
            providers:[
                provideMockStore({ initialState }),
            ]
        });

        fixture = TestBed.createComponent(ManageUsersComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        store = TestBed.inject(MockStore);
    });

});
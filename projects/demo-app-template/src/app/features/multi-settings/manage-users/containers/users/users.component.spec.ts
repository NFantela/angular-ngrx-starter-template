import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ManageUsersComponent} from './users.component';
import { SingleUserComponent } from '../../components/single-user/single-user.component';

 import { DebugElement } from '@angular/core';
 import { provideMockStore, MockStore } from '@ngrx/store/testing';
/** TESTING CONTAINER COMPONENT with async provider **/
// if you have child components import them too
// if yoou have additional angular modules import them too e.g. reactive forms

describe('SingleUserComponent', () => {

    // set up module and component
    let component: SingleUserComponent;
    let fixture: ComponentFixture<SingleUserComponent>;
    let store: MockStore;

    const initialState = {  };

    let el:DebugElement; // used for dom nodes interaction and templates testing

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[SingleUserComponent],
            providers:[
                provideMockStore({ initialState }),
            ]
        });

        fixture = TestBed.createComponent(SingleUserComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        store = TestBed.inject(MockStore);
    });

});
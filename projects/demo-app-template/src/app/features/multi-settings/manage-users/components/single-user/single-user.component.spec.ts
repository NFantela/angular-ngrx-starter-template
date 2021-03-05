import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { IRegularUser } from "@demo-app/features/multi-settings/models/regular-user.model";
import { SingleUserComponent } from "./single-user.component";

const USER_FOR_TESTING:IRegularUser = {userId: 'axaca12-asdaas', name: "John", lastName: "Doe", email: "john@doe.mail", isActive:true, age: 22};

describe('SingleUserComponent', () => {
    // set up module and component
    let component: SingleUserComponent;
    let fixture: ComponentFixture<SingleUserComponent>;

    let el:DebugElement; // used for dom nodes interaction and templates testing

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[SingleUserComponent]
        });

        fixture = TestBed.createComponent(SingleUserComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
    });

    // testing @Input and @Output
    it('should receive user correctly as @Input', () => {
        component.singleUser = USER_FOR_TESTING;
        expect(component.singleUser).toEqual(USER_FOR_TESTING);
        // remove
        component.singleUser = undefined;
        expect(component.singleUser).toBeUndefined();
    })

    // testing @Output()
    it('should emit user on click', () => {
        // spy on event emitter eventEmitter prop
        spyOn(component.userClicked, 'emit').and.callThrough();
        // now call emitUser method that fires emit on eventEmitter
        component.emitUser(USER_FOR_TESTING);
        // we expect that eventEmitter.emit was called with USER_FOR_TESTING
        expect(component.userClicked.emit).toHaveBeenCalledWith(USER_FOR_TESTING)
    })


    /** TESTING TEMPLATES AND USER INTERACTION */
    it('template - should emit user when el is clicked', () => {
        // query the element in template by css or directive name
        spyOn(component, 'emitUser');
        el.query(By.css('li')).triggerEventHandler('click', component.singleUser);
        expect(component.emitUser).toHaveBeenCalledWith(component.singleUser);
    })

});
import { MapDataPipe } from './mapper.pipe';
// testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

const MAPPED_FN_TO_TEST = (valueNum:number, argumentNum:number) => valueNum * argumentNum;
const INITAL_VAL = 2;
const ADDITIONAL_ARGUMENT = 3;

describe('MapDataPipe', () => {

    describe('Isolate MapDataPipe Test', () => {
        const pipe = new MapDataPipe<number, number>();

        it('should call passed fn with arguments', () => {
            expect( pipe.transform(INITAL_VAL, MAPPED_FN_TO_TEST, ADDITIONAL_ARGUMENT) ).toBe(6);
        });
    });

    // test with angualr
    describe('Shallow MapDataPipe test', () => {
        // create some non existing component only for testing pipe
        @Component({
            template: `
                NumVal : {{initialVal | mapDataWithFn : mapperFn : additionalArg }}
            `
        })class MapperPipeTestComponent {
            initialVal = INITAL_VAL;
            mapperFn = MAPPED_FN_TO_TEST;
            additionalArg = ADDITIONAL_ARGUMENT;
        }

        // declare vars that will be filled below in beforeEach after module creation
        let component : MapperPipeTestComponent;
        let fixture: ComponentFixture<MapperPipeTestComponent>;
        let el: HTMLElement;

        // called before each test in our describe block
        // we need to create a test module with component and pipe
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [MapperPipeTestComponent, MapDataPipe]
            });

            fixture = TestBed.createComponent(MapperPipeTestComponent);
            component = fixture.componentInstance;
            el = fixture.nativeElement;
        });

        it('should call passed fn with  inside component', () => {
           fixture.detectChanges(); // call this 1st
           expect(el.textContent).toContain('NumVal : 6');
           // now change local prop, detect changes and reevaluate
           component.initialVal = 3;
           fixture.detectChanges();
           expect(el.textContent).toContain('NumVal : 9');
        });
        
    })




})
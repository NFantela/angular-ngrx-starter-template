import { Directive, OnChanges } from "@angular/core";
import { Subject } from "rxjs";

import { Component } from '@angular/core';

@Directive({})
export abstract class Controller implements OnChanges {
    readonly change$ = new Subject<void>();

    ngOnChanges() {
        this.change$.next();
    }
}



@Directive({
    selector: 'table[diTable]'
})export class DiTableDirective extends Controller{
    constructor(){ super(); }

    diTableHeader = "Hello I am Di Table here";
}
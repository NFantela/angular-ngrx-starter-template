import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Input, TemplateRef } from '@angular/core';
import { USER_AGENT } from '@ng-web-apis/common';
import { LoaderMatSpinnerTypes } from '../../types/loader.types';

const MAT_SPINNER_INIT_OPTS:LoaderMatSpinnerTypes  = {
    color: 'primary',
    mode: 'indeterminate',
    value:100
}

@Component({
    selector: 'loader-comp',
    styleUrls: ['loader.component.scss'],
    templateUrl: 'loader.component.html',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

    @Input()
    set showLoader(value: boolean | null) {
        this.loading = value;
    }

    @Input()
    overlay = false;

    @Input()
    textContent: string | TemplateRef<any> | null = null;

    @Input()
    set matSpinnerOpts(opts:LoaderMatSpinnerTypes){
        this._matSpinnerOpts = {
            ...this._matSpinnerOpts,
            ...opts
        }
    }
    get matSpinnerOpts(){return this._matSpinnerOpts}
    private _matSpinnerOpts:LoaderMatSpinnerTypes = MAT_SPINNER_INIT_OPTS;

    constructor(
        @Inject(DOCUMENT) private readonly documentRef: Document,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(USER_AGENT) private readonly userAgent: string,
    ) {}

    @HostBinding('class._loading')
    loading : boolean | null = false;

    get hasOverlay(): boolean {
        return this.overlay && !!this.loading;
    }

    get hasText(): boolean {
        return !!this.textContent;
    }

    get isString(){
        return typeof this.textContent === 'string';
    }

    get getTmplRef() {
        return  this.textContent instanceof TemplateRef && this.textContent || null;
    }

}
import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Inject,
    Input,
    Optional,
    Renderer2,
    Self,
    ViewContainerRef,
} from '@angular/core';
import { getClosestElement } from '@demo-app/shared/utils/dom/get-closest-element';
import { setNativeFocused } from '@demo-app/shared/utils/dom/set-native-focused';
import { IS_IOS } from '@demo-app/shared/utils/tokens/is-ios';
import {interval, race, timer} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';

const IOS_TIMEOUT = 1000;
const NG_ANIMATION_SELECTOR = '.ng-animating';
 const POLLING_TIME = 1000 / 15;

@Directive({
    selector: '[setAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
    @Input()
    autoFocus = true;

    constructor(
        @Inject(ChangeDetectorRef)
        private readonly changeDetectorRef: ChangeDetectorRef,
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<HTMLElement>,
        @Optional()
        @Self()
        @Inject(IS_IOS) private readonly isIos: boolean,
        @Inject(Renderer2) private readonly renderer: Renderer2,
        @Inject(ViewContainerRef)
        private readonly viewContainerRef: ViewContainerRef,
    ) {}

    ngAfterViewInit() {
        if (!this.autoFocus) {
            return;
        }

        const element = this.elementRef.nativeElement;

        if (!(element instanceof HTMLElement)) {
            return;
        }

        if (!this.isIos) {
            setTimeout(() => {
                setNativeFocused(element);
                this.changeDetectorRef.markForCheck();
            });

            return;
        }

        this.veryVerySadIosFix(element);
    }

    private veryVerySadIosFix(element: HTMLElement) {
        const {nativeElement} = this.viewContainerRef.element;
        const decoy: HTMLElement = this.renderer.createElement('input');

        decoy.style.position = 'absolute';
        decoy.style.opacity = '0';
        decoy.style.height = '0';

        this.renderer.setAttribute(decoy, 'readonly', 'readonly');
        this.renderer.appendChild(nativeElement, decoy);
        setNativeFocused(decoy);

        race<unknown>(
            timer(IOS_TIMEOUT),
            interval(POLLING_TIME).pipe(
                map(() => getClosestElement(element, NG_ANIMATION_SELECTOR)),
                filter(element => !element),
                take(1),
            ),
        ).subscribe(() => {
            setTimeout(() => {
                setNativeFocused(element);
                this.changeDetectorRef.markForCheck();
                this.renderer.removeChild(nativeElement, decoy);
            });
        });
    }
}

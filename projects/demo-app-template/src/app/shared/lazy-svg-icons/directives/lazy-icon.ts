import { Directive, Inject, ElementRef, Input } from '@angular/core';
import { LazyIconsRegistryService} from '../lazy-icons.registry.service';
import { DOCUMENT } from "@angular/common";

@Directive({
    selector: 'lazy-icon',
    host:{
        'style': 'display:inline-block; width:50px; height:50px;'
    }
})
export class LazyIconDirective {
    
    constructor(
        @Inject(ElementRef) private _elRef:ElementRef,
        @Inject(DOCUMENT) private readonly documentRef: Document,        
        @Inject(LazyIconsRegistryService) private _lazyIconsRegistry:LazyIconsRegistryService) {}

    private _svgIcon:SVGElement| undefined;

    @Input()
    set name(iconName:string){
        if(this._svgIcon) this._elRef.nativeElement.removeChild(this._svgIcon);

        const svgData = this._lazyIconsRegistry.getIconFromRegistry(iconName);
        this._svgIcon = this._svgElementFromString(svgData);
        this._elRef.nativeElement.appendChild(this._svgIcon);
    }

    private _svgElementFromString(svgContent:string = ''):SVGElement {
        const div = this.documentRef.createElement('DIV');
        div.innerHTML = svgContent;
        return div.querySelector('svg') || this.documentRef.createElementNS('http://www.w3.org/2000/svg', 'path');
    }

}
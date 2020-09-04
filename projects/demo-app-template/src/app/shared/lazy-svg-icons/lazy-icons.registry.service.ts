import { Injectable } from '@angular/core';
import { LazyIcon } from './lazy-icons';

@Injectable({providedIn:'root'})
export class LazyIconsRegistryService {
    constructor() {}

    public registry = new Map<string, string>();

    public registerIcons(icons:LazyIcon[]){
        icons.forEach(icon => this.registry.set(icon.name, icon.data))
    }

    public getIconFromRegistry(iconName:string): string | undefined {
        if(!this.registry.has(iconName)){
            console.warn(`There is no ${iconName} in icons registry`);
        }
        return this.registry.get(iconName);
    }
}
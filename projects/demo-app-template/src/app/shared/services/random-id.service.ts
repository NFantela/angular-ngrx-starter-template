import {Injectable} from '@angular/core';

const CUSTOM_START = 'customid_';

/** Generates unique ids */
@Injectable({
    providedIn: 'root',
})
export class RandomIdService {
    private static autoId = 0;

    generate(): string {
        return `${CUSTOM_START}${RandomIdService.autoId++}${Date.now()}`;
    }
}

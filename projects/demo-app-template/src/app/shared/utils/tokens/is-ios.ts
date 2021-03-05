import {inject, InjectionToken} from '@angular/core';
import {USER_AGENT} from '@ng-web-apis/common';
import { IS_MOBILE } from './is-mobile';

const IOS_REG_EXP = /ipad|iphone|ipod/;

export const IS_IOS = new InjectionToken<boolean>('iOS browser detection', {
    providedIn: 'root',
    factory: () =>
        inject(IS_MOBILE) && IOS_REG_EXP.test(inject(USER_AGENT).toLowerCase()),
});

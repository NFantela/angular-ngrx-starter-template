import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { createEffect } from '@ngrx/effects';
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class GoogleAnalyticsEffects {
  constructor(private router: Router) {}
  
 // remember to use @SendAnalytics() decorator for specific events 
 // this is just for page navigation
  pageView$ = createEffect(
    () => () =>
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        tap((event: NavigationEnd) => {
          const analyticsFn:Function | undefined = (<any>window).ga;
          
          if(analyticsFn){
            analyticsFn('set', 'page', event.urlAfterRedirects);
            analyticsFn('send', 'pageview');
          }
        })
      ),
    { dispatch: false }
  );
}

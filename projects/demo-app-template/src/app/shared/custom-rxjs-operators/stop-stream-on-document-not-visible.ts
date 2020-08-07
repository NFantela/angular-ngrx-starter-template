import { Observable, fromEvent, concat, of, MonoTypeOperatorFunction, iif, combineLatest } from "rxjs";
import { map, switchMap, filter } from "rxjs/operators";

/**
 * The visibleChanges() emits true or false when the document is visible or not visible.
 */
function visibleChanges(document: Document): Observable<boolean> {
    const visibilityChanges = fromEvent(document, 'visibilitychange');
    return concat(of(null), visibilityChanges).pipe(
        map(() => !document.hidden)
    );
}

/**
* Operator that filers out valus from the source if page is not visible
 */
function onVisible<T>(document: Document): MonoTypeOperatorFunction<T> {
    return source => combineLatest([ source, visibleChanges(document) ]).pipe(
      filter(([ , isVisible ]) => isVisible),
      map(([ data ]) => data)
    );
  }

/**
* Operator that resubscribes to source when page is visible

 */
export function toggleOnVisible<T>(document: Document): MonoTypeOperatorFunction<T> {
    return source => visibleChanges(document).pipe(
        switchMap((isVisible) => iif(() => isVisible, source))
    );
}

import { HttpErrorResponse } from "@angular/common/http";
import { MonoTypeOperatorFunction, Observable, Observer, of, Operator, TeardownLogic } from "rxjs";
import { catchError, map, startWith } from "rxjs/operators";

export interface ProgressResult<T, E> {
    res?: T | undefined;
    loading?: boolean;
    error?: E | undefined;
    success?: boolean;
    loaded?: boolean;
}

const DEFAULT_STATE = {
    error: undefined,
    res: undefined,
    loading: true,
    loaded: false,
    success: false,
}

class HttpProgressResult<T, E>{
    constructor(newState: ProgressResult<T, E> = {}) {
        this._state = { 
            ...DEFAULT_STATE,
            ...newState,
        }
    }
    private readonly _state: ProgressResult<T, E>;

    get res(): T | undefined {
        return this._state.res;
    }

    get error(): E | undefined {
        return this._state.error;
    }

    get loading(): boolean {
        return this._state.loading!;
    }

    get success(): boolean {
        return this._state.success!;
    }

    get loaded(): boolean {
        return this._state.loaded!;
    }
}

class HttpProgressOperator<R, E> implements Operator<E, HttpProgressResult<R, E>> {
    constructor(private _backupResult:R) { }

    call(observer: Observer<HttpProgressResult<R, E>>, source: Observable<R>): TeardownLogic {
        return source.pipe(
            map((res) => {
                return new HttpProgressResult<R, E>({res, loading:false, loaded:true})
            }),
            catchError((error:E) => {
               return of(new HttpProgressResult<R, E>({res : this._backupResult, error, loading:false, loaded:true}))
            }),
            startWith(new HttpProgressResult<R, E>({res:this._backupResult}))
        ).subscribe(observer);
    }
}

/** Operator Fn to be used in HttpClient streams e.g. 
 *  this._http.get().pipe( mapToHttpProgress([]) )
 *  @param backupResult is used on errors and stream starts as res value
*/
export function mapToHttpProgress<T, Err = HttpErrorResponse>(backupResult:T): MonoTypeOperatorFunction< HttpProgressResult<T, Err>> {
    return source => source.lift(new HttpProgressOperator<T, Err>(backupResult));
}

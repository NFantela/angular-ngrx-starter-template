import {AfterViewInit, ChangeDetectorRef, ContentChild, Directive, EventEmitter, Inject, Input, OnDestroy, Output} from '@angular/core';
import { combineLatest, Observable, Subject} from 'rxjs';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { filter, map, startWith } from 'rxjs/operators';

type SortWithTypeSafety<T> = Sort & {  [key in keyof Pick<Sort, "active">]: keyof T};

export type MatSortAndPaginationOutput<T> = {
    sort: SortWithTypeSafety<T>;
    paginator: PageEvent;
};
export type ExtendedSortable<T> = MatSortable & {id: keyof T};
/**
 * Directive to be used with MatTableModule, MatSortModule and MatPaginatorModule with dataSource
 * not being connected to sort and pagination e.g. it goes directly on server, Do not worry
 * if pageSize does not match displayed list in demo the size will be called from server so it will work
 * Give  <mat-paginator> pageSize options and length for this to work correctly
 */
@Directive({
    selector: '[matServerSortAndPagination]',
})
export class MatServerSortAndPaginationDirective<SortObj> implements AfterViewInit, OnDestroy{ 
    
    constructor(@Inject(ChangeDetectorRef) private readonly _cdr:ChangeDetectorRef){}

    @Input()
    /** If this prop is passed the stream will emit first sort on ngAfterViewInit*/
    readonly startSortDirection:ExtendedSortable<SortObj> | undefined;

    private readonly _matSortAndPagination:Subject<MatSortAndPaginationOutput<SortObj>> = new Subject();

     @Output()
     readonly matServerSortAndPagination:Observable<MatSortAndPaginationOutput<SortObj>> = this._matSortAndPagination.pipe(
         filter<MatSortAndPaginationOutput<SortObj>>(Boolean)
     );

     @ContentChild(MatSort, {static: true}) sort: MatSort | null = null;
     private _sortChange$:EventEmitter<Sort> | undefined; 
   
     @ContentChild(MatPaginator) paginator: MatPaginator | null = null;
     private _paginatorChange$:EventEmitter<PageEvent> | undefined;
     
     ngAfterViewInit(): void {
        this._sortChange$ = this.sort?.sortChange;
        this._paginatorChange$ = this.paginator?.page;
    
        if(this.paginator && this._sortChange$ && this._paginatorChange$){

             combineLatest([
                this._sortChange$, 
                this._paginatorChange$.pipe(startWith({ pageIndex: this.paginator?.pageIndex, pageSize: this.paginator.pageSize, length: this.paginator.length}))
            ]).pipe(
                map(([ sort, paginator]) => this._mapToPayloadHeaders( sort as SortWithTypeSafety<SortObj>, paginator as PageEvent)),
            ).subscribe(this._matSortAndPagination)
    
            this.startSortDirection && this.sort?.sort(this.startSortDirection as any);
            this._cdr.detectChanges(); // must run detectChanges cuz we are updating parent after change detection here - or use promise resolve
        }
    }
      
    
    ngOnDestroy(){
        this._matSortAndPagination.complete();
    }

    private _mapToPayloadHeaders(sort:SortWithTypeSafety<SortObj>, paginator:PageEvent):MatSortAndPaginationOutput<SortObj>{
        return {  sort,   paginator  }
    }
   
}
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage/local-storage.service';
import { Observable, EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTheme } from '../core/core-store/selectors/settings.selectors';


@Component({
  selector: 'my-demo-prefix-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store,
    private _storageService: LocalStorageService
  ){}


  currentTheme$: Observable<string> = EMPTY;

  ngOnInit(){
    this._storageService.testLocalStorage();

    // ngrx
    this.currentTheme$ = this.store.select(selectTheme);
  }
  
}

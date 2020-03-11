import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage/local-storage.service';

@Component({
  selector: 'my-demo-prefix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-app-template';

  constructor(
    private _storageService: LocalStorageService
  ){}

  ngOnInit(){
    this._storageService.testLocalStorage();
  }
  
}

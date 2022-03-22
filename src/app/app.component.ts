import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from './services/local-storage.service';
import { saveUser } from './store/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private localStorageServ: LocalStorageService,
    private store: Store
  ) {}
  title = 'front';
  ngOnInit(): void {
    let userData = this.localStorageServ.getDataFromLocalStorage();
    console.log('localStorage', userData);
    if (userData) {
      this.store.dispatch(saveUser({ userData }));
    }
  }
}

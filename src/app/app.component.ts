import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
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
    private store: Store,
    public auth: AuthService,
    private router: Router
  ) {}
  title = 'front';
  async ngOnInit(): Promise<void> {
    let userToken = this.localStorageServ.getDataFromLocalStorage();
    if (userToken) {
      this.auth.loginUser(userToken as string).subscribe({
        next: (userData) => {
          this.store.dispatch(saveUser({ userData }));
        },
        error: (err) => {
          //TODO session expired popup
          console.log(err);
          this.router.navigate(['login']);
        },
      });
    } else {
      this.router.navigate(['login']);
    }
  }
}

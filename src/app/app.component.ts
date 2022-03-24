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
  alertIsError: boolean = false;
  alertIsActive: boolean = false;
  alertMessage!: string;
  constructor(
    public localStorageServ: LocalStorageService,
    public store: Store,
    public auth: AuthService,
    public router: Router
  ) {}
  title = 'front';
  ngOnInit() {
    let userToken = this.localStorageServ.getDataFromLocalStorage();
    if (userToken) {
      this.auth.loginUser(userToken as string).subscribe({
        next: (userData) => {
          this.store.dispatch(saveUser({ userData }));
        },
        error: (err) => {
          this.alertIsActive = true;
          this.alertIsError = true;
          this.alertMessage = 'Tu sesión ha expirado, redireccionando...';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertIsError = false;
            this.router.navigate(['login']);
          }, 2000);
        },
      });
    } else {
      this.router.navigate(['login']);
    }
  }
}

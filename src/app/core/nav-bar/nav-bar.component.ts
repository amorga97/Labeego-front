import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  active = false;
  routes = [
    { label: 'Home', path: 'dashboard' },
    { label: 'Chat', path: 'chat' },
    { label: 'Perfil', path: 'profile' },
  ];
  constructor(public router: Router) {}

  handleClick(path: string) {
    this.router.navigate([path]);
  }

  toggleActive() {
    this.active = !this.active;
  }
}

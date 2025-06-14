import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router){
    const alreadyLogged = localStorage.getItem('isAuthenticated');
    this.loggedIn.next(alreadyLogged === 'true');
  }

  private loggedIn = new BehaviorSubject<boolean>(false);

  login() {
    this.loggedIn.next(true);
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    this.router.navigateByUrl('/login')
  }

  isAuthenticated() {
    return this.loggedIn.value;
  }

}

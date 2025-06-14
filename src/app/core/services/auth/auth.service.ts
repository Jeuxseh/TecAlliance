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

  login(email: string): boolean {
    const isValid = this.validateEmail(email);
    if (isValid) {
      this.loggedIn.next(true);
      localStorage.setItem('isAuthenticated', 'true');
    }
    return isValid;
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('isAuthenticated');
    this.router.navigateByUrl('/login')
  }

  isAuthenticated() {
    return this.loggedIn.value;
  }

  private validateEmail(email: string): boolean {
    const regex = /^[^@]+@tecalliance\.com$/;
    return regex.test(email);
  }
}

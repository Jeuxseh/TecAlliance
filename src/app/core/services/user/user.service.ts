import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  user$ = this.currentUserSubject.asObservable();
  
  private usersApiUrl = environment.usersApiUrl;
  
  constructor(private http: HttpClient) {
    const storedEmail = localStorage.getItem('userEmail');
    if(storedEmail) this.validateEmail(storedEmail).subscribe();
  }

  validateEmail(email: string): Observable<boolean> {
    return this.http.get<User[]>(this.usersApiUrl).pipe(
      map((users: User[]) => {
        const currentUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if(currentUser) {
          this.currentUserSubject.next(currentUser);
          localStorage.setItem('userEmail', currentUser.email);
        }
        return !!currentUser;
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}

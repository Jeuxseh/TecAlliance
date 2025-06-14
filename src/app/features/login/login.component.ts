import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email = '';
  public error = '';

  constructor(
    private auth: AuthService, 
    private router: Router,
    private userService: UserService,
    private translate: TranslateService
  ) {}

  public login() {
    if(!this.email){
      this.error = this.translate.instant('LOGIN.NO_EMAIL_ERROR');
      return;
    }
    this.userService.validateEmail(this.email).subscribe(resp =>{
      if(!resp) {
        this.error = this.translate.instant('LOGIN.INVALID_EMAIL');
        return;
      }
      this.auth.login();
      this.router.navigateByUrl('/home');
    });
  }
}

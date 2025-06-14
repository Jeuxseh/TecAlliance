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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email = '';
  public error = '';

  constructor(
    private auth: AuthService, 
    private router: Router,
    private userService: UserService
  ) {}

  public login() {
    if(!this.email){
      this.error = "Correo inválido. Por favor, introduzca un correo."
      return;
    }
    this.userService.validateEmail(this.email).subscribe(resp =>{
      if(!resp) {
        this.error = "Correo inválido. Introduzca un correo válido."
        return;
      }
      this.auth.login();
      this.router.navigateByUrl('/home');
    });
  }
}
